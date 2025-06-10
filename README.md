# Sanji's Kitchen - Restaurant Website

Welcome to the official website repository for Sanji's Kitchen. This is a modern, responsive website built with [Next.js](https://nextjs.org), [shadcn/ui](https://ui.shadcn.com), [Tailwind CSS](https://tailwindcss.com), and [PayloadCMS](https://payloadcms.com) to showcase our restaurant's menu, location, and services.

## Table of Contents

- [File Structure](#file-structure)
- [Features](#features)
- [Security Features](#security-features)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Technical Details](#technical-details)
- [Admin Access](#admin-access)
- [Learn More](#learn-more)
- [Deployment](#deployment)

## File Structure

```
/
├── media/                # Static images
├── public/              # Favicon, robots.txt, etc.
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── (frontend)/  # Frontend routes
│   │   │   ├── api/     # API routes
│   │   │   ├── about/   # About us page
│   │   │   ├── speisekarte/    # Menu page
│   │   │   ├── reservierung/   # Reservation page
│   │   │   ├── kontakt/        # Contact page
│   │   │   ├── impressum/      # Legal notice
│   │   │   ├── datenschutz/    # Privacy policy
│   │   │   ├── layout.tsx      # Root layout
│   │   │   ├── page.tsx        # Home page
│   │   │   └── globals.css     # Global styles
│   │   └── (payload)/   # PayloadCMS admin routes
│   ├── collections/     # PayloadCMS collections
│   ├── components/      # React components
│   ├── lib/            # Utility functions
│   ├── type/           # TypeScript types
│   └── payload.config.ts # PayloadCMS configuration
├── components.json      # shadcn/ui configuration
├── next.config.ts       # Next.js configuration
├── package.json
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md           # Project documentation
```

## Features

- Modern, responsive design with Tailwind CSS
- Beautiful UI components with shadcn/ui
- Interactive menu display
- Location and contact information
- Online reservation system with OpenTable integration
- Spam protection with CAPJS CAPTCHA
- Secure contact form with Nodemailer integration
- Powerful admin panel for content management

## Security Features

- CAPJS CAPTCHA integration for form protection
- Secure contact form with spam prevention
- Nodemailer for reliable email delivery

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# CAPTCHA Configuration
CAPTCHA_SECRET_PRODUCTION=your_captcha_secret
CAPTCHA_VERIFY_URL=your_captcha_verify_url
NEXT_PUBLIC_CAPTCHA_API_URL_PRODUCTION=your_captcha_api_url

# Database Configuration
DATABASE_URI=your_mongodb_connection_string

# Email Configuration
EMAIL_FROM=your_email_address
EMAIL_PASSWORD=your_email_app_password

# Application Configuration
NEXT_PUBLIC_SITE_URL=your_site_url
PAYLOAD_SECRET=your_payload_secret
REVALIDATE_SECRET=your_revalidate_secret
```

## Technical Details

This project uses:
- [Next.js](https://nextjs.org) for the frontend framework
- [PayloadCMS](https://payloadcms.com) for the backend, content management, and admin panel
- [shadcn/ui](https://ui.shadcn.com) for beautiful, accessible UI components
- [Tailwind CSS](https://tailwindcss.com) for utility-first styling
- [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for optimized font loading
- [Geist](https://vercel.com/font) as the primary font family
- [CAPJS](https://cap.js.org) for CAPTCHA protection
- [Nodemailer](https://nodemailer.com/) for email handling

## Admin Access

The admin panel is accessible at `/admin` and provides a user-friendly interface for:
- Managing team members and their information
- Updating restaurant information
- Managing media content and hero pictures
- User management and permissions

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [PayloadCMS Documentation](https://payloadcms.com/docs) - learn about content management.
- [shadcn/ui Documentation](https://ui.shadcn.com/docs) - learn about UI components.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about utility-first CSS.
- [CAPJS Documentation](https://cap.js.org/docs) - learn about CAPTCHA implementation.
- [Nodemailer Documentation](https://nodemailer.com/about/) - learn about email handling.

## Deployment

This website is deployed on a Virtual Private Server (VPS) using [Coolify](https://coolify.io) for deployment management and automation.

### Production Environment
- **URL**: [https://sanjiskitchen.com](https://sanjiskitchen.com) (Coming Soon)
- **Deployment Platform**: Coolify
- **VPS Provider**: [Your VPS Provider]
- **Server Specifications**: [Your Server Specs]
- **SSL Certificate**: Let's Encrypt (Managed by Coolify)
- **Domain**: [Your Domain Provider]

### Deployment Process
1. Set up VPS with Ubuntu Server
2. Install Coolify on the VPS
3. Configure MongoDB database through Coolify
4. Set up automatic deployments with Coolify
5. Configure SSL certificates through Coolify
6. Set up environment variables in Coolify dashboard
