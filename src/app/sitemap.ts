import { MetadataRoute } from 'next'
import prisma from "@/lib/prisma"
import { isLocationServiceSlug } from "@/lib/locations"
import { SITE_URL } from "@/lib/config"
import { isPublicReviewedArticleSlug, isPublicReviewedServiceSlug, PUBLIC_REVIEWED_ARTICLE_SLUGS, PUBLIC_REVIEWED_SERVICE_SLUGS } from "@/lib/site-content"

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}` },
    { url: `${baseUrl}/layanan` },
    { url: `${baseUrl}/tentang-kami` },
    { url: `${baseUrl}/booking-servis` },
    { url: `${baseUrl}/artikel` },
    { url: `${baseUrl}/syarat-ketentuan` },
    { url: `${baseUrl}/kebijakan-privasi` },
    { url: `${baseUrl}/kontak` },
    { url: `${baseUrl}/faq` },
  ];

  try {
  const [services, promos, articles, spareparts, products, portfolioCount, testimonialCount] = await Promise.all([
    prisma.serviceContent.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true }
    }),
    prisma.promo.findMany({
      where: { isActive: true, validUntil: { gte: new Date() } },
      select: { slug: true, updatedAt: true }
    }),
    prisma.article.findMany({
      where: { publishedAt: { lte: new Date() } },
      select: { slug: true, updatedAt: true }
    }),
    prisma.sparepart.findMany({
      select: { id: true, updatedAt: true }
    }),
    prisma.product.findMany({
      where: { isActive: true },
      select: { id: true, updatedAt: true }
    }),
    prisma.portfolio.count(),
    prisma.testimonial.count(),
  ]);

  if (promos.length > 0) staticPages.push({ url: `${baseUrl}/promo` });
  if (portfolioCount > 0) staticPages.push({ url: `${baseUrl}/portofolio` });
  if (testimonialCount > 0) staticPages.push({ url: `${baseUrl}/testimoni` });
  if (spareparts.length > 0) staticPages.push({ url: `${baseUrl}/sparepart` });
  if (products.length > 0) staticPages.push({ url: `${baseUrl}/jual-beli` });

  const dynamicPages: MetadataRoute.Sitemap = [];

  for (const service of services) {
    if (isLocationServiceSlug(service.slug) || !isPublicReviewedServiceSlug(service.slug)) continue;
    dynamicPages.push({
      url: `${baseUrl}/layanan/${service.slug}`,
      lastModified: service.updatedAt,
    });
  }

  for (const promo of promos) {
    dynamicPages.push({
      url: `${baseUrl}/promo/${promo.slug}`,
      lastModified: promo.updatedAt,
    });
  }

  for (const article of articles) {
    if (!isPublicReviewedArticleSlug(article.slug)) continue;
    dynamicPages.push({
      url: `${baseUrl}/artikel/${article.slug}`,
      lastModified: article.updatedAt,
    });
  }

  for (const sparepart of spareparts) {
    dynamicPages.push({
      url: `${baseUrl}/sparepart/${sparepart.id}`,
      lastModified: sparepart.updatedAt,
    });
  }

  for (const product of products) {
    dynamicPages.push({
      url: `${baseUrl}/jual-beli/${product.id}`,
      lastModified: product.updatedAt,
    });
  }

  return [...staticPages, ...dynamicPages];
  } catch (error) {
    console.error("Sitemap dynamic data unavailable; serving reviewed static URLs", error);
    const reviewedFallbackPages: MetadataRoute.Sitemap = [
      ...Array.from(PUBLIC_REVIEWED_SERVICE_SLUGS, (slug) => ({ url: `${baseUrl}/layanan/${slug}` })),
      ...Array.from(PUBLIC_REVIEWED_ARTICLE_SLUGS, (slug) => ({ url: `${baseUrl}/artikel/${slug}` })),
    ];
    return [...staticPages, ...reviewedFallbackPages];
  }
}
