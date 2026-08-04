# The Himalayan Shire — CMS-Enabled Website

A production-ready Next.js 16 website with a fully manageable CMS and secure admin panel.

## Features

- **Full CMS**: Homepage content, blogs, settings, media, users
- **Secure Admin Panel**: JWT authentication, role-based access (MASTER_ADMIN, ADMIN, EDITOR, USER)
- **Database**: MySQL via Prisma ORM
- **Blog System**: Rich text editor, categories, tags, SEO, draft/publish workflow
- **Media Manager**: Image upload with Cloudinary/local storage support
- **Settings**: Site config, SEO, social links, contact info
- **Modern Stack**: Next.js 16, React 19, Tailwind CSS 4, TypeScript, Framer Motion

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: MySQL (Prisma ORM)
- **Auth**: Custom JWT with jose, bcryptjs
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Validation**: Zod (planned)

## Getting Started

### Prerequisites

- Node.js 20+
- MySQL database (connection string in `.env`)
- npm or yarn

### Installation

```bash
# Clone and install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database URL and secrets

# Initialize database
npx prisma migrate dev --name init
npm run seed

# Start development server
npm run dev
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MySQL connection string | Yes |
| `ADMIN_PASSWORD` | Fallback admin password | Yes |
| `JWT_SECRET` | JWT signing secret (32+ chars) | Yes |
| `NEXTAUTH_SECRET` | NextAuth secret (32+ chars) | Yes |
| `NEXTAUTH_URL` | App URL (e.g., http://localhost:3000) | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | No |
| `CLOUDINARY_API_KEY` | Cloudinary API key | No |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | No |
| `SMTP_HOST` | SMTP server host | No |
| `SMTP_PORT` | SMTP server port | No |
| `SMTP_USER` | SMTP username | No |
| `SMTP_PASSWORD` | SMTP password | No |
| `ADMIN_EMAIL` | Master admin email | Yes |
| `ADMIN_PASSWORD` | Master admin password | Yes |

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed database with Master Admin
npm run seed
```

### Default Admin Credentials

After seeding:
- **Email**: admin@example.com
- **Password**: Admin@123

## Project Structure

```
├── app/
│   ├── admin/           # Admin panel pages
│   │   ├── components/  # Admin UI components
│   │   ├── users/       # User management
│   │   ├── settings/    # Site settings
│   │   ├── media/       # Media library
│   │   ├── homepage/    # Homepage editor
│   │   ├── posts/       # Blog management
│   │   └── profile/     # User profile
│   ├── api/             # API routes
│   │   ├── admin/       # Admin API
│   │   ├── auth/        # Authentication
│   │   ├── blogs/       # Blog CRUD
│   │   ├── homepage/    # Homepage CMS
│   │   └── upload/      # File upload
│   ├── blog/            # Blog frontend
│   ├── components/      # React components
│   │   ├── home/        # Homepage sections
│   │   ├── rooms/       # Room components
│   │   └── ui/          # UI primitives
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Homepage (CMS-driven)
├── lib/
│   ├── auth.ts          # JWT authentication
│   ├── blogs.ts         # Blog operations (Prisma)
│   ├── content.ts       # Default content (fallback)
│   ├── prisma.ts        # Prisma client singleton
│   └── rooms.ts         # Room data
├── prisma/
│   ├── schema.prisma    # Database schema
│   ├── seed.ts          # Database seed script
│   └── migrations/      # Migration files
├── public/              # Static assets
└── scripts/             # Utility scripts
```

## CMS Usage

### Homepage Editing
1. Go to `/admin/homepage`
2. Edit hero section content
3. Click "Save All"

### Blog Management
1. Go to `/admin/posts`
2. Click "+ New Post" to create
3. Edit existing posts from the list
4. Use JSON format for content sections

### Settings
1. Go to `/admin/settings`
2. Update site name, contact info, SEO, social links
2. Click "Save Settings"

### Media Library
1. Go to `/admin/media`
2. Upload images (JPEG, PNG, WebP, AVIF, GIF)
3. Files stored in `/public/images/uploads/`

### User Management
1. Go to `/admin/users`
2. Create/edit/suspend users
3. Assign roles: MASTER_ADMIN, ADMIN, EDITOR, USER

## Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
npm run seed         # Seed database
npm run seed:blogs   # Seed blog posts
```

## Admin Panel Routes

| Route | Description |
|-------|-------------|
| `/admin` | Dashboard |
| `/admin/users` | User management |
| `/admin/posts` | Blog management |
| `/admin/posts/new` | Create new post |
| `/admin/homepage` | Homepage editor |
| `/admin/settings` | Site settings |
| `/admin/media` | Media library |
| `/admin/profile` | User profile |
| `/admin/login` | Admin login |

## API Endpoints

| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/api/auth/login` | POST | Admin login |
| `/api/auth` | GET, POST | Auth status / logout |
| `/api/blogs` | GET, POST | List/create blogs |
| `/api/blogs/[slug]` | GET, PUT, DELETE | Blog CRUD |
| `/api/homepage` | GET, PUT | Homepage CMS |
| `/api/admin/users` | GET, POST | User management |
| `/api/admin/settings` | GET, PUT | Settings management |
| `/api/admin/media` | GET | Media listing |
| `/api/admin/profile` | GET, PUT | User profile |
| `/api/upload` | POST | File upload |

## Deployment

### Production Build

```bash
npm run build
npm run start
```

### Environment

Ensure all production environment variables are set:
- `NODE_ENV=production`
- Secure `JWT_SECRET`, `NEXTAUTH_SECRET`
- Production database URL
- `NEXTAUTH_URL` = production domain

### Database

Run migrations on production:
```bash
npx prisma migrate deploy
```

## Security Features

- JWT-based authentication with HttpOnly cookies
- Role-based access control (RBAC)
- Password hashing with bcrypt (12 rounds)
- CSRF protection via SameSite cookies
- Input validation with Zod (planned)
- Rate limiting (planned)
- Helmet headers (planned)

## License

MIT License - The Himalayan Shire