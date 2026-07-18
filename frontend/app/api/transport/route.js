import { transportAgent } from '@/lib/agents';

export async function POST(request) {
  try {
    const { choice, lang } = await request.json();
    const transport = transportAgent(choice, lang || 'en');
    return Response.json(transport);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
