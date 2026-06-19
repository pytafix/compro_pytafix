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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
