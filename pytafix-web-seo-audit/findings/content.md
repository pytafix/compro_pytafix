# Content Quality Findings

## CRITICAL

### 1. Article content uses dangerouslySetInnerHTML — XSS vector
- **File**: `src/app/(public)/artikel/[slug]/page.tsx` lines 89-92
- **Issue**: Raw HTML from database rendered without sanitization. Malicious article content executes in browser
- **Fix**: Install `isomorphic-dompurify`. Sanitize: `import DOMPurify from 'isomorphic-dompurify'; dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}`

## HIGH

### 2. Testimonials hardcoded in client — not from database
- **File**: `src/app/(public)/HomeClient.tsx` lines 605-647
- **Issue**: 4 testimonials hardcoded in JSX. Prisma has Testimonial model with `isFeatured`. Hardcoded duplicates (Budi/Siti/Andi/Ratna × 2 for marquee loop)
- **Fix**: Fetch `prisma.testimonial.findMany({ where: { isFeatured: true }, take: 10 })` in server page component. Pass to HomeClient. Add AggregateRating JSON-LD

## MEDIUM

### 3. Stats on homepage (5000+ devices, 99% satisfied) are unverified claims
- **File**: `src/app/(public)/HomeClient.tsx` lines 497-519
- **Issue**: Hardcoded stats with no source. Google E-E-A-T guidelines penalize unsubstantiated claims
- **Fix**: Make dynamic from database or remove specific numbers. Add `AggregateRating` if ratings are real

### 4. Service page content stored as plain text — no semantic structure
- **File**: `src/app/(public)/layanan/[slug]/page.tsx` lines 159-169
- **Issue**: `whitespace-pre-wrap` renders all text as a single paragraph. No h2/h3/list structure from CMS
- **Fix**: If CMS supports Markdown, use remark/rehype. If plain text, add preprocessing to detect bullet patterns (lines starting with - or *)

### 5. About page hardcodes social links to other group companies
- **File**: `src/app/(public)/tentang-kami/page.tsx` lines 47-48
- **Issue**: Links to pytabelajar.web.id and pytagotech.com are not verified, not 301 redirected, and link equity bleeds out
- **Fix**: Add `rel="noopener noreferrer"` (already correct). Consider if these links should be followed or nofollow
