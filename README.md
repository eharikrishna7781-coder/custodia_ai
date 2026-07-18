# 🩺 Custodia AI

> **AI-powered rural & urban healthcare access — from symptom to recovery in one voice-first agent.**

Custodia AI is a multilingual, AI-driven medical triage assistant that helps patients in Hyderabad and surrounding Telangana understand their symptoms, get disease-specific medicine suggestions, discover the nearest clinic, book an appointment, arrange transport, and track the ride — all inside a single, mobile-friendly progressive web app.

---

## 1. 📌 Problem Statement

In rural and semi-urban India, patients frequently:
- Delay seeking medical care because they don't know how serious their symptoms are.
- Take the wrong over-the-counter medicine (e.g., Paracetamol for an asthma attack) due to lack of guidance.
- Don't know which nearby clinic has the specialist or stock they need.
- Struggle to arrange emergency transport within the golden hour.
- Face language barriers with existing English-only health apps.

The result: preventable deaths, misuse of antibiotics, and overloaded emergency rooms with cases that could have been triaged sooner.

---

## 2. 💡 Solution

Custodia AI is a **voice-first, multi-agent healthcare companion** that:

1. **Understands symptoms** in six Indian languages (English, Hindi, Tamil, Telugu, Kannada, Malayalam) via text or voice.
2. **Runs a real AI triage** using Google Gemini 2.5 Flash — every diagnosis is patient-specific, not a static template.
3. **Suggests disease-appropriate medicines** — Salbutamol inhaler for asthma, ORS+Zinc for diarrhoea, antihistamines for allergy, PPIs for acidity, and empty list for life-threatening emergencies (advises 108/112 instead).
4. **Locates the 5 nearest Hyderabad-area clinics** with distance, ETA, stock and specialist availability.
5. **Books an appointment, dispatches ambulance or volunteer transport, and tracks the vehicle** in real time on an interactive Leaflet map.
6. **Generates a printable medical report** for the patient's records.

Everything runs stateless-first, so the app scales cleanly on serverless platforms like Vercel.

---

## 3. ✨ Features

- 🤖 **Real AI triage** powered by Gemini 2.5 Flash (no rule-based fallbacks unless the API fails).
- 💊 **Disease-specific medicine suggestions** with dosage, frequency, duration, and OTC / prescription flag.
- 🗺️ **Interactive Leaflet map** with clinic markers, live ambulance tracking, and route display.
- 🌐 **Six-language support** with browser-native voice input and text-to-speech.
- 🚑 **Emergency SOS** with one-tap access to 108, 112, and other Indian helplines.
- 🖼️ **Vision AI** for analyzing photos of rashes, wounds, and bites (Gemini vision).

- 🌙 **Dark mode** with system-preference detection.
- ⏰ **Medicine reminders** with browser notifications and check-off tracking.
- 📊 **Symptom history** persisted in local storage.
- 📄 **One-click medical report** with follow-up schedule.

---

## 4. 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | Next.js 14 (App Router), React 18 |
| Styling | Tailwind CSS, custom theme tokens |
| Icons | lucide-react |
| Maps | Leaflet + react-leaflet + Leaflet Routing Machine |
| AI Model | Google Gemini 2.5 Flash (`@google/generative-ai`) |
| State | React hooks + localStorage (stateless server) |
| Backend (optional) | FastAPI (used in Emergent preview only, not needed on Vercel) |
| Voice | Web Speech API (SpeechRecognition + SpeechSynthesis) |
| PWA | Service Worker + Web App Manifest |
| Deployment | Vercel (recommended) or Emergent |

---

## 5. 📦 Installation

### Prerequisites
- Node.js **18+**
- A **Gemini API key** — free from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/<your-username>/custodia-ai.git
cd custodia-ai/frontend

# 2. Install dependencies
yarn install     # or: npm install

# 3. Add your Gemini API key
echo "GEMINI_API_KEY=your_gemini_key_here" > .env.local

