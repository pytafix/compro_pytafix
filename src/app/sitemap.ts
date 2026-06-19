import { MetadataRoute } from 'next'
import prisma from "@/lib/prisma"
import { LOCATIONS, slugifyLocation } from "@/lib/locations"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pytafix.com';

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date() },
    { url: `${baseUrl}/layanan`, lastModified: new Date() },
    { url: `${baseUrl}/tentang-kami`, lastModified: new Date() },
    { url: `${baseUrl}/booking-servis`, lastModified: new Date() },
    { url: `${baseUrl}/cek-status-servis`, lastModified: new Date() },
    { url: `${baseUrl}/promo`, lastModified: new Date() },
    { url: `${baseUrl}/portofolio`, lastModified: new Date() },
    { url: `${baseUrl}/artikel`, lastModified: new Date() },
    { url: `${baseUrl}/syarat-ketentuan`, lastModified: new Date() },
    { url: `${baseUrl}/kebijakan-privasi`, lastModified: new Date() },
    { url: `${baseUrl}/kontak`, lastModified: new Date() },
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

  const dynamicPages: MetadataRoute.Sitemap = [];

  for (const service of services) {
    // Base service page
    dynamicPages.push({
      url: `${baseUrl}/layanan/${service.slug}`,
      lastModified: service.updatedAt,
    });

    // Generate location permutations
    for (const loc of LOCATIONS) {
      const locSlug = slugifyLocation(loc);
      dynamicPages.push({
        url: `${baseUrl}/layanan/${service.slug}-${locSlug}`,
        lastModified: service.updatedAt, // Inherit last modified from base service
      });
    }
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

  return [...staticPages, ...dynamicPages];
}
