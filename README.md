# Contentful Page Builder - Frontend

Next.js application that renders landing pages using configurations built in Contentful.

## Live Demo

https://contentful-page-builder.vercel.app

## Features

- Static site generation (SSG) with Next.js App Router
- Dynamic landing pages from Contentful configurations
- 3 responsive components: Hero, Two Column, Image Grid
- SEO optimization with dynamic metadata
- JSON-LD structured data

## Tech Stack

- Next.js 15.3+ (App Router, TypeScript)
- CSS Modules for styling
- Contentful GraphQL API
- Next.js Image optimization

## Setup

### Prerequisites
- Node.js 18+
- Contentful space with landing page content

### Installation

```bash
npm install
```

### Environment Variables

Create `.env.local`:

```bash
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_delivery_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token
CONTENTFUL_ENVIRONMENT=master
NEXT_PUBLIC_SITE_URL=https://contentful-page-builder.vercel.app
NEXT_PUBLIC_CONTENTFUL_APP_URL=https://contentful-app-one.vercel.app
```

### Development

```bash
npm run dev
```

Visit http://localhost:3000

## Routes

- `/` - Homepage
- `/landing/page-1` - First landing page
- `/landing/page-2` - Second landing page
- `/landing/[slug]` - Dynamic landing pages

## Content Structure

Landing pages are built from JSON configurations stored in Contentful. Each page can contain multiple blocks rendered in sequence.

### Block Types

1. **Hero Block**
   - Full-width banner with background image
   - Heading, subtitle, and call-to-action button

2. **Two Column Block**
   - Left: Text content (heading, subtitle, CTA)
   - Right: Featured image

3. **Image Grid Block**
   - 2x2 grid of images with hover effects

## Deployment

Deployed on Vercel with automatic deployments from GitHub main branch.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── landing/[slug]/    # Dynamic landing pages
│   ├── layout.tsx         # Root layout with navigation
│   └── globals.css        # Global styles
├── components/
│   ├── blocks/           # Landing page components
│   └── Navigation/       # Site navigation
├── lib/
│   ├── contentful.ts     # GraphQL client
│   └── seo.ts           # SEO utilities
└── types/
    └── index.ts         # TypeScript definitions
```
