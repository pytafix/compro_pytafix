# Pytafix GSC and production checkpoint — 28 October 2026

Property: `sc-domain:pytafix.web.id`. Search Analytics windows end on 25 October to allow for reporting delay. This is a read-only checkpoint; no URL was submitted through Google's restricted Indexing API.

## Current evidence

| Layer | Result |
|---|---|
| Repository | `main` at `31ed151`; clean checkout at audit time |
| Production sitemap | 20 URLs; all 20 passed status, title, description, canonical, robots, H1, JSON-LD syntax, and duplicate metadata checks |
| Public copy | No internal research terms found in the HTML of all 20 sitemap URLs |
| GSC sitemap | Last submitted 10 October; last downloaded 20 October; 0 errors and 0 warnings; 20 submitted, 0 indexed in the aggregate |
| GSC URL Inspection | 13 submitted and indexed; 6 discovered but not indexed; 1 unknown |
| GSC performance | 28 September–25 October: 45 impressions, 0 clicks. Prior 28 days: 51 impressions, 3 clicks |

The sitemap aggregate and URL Inspection disagree on indexed counts. The URL-level responses show successful fetch, allowed robots, and Google-selected canonical for the 13 indexed URLs. Do not report the sitemap aggregate's zero as the site's total indexed-page count.

## URL-level inspection

**Indexed (13):** `/`, `/layanan`, `/tentang-kami`, `/artikel`, `/syarat-ketentuan`, `/kebijakan-privasi`, `/kontak`, `/faq`, `/area-layanan`, `/area-layanan/batu`, `/layanan/service-hp`, `/artikel/tips-memilih-service-hp-terpercaya`, `/artikel/kapan-ganti-baterai-laptop`.

**Discovered, not indexed (6):** `/layanan/jual-sparepart`, `/layanan/jual-laptop`, `/layanan/service-laptop`, `/artikel/cara-mengatasi-laptop-mati-total`, `/artikel/upgrade-ssd-ram-laptop-untuk-performa-maksimal`, `/artikel/cara-mencegah-laptop-overheating`.

**Unknown (1):** `/booking-servis`.

The six discovered pages all return HTTP 200, expose self-canonicals and `index, follow`, and are present in the sitemap. GSC does not provide a crawl timestamp or fetch result for them yet. These findings do not establish a technical indexing block or a content-quality cause.

## Next decision

Keep the 20-URL sitemap stable. Add only factual, consented evidence of real repairs, inventory, and reviewer expertise to the relevant pages when the owner can provide it. Reinspect the six discovered URLs and review query-to-page matches after further crawling; avoid creating more location/service pages from templates alone.
