# Sanji's Kitchen - Development Guide

Welcome to the Sanji's Kitchen project. This document serves as the primary instruction set and architectural overview for developers working on this codebase.

## Project Overview

Sanji's Kitchen is a modern, responsive restaurant website built with **Next.js 16** and **PayloadCMS 3**. It features a dynamic menu, table reservation integration, and a complete e-commerce solution for purchasing gift vouchers via **Stripe**.

### Key Technologies

- **Framework:** Next.js 16 (App Router)
- **CMS:** PayloadCMS 3.84.1
- **Database:** MongoDB (via Mongoose adapter)
- **Styling:** Tailwind CSS v4, shadcn/ui
- **E-commerce:** Stripe (Payment Intents & Webhooks)
- **Email:** Nodemailer (Gmail SMTP)
- **Security:** CAPJS (Captcha), Role-based Access Control (RBAC)
- **Analytics:** Umami (Self-hosted)

## Project Structure

- `src/app/(frontend)`: Frontend routes and UI components.
- `src/app/(payload)`: PayloadCMS admin panel and API.
- `src/collections`: PayloadCMS collection definitions (Menu, Orders, Vouchers, etc.).
- `src/components`: Reusable React components, organized by domain (speisekarte, checkout, etc.).
- `src/lib`: Utility functions, including Stripe initialization and IP hashing.
- `src/type`: TypeScript interfaces and types.
- `media`: Uploaded assets managed by PayloadCMS.

## Building and Running

### Development
```bash
npm install
npm run dev
```
*Note: Uses `--turbopack` by default.*

### Production
```bash
npm run build
npm run start
```

### Environment Variables
Ensure a `.env` file exists with the following keys:
- `DATABASE_URI`: MongoDB connection string.
- `PAYLOAD_SECRET`: Secret key for PayloadCMS.
- `STRIPE_SECRET_KEY`: Stripe private key.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe public key.
- `EMAIL_FROM`, `EMAIL_PASSWORD`: Gmail SMTP credentials.
- `CAPTCHA_SECRET_PRODUCTION`: CAPJS secret.

## Development Conventions

### Coding Style
- **TypeScript:** Use strict typing. Avoid `any`. Interfaces/Types should be kept in `src/type`.
- **Styling:** Use Tailwind CSS v4 utility classes. Prefer vanilla CSS for complex animations or specific design requirements not easily met by utility classes.
- **Components:** Use functional components with hooks. Prefer `lucide-react` for icons.

### PayloadCMS
- When adding or modifying collections, always update `src/payload.config.ts`.
- Use hooks (`src/collections/*/hooks/`) for complex logic during document lifecycles (e.g., generating voucher codes).

### API Routes
- Frontend API routes are located in `src/app/(frontend)/api`.
- Use `NextRequest` and `NextResponse` for consistency.
- Implement proper error handling and status codes.

### Internationalization (i18n)
- The site supports German (`de`) and English (`en`).
- Language state is managed via `LanguageProvider` in `src/components/contexts/language-context.tsx`.
- Content in PayloadCMS is localized.

## E-commerce Workflow (Vouchers)

1. **Selection:** User selects a voucher amount.
2. **Checkout:** Handled by `src/components/checkout`.
3. **Payment:** Processed via Stripe.
4. **Webhook:** `src/app/api/stripe-webhook` handles `payment_intent.succeeded`.
5. **Fulfillment:** Order record is updated, and a voucher is generated and emailed to the user.

## Maintenance

### Cleanup Tasks
The project includes a cleanup scheduler for consent logs and temporary files, initialized in `src/lib/init-cleanup.ts`.
