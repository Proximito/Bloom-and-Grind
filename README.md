# Bloom & Grind

An online store for specialty coffee and brewing gear, built from scratch for the E-Commerce course (2026–2027).

**Team (group CEN4.H A):** Avram Eliana · Ferraglio Danut

| Member | Owns |
| --- | --- |
| Avram Eliana | A1 Catalog, A2 Search, A3 Cart, A8 Order history, A9 Admin panel, A11 Responsive · B1, B3 |
| Ferraglio Danut | A4 Accounts, A5 Checkout, A6 Payment, A7 Stock, A10 Security, A12 Tests · B2, B6 |

## Stack

Next.js 15 (TypeScript, React, Tailwind CSS) with its own API route handlers · PostgreSQL 16 with the Prisma ORM · NextAuth (Auth.js) credentials login with bcrypt · Zod validation · Vitest · Docker Compose. Stripe (test mode) and Mailtrap are added from week 9.

## Run it with Docker (recommended)

You need Docker Desktop running.

```bash
git clone https://github.com/Proximito/Bloom-and-Grind.git
cd Bloom-and-Grind
cp .env.example .env
docker compose up --build
```

Open http://localhost:3000. On every start the app applies the database migrations and loads the seed data (35 products in 5 categories, 2 delivery methods and the test accounts). The first build takes a few minutes.

Before a real deployment, replace `NEXTAUTH_SECRET` in `.env` with a long random value (`openssl rand -base64 32`).

## Run it without Docker (for development)

You need Node.js 22 and a PostgreSQL 16 database matching `DATABASE_URL` in `.env`. The easiest way is to start only the database container:

```bash
cp .env.example .env
docker compose up -d db
npm install
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

## Test accounts

| Role | Email | Password |
| --- | --- | --- |
| Administrator | admin@bloomgrind.test | Admin123! |
| Customer | customer@bloomgrind.test | Customer123! |

These exist only in the local seed data.

## Tests

```bash
npm test
```

## What works now (P2 prototype)

| Code | Status |
| --- | --- |
| A1 Product catalog | Done: /products (24 per page), /category/[slug], /product/[slug] |
| A2 Basic search | Done: case-insensitive name search with a “no results” message |
| A4 User accounts | Partly: register, log in, log out, bcrypt hashes. Addresses: week 8 |
| A10 Basic security | Partly: Zod validation, Prisma only, /admin and /api/admin return 403 for non-admins, cross-origin writes blocked |
| A11 Responsive design | Catalog and product pages work at 360 px |
| A12 Automated tests | 10 starter tests; cart, totals and payment tests come with those features |
| A3, A5–A9 | Planned for weeks 8–10 (see the P2 specification) |

## API endpoints so far

| Method | Route | Access |
| --- | --- | --- |
| GET | /api/products?page&q&category | Public |
| GET | /api/products/[slug] | Public |
| GET | /api/categories | Public |
| POST | /api/auth/register | Public |
| GET, POST | /api/auth/[...nextauth] (login, logout, session) | Public |
| GET | /api/admin/products | Admin |

## Project structure

```
prisma/            schema.prisma, migrations, seed.ts, catalog-data.ts
public/products/   product images (generated SVG illustrations)
src/app/           pages and API route handlers
src/components/    shared UI (header, product card, pagination, forms)
src/lib/           database client, auth, validation, catalog queries
src/middleware.ts  admin access check and CSRF origin check
tests/             Vitest tests
```

## AI tools used

<!-- Keep this section accurate: the course requires declaring which AI tool was used and for what. -->
- **Claude (Anthropic):** helped draft the initial project setup, the database schema, the seed data, the catalog and login pages, and the presentation slides. Every part was reviewed by the team, and each member can explain the code they committed.
