# Backend / API / Security Findings

Audit state: 28 July 2026. The hardened commit is live on the linked Vercel project; secret rotation, environment verification, and full production flow tests remain operational tasks.

## Critical operational actions still required

1. **Rotate exposed credentials** — any previously committed GCP/service-account material, database URLs, admin password, JWT secret, and repository tokens must be revoked/rotated in their owning providers. Do not reuse values from repository history or chat. Local code now expects environment-managed secrets; rotation cannot be completed safely from this workspace alone.
2. **Complete post-deploy runtime verification** — homepage/robots smoke checks are current, but production API flows still depend on configured Blob/Upstash/database secrets and require an authenticated smoke pass.

## Resolved locally

- Admin API routes use centralized authentication/authorization and no-store responses; public admin paths return unauthorized without a valid session.
- Public booking, contact, warranty, login, and logout mutations enforce trusted same-origin requests, bounded request bodies, schema validation, malformed-JSON handling, and no-store error responses.
- Admin requests also receive an early proxy cap (512 KB for JSON and a 6 MB multipart envelope); the upload handler enforces the stricter 5 MB file limit and magic-byte validation.
- Status lookup requires a high-entropy service ID plus the booking WhatsApp number and returns a reduced public record.
- Upload handling validates size, opaque private paths, and server-side file signatures before persistence.
- Rate limiting fails closed when the configured provider is unavailable rather than silently accepting unlimited submissions.
- Logout is same-origin protected and clears the session cookie with secure attributes.

## Remaining verification / hardening

- Confirm provider-side secret rotation and repository-history cleanup.
- Configure and verify production rate-limit credentials; then exercise booking/contact/warranty flows from a preview and production smoke test.
- Review privacy/legal copy with the data controller or counsel; local freshness gating prevents stale database text from overriding the reviewed fallback, but it is not legal advice.
- Add automated dependency and secret scanning in CI before release.
