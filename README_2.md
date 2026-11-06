# Nuvana Glitter

A small, server-rendered jewellery store built with Nuxt 4, Vue 3, Tailwind CSS 4 and MongoDB. The application lives in `frontend/`; the existing `backend/` scaffold is not needed or changed. Nuxt's server routes keep database credentials off the client and avoid running a second API process.

## Run locally

Use Node **22.22.3+, 24.15+ or 26+** (the versions supported by the installed Nuxt release), npm and a local MongoDB instance or MongoDB Atlas database.

```powershell
cd frontend
npm ci
Copy-Item .env.example .env
```

Edit `frontend/.env`:

```dotenv
NUXT_MONGODB_URI=mongodb://127.0.0.1:27017
NUXT_MONGODB_DATABASE=nuvana
NUXT_PUBLIC_SITE_URL=http://localhost:3000
NUXT_DEMO_MODE=false
```

```powershell
npm run seed
npm run dev
```

Open the url Seeding creates a unique slug index and inserts eight sample products without overwriting existing records. Seed descriptions, materials, prices and photography are illustrative; replace them with your actual inventory before launch.

### Preview without MongoDB

Leave `NUXT_MONGODB_URI` empty and set `NUXT_DEMO_MODE=true` in `.env`. Restart the app. This explicitly uses the sample catalogue; it does not claim to be database backed. A configured but unavailable database returns an error instead of silently replacing your products with samples.

## Commands

```powershell
npm run check    # Vue / TypeScript checking
npm run build    # Production Node server
npm run preview  # Preview the production build
npm run seed     # Insert missing sample products into MongoDB
npm test         # Cart state regression tests
npm run test:smoke # HTTP/SSR checks; start the app first
```

For deployment, build and run `node .output/server/index.mjs`. Supply the same environment variables to the running process; Nuxt's production server does not automatically read `.env`. Set `NUXT_PUBLIC_SITE_URL` to your real HTTPS origin, without a trailing slash. Keep demo mode disabled for a real catalogue. A Node hosting environment is required; a static-only host cannot serve the MongoDB routes.

## Pages and behaviour

- `/`: collection, category filtering, search, sorting and quick add.
- `/products/solstice-gold-hoops` and other descriptive slugs: product information, quantity picker, availability, care instructions and add to bag.
- `/cart`: persistent browser bag, quantity changes, removal and a mock checkout with a confirmation screen.
- `/api/products`, `/api/products/:slug`: read-only MongoDB product endpoints.
- `/sitemap.xml`, `/robots.txt`: generated using the configured public origin and current catalogue.

The cart uses Nuxt state and localStorage, restored after hydration to avoid server/client mismatches. Quantity is capped by stock and at 20 units per product. Storage errors leave a usable in-memory bag. Mock checkout validates name/email in the browser, clears the bag and displays confirmation. It collects no payment, sends no email, writes no order and stores no checkout identity. Cart prices are display-only; a real checkout must revalidate prices and stock on the server.

## Key decisions

- **One application:** Nuxt SSR provides crawlable HTML, product pages and MongoDB access with a shared product type. One reused database connection pool, no authentication, Redis, UI kit or separate Express service.
- **Inline Tailwind utilities:** component styling lives in template classes. The small CSS entry only imports Tailwind, sets system font stacks, focus styles and reduced motion. No downloaded fonts, icon package or animation library.
- **Responsive, accessible UI:** mobile two-column collection, desktop four-column collection, stacked mobile checkout, labelled controls, keyboard focus, skip link, live add-to-bag feedback, empty/error states and a custom 404.
- **SEO:** unique server-rendered titles/descriptions, canonical URLs, Open Graph and Twitter cards per page. Product JSON-LD includes name, image, SKU, brand, price, KES currency and availability from the catalogue. JSON-LD escapes `<` to prevent script injection. No invented ratings. Cart/error pages are noindex. Sitemap includes the collection and product URLs; it excludes transactional pages and fails if the catalogue cannot be read.
- **Images:** Unsplash CDN image URLs request automatic format negotiation, quality 80 and bounded widths. `srcset`/`sizes` select appropriate sizes. Explicit dimensions/aspect ratios reserve layout space; the hero/detail image gets high fetch priority, and later products lazy-load. Images load directly from the CDN without a runtime image processing dependency. Sample images may not precisely depict the sample product; replace these before launch. For owned photography, update the image helper and stored image identifiers together.
- **Scope:** a small catalogue (up to 200 items), filtered locally after one SSR fetch. A larger catalogue should use indexed server filtering/pagination. Prices are integer Kenyan shillings, displayed with `Intl.NumberFormat`.

MongoDB `products` documents follow `frontend/shared/products.ts`: a unique URL-safe `slug`, `name`, `category`, numeric `price`, Unsplash `image` ID, `alt`, `description`, `material`, integer `stock` and optional `badge`. The application only reads products; use the seed command or a trusted database management workflow to maintain inventory.

## Verification

Production build, Vue/TypeScript checks and three cart regression tests passed. HTTP smoke checks passed against the production server in explicit demo mode: eight server-rendered product pages, Product JSON-LD prices/currency, collection metadata, canonical/Open Graph tags, responsive image attributes, cart noindex, sitemap, robots and unknown-product 404s. Run `npm run test:smoke` against a running seeded MongoDB instance to repeat these checks with real database reads. Set `TEST_BASE_URL` to test another origin.

No MongoDB instance was configured during implementation, so live connection/seeding was not verified. Browser automation was unavailable, so a visual browser review remains outstanding. The local machine has Node 24.13: build/checks passed, but use a supported Node version listed above for reproducible setup. The production server's compiled CSS is approximately 5.2 kB gzipped; system fonts and direct CDN images avoid additional font and image-processing packages.

## Implementation references

Uses the official [Tailwind Vite integration](https://tailwindcss.com/docs/installation/using-vite) and [Nuxt SEO composable](https://nuxt.com/docs/api/composables/use-seo-meta). Commit the lockfile for reproducible installation. The existing Nuxt dependency tree reports npm audit findings; review them before deployment instead of applying unreviewed breaking upgrades.
