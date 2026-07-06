import { createSession, getAllSessionIds } from '@/lib/agents';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const body = await request.json();
    const { symptoms, lat, lng, lang } = body;
    const session = createSession({ symptoms, lat, lng, lang });
    // Report whether the session is visible in-memory and whether sessions file exists.
    const current = getAllSessionIds();
    const sessionsFile = path.join(process.cwd(), 'data', 'sessions.json');
    const persistedExists = fs.existsSync(sessionsFile);
    return new Response(JSON.stringify({ sessionId: session.id, message: session.triage.message, clinics: session.clinics, currentSessions: current, persistedExists }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
}
