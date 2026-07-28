import "server-only";
import { del } from "@vercel/blob";
import prisma from "@/lib/prisma";
import { isManagedAdminBlobUrl } from "@/lib/blob-media";

async function isBlobReferenced(url: string): Promise<boolean> {
  const [service, product, sparepart, portfolio, article] = await Promise.all([
    prisma.serviceContent.findFirst({ where: { imageUrl: url }, select: { id: true } }),
    prisma.product.findFirst({ where: { imageUrl: url }, select: { id: true } }),
    prisma.sparepart.findFirst({ where: { imageUrl: url }, select: { id: true } }),
    prisma.portfolio.findFirst({
      where: { OR: [{ beforeImage: url }, { afterImage: url }] },
      select: { id: true },
    }),
    prisma.article.findFirst({ where: { imageUrl: url }, select: { id: true } }),
  ]);

  return Boolean(service || product || sparepart || portfolio || article);
}

/** Best-effort cleanup for managed blobs no longer referenced by any record. */
export async function cleanupManagedBlobs(urls: unknown[]): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return;

  const uniqueUrls = [...new Set(urls.filter(isManagedAdminBlobUrl))];
  for (const url of uniqueUrls) {
    try {
      if (await isBlobReferenced(url)) continue;
      await del(url, { token });
    } catch (error) {
      // Media cleanup must not turn a successful database mutation into a 500.
      console.error("Managed media cleanup error:", error);
    }
  }
}
