# Backend / API / Security Findings

## CRITICAL

### 1. GCP Service Account JSON committed to repository
- **File**: `pytafix-web/google-service-account.json`
- **Issue**: GCP credentials in repo. Anyone with repo access has service account key
- **Fix (IMMEDIATE)**:
  1. Revoke the GCP key in Google Cloud Console
  2. `rm google-service-account.json`
  3. Add to .gitignore
  4. Use Vercel Environment Variables for the credential path
  5. Run `git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch google-service-account.json'` or BFG

### 2. Hardcoded weak JWT_SECRET and ADMIN_PASSWORD
- **File**: `.env` lines 5-6
- **Issue**: `JWT_SECRET='pytafix_super_secret_key_2024'` — predictable, low entropy. `ADMIN_PASSWORD='admin'` — trivially brute-forced
- **Fix (IMMEDIATE)**:
  - `ADMIN_PASSWORD`: generate with `openssl rand -base64 24`
  - `JWT_SECRET`: `openssl rand -base64 32`
  - Move both to Vercel Environment Variables
  - Delete the .env file or replace with `.env.example` template

## HIGH

### 3. No rate limiting on public API endpoints
- **Files**: `src/app/api/booking/route.ts`, `src/app/api/status/route.ts`, `src/app/api/warranty/route.ts`
- **Issue**: No rate limiting. Flooding risk on booking/warranty endpoints. No CAPTCHA on forms
- **Fix**: Add `@upstash/ratelimit` or Vercel Edge rate limiting. Add honeypot field to booking form. Consider hCaptcha

### 4. Status API returns full PII without authentication
- **File**: `src/app/api/status/route.ts` lines 13-23
- **Issue**: GET `/api/status?trackingId=X` returns name, address, whatsapp, problem description without auth. Tracking IDs are guessable
- **Fix**: Return only `{ status, updatedAt }` publicly. Full record requires session. Add rate limiting per IP

### 5. Database credentials in committed .env file
- **File**: `.env` lines 3-4
- **Issue**: POSTGRES_PRISMA_URL and POSTGRES_URL_NON_POOLING visible in repo
- **Fix**: Rotate Neon credentials. Remove from .env. Use Vercel Environment Variables only

### 6. .gitignore likely incomplete
- **Evidence**: google-service-account.json is committed. .env is tracked
- **Fix**: Audit .gitignore. Block all `*.json` in root except `package.json`. Block all `.env*` except `.env.example`

## MEDIUM

### 7. No CORS configuration
- **Issue**: API routes don't set explicit allowed origins
- **Fix**: Add CORS config in next.config.ts restricting to `pytafix.web.id` and `www.pytafix.web.id`

### 8. Booking API validates only field presence, not format
- **File**: `src/app/api/booking/route.ts`
- **Issue**: No Zod validation, no phone format regex, no length limits
- **Fix**: Use `serviceRequestSchema` from `lib/validations.ts` in API route

### 9. Logout clears cookie without CSRF token
- **File**: `src/app/api/auth/logout/route.ts`
- **Issue**: POST /api/auth/logout has no CSRF protection — logout can be triggered from other origins
- **Fix**: Add SameSite=Strict + ensure cookie httponly on login (already correct). Add CSRF token if multi-origin
