import { MetadataRoute } from 'next'
import prisma from "@/lib/prisma"

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.pytafix.web.id';
  const fallbackDate = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: fallbackDate },
    { url: `${baseUrl}/layanan`, lastModified: fallbackDate },
    { url: `${baseUrl}/tentang-kami`, lastModified: fallbackDate },
    { url: `${baseUrl}/booking-servis`, lastModified: fallbackDate },
    { url: `${baseUrl}/cek-status-servis`, lastModified: fallbackDate },
    { url: `${baseUrl}/promo`, lastModified: fallbackDate },
    { url: `${baseUrl}/portofolio`, lastModified: fallbackDate },
    { url: `${baseUrl}/artikel`, lastModified: fallbackDate },
    { url: `${baseUrl}/syarat-ketentuan`, lastModified: fallbackDate },
    { url: `${baseUrl}/kebijakan-privasi`, lastModified: fallbackDate },
    { url: `${baseUrl}/kontak`, lastModified: fallbackDate },
    { url: `${baseUrl}/faq`, lastModified: fallbackDate },
    { url: `${baseUrl}/testimoni`, lastModified: fallbackDate },
    { url: `${baseUrl}/sparepart`, lastModified: fallbackDate },
    { url: `${baseUrl}/jual-beli`, lastModified: fallbackDate },
    { url: `${baseUrl}/klaim-garansi`, lastModified: fallbackDate },
    
  ];

  // Fetch all active services
  const services = await prisma.serviceContent.findMany({
    where: { isActive: true },
    select: { slug: true, updatedAt: true }
  });

  // Fetch active promos
  const promos = await prisma.promo.findMany({
    where: { isActive: true },
    select: { slug: true, updatedAt: true }
  });

  // Fetch articles
  const articles = await prisma.article.findMany({
    select: { slug: true, updatedAt: true }
  });

  // Fetch all spareparts
  const spareparts = await prisma.sparepart.findMany({
    select: { id: true, updatedAt: true }
  });

  // Fetch active products
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: { id: true, updatedAt: true }
  });

  const dynamicPages: MetadataRoute.Sitemap = [];

  for (const service of services) {
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
}
