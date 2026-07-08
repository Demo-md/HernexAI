# HerNexAI Website

Client-ready Astro website with 8 service pages, blog publishing, password-protected admin, Groq chatbot, and WhatsApp contact.

## Run locally

```bash
nvm use
npm install
npm run dev
```

Open `http://127.0.0.1:2600`. Astro watches files and refreshes changes automatically; do not restart after edits.

## Environment

Copy `.env.example` to `.env.local` and set the Groq key, admin password, and a long random session secret. The chatbot falls back to local company answers if Groq is unavailable.

## Deploy

```bash
npm run build
node dist/server/entry.mjs
```

Deploy as a persistent Node service and set the same environment variables. Blog posts are stored in `data/blogs.json`, so the host must provide a persistent writable disk. Move blog storage to a database only when deploying to stateless/serverless infrastructure.

Runtime: Node.js 22.12 or newer.

## Customize

- Company copy, services, FAQ, email, phone, and WhatsApp: `src/data/site.ts`
- Brand colors and glass/motion styles: `src/styles/global.css`
- Scroll timing, color sequences, parallax, and story activation: `src/scripts/motion.ts`
- Hero system objects and labels: `src/components/FloatingMarketingObjects.astro` and `src/components/hero/HerNexGrowthSystem.astro`
- Chatbot prompts, quick actions, and tooltip rotation: `src/components/HerNexChatbot.astro`

## Chatbot Lead & Support Setup

The chatbot uses Groq plus local approved knowledge. It classifies intent, asks progressive lead/support questions, scores leads, and writes records through a Google Sheets webhook.

1. Create a blank Google Sheet.
2. Open **Extensions → Apps Script** and paste `docs/google-sheets-webhook.gs`.
3. Run `setupSheets()` once to create **Leads**, **Support Tickets**, and **Conversations** tabs.
4. Deploy the script as a Web App with access set to **Anyone**.
5. Add the deployment URL to `.env.local` as `GOOGLE_SHEETS_WEBHOOK_URL=...`.
6. Restart the dev server or redeploy.

Without the webhook, the chatbot remains functional and logs records server-side only.
