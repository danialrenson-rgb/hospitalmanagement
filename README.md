# Careflow Hospital ERP

A responsive React + TypeScript hospital operations interface with Supabase authentication and PostgreSQL persistence for patient records, lab orders, and hospital settings.

## Run locally

Requirements: Node.js 20 or newer, npm, and a Supabase project.

```powershell
npm.cmd install
Copy-Item .env.example .env.local
```

In `.env.local`, set `VITE_SUPABASE_URL` to your Supabase project URL and `VITE_SUPABASE_ANON_KEY` to its publishable/anon key. Apply `supabase/migrations/20261031000000_create_hospital_tables.sql` using the Supabase SQL editor or CLI.

Start the app:

```powershell
npm.cmd run dev
```

Create and preview a production build:

```powershell
npm.cmd run build
npm.cmd run preview
```

## Deploy on Vercel

In Vercel **Settings → Environment Variables**, set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for Production (and Preview if needed). The publishable/anon key is intended for browser use; choose **Config** if Vercel warns that a `VITE_` variable is exposed to the browser. Redeploy after changing variables or code.

Never put a PostgreSQL password or service-role key in frontend code or a `VITE_*` variable.

## Data access

- Users sign in with Supabase Auth email/password. New accounts may need to confirm their email before signing in.
- Row Level Security restricts hospital settings, patient records, and lab orders to the authenticated user who owns each row.
- A new account is initialized with sample patient and lab-order records. Subsequent changes to lab orders and hospital settings are saved to Supabase.
- This is a starter interface, not a production-ready clinical records system. Review privacy, access controls, and regulatory requirements before using real patient data.

## Included workflows

- **Dashboard:** patient, revenue, expense, bed, and lab-report summaries with interactive charts and date-range selection.
- **OPD appointments:** patient lookup feedback, doctor selection, estimated token, and consultation-fee summary. Appointment submission remains a demo-only workflow.
- **Lab orders:** patient source selection, searchable/category-filtered test catalog, quantities, discount, payment method, and invoice creation stored in Supabase.
- **Lab records:** Supabase-backed records, search and status filters, payment collection, status progression, pagination, and invoice download.
- **Patients & EMR:** Supabase-backed patient records.
- **Hospital settings:** Supabase-backed hospital name, username, and logo.
- **Interface:** responsive navigation, light/dark mode, accessible form labels, toast feedback, and print-friendly layout.

Dashboard metrics and module overview screens remain demo content; the database connection does not make those workflows production-ready.
