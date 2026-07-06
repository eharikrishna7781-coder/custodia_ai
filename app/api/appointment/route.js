import { bookingAgent, getSession, getAllSessionIds } from '@/lib/agents';

export async function POST(request) {
  try {
    const body = await request.json();
    const sessionId = body.sessionId || body.id || (body.session && body.session.id) || request.headers.get('x-session-id');
    const clinicId = body.clinicId || body.clinic || body.clinicId;

    // Helpful debug if session missing
    const existing = getSession(sessionId);
    if (!existing) {
      // Return current session ids to help debug whether the session exists in this process.
      const current = getAllSessionIds();
      return new Response(JSON.stringify({ error: 'Session not found', sessionIdReceived: sessionId || null, currentSessions: current }), { status: 404 });
    }

    const res = bookingAgent(sessionId, clinicId);
    return new Response(JSON.stringify(res), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
}
