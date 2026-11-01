# Careflow Hospital ERP

A responsive React + TypeScript hospital operations interface with Supabase authentication and PostgreSQL persistence for patient records, lab orders, and hospital settings.

## Run locally

Requirements: Node.js 20 or newer and npm.

```powershell
npm.cmd install
Copy-Item .env.example .env.local
```

In `.env.local`, set `VITE_SUPABASE_URL` to your Supabase project URL and `VITE_SUPABASE_ANON_KEY` to its publishable/anon key. Then apply the SQL migration in `supabase/migrations/20261031000000_create_hospital_tables.sql` using the Supabase CLI or SQL editor.

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

In the Vercel project's **Settings → Environment Variables**, set `VITE_SUPABASE_URL` to the Supabase project URL and `VITE_SUPABASE_ANON_KEY` to its publishable/anon key. Apply them to the Production environment (and Preview if needed), then redeploy so Vite includes the variables in the browser build. You can find these values in your Supabase project's API settings.

Only use the publishable/anon key in this frontend. Never add a PostgreSQL password or service-role key as a `VITE_*` variable.

## Supabase security

- Sign-in and account creation use Supabase Auth email/password.
- Row Level Security restricts hospital settings, patients, and lab orders to the authenticated user who owns each row.
- A new account receives the existing demo patient and lab-order records if its tables are empty.
- Only the public publishable/anon key belongs in this browser app. Never use a PostgreSQL connection URI, database password, or service-role key in `VITE_*` variables or frontend code.
- The current policies isolate each user's records. For staff to share one hospital's records, add a hospital/organization membership model and authorize access through that membership before production use.

## Included workflows

- **Dashboard:** patient, revenue, expense, bed, and lab-report summaries with interactive charts and date-range selection.
- **OPD appointments:** patient lookup feedback, doctor selection, estimated token, and consultation-fee summary. Appointment submission remains a demo-only workflow.
- **Lab orders:** patient source selection, searchable/category-filtered test catalog, quantities, discount, payment method, and invoice creation stored in Supabase.
- **Lab records:** Supabase-backed records, search and status filters, payment collection, status progression, pagination, and invoice download.
- **Patients & EMR:** Supabase-backed patient records.
- **Hospital settings:** Supabase-backed hospital name, username, and logo.
- **Interface:** responsive navigation, light/dark mode, accessible form labels, toast feedback, and print-friendly layout.

Some dashboard metrics and module overview screens remain demo content; this connection does not make those workflows production-ready for real patient data.
