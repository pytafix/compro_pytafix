import { describe, expect, it } from "vitest";
import { isManagedAdminBlobUrl } from "./blob-media";

describe("isManagedAdminBlobUrl", () => {
  it("accepts a managed admin media URL", () => {
    expect(
      isManagedAdminBlobUrl(
        "https://store.public.blob.vercel-storage.com/admin/media/example.webp"
      )
    ).toBe(true);
  });

  it.each([
    "http://store.public.blob.vercel-storage.com/admin/media/example.webp",
    "https://store.public.blob.vercel-storage.com/public/example.webp",
    "https://public.blob.vercel-storage.com/admin/media/example.webp",
    "https://store.public.blob.vercel-storage.com/admin/media/",
    "https://store.public.blob.vercel-storage.com/admin/media/example.webp?x=1",
    "https://store.public.blob.vercel-storage.com.evil.test/admin/media/example.webp",
    "not-a-url",
    "",
  ])("rejects unmanaged URL %s", (value) => {
    expect(isManagedAdminBlobUrl(value)).toBe(false);
  });
});
