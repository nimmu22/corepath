# CorePath — Vercel edition

This jobs-only package runs CorePath on standard Next.js App Router on Vercel. It is separate from the existing privately hosted Site.

## Deploy

1. Extract this ZIP. Upload this project to a Git repository, or use Vercel's upload flow. The selected project root must contain `package.json`.
2. Select **Next.js** as the framework and **Node.js 22.x** (24.x is also supported).
3. Use **Install Command:** `pnpm install --frozen-lockfile` and **Build Command:** `pnpm build`. Reset Output Directory to the framework default; do not use `dist`.
4. Deploy. The interface and company directory do not need API keys. The job catalog requires the Turso connection below.

The build script uses `next build --webpack`. The old Vinext/Cloudflare files are removed. The pnpm policy explicitly disables core-js's optional installation message instead of leaving its build approval unresolved.

## Activate real jobs

The former Sites D1 database and its private credentials are not exported. Connect a remote **libSQL-compatible Turso database**, with a write-capable database token, and add these server-side variables in Vercel → Project → Settings → Environment Variables:

| Variable | Value |
| --- | --- |
| `TURSO_DATABASE_URL` | Remote database URL supplied by your libSQL/Turso database |
| `TURSO_AUTH_TOKEN` | Database token with read/write permissions |
| `INGEST_SECRET` | A long random secret for authorized manual or external scheduled refreshes |

Redeploy after adding or changing environment variables. Tables and indexes are created automatically on first access. Opening the jobs page starts the initial collection in the background; this can take a minute. Page visits check for an hourly refresh, with a shared database lock and throttle. The top refresh button reloads the stored catalog.

Six public employer feeds are connected for India: Tata Consulting Engineers, Tata Electronics, Bosch, AECOM, Turner & Townsend and Assystem. Only English civil, mechanical and electrical roles are included. Arbeitnow UK is secondary. The 141-company directory is a separate set of official website links; it does not mean 141 live feeds. No jobs are fabricated. Source posting dates and original application links are retained; unknown dates remain unknown. Source search/page limits make coverage partial.

## Collection while the site is closed

The old ChatGPT Site schedule targets the existing Site and does not transfer to Vercel. Configure an external scheduler to POST `/api/ingest` with `Authorization: Bearer <INGEST_SECRET>` to update this deployment while it is closed.

Alternatively set `CRON_SECRET` in Vercel and add a cron configuration targeting GET `/api/cron`. Vercel sends the cron secret automatically. **No cron is included by default** so this package can deploy on Hobby without a schedule validation error. Hobby allows daily cron; hourly Vercel cron requires Pro or an external scheduler. See https://vercel.com/docs/cron-jobs/usage-and-pricing.

Authorized manual collection:

```sh
curl --request POST 'https://YOUR-DEPLOYMENT.vercel.app/api/ingest' \
  --header 'Authorization: Bearer YOUR_INGEST_SECRET'
```

Never put your secrets in browser JavaScript, source control or NEXT_PUBLIC variables. `/api/service-refresh` is disabled in this edition because Vercel does not have Sites' owner-only access gate.

## Local development

Use Node 22.13+ and pnpm 11.25.0. Run `pnpm install`, copy `.env.example` to `.env.local`, configure a remote database if needed, and run `pnpm dev`. Build with `pnpm build`; run the production build with `pnpm start`. Tests: `pnpm test`.

## Validation and limits

Frozen-lockfile installation, TypeScript checking, Next.js production build, SQL lock/transaction tests, and production HTTP checks were performed. Real remote Turso credentials and an actual Vercel deployment were not available, so remote storage and hosted scheduling still need activation and verification on your account. The existing private CorePath Site remains unchanged.

## Update an existing GitHub repository

Extract this ZIP, then replace the existing project source with these files. Delete old tracked files that are absent from this package, especially `app/resume-tools.tsx`, `lib/resume-import.ts`, `app/api/assist/route.ts`, `scripts/copy-pdf-worker.mjs`, `public/pdf.worker.min.mjs`, and `tests/resume.test.ts`. Upload `.gitignore`, `.env.example`, `pnpm-lock.yaml`, and `pnpm-workspace.yaml` too. Commit to the production branch of your connected repository. Keep your existing Turso variables in Vercel; never upload actual `.env` files or tokens.

This package contains no resume builder, upload tools, resume exports, AI writing endpoint or AI credential requirement. Existing remote tables are left untouched so your job catalog is preserved.
