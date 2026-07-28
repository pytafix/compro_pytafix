const VERCEL_PUBLIC_BLOB_SUFFIX = ".public.blob.vercel-storage.com";
const ADMIN_MEDIA_PREFIX = "/admin/media/";

export function isManagedAdminBlobUrl(value: unknown): value is string {
  if (typeof value !== "string" || value.length > 2_048) return false;

  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.username === "" &&
      url.password === "" &&
      url.port === "" &&
      url.hostname.endsWith(VERCEL_PUBLIC_BLOB_SUFFIX) &&
      url.pathname.startsWith(ADMIN_MEDIA_PREFIX) &&
      url.pathname.length > ADMIN_MEDIA_PREFIX.length &&
      url.search === "" &&
      url.hash === ""
    );
  } catch {
    return false;
  }
}
