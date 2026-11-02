# Careflow Hospital ERP

A responsive React + TypeScript hospital operations demo with sample patient records, lab orders, and hospital settings.

## Run locally

Requirements: Node.js 20 or newer and npm. No Supabase setup is needed for the demo.

```powershell
npm.cmd install
```

Start the app:

```powershell
npm.cmd run dev
```

Create and preview a production build:

```powershell
npm.cmd run build
npm.cmd run preview
```

## Demo behavior

- The app can be used in demo mode without an account. When Supabase is configured, sign in with email and password or continue in demo mode.
- Patient records and lab orders are sample data bundled with the app. Changes are held in memory and reset when the page reloads. Signed-in users can save hospital name, username, and logo settings to their Supabase account.
- The **Database Status** page checks the configured project's Supabase Auth API and public key. It does not verify database tables or data access. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel to enable the check.
- To enable the check locally, create `.env.local` from `.env.example`, fill in the Supabase project URL and its public anon/publishable key, then restart the Vite dev server. Never use a `service_role` key in this frontend.
- To save workspace settings, create an account or sign in with email and password. If email confirmation is enabled in Supabase Auth, confirm the account from your inbox before signing in. The existing row-level security policies restrict settings to the signed-in user.
- This demo does not save to Supabase. Do not enter real patient information or use it for clinical operations.

## Included workflows

- **Dashboard:** patient, revenue, expense, bed, and lab-report summaries with interactive charts and date-range selection.
- **OPD appointments:** patient lookup feedback, doctor selection, estimated token, and consultation-fee summary. Appointment submission remains a demo-only workflow.
- **Lab orders:** patient source selection, searchable/category-filtered test catalog, quantities, discount, payment method, and demo invoice creation.
- **Lab records:** sample records, search and status filters, payment collection, status progression, pagination, and invoice download.
- **Patients & EMR:** sample patient records.
- **Hospital settings:** demo hospital name, username, and logo.
- **Interface:** responsive navigation, light/dark mode, accessible form labels, toast feedback, and print-friendly layout.

Dashboard metrics and module overview screens are also demo content and are not production-ready.
