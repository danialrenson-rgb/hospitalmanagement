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

- The app opens directly to the demo workspace; no account or Supabase setup is required.
- Patient records and lab orders are sample data bundled with the app. Changes are held in memory and reset when the page reloads.
- The app does not read or write Supabase data. Do not enter real patient information or use this demo for clinical operations.

## Included workflows

- **Dashboard:** patient, revenue, expense, bed, and lab-report summaries with interactive charts and date-range selection.
- **OPD appointments:** patient lookup feedback, doctor selection, estimated token, and consultation-fee summary. Appointment submission remains a demo-only workflow.
- **Lab orders:** patient source selection, searchable/category-filtered test catalog, quantities, discount, payment method, and demo invoice creation.
- **Lab records:** sample records, search and status filters, payment collection, status progression, pagination, and invoice download.
- **Patients & EMR:** sample patient records.
- **Hospital settings:** demo hospital name, username, and logo.
- **Interface:** responsive navigation, light/dark mode, accessible form labels, toast feedback, and print-friendly layout.

Dashboard metrics and module overview screens are also demo content and are not production-ready.
