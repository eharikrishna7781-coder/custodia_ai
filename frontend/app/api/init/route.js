import { triageAgent, locatorAgent } from '@/lib/agents';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
  try {
    const { symptoms, lat, lng, lang } = await request.json();
    const sessionId = uuidv4();
    const triage = await triageAgent(symptoms, lang);
    const response = { sessionId, triage, suggestDoctor: triage.needsDoctor, message: triage.needsDoctorMsg };
    if (triage.needsDoctor) {
      response.clinics = locatorAgent(lat, lng);
    }
    return Response.json(response);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
