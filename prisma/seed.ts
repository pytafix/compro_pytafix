import { PrismaClient } from "@prisma/client";
import { ARTICLE_EDITORIAL_OVERRIDES } from "../src/lib/site-content";

const prisma = new PrismaClient();

const services = [
  {
    slug: "jual-sparepart",
    title: "Jual Sparepart",
    description:
      "Katalog suku cadang laptop, HP, dan komputer. Kondisi, kompatibilitas, stok, serta ketentuan garansi dikonfirmasi untuk setiap item.",
    icon: "inventory_2",
    isActive: true,
  },
  {
    slug: "jual-laptop",
    title: "Jual Laptop",
    description:
      "Katalog laptop baru atau bekas yang sedang tersedia. Kondisi, kelengkapan, hasil pemeriksaan, dan ketentuan transaksi dicatat per unit.",
    icon: "laptop_mac",
    isActive: true,
  },
  {
    slug: "service-hp",
    title: "Service HP",
    description:
      "Pemeriksaan dan perbaikan HP untuk kendala layar, baterai, port pengisian, perangkat lunak, atau komponen lain sesuai hasil diagnosis.",
    icon: "smartphone",
    isActive: true,
  },
  {
    slug: "service-laptop",
    title: "Service Laptop",
    description:
      "Pemeriksaan dan perbaikan laptop untuk kendala daya, layar, keyboard, pendinginan, perangkat lunak, serta opsi peningkatan SSD atau RAM.",
    icon: "computer",
    isActive: true,
  },
];

const articleDates: Record<string, string> = {
  "cara-mengatasi-laptop-mati-total": "2026-01-15",
  "tips-memilih-service-hp-terpercaya": "2026-02-10",
  "kapan-ganti-baterai-laptop": "2026-03-05",
  "upgrade-ssd-ram-laptop-untuk-performa-maksimal": "2026-03-20",
  "cara-mencegah-laptop-overheating": "2026-04-01",
};

async function main() {
  console.log("Upserting core services without deleting existing records...");

  for (const service of services) {
    await prisma.serviceContent.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
    console.log(`Upserted service: ${service.title}`);
  }

  console.log("Upserting reviewed editorial articles...");

  for (const [slug, publishedAt] of Object.entries(articleDates)) {
    const editorial = ARTICLE_EDITORIAL_OVERRIDES[slug];

    if (!editorial) {
      throw new Error(`Missing reviewed editorial content for article: ${slug}`);
    }

    const article = {
      slug,
      ...editorial,
      imageUrl: "/images/og-banner.png",
      author: "Tim Editorial Pytafix",
      publishedAt: new Date(`${publishedAt}T00:00:00.000Z`),
    };

    await prisma.article.upsert({
      where: { slug },
      update: article,
      create: article,
    });
    console.log(`Upserted article: ${article.title}`);
  }

  console.log("Seed completed without destructive table cleanup.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
