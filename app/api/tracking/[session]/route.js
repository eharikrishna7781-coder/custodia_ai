import { trackingAgent } from '@/lib/agents';

export async function GET(request, { params }) {
  try {
    const data = trackingAgent(params.session);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  }
}
