const SAFE_FETCH_SITES = new Set(["same-origin", "same-site", "none"]);

function firstHeaderValue(value: string | null): string | null {
  return value?.split(",")[0]?.trim() || null;
}

export function hasTrustedMutationOrigin(request: Request): boolean {
  const originHeader = request.headers.get("origin");
  if (!originHeader) return false;

  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && !SAFE_FETCH_SITES.has(fetchSite)) return false;

  let origin: URL;
  let requestUrl: URL;
  try {
    origin = new URL(originHeader);
    requestUrl = new URL(request.url);
  } catch {
    return false;
  }

  if (!["http:", "https:"].includes(origin.protocol)) return false;

  const allowedHosts = new Set(
    [
      requestUrl.host,
      firstHeaderValue(request.headers.get("x-forwarded-host")),
      firstHeaderValue(request.headers.get("host")),
    ].filter((value): value is string => Boolean(value))
  );
  if (!allowedHosts.has(origin.host)) return false;

  const forwardedProto = firstHeaderValue(
    request.headers.get("x-forwarded-proto")
  );
  if (forwardedProto && `${forwardedProto}:` !== origin.protocol) return false;

  return true;
}
