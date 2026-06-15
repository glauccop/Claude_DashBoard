# NEXUS // TERMINAL — Design Kit

A reusable, framework-free design system that captures the **retro-futuristic synthwave
trading-terminal** aesthetic: neon cyan + magenta on near-black, HUD panels with corner
brackets, monospace UI, scanlines/grain atmosphere, glowing data.

## Files
| File | What it is |
|------|------------|
| `tokens.css` | CSS custom properties — colors, fonts, glows, geometry (`--nx-*`). |
| `components.css` | Component classes (`.nx-*`): atmosphere layers, panels, tabs, ticker, KPI, bars, tables, etc. |
| `chart-theme.js` | ApexCharts theme (`window.NX`): palette, base options, neon gradient fill, heatmap scale, merge helper. |
| `reference.html` | Self-contained style guide — open it to see everything in use. |

## Quick start
1. Add the fonts to your `<head>`:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=JetBrains+Mono:wght@400;500;700;800&display=swap" rel="stylesheet">
   ```
2. Link the styles (tokens **before** components):
   ```html
   <link href="tokens.css" rel="stylesheet">
   <link href="components.css" rel="stylesheet">
   ```
3. Put `nx-root` on `<body>` and drop the atmosphere layers in once:
   ```html
   <body class="nx-root">
     <div class="nx-fx-grid"></div>
     <div class="nx-fx-glow a"></div><div class="nx-fx-glow b"></div><div class="nx-fx-glow c"></div>
     <div class="nx-fx-vig"></div><div class="nx-fx-scan"></div><div class="nx-fx-noise"></div><div class="nx-fx-flicker"></div>
     <div class="nx-wrap"> … your content … </div>
   </body>
   ```

## Core building blocks
**HUD panel** (the signature component — always include the 4 corner brackets):
```html
<div class="nx-panel">
  <span class="nx-br tl"></span><span class="nx-br tr"></span><span class="nx-br bl"></span><span class="nx-br br2"></span>
  <div class="nx-phead"><span class="nx-led"></span><h3>TÍTULO</h3><span class="nx-tag">TAG</span></div>
  …content…
</div>
```
Add `mag` (`<div class="nx-panel mag">`) for the magenta variant.

**KPI:** `.nx-panel.nx-kpi` with `.lab` / `.val` / `.sub`.
**Big number:** `.nx-panel.nx-nblock` with `.big` / `.cap`.
**Bar list:** `.nx-bars` → rows of `.nx-bar` (`.nm` / `.track` > `.fill` / `.vv`). Set the fill width inline (`style="width:72%"`); `.fill.amber` for the amber variant. ⚠️ `.fill` must stay `display:block` (it does in this kit) or the bar won't show.
**Tabs:** `.nx-tabs` → `.nx-tab` (active = `.active`). **Ticker:** `.nx-ticker` > `.run` (duplicate the content twice for a seamless loop). **Table:** `.nx-table` (use `.nx-hot`/`.nx-good` for risk cells, `.nx-pill` for tags).

## Charts (ApexCharts)
```html
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
<script src="chart-theme.js"></script>
<script>
  const opt = NX.merge(NX.base, {
    chart:{ type:'area', height:300 },
    series:[{ name:'Receita', data:[/* … */] }],
    fill: NX.neonFill
  });
  new ApexCharts(document.querySelector('#chart'), opt).render();
  // heatmap: plotOptions:{ heatmap:{ colorScale: NX.heatScale(maxValue) } }
</script>
```

## Design rules (keep it on-brand)
- **Two-accent discipline:** cyan is primary, magenta is the pair. Other neons (amber/violet/green/red) are sparing highlights, mostly for status.
- **Sharp corners**, hairline borders, glow via `text-shadow`/`box-shadow` — never soft frosted glass.
- **Monospace everywhere**; Orbitron only for display numerals and the logo.
- **Atmosphere is part of the identity** — keep grid + glow + scanlines + grain + vignette.
- **Uppercase + wide letter-spacing** for labels, tags and tabs.
- Optional signature touches: a boot sequence, a live UTC clock, a scrolling KPI ticker.

This kit was extracted from the "NEXUS // TERMINAL" dashboard in this repo
(`dashboard/variation-b.html`). A matching Claude Code skill lives at
`~/.claude/skills/nexus-terminal/` so the style can be regenerated in any project.
