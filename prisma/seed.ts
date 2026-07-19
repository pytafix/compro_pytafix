import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning up database...');
  await prisma.serviceContent.deleteMany({});
  await prisma.sparepart.deleteMany({});
  await prisma.promo.deleteMany({});
  await prisma.portfolio.deleteMany({});
  await prisma.article.deleteMany({});
  await prisma.serviceRequest.deleteMany({});
  await prisma.setting.deleteMany({});
  console.log('Database cleaned.');

  console.log('Creating services...');
  const services = [
    {
      slug: 'jual-sparepart',
      title: 'Jual Sparepart',
      description: 'Suku cadang original laptop, HP, dan komputer dengan garansi keaslian. Tersedia RAM, SSD, baterai, LCD, keyboard, charger, dan komponen lainnya.',
      icon: 'inventory_2',
      isActive: true,
    },
    {
      slug: 'jual-laptop',
      title: 'Jual Laptop',
      description: 'Laptop baru dan bekas berkualitas: MacBook, Windows, gaming, ultrabook. Semua unit dicek kondisi, bersertifikat, dan bergaransi.',
      icon: 'laptop_mac',
      isActive: true,
    },
    {
      slug: 'service-hp',
      title: 'Service HP',
      description: 'Perbaikan HP semua merk: ganti LCD, baterai, charging port, motherboard, software, dan kerusakan cairan. Teknisi bersertifikat, bergaransi.',
      icon: 'smartphone',
      isActive: true,
    },
    {
      slug: 'service-laptop',
      title: 'Service Laptop',
      description: 'Servis laptop komprehensif: ganti keyboard, LCD, motherboard, fan, thermal paste, install ulang Windows/macOS, upgrade SSD/RAM. Garansi resmi.',
      icon: 'computer',
      isActive: true,
    },
  ];

  for (const svc of services) {
    await prisma.serviceContent.create({ data: svc });
    console.log(`Created: ${svc.title}`);
  }

  console.log('All services created!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });