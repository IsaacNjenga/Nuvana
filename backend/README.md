# Nuvana Glitter API

Independent Express 5 + Mongoose service. See [the project README](../README.md) for two-service setup and frontend integration.

```powershell
npm ci
Copy-Item .env.example .env
# Configure URI in .env.
npm run seed
npm run dev
```

Endpoints: `GET /api/products`, `GET /api/products/:slug`, `GET /health`. Products are read from MongoDB. `DEMO_MODE=true` explicitly serves backend sample data for local previews without MongoDB. Redis and JWT authentication are not required by the public catalogue.

`npm run build` compiles the application entrypoints and their dependencies; legacy unused authentication scaffold files are not part of this catalogue service. `npm start` runs the compiled server. `npm test` builds and checks API responses, invalid slugs, schema validation and sample data.

Seeding inserts missing slugs without replacing existing inventory. `URI` and `MONGODB_DATABASE` are backend-only settings. Production should use `DEMO_MODE=false` and a database user with read access; run seeding separately with appropriate write permissions.
