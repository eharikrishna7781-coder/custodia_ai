/**
 * AI triage powered by Gemini (native Node.js SDK).
 * Runs inside Next.js API routes — Vercel-compatible.
 */
import { GoogleGenerativeAI } from '@google/generative-ai';

const LANG_NAMES = {
  en: 'English', hi: 'Hindi', ta: 'Tamil',
  te: 'Telugu', kn: 'Kannada', ml: 'Malayalam',
};

function cleanMarkdown(text) {
  if (!text || typeof text !== 'string') return text;
  return text
    .replace(/\*\*|\*|__|`|~|#+\s+/g, '')
    .replace(/^[-*]\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .trim();
}

function extractJson(raw) {
  if (!raw) return null;
  const cleaned = raw.replace(/```json|```/gi, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start < 0 || end <= start) return null;
  try {
    return JSON.parse(cleaned.slice(start, end + 1));
  } catch {
    return null;
  }
}

const SYSTEM_MESSAGE =
  'You are Custodia AI, a medical triage assistant designed for rural and urban ' +
  'healthcare access in India (Hyderabad and surrounding Telangana region). ' +
  'You analyze patient symptoms and return a rigorous, patient-specific assessment. ' +
  'You DO NOT return generic templates. Every response must be explicitly derived ' +
  'from the exact symptoms provided. You always respond with a single valid JSON ' +
  'object, nothing else. No markdown, no code fences, no commentary.';

function buildPrompt(symptoms, langName) {
  return `Patient symptoms (verbatim): "${symptoms}"

Analyze THIS specific case. Consider common tropical / rural / urban Indian conditions:
malaria, dengue, typhoid, chikungunya, respiratory infections (TB, pneumonia, bronchitis, COVID-like),
gastroenteritis, dysentery, worms, skin conditions (scabies, fungal, allergic), maternal & child health,
diabetes/hypertension complications, injuries, snake/insect bites, food poisoning, heat stroke, asthma.

Return ONLY valid JSON with these EXACT fields (all text in ${langName}):
{
  "diagnosis": "Most likely condition(s) with brief clinical reasoning tied to the reported symptoms",
  "urgency_score": <integer 1-5 where 1=self-care, 3=see doctor soon, 5=life-threatening emergency>,
  "needs_doctor": <true|false>,
  "advice": "Direct, actionable advice for this patient in simple language",
  "suggested_medicines": [
    {"name": "generic (brand in brackets if useful)", "dosage": "e.g. 500mg", "type": "OTC or prescription", "frequency": "e.g. every 6 hours", "duration": "e.g. 3 days", "timing": "e.g. after food"}
  ],
  "care_instructions": "Concrete home-care steps: rest, diet, hydration, red flags to watch for, when to escalate"
}

Rules:
- Analyze the EXACT symptoms above. Do NOT return generic advice.
- suggested_medicines MUST be disease-appropriate. Do NOT default to Paracetamol/ORS unless the diagnosis actually calls for antipyretics/rehydration. Match the medicine to the condition:
  * Asthma / wheezing -> bronchodilator inhaler (Salbutamol / Levosalbutamol) + inhaled corticosteroid if relevant.
  * Allergic reactions / rashes / urticaria -> antihistamines (Cetirizine, Loratadine), topical steroid or Calamine.
  * Bacterial suspicion (only if strongly indicated) -> first-line antibiotic as "prescription" (never OTC).
  * Diarrhea / dehydration -> ORS + Zinc; Loperamide only if adult non-bloody.
  * Acid reflux / gastritis -> antacid / PPI (Pantoprazole/Omeprazole).
  * Hypertension crisis / stroke / suspected MI / severe bleeding / unconscious -> return EMPTY medicines array.
  * Fever/viral illness -> Paracetamol is fine here (only here).
- needs_doctor MUST be true if urgency_score >= 4 or serious condition suspected.
- Urgency 5 (chest pain, severe bleeding, unconscious, breathing failure, stroke) -> advice must direct to call 108 / 112 immediately AND suggested_medicines empty.
- Urgency 4 emergencies with a specific rescue med (asthma -> inhaler) -> SHOULD list it so patient can use it while en route.
- Never invent prescription-only drugs for minor symptoms; prefer OTC.
- Respond in ${langName}. NO markdown symbols anywhere.`;
}

export async function generateTriage(symptoms, lang = 'en') {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const langName = LANG_NAMES[lang] || 'English';
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: SYSTEM_MESSAGE,
  });

  const result = await model.generateContent(buildPrompt(symptoms, langName));
  const raw = result?.response?.text?.() || '';
  const parsed = extractJson(raw);
  if (!parsed) {
    throw new Error('Could not parse Gemini response');
  }

  parsed.diagnosis = cleanMarkdown(parsed.diagnosis || '');
  parsed.advice = cleanMarkdown(parsed.advice || '');
  parsed.care_instructions = cleanMarkdown(parsed.care_instructions || '');
  const meds = Array.isArray(parsed.suggested_medicines) ? parsed.suggested_medicines : [];
  parsed.suggested_medicines = meds.map(m => ({
    ...m,
    name: cleanMarkdown(m.name),
    dosage: cleanMarkdown(m.dosage),
    type: cleanMarkdown(m.type),
    frequency: cleanMarkdown(m.frequency),
    duration: cleanMarkdown(m.duration),
    timing: cleanMarkdown(m.timing),
  }));

  return parsed;
}
