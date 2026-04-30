# Copilot instructions for `sanjisPayload`

## Build, lint, and test commands

Use Node.js 22+ (`package.json` engines).

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
```

Lint a single file:

```bash
npm run lint -- src/app/(frontend)/voucher/page.tsx
```

Automated test scripts are not configured in `package.json` yet (no `test` script / no test runner config in repo), so there is currently no single-test command.

## High-level architecture

- **Framework integration:** Next.js App Router is wrapped with `withPayload` in `next.config.ts`, and Payload CMS is configured in `src/payload.config.ts` (MongoDB adapter, i18n languages, collection registration).
- **Two app surfaces:** frontend routes live under `src/app/(frontend)`, while Payload admin UI/API lives under `src/app/(payload)` and generated Payload files in that tree should be treated as generated.
- **Data source pattern:** most API handlers fetch CMS data via `getPayload({ config })` using `@payload-config` / `@/payload.config` and return `NextResponse.json(...)`.
- **Voucher commerce flow (critical path):**
  1. `src/components/checkout/checkout.jsx` embeds Stripe checkout and calls `POST /api/stripe`.
  2. `src/app/(frontend)/return/page.tsx` reads Stripe session status.
  3. On successful payment it chains internal calls to `/api/create-order`, `/api/create-voucher`, and `/api/send-order-confirmation`.
  4. Order/voucher/email endpoints implement duplicate guards (session/order/email already processed) to keep the flow idempotent.
- **Consent logging flow:** `CookieConsentComponent` posts to `/api/consent-logs`, data is stored in the `consent-logs` collection with hashed IPs (`hashIP` hook + `hashIPAddress` utility), and monthly cleanup is triggered by the scheduler initialized from frontend layout (`src/lib/init-cleanup.ts`).
- **Content revalidation:** many collection `afterChange` hooks call `/api/revalidate` with `REVALIDATE_SECRET` to refresh affected frontend paths.

## Key repository conventions

- **When adding/changing a collection:** update both the collection file under `src/collections/...` and the registration list in `src/payload.config.ts`.
- **Auth/roles:** collection access is centralized through `checkRole(...)` and role values `admin | editor | user` from the `users` collection.
- **Menu content model:** menu collections commonly use paired language fields (`titleDE`, `descriptionDE`, `descriptionEN`, etc.) rather than Payload localized field objects.
- **Menu API responses:** menu route handlers usually sort by a numeric `position` before returning JSON (preserve this for consistent ordering).
- **Shared path aliases:** prefer `@/*` for `src/*` and `@payload-config` for `src/payload.config.ts` (from `tsconfig.json`).
- **Language state:** frontend language is controlled by `LanguageProvider` (`de` default, persisted in `localStorage` key `language`).
