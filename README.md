# HeatTech - Water Heater E-commerce Platform

A modern B2B+B2C e-commerce platform for water heater products built with Next.js 14, TypeScript, and Supabase.

## Features

- **B2B & B2C Support**: Dual商业模式支持零售和批发
- **Multi-language**: English and Chinese (中英双语)
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Shopping Cart**: Full cart functionality with Zustand
- **Checkout Flow**: Complete checkout with Stripe integration
- **Inquiry System**: B2B询盘系统
- **Admin Dashboard**: 管理后台 (coming soon)
- **Real-time**: 实时通知 (Supabase Realtime)
- **SEO Optimized**: 优化的SEO

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| State | Zustand |
| Data Fetching | TanStack Query |
| Forms | React Hook Form + Zod |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Payments | Stripe |
| Email | Resend |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd heater-shop
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

### Database Setup

Run the SQL schema in `supabase/schema.sql` in your Supabase SQL Editor to create all required tables.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth pages
│   ├── api/               # API routes
│   ├── products/          # Product pages
│   ├── cart/              # Cart page
│   ├── checkout/          # Checkout page
│   └── inquiry/           # B2B inquiry page
├── components/
│   ├── ui/                # Reusable UI components
│   └── layout/            # Layout components (Header, Footer)
├── lib/                   # Utilities and stores
│   ├── supabase/          # Supabase client
│   ├── store.ts           # Zustand store
│   └── utils.ts           # Utility functions
└── types/                 # TypeScript types
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy!

### Supabase

Create your project at [supabase.com](https://supabase.com) and run the schema.sql in the SQL Editor.

## License

MIT
