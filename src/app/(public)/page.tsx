import HomeClient from './HomeClient';
import prisma from '@/lib/prisma';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const promos = await prisma.promo.findMany({
    where: { isActive: true, isFeatured: true },
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  const spareparts = await prisma.sparepart.findMany({
    where: { isFeatured: true },
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  const testimonials = await prisma.testimonial.findMany({
    where: { isFeatured: true },
    take: 8,
    orderBy: { createdAt: 'desc' },
  });

  return <HomeClient promos={promos} spareparts={spareparts} testimonials={testimonials} />;
}
