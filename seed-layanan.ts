import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Layanan...');

  const services = [
    {
      slug: 'service-laptop-pc',
      title: 'Service Laptop & PC',
      description: 'Laptop mati total, lemot, bluescreen, ganti keyboard, hingga upgrade SSD/RAM. Kami memberikan diagnosa presisi tinggi untuk performa perangkat yang optimal.',
      icon: 'laptop_mac',
      isActive: true,
    },
    {
      slug: 'hp-tablet',
      title: 'HP & Tablet',
      description: 'Penggantian baterai, perbaikan LCD presisi tinggi, dan pemulihan data sistem.',
      icon: 'smartphone',
      isActive: true,
    },
    {
      slug: 'sparepart',
      title: 'Sparepart',
      description: 'Penyediaan komponen OEM bersertifikat dengan garansi pemasangan yang aman.',
      icon: 'inventory_2',
      isActive: true,
    },
    {
      slug: 'home-service',
      title: 'Home Service',
      description: 'Tidak perlu repot keluar rumah. Teknisi ahli kami siap datang ke lokasi Anda di seluruh area Malang Raya untuk perbaikan cepat langsung di tempat.',
      icon: 'directions_car',
      isActive: true,
    }
  ];

  for (const service of services) {
    await prisma.serviceContent.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }

  console.log('Layanan seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
