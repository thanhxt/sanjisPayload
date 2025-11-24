# Sanji's Kitchen - Restaurant Website

Welcome to the official website repository for Sanji's Kitchen. This is a modern, responsive restaurant website built with [Next.js](https://nextjs.org), [shadcn/ui](https://ui.shadcn.com), [Tailwind CSS](https://tailwindcss.com), [PayloadCMS](https://payloadcms.com), and [Stripe](https://stripe.com) to showcase our restaurant's menu, services, and provide a complete e-commerce solution for gift vouchers.

## Table of Contents

- [File Structure](#file-structure)
- [Features](#features)
- [E-commerce Features](#e-commerce-features)
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
├── media/                    # Static images with multiple sizes
├── public/                   # Favicon, videos, logos
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── (frontend)/       # Frontend routes
│   │   │   ├── api/          # API routes
│   │   │   │   ├── create-order/      # Order creation
│   │   │   │   ├── create-voucher/    # Voucher generation
│   │   │   │   ├── send-order-confirmation/ # Email notifications
│   │   │   │   ├── stripe/            # Stripe integration
│   │   │   │   ├── menu-appetizer/    # Menu data API
│   │   │   │   ├── menu-maindish/     # Menu data API
│   │   │   │   ├── menu-steaksdish/   # Steak menu API
│   │   │   │   ├── menu-steaksdishchoice/ # Steak choice API
│   │   │   │   ├── menu-steaksdishsharing/ # Steak sharing API
│   │   │   │   ├── send-email/        # Contact form
│   │   │   │   ├── send-email-node/   # Node-based email sender
│   │   │   │   ├── send-captcha/      # CAPTCHA verification
│   │   │   │   ├── stripe-webhook/    # Stripe webhook handler
│   │   │   │   ├── test-email/        # Email testing
│   │   │   │   └── revalidate/        # Cache invalidation
│   │   │   ├── about/                 # About us page
│   │   │   ├── christmas/             # Christmas special page
│   │   │   ├── speisekarte/           # Menu pages
│   │   │   │   ├── vorspeise/         # Appetizers
│   │   │   │   ├── hauptspeise/       # Main dishes
│   │   │   │   ├── steaks/            # Steak selection
│   │   │   │   ├── lunch/             # Lunch menu
│   │   │   │   └── desserts/          # Desserts
│   │   │   ├── voucher/               # Gift voucher purchase
│   │   │   ├── return/                # Stripe payment success
│   │   │   ├── reservierung/          # Reservation page
│   │   │   ├── kontakt/               # Contact page
│   │   │   ├── impressum/             # Legal notice
│   │   │   ├── datenschutz/           # Privacy policy
│   │   │   ├── layout.tsx             # Root layout
│   │   │   ├── page.tsx               # Home page
│   │   │   └── globals.css            # Global styles
│   │   └── (payload)/        # PayloadCMS admin routes
│   ├── collections/          # PayloadCMS collections
│   │   ├── admin/            # Admin settings
│   │   ├── gallery/          # Gallery images
│   │   ├── hero/             # Hero content
│   │   ├── media/            # Media management
│   │   ├── menuAppetizerDish/  # Appetizer items
│   │   ├── menuMainDish/     # Main dish items
│   │   ├── menuSanjisChoice/ # Sanji's choice items
│   │   ├── menuSteaksDish/   # Steak items
│   │   ├── menuSteaksSharing/ # Steak sharing items
│   │   ├── order/            # Order management
│   │   ├── team/             # Team members
│   │   ├── user/             # User management
│   │   └── voucher/          # Voucher management
│   ├── components/           # React components
│   │   ├── about/            # About page components
│   │   ├── alerts/           # Alert components
│   │   ├── checkout/         # Stripe checkout
│   │   ├── contexts/         # React contexts
│   │   ├── speisekarte/      # Menu components
│   │   └── ui/               # shadcn/ui components
│   ├── lib/                  # Utility functions
│   ├── type/                 # TypeScript types
│   └── payload.config.ts     # PayloadCMS configuration
├── components.json           # shadcn/ui configuration
├── next.config.ts            # Next.js configuration
├── package.json
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md                # Project documentation
```

## Features

- **Modern Design**: Responsive design with Tailwind CSS v4 and beautiful typography using Cormorant Garamond and Geist fonts
- **Beautiful UI Components**: Built with shadcn/ui for consistent, accessible components
- **Multi-language Support**: German (primary) and English support with internationalization
- **Interactive Menu Display**: Dynamic menu with categories (appetizers, main dishes, steaks, sharing steaks, Sanji's choice, lunch, desserts)
- **Seasonal Specials**: Dedicated pages for seasonal events (e.g., Christmas)
- **Location & Contact**: Maps integration and contact information
- **Reservation System**: Online table reservation functionality via Open Table
- **Image Gallery**: Restaurant photo gallery with video content
- **Cookie Consent**: GDPR-compliant cookie consent management
- **SEO Optimized**: OpenGraph and Twitter meta tags for social media sharing

## E-commerce Features

- **Gift Voucher Sales**: Complete voucher purchase system with Stripe integration
- **Payment Processing**: Secure payments via Stripe with embedded checkout
- **Order Management**: Full order tracking and management system
- **Multi-currency Support**: EUR, USD, and CHF support
- **Email Notifications**: Automated order confirmation emails with voucher details
- **Voucher System**: 
  - Unique voucher code generation (format: SANJIS2024XXXXXX)
  - Expiration date management (1 year validity)
  - Redemption tracking
  - Integration with order system

## Security Features

- **CAPJS CAPTCHA Integration**: Advanced bot protection for forms
- **Secure Payment Processing**: PCI-compliant Stripe integration
- **SSL Encryption**: Secure data transmission
- **Role-based Access Control**: Admin, Editor, and User roles
- **Email Security**: Secure contact form with spam prevention
- **Environment Variables**: Sensitive data protection

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev --turbo
# or
yarn install
yarn dev
# or
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# CAPTCHA Configuration
CAPTCHA_SECRET_PRODUCTION=your_captcha_secret
CAPTCHA_VERIFY_URL=your_captcha_verify_url
NEXT_PUBLIC_CAPTCHA_API_URL_PRODUCTION=your_captcha_api_url

# Database Configuration
DATABASE_URI=your_mongodb_connection_string

# PayloadCMS Configuration
PAYLOAD_SECRET=your_payload_secret_key

# Email Configuration (Gmail)
EMAIL_FROM=your_email_address
EMAIL_PASSWORD=your_email_app_password

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Application Configuration
NEXT_PUBLIC_SITE_URL=https://sanjiskitchen.de
NEXT_PUBLIC_APP_URL=https://sanjiskitchen.de
REVALIDATE_SECRET=your_revalidate_secret
```

## Technical Details

This project uses the latest technologies:

### Core Framework
- **[Next.js 15.3.2](https://nextjs.org)** - React framework with App Router
- **[React 19](https://react.dev)** - Latest React with concurrent features  
- **[TypeScript 5](https://www.typescriptlang.org)** - Type-safe development

### Backend & CMS
- **[PayloadCMS 3.41.0](https://payloadcms.com)** - Headless CMS with MongoDB
- **[MongoDB](https://www.mongodb.com)** - Database via PayloadCMS adapter

### UI & Styling
- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com)** - Beautiful, accessible UI components
- **[Lucide Icons](https://lucide.dev)** - Beautiful icon library

### Typography
- **[Geist Font](https://vercel.com/font)** - Primary sans-serif font
- **[Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond)** - Elegant serif for headings

### Payment & E-commerce
- **[Stripe](https://stripe.com)** - Payment processing and checkout
- **[@stripe/stripe-js](https://www.npmjs.com/package/@stripe/stripe-js)** - Stripe JavaScript SDK
- **[@stripe/react-stripe-js](https://www.npmjs.com/package/@stripe/react-stripe-js)** - React Stripe components

### Security & Forms
- **[CAPJS](https://cap.js.org)** - Advanced CAPTCHA protection
- **[Nodemailer](https://nodemailer.com/)** - Email handling

### Additional Libraries
- **[date-fns](https://date-fns.org)** - Date manipulation and formatting
- **[flag-icons](https://flagicons.lipis.dev)** - Country flag icons
- **[Sharp](https://sharp.pixelplumbing.com)** - Image optimization
- **[cookies-next](https://www.npmjs.com/package/cookies-next)** - Cookie management

## Admin Access

The admin panel is accessible at `/admin` and provides comprehensive management:

### Content Management
- **Menu Management**: Add/edit appetizers, main dishes, steaks, sharing steaks, Sanji's choice, and specials
- **Team Management**: Manage team member profiles and information
- **Hero Content**: Update homepage hero sections and images
- **Media Library**: Upload and organize restaurant images with automatic resizing
- **Gallery Management**: Manage photo gallery content

### E-commerce Management  
- **Order Tracking**: View and manage all voucher orders
- **Voucher Management**: Track voucher codes, redemption status, and expiration
- **Payment Monitoring**: Monitor Stripe payments and transaction status

### User & System Management
- **User Roles**: Admin (full access), Editor (content), User (basic)
- **Admin Settings**: System configuration and feature flags
- **Multi-language Content**: Manage German and English content

### Analytics & Monitoring
- **Order Analytics**: Track sales, popular items, and customer data
- **Email Notifications**: Monitor order confirmations and system emails
- **Revalidation Control**: Cache management and content updates

## Learn More

To learn more about the technologies used in this project:

- **Framework**: [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- **CMS**: [PayloadCMS Documentation](https://payloadcms.com/docs) - headless CMS documentation
- **UI Components**: [shadcn/ui Documentation](https://ui.shadcn.com/docs) - component library
- **Styling**: [Tailwind CSS Documentation](https://tailwindcss.com/docs) - utility-first CSS
- **Payments**: [Stripe Documentation](https://stripe.com/docs) - payment integration
- **Security**: [CAPJS Documentation](https://cap.js.org/docs) - CAPTCHA implementation
- **Email**: [Nodemailer Documentation](https://nodemailer.com/about/) - email handling
- **Database**: [MongoDB Documentation](https://docs.mongodb.com) - database management

## Deployment

This website is deployed on a Virtual Private Server (VPS) using [Coolify](https://coolify.io) for deployment management and automation.

### Production Environment
- **URL**: [https://sanjiskitchen.de](https://sanjiskitchen.de)
- **Deployment Platform**: Coolify
- **SSL Certificate**: Let's Encrypt (Managed by Coolify)
- **Database**: MongoDB Atlas / Self-hosted MongoDB
- **Payment Processing**: Stripe (Live Mode)
- **Email Service**: Gmail SMTP

### Deployment Process
1. **VPS Setup**: Ubuntu Server with Docker
2. **Coolify Installation**: Container orchestration and deployment
3. **Database Configuration**: MongoDB setup through Coolify
4. **Environment Variables**: Secure configuration via Coolify dashboard
5. **SSL Configuration**: Automatic Let's Encrypt certificates
6. **Domain Setup**: DNS configuration for sanjiskitchen.de
7. **Monitoring**: Application and server monitoring via Coolify

### Development Workflow
1. **Local Development**: `npm run dev --turbo` with hot reload
2. **Git Integration**: Push to repository triggers deployment
3. **Automatic Builds**: Coolify handles build and deployment process
4. **Cache Management**: Automatic revalidation via API routes
5. **Database Sync**: PayloadCMS collections sync across environments
