# Sanji's Kitchen - Restaurant Website

Welcome to the official website repository for Sanji's Kitchen. This is a modern, responsive website built with [Next.js](https://nextjs.org) to showcase our restaurant's menu, location, and services.

## Features

- Modern, responsive design
- Interactive menu display
- Location and contact information
- Online reservation system
- Special events and promotions
- Spam protection with CAPJS CAPTCHA
- Secure email handling with Mailpit and SpamAssassin

## Security Features

- CAPJS CAPTCHA integration for form protection
- Mailpit for email testing and development
- SpamAssassin integration for email spam protection
- Secure contact form with spam prevention

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
NEXT_PUBLIC_CAPJS_SITE_KEY=your_capjs_site_key
MAILPIT_HOST=localhost
MAILPIT_PORT=1025
EMAIL_FROM=noreply@sanjiskitchen.com
```

## Technical Details

This project uses:
- [Next.js](https://nextjs.org) for the frontend framework
- [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for optimized font loading
- [Geist](https://vercel.com/font) as the primary font family
- [CAPJS](https://cap.js.org) for CAPTCHA protection
- [Mailpit](https://github.com/axllent/mailpit) for email handling
- [SpamAssassin](https://spamassassin.apache.org/) for spam protection

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [CAPJS Documentation](https://cap.js.org/docs) - learn about CAPTCHA implementation.
- [Mailpit Documentation](https://github.com/axllent/mailpit) - learn about email testing.
- [SpamAssassin Documentation](https://spamassassin.apache.org/documentation.html) - learn about spam protection.

## Deployment

This website is deployed on [Vercel](https://vercel.com) for optimal performance and reliability.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
