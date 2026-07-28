import HomeClient from './HomeClient';
import prisma from '@/lib/prisma';
import { isLocationServiceSlug } from '@/lib/locations';
import { getPublicFaqs, getPublicServiceCopy, isPublicReviewedServiceSlug } from '@/lib/site-content';

export const revalidate = 60;

export default async function Home() {
  const [promos, spareparts, testimonials, services] = await Promise.all([
    prisma.promo.findMany({ where: { isActive: true, isFeatured: true, validUntil: { gte: new Date() } }, take: 3, orderBy: { createdAt: 'desc' } }),
    prisma.sparepart.findMany({ where: { isFeatured: true }, take: 3, orderBy: { createdAt: 'desc' } }),
    prisma.testimonial.findMany({ where: { isFeatured: true }, take: 8, orderBy: { createdAt: 'desc' } }),
    prisma.serviceContent.findMany({ where: { isActive: true }, orderBy: { createdAt: 'asc' } }),
  ]);

  return (
    <HomeClient
      promos={promos}
      spareparts={spareparts}
      testimonials={testimonials}
      faqs={getPublicFaqs()}
      services={services
        .filter((service) => !isLocationServiceSlug(service.slug) && isPublicReviewedServiceSlug(service.slug))
        .map(getPublicServiceCopy)
        .slice(0, 6)}
    />
  );
}
