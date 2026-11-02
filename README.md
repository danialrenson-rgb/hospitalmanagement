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
- In demo mode, patient records and lab orders are sample data, and new appointments are held in memory; changes reset when the page reloads. Sign in to load and save patient records, lab orders (including selected tests), and appointments to Supabase. Hospital name, username, and logo settings are also saved to Supabase.
- The **Database Status** page checks the configured project's Supabase Auth API and public key. It does not verify database tables or data access. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel to enable the check.
- To enable the check locally, create `.env.local` from `.env.example`, fill in the Supabase project URL and its public anon/publishable key, then restart the Vite dev server. Never use a `service_role` key in this frontend.
- To save workspace settings and records, create an account or sign in with email and password. If email confirmation is enabled in Supabase Auth, confirm the account from your inbox before signing in. Apply all SQL migrations in `supabase/migrations/` in filename order to create the tables and row-level security policies; each signed-in account can access only its own records.
- The database status check only verifies that the Supabase Auth API is reachable. Table access is verified when records load or are saved; failures appear on the corresponding page. Do not use this demo for clinical operations.

## Included workflows

- **Dashboard:** patient, revenue, expense, bed, and lab-report summaries with interactive charts and date-range selection.
- **OPD appointments:** patient lookup feedback, doctor selection, estimated token, and consultation-fee summary. Signed-in appointments are saved to Supabase and shown under **Doctor Scheduling**.
- **Lab orders:** patient source selection, searchable/category-filtered test catalog, quantities, discount, payment method, and invoice creation. Signed-in orders, selected tests, and updates are saved to Supabase.
- **Lab records:** signed-in records load from Supabase; demo mode uses sample records. Search, filters, payment collection, status progression, pagination, and invoice download are available.
- **Patients & EMR:** signed-in patient records load from Supabase; demo mode uses sample records.
- **Hospital settings:** Supabase-backed hospital name, username, and logo for signed-in users.
- **Interface:** responsive navigation, light/dark mode, accessible form labels, toast feedback, and print-friendly layout.

Dashboard metrics and module overview screens are also demo content and are not production-ready.
