# Custodia AI

Custodia AI is a prototype multi-agent rural healthcare access system. It demonstrates a voice-first assistant with triage, locator, booking, transport, navigation, vision, and reporting agents.

Setup

1. Install dependencies:

```bash
npm install
```

2. Add your Gemini API key to `.env.local`:

```
GEMINI_API_KEY=your_api_key_here
```

3. Run the dev server:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

Notes

- This project uses mock agents and stubbed image analysis for local development. Replace the `lib/visualAnalysis.js` and `lib/agents.js` integrations with real API calls for production.
- `sessions` are stored in memory; restarting the server will clear sessions.

Deployment

- Push to GitHub and deploy to Vercel. Set the `GEMINI_API_KEY` environment variable in Vercel.
