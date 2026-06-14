# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A workspace for building **data dashboards** as standalone static HTML. There is no build system, package manager, or test suite — output is hand-authored HTML styled with Tailwind utility classes that compile in the browser at runtime. Two inputs drive the work:

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
