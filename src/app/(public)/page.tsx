import HomeClient from './HomeClient';
import prisma from '@/lib/prisma';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const promos = await prisma.promo.findMany({
    where: { isActive: true },
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  const spareparts = await prisma.sparepart.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' },
  });

  return <HomeClient promos={promos} spareparts={spareparts} />;
}
