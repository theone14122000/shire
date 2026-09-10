# Deployment Guide — The Himalayan Shire

## How the website works

Code changes go to GitHub → Vercel builds and deploys automatically → the live website updates.

```
Code changes
     ↓
Git (commit + push)
     ↓
GitHub (repository)
     ↓
Vercel (builds & deploys)
     ↓
Live website: https://www.thehimalayanshire.com/
```

## Prerequisites

- A GitHub account
- A Vercel account (connected to the GitHub repository)
- Node.js 20+ installed locally
- MySQL database (Railway provides this)

## Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/the-himalayan-shire.git
cd the-himalayan-shire
```

## Install dependencies

```bash
npm install
```

## Configure environment variables

Create a `.env.local` file in the project root. **Never commit this file** — it is in `.gitignore`.

Required variables (example values shown; use real values from your provider):

```env
# Database (Railway)
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"

# Email delivery (choose one: SMTP or Resend)
SMTP_USER="your-smtp-user"
SMTP_PASSWORD="your-smtp-password"
# OR
RESEND_API_KEY="re_xxxxxx"
INQUIRY_FROM_EMAIL="The Himalayan Shire <onboarding@resend.dev>"

# ElfSight widget IDs (from dashboard)
ELFSIGHT_GOOGLE_REVIEWS_ID="b9e7c232-8950-4e65-9497-1821a28950e6"
ELFSIGHT_INSTAGRAM_ID="9ef91159-a379-4f0d-a025-404b95790fae"

# Analytics (optional)
NEXT_PUBLIC_GTM_ID="GTM-XXXXXXX"
NEXT_PUBLIC_GA4_ID="G-XXXXXXX"
```

**Never put real credentials in GitHub.** Use GitHub Secrets for the Vercel deployment.

## Run locally

```bash
npm run dev
```

The site runs at `http://localhost:3000`.

## Push changes

```bash
git add .
git commit -m "Describe your changes"
git push origin main
```

Vercel detects the push, builds, and deploys automatically.

## Vercel deployment

1. Go to [vercel.com](https://vercel.com) and import the GitHub repository.
2. Select the correct project (framework: Next.js).
3. Add all environment variables in the Vercel dashboard (**Settings → Environment Variables**).
4. Deploy. Vercel provides a preview URL for every push and updates the production URL automatically.

Automatic deployments happen on every push to `main`. Preview deployments happen on pull requests.

## Important files

| File | Purpose |
|------|---------|
| `.env.local` | Local environment variables (gitignored) |
| `prisma/schema.prisma` | Database schema |
| `app/layout.tsx` | Root layout — metadata + JSON-LD |
| `app/metadata.ts` | Per-page metadata helpers |
| `lib/content.ts` | Site content (brand, NAP, socials) |
| `app/sitemap.ts` | Sitemap generation |
| `app/robots.ts` | robots.txt generation |
