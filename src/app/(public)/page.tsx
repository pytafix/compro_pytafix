import HomeClient from './HomeClient';
import prisma from '@/lib/prisma';

export const revalidate = 60;

export default async function Home() {
  const [promos, spareparts, testimonials, faqs, services] = await Promise.all([
    prisma.promo.findMany({ where: { isActive: true, isFeatured: true }, take: 3, orderBy: { createdAt: 'desc' } }),
    prisma.sparepart.findMany({ where: { isFeatured: true }, take: 3, orderBy: { createdAt: 'desc' } }),
    prisma.testimonial.findMany({ where: { isFeatured: true }, take: 8, orderBy: { createdAt: 'desc' } }),
    prisma.faq.findMany({ where: { isActive: true }, take: 4, orderBy: { createdAt: 'asc' } }),
    prisma.serviceContent.findMany({ where: { isActive: true }, orderBy: { createdAt: 'asc' } }),
  ]);

  return <HomeClient promos={promos} spareparts={spareparts} testimonials={testimonials} faqs={faqs} services={services} />;
}
