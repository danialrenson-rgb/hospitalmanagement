# Careflow Hospital ERP

A responsive React + TypeScript hospital operations workspace backed by Supabase.

## Run locally

Requirements: Node.js 20 or newer, npm, and a Supabase project.

```powershell
npm.cmd install
```

Create `.env.local` from `.env.example` and set the Supabase project URL and public anon/publishable key. Apply every SQL migration in `supabase/migrations/` in filename order before starting the app.

Start the app:

```powershell
npm.cmd run dev
```

Create and preview a production build:

```powershell
npm.cmd run build
npm.cmd run preview
```

## Authentication and persistence

- The application requires a Supabase Auth account; there is no demo or sample-data bypass.
- Patients, lab orders, appointments, and hospital settings are loaded from and saved to Supabase.
- Row-level security policies scope every record to the signed-in account.
- If email confirmation is enabled in Supabase Auth, confirm the account from the inbox before signing in.
- Never use a `service_role` key in this frontend.
- The **Database Status** page checks the Supabase Auth API. Record pages also report table and row-level security errors when data access fails.

## Included workflows

- **Dashboard:** patient, revenue, expense, bed, and lab-report summaries with interactive charts and date-range selection.
- **OPD appointments:** patient lookup feedback, doctor selection, estimated token, and consultation-fee summary. Signed-in appointments are saved to Supabase and shown under **Doctor Scheduling**.
- **Lab orders:** patient source selection, searchable/category-filtered test catalog, quantities, discount, payment method, and invoice creation. Signed-in orders, selected tests, and updates are saved to Supabase.
- **Lab records:** records load from Supabase. Search, filters, payment collection, status progression, pagination, and invoice download are available.
- **Patients & EMR:** patient records load from Supabase with search, filtering, and deletion controls.
- **Hospital settings:** Supabase-backed hospital name, username, and logo for signed-in users.
- **Interface:** responsive navigation, light/dark mode, accessible form labels, toast feedback, and print-friendly layout.

Some navigation areas are placeholders for future operational modules and are intentionally not presented as implemented workflows.
