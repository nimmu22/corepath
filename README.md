
# CorePath

Finding civil, mechanical and electrical jobs often means checking
several company websites. CorePath brings openings from selected
sources into one place, with a focus on India.# CorePath — Vercel edition

CorePath helps engineering and computer science graduates find jobs, internships and graduate opportunities, with a focus on India.

## About CorePath

Search engineering and IT jobs by role, employer or location. Filter by discipline, specialization and opportunity type, save jobs in your browser, and apply through the original source.

Computer Science / IT now includes software, web and mobile development, data engineering and analysis, AI / ML, cybersecurity, cloud / DevOps, software testing and IT support. Listings can span different experience levels; use source requirements to check fresher eligibility.

## Deploy from GitHub

Import this repository into Vercel, select Next.js, and use Node.js 22.x or 24.x. Install command: `pnpm install --frozen-lockfile`. Build command: `pnpm build`. Leave Output Directory at its default. Keep `package.json` at the repository root.

## Activate real jobs

The former Sites D1 database and its private credentials are not exported. Connect a remote **libSQL-compatible Turso database**, with a write-capable database token, and add these server-side variables in Vercel → Project → Settings → Environment Variables:

| Variable | Value |
| --- | --- |
| `TURSO_DATABASE_URL` | Remote database URL supplied by your libSQL/Turso database |
| `TURSO_AUTH_TOKEN` | Database token with read/write permissions |
| `INGEST_SECRET` | A long random secret for authorized manual or external scheduled refreshes |

Redeploy after adding or changing environment variables. Tables and indexes are created automatically on first access. Opening the jobs page starts the initial collection in the background; this can take a minute. Page visits check for an hourly refresh, with a shared database lock and throttle. The top refresh button reloads the stored catalog.

Six public employer feeds are connected for India: Tata Consulting Engineers, Tata Electronics, Bosch, AECOM, Turner & Townsend and Assystem. English civil, mechanical, electrical and computer science / IT roles are included. Arbeitnow UK is secondary. The 141-company directory is a separate set of official website links; it does not mean 141 live feeds. No jobs are fabricated. Source posting dates and original application links are retained; unknown dates remain unknown. Source search/page limits make coverage partial.

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

Replace the existing project source with these files. Delete old tracked files that are absent from this package, especially `app/resume-tools.tsx`, `lib/resume-import.ts`, `app/api/assist/route.ts`, `scripts/copy-pdf-worker.mjs`, `public/pdf.worker.min.mjs`, and `tests/resume.test.ts`. Upload `.gitignore`, `.env.example`, `pnpm-lock.yaml`, and `pnpm-workspace.yaml` too. Commit to the production branch of your connected repository. Keep your existing Turso variables in Vercel; never upload actual `.env` files or tokens.

This package contains no resume builder, upload tools, resume exports, AI writing endpoint or AI credential requirement. Existing remote tables are left untouched so your job catalog is preserved.

## Computer Science / IT coverage

Computing roles are collected from the same connected sources when available. The India career searches now include software, developer and data queries. No additional employers are claimed as connected, and no sample jobs are inserted. Source pagination and search limits mean IT coverage is partial. The new collection marker starts a fresh collection after deployment while retaining the stored catalog and shared lock.


## What you can do

- Search by role, company or location
- Filter by discipline, experience, qualification and work type
- Save openings in your browser
- Check posting dates when provided by the source
- Apply through the original listing
- Explore official websites of more than 100 companies

No account or subscription is required.

## Job sources

Connected India sources include Tata Consulting Engineers,
Tata Electronics, Bosch, AECOM, Turner & Townsend and Assystem.
International listings come from Arbeitnow UK.

The company directory contains additional website links.
These are not all connected job feeds.

Coverage depends on what each source makes available.
Missing dates and salaries are left blank.

## Tech stack

- Next.js and React
- TypeScript
- Tailwind CSS
- Turso / libSQL

## Run locally

Requires Node.js 22.13+ and pnpm 11.25.0.

pnpm install

Copy `.env.example` to `.env.local` and add your database URL
and token.

pnpm dev

## Checks

pnpm test
pnpm typecheck
pnpm build

## Privacy

Saved jobs and theme preferences stay in your browser.
Applications are completed on the original source website.
Keep credentials out of source control.
