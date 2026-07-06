import { transportAgent } from '@/lib/agents';

export async function POST(request) {
  try {
    const body = await request.json();
    const { sessionId, choice } = body;
    const res = transportAgent(sessionId, choice);
    return new Response(JSON.stringify(res), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
}
