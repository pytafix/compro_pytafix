# Performance Findings

Audit state: 28 July 2026. Measurements are local lab evidence unless explicitly marked otherwise.

## Resolved locally

- Public image components use `next/image` with meaningful alt text and responsive `sizes`; local brand SVGs avoid the old repeated external-logo pattern.
- Hero and critical promotional/portfolio copy no longer starts at opacity zero before hydration.
- Homepage output and motion work were reduced, and responsive checks at 375, 768, and 1440 px found no horizontal overflow.
- Vercel Analytics and Speed Insights load only on Vercel, preventing local/preview script errors.
- Local Lighthouse rerun recorded mobile performance 89, desktop performance 72, accessibility 99, best practices 96, and SEO 100. Lab variance remains.

## Remaining evidence gaps

1. **Field CWV** — no current production CrUX/PageSpeed field evidence is available. Verify LCP, INP, and CLS after deployment.
2. **Font delivery** — Material Symbols still uses a Google-hosted stylesheet; test its render-blocking impact in production and consider a self-hosted/icon-component strategy if material.
3. **Bundle trend** — no bundle-analyzer baseline is committed. Add one if client payload growth becomes a problem; it is not a release blocker by itself.
4. **External media cache** — confirm deployed image cache headers and remote-host behavior after the first preview/production fetch.
