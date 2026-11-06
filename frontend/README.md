# Nuvana Glitter frontend

See [the project README](../README.md) for full two-service setup, architecture, SEO and checks.

```powershell
npm ci
Copy-Item .env.example .env
# Set NUXT_BACKEND_URL to the running backend origin.
npm run dev
```

Start the independent backend first. Product data and MongoDB seeding live in `backend/`; this app only renders responses from that API. A sample preview is available through DEMO_MODE=true in backend/.env.

Checks: npm run check, npm test, npm run build. Start both services before npm run test:smoke.
