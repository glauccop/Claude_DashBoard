# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A workspace for building **data dashboards**. It has two products: (1) standalone static HTML dashboards (no build system — hand-authored HTML with Tailwind compiled in the browser) and (2) `servicenow-app/`, the same dashboard as a scoped ServiceNow app built with the Now SDK (the only part with npm/build; see "ServiceNow app" below). Two inputs drive the static work:

- `design-system/` — a reference design (a single page, "Aurora Garden Control") that defines the visual language to match.
- `dataset/` — the CSV data to visualize.

A new dashboard is typically a new `.html` file that pulls data from `dataset/` and reuses the patterns, tokens, and vendored assets in `design-system/`.

## Running / previewing

No build step. Open the HTML directly, or serve the folder so relative asset paths resolve:

```bash
python3 -m http.server 8000   # then open http://localhost:8000/design-system/
```

Tailwind classes are compiled **client-side** by the bundled runtime (`design-system/assets/resource_*.js` is the Tailwind browser runtime, not a pre-built stylesheet) — there is nothing to recompile after editing classes; just reload.

## Design system (`design-system/index.html`)

The reference page is self-contained and loads everything from `design-system/assets/` (vendored, no CDN at runtime):

- **Tailwind browser runtime** — `resource_*.js`. All styling is utility classes on elements; there is no separate authored CSS beyond the inline `--border-gradient` helper in `<head>`.
- **Icons** — Iconify (`iconify_*.js`) with the **Solar** icon set (`data-icon="solar:..."`) and Lucide (`lucide_*.js`). Inline `<svg class="iconify ...">` is the norm.
- **Fonts** — ~20 Google Fonts vendored as local `css2_*.css` + `.woff2`, each exposed as a `.font-*` utility class (e.g. `.font-geist`, `.font-playfair`).
- **Animated background** — UnicornStudio canvas (`.aura-background-component`) loaded from a jsDelivr CDN script.
- **Image fallback** — a tail `<script>` swaps broken `<img>` src to Supabase-hosted fallbacks via a hash; local images live in `assets/`.

Visual conventions to match when authoring new cards/sections:

- Dark base: `bg-neutral-950 text-white`, centered `max-w-7xl` container, 12-column responsive grid (`grid-cols-1 md:grid-cols-8 lg:grid-cols-12`).
- Glassmorphism cards: `bg-gradient-to-br from-white/10 to-white/0 rounded-3xl ... backdrop-blur-lg` with a gradient hairline border via inline style `--border-gradient` + `--border-radius-before` (the `::before` rule is defined once in `<head>`).
- Accent cards use solid saturated fills (`bg-cyan-500`, `bg-yellow-400`, `bg-emerald-600`) with `border border-white/15` and matching `shadow-*-900/40`.

The page is decorative/mock content ("garden irrigation"); treat it as a **style reference**, not as data wiring.

## Datasets (`dataset/`)

E-commerce sample data, all CSV with header rows. Note `orders.csv` is large (~25k rows) — sample or aggregate rather than reading whole into context.

- `orders.csv` — line-item grain (~25k). order/customer ids, date parts (year/month/quarter/day_of_week), product, category, prices, discount, shipping, tax, totals, payment_method, device_used, delivery, order_status, returned, customer_rating, session metrics.
- `customers.csv` — one row per customer (~8k). demographics, membership_tier, totals, RFM-style fields, preferred_*, acquisition_channel, newsletter, churned.
- `monthly_revenue.csv` — pre-aggregated monthly time series (76 rows): orders, revenue, AOV, discount, return_rate, customers.
- `product_summary.csv` — pre-aggregated per product (141 rows): orders, revenue, avg price/rating, return/discount rates, delivery days.

Prefer the pre-aggregated tables (`monthly_revenue`, `product_summary`) for trend/summary charts; derive from `orders`/`customers` only when a needed cut isn't already summarized.

## ServiceNow app (`servicenow-app/`) — operating guide for Claude

Scoped app `x_snc_dashboard_se` (Now SDK 4.7.2, React 18, Aurora components). Tables: `x_snc_dashboard_se_{order,customer,product_summary,monthly_revenue}`. One Scripted REST API `GET /api/x_snc_dashboard_se/dashboard/data` aggregates everything; four UI Pages (aurora, balanco, nexus, portal) consume it. Server code in `src/server/` (aggregations), definitions in `src/fluent/`, React in `src/client/`. User-facing steps live in the root `README.md` ("Deploy no ServiceNow") — keep both in sync when changing the flow.

### Prerequisites (check before acting)

1. `node -v` ≥ 18; run `npm install` in `servicenow-app/` if `node_modules/` is missing (it is gitignored).
2. A target instance URL **from the user** — never assume. `nowdemo` is only the default of `upload-data.mjs`; override with `SN_INSTANCE`.
3. Authentication exists: `npx now-sdk auth --list` (run inside `servicenow-app/`). If there is no credential for the instance, do NOT guess one — tell the user to run it themselves, e.g. `! npx now-sdk auth --add https://<inst>.service-now.com --type basic --alias <alias>` (interactive, prompts for the password), then `npx now-sdk auth --use <alias>`.
4. Data lives at the repo root: CSVs in `dataset/` (used by `scripts/upload-data.mjs`) and `.xlsx` in `dataset/dataset-servicenow/` (for manual Import Set / Load Data).

### Workflow

```bash
cd servicenow-app
npm run build                    # tsc + bundle UI Pages; fix errors before deploying
npm run deploy                   # now-sdk install → default auth alias; confirm target with the user first
node scripts/upload-data.mjs --dry     # then without --dry; env: SN_INSTANCE + SN_TOKEN | SN_USER/SN_PASS | .sn-upload.json
node scripts/upload-data.mjs --check   # verify counts: order ≈25k, customer ≈8k, product_summary 140, monthly_revenue 75
```

Verify with the REST endpoint above (needs auth) and, if the `jarvis-servicenow` MCP is connected, `servicenow_count_records` / `servicenow_aggregate_query` on the tables. Use the `servicenow-sdk:now-sdk` skill for SDK/Fluent questions and `servicenow-browser-testing` for UI checks.

### Rules

- **Credentials**: never write passwords/tokens into tracked files, commands echoed to the log, or commits. `.sn-upload.json`, `get_data.sh` and `.now/` are gitignored. Prefer env vars or the SDK's own credential store.
- Deploying and uploading write to a shared instance: confirm the instance and alias with the user before `npm run deploy` or a non-`--dry` upload; `--wipe` deletes data, so only run it when explicitly asked.
- Do not commit `node_modules/`, `dist/`, `target/`.
- Changing the REST payload means updating `src/client/shared/types.ts` (the `DashboardData` contract) together with `src/server/aggregations/`.
- `dashboard/data.json` (local demo) and the REST payload are separate pipelines (`scripts/aggregate.py` vs the Scripted REST); keep their shapes aligned when editing either.
