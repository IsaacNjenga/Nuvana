# Nuvana Glitter frontend

See [the project README](../README.md) for setup, MongoDB seeding, key decisions, SEO and verification details.

```powershell
npm ci
Copy-Item .env.example .env
# Configure MongoDB in .env, then:
npm run seed
npm run dev
```

For a sample preview, leave NUXT_MONGODB_URI empty and set NUXT_DEMO_MODE=true in .env.

Checks: npm run check, npm test, npm run build. Start the app before running npm run test:smoke.
