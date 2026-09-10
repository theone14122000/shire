# Database Guide — The Himalayan Shire

## Overview

The website uses **Prisma ORM** with a **MySQL** database hosted on **Railway**.

- `prisma/schema.prisma` defines the data model
- Migrations version-control schema changes
- `npx prisma migrate dev` — local development
- `npx prisma migrate deploy` — production (Railway)

## Setup

1. Install Prisma CLI: `npm install -D prisma` (already in devDependencies)
2. Set `DATABASE_URL` in `.env.local` to the Railway MySQL connection string.
3. Run `npx prisma migrate dev --name init` to create the initial migration and push the schema to the database.
4. Run `npx prisma generate` to generate the Prisma client (`lib/prisma.ts` uses it).

## Prisma schema model (summary)

- `User` — id, name, email, password, role (MASTER_ADMIN / ADMIN / EDITOR / USER), avatar, bio, active, timestamps
- `Blog` — slug, title, author, content, image, status (DRAFT / PUBLISHED), seo fields, dates, tags
- `GalleryItem` — title, caption, category, src, alt, order, status
- `Media` — file metadata
- `PageContent` — key/value settings (site_name, site_logo, site_favicon, etc.)
- `Setting` — key/value settings (google_tag_manager_id, google_analytics_id, etc.)
- `ContactMessage` — name, email, subject, message
- `Inquiry` — inquiry form data

## Development workflow

```bash
# Modify the schema
npx prisma migrate dev --name describe_change

# Test locally
npm run dev

# Commit schema + migration
git add prisma/schema.prisma prisma/migrations/
git commit -m "Update database schema"
git push origin main
```

`npx prisma migrate dev`:
- Creates a new migration file
- Applies it to the **local** development database
- Updates `prisma/schema.prisma`
- Safe to run repeatedly during development

## Production workflow

```bash
# After pushing to GitHub (which triggers Vercel deploy)
# Railway applies migrations automatically via the Railway hook, OR run manually:

npx prisma migrate deploy
```

`npx prisma migrate deploy`:
- Applies **only new** migrations to the **production** database
- Does NOT create or modify the schema file
- Does NOT delete data
- Safe — only applies pending migrations

## ⚠️ Safety rules

- **Never run** `npx prisma migrate reset` on production — it deletes and recreates the database.
- **Never** delete production data manually.
- **Never** replace the production database with a local dump.
- Always create a migration before changing the schema.
- Verify `npx prisma migrate status` before deploying to see pending migrations.

## Railway specifics

Railway auto-applies migrations from the `DATABASE_URL` when the deploy hook fires. If a migration fails, check the Railway logs and fix the migration before retrying.

## Prisma client usage

The server uses `import { prisma } from "@/lib/prisma"` in API routes and server components. The client is generated automatically after `npx prisma generate`.
