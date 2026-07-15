# AI Search Readiness (GEO) Findings

## HIGH

### 1. No llms.txt or AI-accessible content endpoint
- **Issue**: Google AI Overviews, ChatGPT, Perplexity cannot easily parse site content. No structured text summary exists for AI crawlers
- **Fix**: Create `src/app/llms.txt/route.ts` returning plain-text summary of: services, contact info, FAQ, pricing philosophy. Add to robots.txt: `Allow: /llms.txt`

## MEDIUM

### 2. Business hours inconsistently stated across pages
- **Files**: `kontak/page.tsx`, `HomeClient.tsx` LocalBusiness schema, about page
- **Issue**: kontak says "Senin-Sabtu 09:00-18:00, Minggu: Tutup". LocalBusiness schema says same but no Sunday exclusion. about page has no hours at all
- **Fix**: Standardize to one source of truth. Update LocalBusiness openingHoursSpecification to explicitly exclude Sunday

### 3. HowTo schema missing for service process
- **File**: `src/app/(public)/HomeClient.tsx` lines 279-339
- **Issue**: "How it Works" section (Booking → Diagnosis → Repair → Warranty) has no HowTo structured data
- **Fix**: Add HowTo schema:
```json
{
  "@type": "HowTo",
  "name": "Cara Memperbaiki Perangkat di Pytafix",
  "step": [
    { "@type": "HowToStep", "name": "Booking", "text": "..." },
    { "@type": "HowToStep", "name": "Diagnosis", "text": "..." },
    { "@type": "HowToStep", "name": "Repair", "text": "..." },
    { "@type": "HowToStep", "name": "Warranty", "text": "..." }
  ]
}
```

### 4. Article author schema lacks authority depth
- **File**: `src/app/(public)/artikel/[slug]/page.tsx` lines 57-60
- **Issue**: `author: [{ "@type": "Person", "name": article.author }]` — no jobTitle, no sameAs social links
- **Fix**: Add `"jobTitle": "Tim Teknisi Pytafix"` and `"sameAs"` array with Instagram/social links
