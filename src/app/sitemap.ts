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
  ];

  // Fetch all active services
  const services = await prisma.serviceContent.findMany({
    where: { isActive: true },
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

  return [...staticPages, ...dynamicPages];
}