# 4. Run the dev server
yarn dev         # http://localhost:3000
```

---

## 6. ▶️ Usage

1. Open the app at `http://localhost:3000` (or the deployed Vercel URL).
2. Allow location access (or Hyderabad loads by default).
3. In the chat, type or **speak** your symptoms in any supported language.
   *Examples: "I have a high fever and body pain", "मुझे सिर दर्द और चक्कर आ रहा है", "నాకు జ్వరం ఉంది"*
4. Read the AI-generated **diagnosis, urgency score, suggested medicines, and care instructions**.
5. If a doctor visit is recommended, **pick one of the 5 nearest Hyderabad clinics**.
6. Choose transport: **Ambulance, Volunteer Driver, or "I will go myself"**.
7. Watch your ride on the live map. When done, generate a **medical report**.

---

## 7. 🗂️ Project Structure

```
custodia-ai/
├── frontend/                        # Next.js app (deployed to Vercel)
│   ├── app/
│   │   ├── api/                     # Stateless API routes
│   │   │   ├── init/                # AI triage + nearest clinics
│   │   │   ├── appointment/         # Book appointment (stateless)
│   │   │   ├── transport/           # Dispatch ambulance / volunteer
│   │   │   ├── tracking/[session]/  # Vehicle tracking
│   │   │   ├── report/[session]/    # Medical report
│   │   │   ├── analyze-image/       # Vision AI
│   │   │   └── debug/
│   │   ├── layout.js
│   │   ├── page.js                  # Main chat UI
│   │   └── globals.css
│   ├── components/
│   │   ├── MapComponent.js          # Leaflet map + routing
│   │   └── StepProgress.js          # 6-step care plan indicator
│   ├── lib/
│   │   ├── aiTriage.js              # Gemini 2.5 Flash triage logic
│   │   ├── agents.js                # Clinic locator, transport, report
│   │   ├── translations.js          # 6-language strings
│   │   ├── visualAnalysis.js        # Vision AI wrapper
│   │   └── useServiceWorker.js
│   ├── public/                      # PWA icons, manifest, sw.js
│   ├── styles/themes.css
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── vercel.json
├── backend/                         # (Optional) FastAPI — used only for Emergent preview
└── README.md
```

---

## 8. 🖼️ Screenshots / Demo

| Landing / chat entry | AI triage response |
|---|---|
| ![Home](docs/screenshots/home.png) | ![Triage](docs/screenshots/triage.png) |

| Clinic selection | Live tracking & report |
|---|---|
| ![Clinics](docs/screenshots/clinics.png) | ![Report](docs/screenshots/report.png) |

> 🎥 **Live demo:** _Add your Vercel URL here after deployment, e.g._ `https://custodia-ai.vercel.app`

---

## 9. 🚀 Deployment (Vercel)

The app is **fully Vercel-ready** — all API routes are stateless serverless functions.

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Set the **Root Directory** to `frontend`.
4. Add environment variable: **`GEMINI_API_KEY`** = your key from Google AI Studio.
5. Click **Deploy** → you'll get a public HTTPS URL in ~2 minutes.

See `frontend/VERCEL_DEPLOY.md` for the detailed walk-through.

---

## 10. 🔮 Future Scope

- 🔒 **Doctor tele-consult** — video call with an on-call physician after triage.
- 💬 **WhatsApp handoff** — share the diagnosis + suggested clinic with a family member in one tap.
- 💾 **MongoDB Atlas** — persist patient history across devices and sessions.
- ⚡ **Streaming triage** — SSE-based token-by-token response for snappier UX.
- 📲 **SMS / IVR fallback** — reach patients without a smartphone via Twilio.
- 🧬 **Chronic condition tracking** — diabetes, hypertension, TB DOTS reminders.
- 🌍 **Geo-expansion** — extend the clinic database beyond Hyderabad to Bengaluru, Chennai, and Tier-2 cities.
- 🏥 **Real clinic integrations** — sync with actual hospital appointment APIs (ABDM / Ayushman Bharat).

---

---

### 🙏 Acknowledgements
- Google Gemini for the AI model.
- OpenStreetMap contributors for map tiles.
- The rural healthcare community whose feedback shaped the triage flow.

---

**💚 Built for patients who deserve better access to healthcare.**
