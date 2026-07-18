import { followupAgent } from '@/lib/agents';

/**
 * Stateless report generation. Client sends complete context.
 * Body: { sessionId, symptoms, triage, clinic, transport, appointment, lang }
 */
export async function POST(request, { params }) {
  try {
    const body = await request.json();
    const {
      sessionId, symptoms, triage, clinic, transport, appointment, lang,
    } = body;

    const followup = followupAgent(sessionId, lang || 'en');

    const report = {
      patient_id: sessionId || 'N/A',
      symptoms: symptoms || 'Not recorded',
      triage_score: triage?.score || 0,
      advice: triage?.advice || 'N/A',
      diagnosis: triage?.diagnosis || 'N/A',
      suggested_medicines: triage?.suggestedMedicines || [],
      care_instructions: triage?.careInstructions || 'None provided',
      clinic_visited: clinic?.name || 'None',
      clinic_address: clinic?.address || null,
      clinic_phone: clinic?.phone || null,
      appointment_time: appointment?.time || null,
      transport_used: transport?.label || 'Own',
      transport_driver: transport?.driver || null,
      transport_phone: transport?.phone || null,
      followup_instructions: followup.instructions,
      followup_checkins: followup.checkin_schedule,
      generated_at: new Date().toISOString(),
    };

    return Response.json(report);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
