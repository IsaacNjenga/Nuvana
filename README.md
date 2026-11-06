# Nuvana Glitter

A lightweight jewellery store with two independently runnable applications:

- `frontend/`: Nuxt 4 SSR, Vue 3 and inline Tailwind CSS 4 utilities. Product listing, product details, persistent cart and mock checkout.
- `backend/`: Express 5, Mongoose, MongoDB product model, read-only product API and database seed command. All sample product records live here.

## Requirements

Use Node 22.22.3+, 24.15+ or 26+ (required by the installed Nuxt version), npm, and local MongoDB or MongoDB Atlas. Use a real MongoDB connection for normal operation. No Redis or authentication service is required.

## Run the backend

In one terminal:

```powershell
cd backend
npm ci
Copy-Item .env.example .env
```

Configure `backend/.env`:

```dotenv
URI=mongodb://127.0.0.1:27017
MONGODB_DATABASE=nuvana
PORT=3001
FRONTEND_URL=http://localhost:3000
DEMO_MODE=false
```

For Atlas, use your connection string, database user and allowed server IP. Keep credentials out of source control.

```powershell
npm run seed
npm run dev
```

Seeding creates the unique slug index and inserts eight sample products without overwriting existing inventory. Sample descriptions, materials, prices and photos are illustrative; replace them before launch.

The API listens on http://localhost:3001:

- `GET /api/products`: up to 200 products sorted by name.
- `GET /api/products/:slug`: one product; unknown/invalid slugs return 404.
- `GET /health`: service identity and catalogue mode.

## Run the frontend

In a second terminal:

```powershell
cd frontend
npm ci
Copy-Item .env.example .env
npm run dev
```

Frontend configuration:

```dotenv
NUXT_BACKEND_URL=http://localhost:3001
NUXT_PUBLIC_SITE_URL=http://localhost:3000
```

Open http://localhost:3000. `NUXT_BACKEND_URL` is the backend origin reachable by the Nuxt server, not necessarily by the visitor's browser. It stays private. The frontend has no database URI, MongoDB dependency, seed command or bundled sample catalogue.

### Preview without MongoDB

Set `DEMO_MODE=true` in **backend/.env** and run both services. The backend explicitly serves its sample catalogue; the frontend still obtains every product over HTTP from the independent backend. Set `DEMO_MODE=false` for MongoDB. A configured but unavailable MongoDB connection prevents backend startup rather than silently serving samples. The frontend displays a retry state when the backend is unavailable.

## Architecture and decisions

```text
Browser -> Nuxt frontend :3000 -> Express backend :3001 -> MongoDB
            SSR + SEO            product API             products
```

Nuxt's `/api/products` and `/api/products/:slug` are thin same-origin adapters to the backend. They contain no product storage or database logic. This keeps SSR and browser navigation on the same path, avoids client CORS configuration and permits a private backend deployment. Requests have an 8-second timeout, preserve backend 404s and turn upstream failures into a safe 503. The sitemap reads the same backend API, so it tracks the actual catalogue.

The backend owns Mongoose validation, indexed unique slugs, MongoDB connection pooling and seeding. List queries are capped at 200 and return only public product fields. Detail queries look up the slug directly. The frontend keeps a TypeScript representation of the JSON response contract; it imports no backend code. Deploy/install either folder independently.

The backend originally contained unfinished authentication/Redis scaffolding. The catalogue entrypoints do not import it; TypeScript builds only the server and seed entrypoints plus their dependencies. Existing unused scaffold files remain available for future work.

## Frontend behaviour

- `/`: category filters, search, sorting and quick add.
- `/products/solstice-gold-hoops` and other descriptive slugs: details, quantity, availability, care instructions and add to bag.
- `/cart`: quantities, removal, totals and mock checkout confirmation.

Nuxt state and localStorage persist the cart, restored after hydration. Quantity is capped by stock and at 20 per item. Storage failures leave an in-memory bag. Mock checkout validates name/email locally, clears the bag and shows confirmation. No payment is collected, no email is sent, no order is saved or shipped, and checkout identity stays in the tab. Real checkout would need backend price/stock validation.

## SEO, performance and accessibility

Server-rendered unique titles/descriptions, canonical URLs, Open Graph/Twitter cards and Product JSON-LD use live backend product data. Product schema includes name, image, SKU, brand, KES price and availability; no fabricated ratings. JSON-LD escapes `<`. Cart/error pages are noindex. `/sitemap.xml` includes collection/product URLs and excludes transactional pages; `/robots.txt` points to it. Configure the production HTTPS frontend origin in `NUXT_PUBLIC_SITE_URL`.

Unsplash CDN images request automatic formats, bounded widths and quality 80. Responsive srcsets/sizes, reserved dimensions, lazy loading and high-priority hero/detail images reduce transfer and layout shift. Sample images may not depict the exact product. Replace them with real inventory photography; update the image helper and stored identifiers together.

System fonts, inline SVG icons, compiled Tailwind utilities and no UI/animation library keep the frontend small. Components contain inline Tailwind classes; the global CSS only defines fonts, focus and reduced-motion behaviour. Responsive grids, stacked mobile checkout, labelled controls, skip link, focus indicators, status feedback and empty/error states support accessible use.

Small-catalogue filters run locally after one SSR API fetch. Larger inventory should move filtering/pagination to indexed backend queries. Prices use integer Kenyan shillings and Intl.NumberFormat.

## Checks and deployment

```powershell
cd backend
npm test
npm run build
npm start
```

```powershell
cd frontend
npm run check
npm test
npm run build
# Run both services, then:
npm run test:smoke
```

`TEST_BASE_URL` and `TEST_BACKEND_URL` can target other frontend/backend origins for smoke checks. Backend tests cover its standalone HTTP API, missing/invalid slugs and product schema. Frontend tests cover cart calculations/storage; smoke checks compare the frontend catalogue with the independent backend and check SSR metadata, seeded product schemas, sitemap, robots, images and 404s.

Deploy backend with `npm run build` and `npm start`, supplying its environment variables. Deploy frontend with `npm run build` and `node .output/server/index.mjs`, supplying `NUXT_BACKEND_URL` and `NUXT_PUBLIC_SITE_URL` at runtime. Nuxt production does not automatically read `.env`. A static-only frontend host cannot provide SSR/adapters. Use HTTPS at the public edge and keep the backend origin private where possible.

Both application builds, frontend type checking, three backend tests, three cart tests, and the two-service HTTP/SEO smoke checks passed. A backend-outage check also confirmed that the frontend returns 503 for catalogue/sitemap requests, displays a retry state, and does not fall back to bundled products. Live MongoDB connection/seeding and visual browser review were not verified in this environment. Integration checks use explicit backend demo mode. Use a supported Node version even if builds run on an older local runtime. Review existing npm audit findings before production rather than applying unreviewed breaking upgrades.

Implementation references: [Tailwind Vite integration](https://tailwindcss.com/docs/installation/using-vite) and [Nuxt SEO](https://nuxt.com/docs/api/composables/use-seo-meta).
