# Deploying Custodia AI to Vercel

The Next.js app in this folder (`/app/frontend/`) is **self-contained** — the AI triage runs directly inside Next.js API routes using the Gemini SDK. No separate Python backend needed on Vercel.

## Prerequisites
- A GitHub account
- A Vercel account (free tier is fine): https://vercel.com
- Your Google Gemini API key (already used locally as `GEMINI_API_KEY`)

## Steps

### 1. Push your code to GitHub
In the Emergent chat input, click **"Save to GitHub"** and pick/create a repo. All files under `/app/frontend/` will be pushed.

### 2. Import the repo into Vercel
1. Go to https://vercel.com/new
2. Click **"Import Git Repository"** and select your repo
3. When Vercel asks for the **Root Directory**, set it to `frontend` (since the Next.js app lives inside `/app/frontend/`, and after "Save to GitHub" your repo top level maps to `/app/`).
4. **Framework preset**: Vercel auto-detects **Next.js** — leave defaults.
5. **Build & Output settings**: leave defaults (`next build`).

### 3. Add environment variables
On the Vercel import screen, expand **"Environment Variables"** and add:

| Name | Value |
|---|---|
| `GEMINI_API_KEY` | your Google Gemini key (starts with `AIza...` or the key you already have) |

### 4. Deploy
Click **Deploy**. First build takes ~2 minutes. You'll get a live URL like `https://custodia-ai-xxx.vercel.app`.

### 5. Verify
- Open the URL, allow location (or it will default to Hyderabad)
- Type a symptom, hit send
- You should see an AI-generated diagnosis + disease-specific medicines
- Clinic list should show 5 Hyderabad clinics

## Troubleshooting
- **Build fails**: check that `frontend/package.json` and `frontend/next.config.js` are at the root you selected.
- **AI returns generic fallback**: environment variable `GEMINI_API_KEY` not set in Vercel dashboard. Re-add it under Project → Settings → Environment Variables → **Production**, then redeploy.
- **Map is blank**: browser blocked location. Allow location or open on HTTPS (Vercel is HTTPS by default).

## Notes about the Emergent preview vs. Vercel
- **Emergent preview** uses a FastAPI backend at `/app/backend/` that proxies most `/api/*` requests to Next.js. This is a preview-only convenience for the platform's ingress rules.
- **Vercel** does not need `/app/backend/` at all — Next.js handles all API routes natively. Only the `/app/frontend/` folder is required for a Vercel deploy.
