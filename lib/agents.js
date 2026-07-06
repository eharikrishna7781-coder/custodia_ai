import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

// Simple file-backed session store (persists to data/sessions.json)
const sessions = new Map();
const SESSIONS_DIR = path.join(process.cwd(), 'data');
const SESSIONS_FILE = path.join(SESSIONS_DIR, 'sessions.json');

function ensureDataDir() {
  try { if (!fs.existsSync(SESSIONS_DIR)) fs.mkdirSync(SESSIONS_DIR, { recursive: true }); } catch (e) { /* ignore */ }
}

function loadSessionsFromDisk() {
  try {
    ensureDataDir();
    if (fs.existsSync(SESSIONS_FILE)) {
      const raw = fs.readFileSync(SESSIONS_FILE, 'utf8');
      const obj = JSON.parse(raw || '{}');
      sessions.clear();
      Object.entries(obj).forEach(([k, v]) => sessions.set(k, v));
    }
  } catch (e) { /* ignore load errors */ }
}

function saveSessionsToDisk() {
  try {
    ensureDataDir();
    const obj = Object.fromEntries(sessions);
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(obj, null, 2), 'utf8');
  } catch (e) { /* ignore save errors */ }
}

// Load any persisted sessions at startup
loadSessionsFromDisk();

const CLINICS = [
  { id: 'c1', name: 'Primary Health Centre A', lat: 12.98, lng: 77.60, stock: 80, specialists: 2 },
  { id: 'c2', name: 'Community Clinic B', lat: 12.96, lng: 77.61, stock: 60, specialists: 1 },
  { id: 'c3', name: 'Rural Hospital C', lat: 12.99, lng: 77.58, stock: 90, specialists: 4 },
];

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function triageAgent(symptoms, lang = 'en') {
  const text = (symptoms || '').toLowerCase();
  let score = 2;
  let emergency = false;
  if (/chest|breath|unconscious|bleeding|severe|poison|snake/.test(text)) { score = 5; emergency = true; }
  else if (/fever|pain|cough|vomit/.test(text)) score = 3;
  const advice = score >= 4 ? 'Seek immediate medical care.' : 'Monitor and use home care. Seek help if worsening.';
  return { score, advice, emergency, message: advice };
}

export function locatorAgent(lat, lng) {
  return CLINICS.map(c => ({ ...c, distance_km: Math.round(haversine(lat, lng, c.lat, c.lng) * 10) / 10 })).sort((a, b) => a.distance_km - b.distance_km);
}

export function createSession({ symptoms = '', lat = 0, lng = 0, lang = 'en' }) {
  const id = uuidv4();
  const triage = triageAgent(symptoms, lang);
  const clinics = locatorAgent(lat, lng);
  const session = { id, symptoms, lang, triage, clinics, selectedClinic: null, transport: null, createdAt: Date.now() };
  sessions.set(id, session);
  saveSessionsToDisk();
  return session;
}

export function getSession(id) { return sessions.get(id) || null; }

export function updateSession(id, patch) {
  const s = sessions.get(id);
  if (!s) return null;
  const updated = { ...s, ...patch };
  sessions.set(id, updated);
  saveSessionsToDisk();
  return updated;
}

// Debug helper: return all current session IDs (useful to detect process memory issues)
export function getAllSessionIds() {
  // ensure we have latest persisted sessions
  loadSessionsFromDisk();
  return Array.from(sessions.keys());
}

// Return full session objects in memory (no disk read)
export function getAllSessions() {
  return Array.from(sessions.values());
}

export function bookingAgent(sessionId, clinicId) {
  const s = sessions.get(sessionId);
  if (!s) return { error: 'Session not found' };
  const clinic = s.clinics.find(c => c.id === clinicId || c.id === String(clinicId));
  if (!clinic) return { error: 'Clinic not found' };
  updateSession(sessionId, { selectedClinic: clinic });
  return { message: `Appointment booked at ${clinic.name}`, clinic };
}

export function transportAgent(sessionId, choice) {
  const s = sessions.get(sessionId);
  if (!s) return { error: 'Session not found' };
  if (choice === 'ambulance') {
    const transport = { type: 'ambulance', vehicle_id: 'A101', driver: 'Rajendra Singh', phone: '+91 98765 43210', eta_pickup: 5 };
    updateSession(sessionId, { transport });
    return transport;
  }
  if (choice === 'volunteer') {
    const transport = { type: 'volunteer', vehicle_id: 'V' + Math.floor(Math.random() * 900 + 100), driver: 'Volunteer', phone: '+91 90000 00000', eta_pickup: 12 };
    updateSession(sessionId, { transport });
    return transport;
  }
  return { error: 'Invalid choice' };
}

export function trackingAgent(sessionId) {
  const s = sessions.get(sessionId);
  if (!s || !s.transport) return { error: 'No transport' };
  const vehicle_lat = s.selectedClinic ? s.selectedClinic.lat - 0.002 : (s.clinics[0].lat - 0.002);
  const vehicle_lng = s.selectedClinic ? s.selectedClinic.lng - 0.002 : (s.clinics[0].lng - 0.002);
  return { vehicle_lat, vehicle_lng, eta_pickup: s.transport.eta_pickup, eta_destination: Math.max(5, s.transport.eta_pickup + 12) };
}

export function reportAgent(sessionId) {
  const s = sessions.get(sessionId);
  if (!s) return { error: 'Session not found' };
  return {
    symptoms: s.symptoms,
    triage_score: s.triage.score,
    advice: s.triage.advice,
    clinic_visited: s.selectedClinic ? s.selectedClinic.name : null,
    transport_used: s.transport ? s.transport.type : null,
    followup_instructions: 'Follow up if symptoms persist.'
  };
}

export default { createSession, getSession, updateSession, bookingAgent, transportAgent, trackingAgent, reportAgent };