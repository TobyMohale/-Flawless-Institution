# Flawless Institution™ - Architecture & Codebase Overview

## Core Stack & Environment
- **Framework**: React 18, Vite (React SPA with Express Backend mapped via Vite Middleware)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Lucide React (Icons)
- **Backend**: Express.js (runs within `server.ts` and bundled to `dist/server.cjs` via esbuild)
- **Database**: Supabase (PostgreSQL) — currently running on temporary `inMemoryStore.ts` bridging to Supabase via `@supabase/supabase-js`.
- **Integrations**: 
  - Payfast (Credit/Debit Card checkout)
  - Ozow (Instant EFT)
  - Resend (Transactional Emails)

## System Architecture

The application operates as a **Monolith Full-Stack App** using Vite Middleware.
Entry points:
- Frontend: `src/main.tsx` -> `src/App.tsx`
- Backend: `server.ts` (Express API) routes to `src/server/`

### 1. The Backend (`/src/server`)
The backend follows a strict **Controller/Service/Store** pattern mapped via Express routers:
- `/config/index.ts`: Centralized environment & secret management (Reads `.env`).
- `/storage/inMemoryStore.ts`: Currently holds application state. Needs to be replaced with full Supabase integration.
- `/services/`: Business logic. Includes:
  - `academy.service.ts` (Enrolments, cohorts)
  - `payment.service.ts` (Payfast & Ozow integration, tax invoice generation)
  - `advisory.service.ts` (Staff placement and speaking briefs)
  - `communications.service.ts` (Logging notifications)
  - `supabase.service.ts` (Supabase connection manager and SQL schema dump)
  - `resend.service.ts` (Resend email client)

### 2. The Frontend Views (`/src/views`)
- `AcademyView.tsx`: Course catalog & enrolment checkout flow.
- `AdvisoryView.tsx`: Staff placement & B2B requests.
- `SpeakingView.tsx`: Keynote and corporate masterclass booking.
- `ExecutiveDashboardView.tsx`: **Crucial Admin Portal**. Contains tabs for Analytics, Finance, Student Cohorts, Comms, and Supabase Diagnostics.

### 3. The Frontend Components (`/src/components`)
- `StudentPortalModal.tsx`: Post-enrolment student dashboard.
- `OfflineLearningHub.tsx`: PWA offline syllabus checklists and etiquette guides.
- `TaxInvoiceModal.tsx`: Dynamically renders SARS-compliant VAT invoices based on payment transactions.
- `AuthModal.tsx`: Handles login (currently mocks Supabase auth using `authStorage.ts`).

## Crucial Platform Context for Claude

1. **Routing Strategy**: The app does *not* use `react-router-dom`. It uses a custom hash-based SPA routing system managed inside `App.tsx` (using states like `currentView`).
2. **PWA (Progressive Web App)**: Configured using `vite-plugin-pwa`. Caches the offline learning guides. The service worker logic is in `vite.config.ts`.
3. **Database Migration State (IMPORTANT)**: 
   - The user has executed the Supabase SQL schema.
   - The app is currently using `src/server/storage/inMemoryStore.ts`.
   - **Next Task for Claude:** Migrate the data persistence from `inMemoryStore.ts` entirely to `supabase.service.ts` and the Supabase `@supabase/supabase-js` client.
4. **Environment Constraints**: 
   - Uses `0.0.0.0:3000` hardcoded for the Express server.
   - Vite is attached as middleware in `server.ts` during development.
   - Build process uses `esbuild` for the backend.

## Payfast & Ozow Integrations
- Checkout flows generate a unique reference (e.g., `INV-2026-XXXX`).
- `payment.service.ts` handles the simulated sandbox responses for both gateways, producing standard `transactions` records linked to `enrolments`.
