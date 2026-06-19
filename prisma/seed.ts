import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Resetting and seeding database with Data-Driven SEO Copywriting...');

  // --- Reset existing data ---
  await prisma.serviceContent.deleteMany({});
  await prisma.sparepart.deleteMany({});

  // --- Seed Services ---
  const services = [
    {
      slug: 'service-laptop-macbook-malang',
      title: 'Service Laptop & MacBook Malang',
      description: 'Spesialis repair MacBook dan service laptop terdekat di Malang. Solusi tuntas untuk mati total, ganti baterai original, hingga perbaikan mesin (motherboard). Melayani Apple, Asus ROG, Lenovo, HP, dan Acer.',
      content: 'Pytafix melayani perbaikan segala jenis kerusakan pada Laptop dan MacBook di area Malang Raya. Teknisi kami sangat berpengalaman dalam menangani masalah berat seperti mati total, layar bergaris, kerusakan chipset, hingga perbaikan sirkuit (motherboard). Kami juga menyediakan layanan upgrade SSD dan RAM untuk mendongkrak performa laptop lama Anda agar kembali gesit.',
      icon: 'laptop_mac',
      isActive: true,
    },
    {
      slug: 'service-engsel-patah-ganti-lcd-malang',
      title: 'Service Engsel Patah & Ganti LCD',
      description: 'Servis engsel laptop patah di Malang dengan proses pengerjaan rapi dan kuat. Kami juga menyediakan layanan ganti LCD / LED laptop bergaransi resmi untuk berbagai ukuran dan pin.',
      content: 'Engsel laptop yang patah atau longgar adalah masalah umum yang sering kami temui. Jangan dibiarkan, karena dapat memicu kerusakan pada kabel fleksibel dan layar LCD. Pytafix menawarkan jasa restorasi engsel laptop agar kembali kokoh seperti baru. Selain itu, kami melayani pergantian layar LCD/LED berbagai merk dengan kualitas A+ dan jaminan garansi resmi.',
      icon: 'build',
      isActive: true,
    },
    {
      slug: 'jasa-perakitan-service-pc-komputer-malang',
      title: 'Jasa Perakitan & Service PC Komputer',
      description: 'Repair komputer dan jasa rakit PC Gaming / Kantor di Malang. Optimalisasi performa, instalasi Windows asli, manajemen kabel rapi, dan deep cleaning hardware.',
      content: 'Selain laptop, kami juga ahlinya perbaikan PC Komputer Desktop. Kami melayani jasa rakit PC sesuai budget (untuk keperluan gaming, desain, maupun operasional kantor). Proses rakitan ditangani profesional dengan manajemen kabel (cable management) yang sangat rapi dan aliran udara (airflow) yang optimal.',
      icon: 'desktop_windows',
      isActive: true,
    },
    {
      slug: 'service-hp-tablet-klojen-malang',
      title: 'Perbaikan HP & Tablet Malang (Klojen)',
      description: 'Service HP terdekat di Malang. Ganti LCD, IC Power, konektor charger, hingga masalah software. Garansi pengerjaan dan kualitas sparepart terjamin.',
      content: 'Smartphone Anda rusak? Kami memperbaiki berbagai tipe HP (Android dan iOS) serta Tablet. Mulai dari pergantian LCD, layar sentuh (touchscreen) tidak responsif, baterai kembung (drop), hingga perbaikan konektor charger. Teknisi kami bekerja secara transparan sehingga keamanan privasi data Anda terjamin.',
      icon: 'smartphone',
      isActive: true,
    },
    {
      slug: 'jual-beli-sparepart-laptop-lowokwaru',
      title: 'Pusat Sparepart Laptop Malang (Lowokwaru)',
      description: 'Jual beli sparepart laptop dan aksesoris komputer di Lowokwaru, Malang. Sedia RAM, SSD, HDD, Keyboard, Baterai, hingga Charger original.',
      content: 'Membutuhkan suku cadang untuk laptop Anda? Kami menyediakan berbagai stok sparepart original untuk berbagai merk. Mulai dari keyboard, baterai tanam/lepas, adaptor charger, RAM SODIMM, dan media penyimpanan (SSD/HDD). Semua suku cadang melewati proses Quality Control ketat sebelum dijual kepada pelanggan.',
      icon: 'inventory_2',
      isActive: true,
    }
  ];

  for (const service of services) {
    await prisma.serviceContent.create({
      data: service,
    });
  }

  // --- Seed Spareparts ---
  const spareparts = [
    {
      name: 'SSD NVMe PCIe Gen3 512GB (Jual Sparepart Laptop Malang)',
      category: 'Penyimpanan (SSD)',
      description: 'Tingkatkan performa macbook atau laptop Anda dengan SSD berkecepatan 3500MB/s. Kami jual sparepart aksesoris laptop di Malang dengan garansi distributor 3 tahun.',
      price: 650000,
      stock: 12,
    },
    {
      name: 'RAM SODIMM 8GB DDR4 3200MHz',
      category: 'Memori (RAM)',
      description: 'Pusat aksesoris dan sparepart laptop Malang. Upgrade kapasitas RAM Anda agar lancar multitasking. Kompatibel dengan merk Asus, Acer, Lenovo, dan HP.',
      price: 350000,
      stock: 25,
    },
    {
      name: 'Baterai MacBook Pro / Air Original',
      category: 'Baterai',
      description: 'Service MacBook di Malang belum lengkap tanpa sparepart berkualitas. Baterai original replacement untuk MacBook Pro/Air, daya tahan optimal dan garansi replace.',
      price: 1200000,
      stock: 5,
    },
    {
      name: 'Keyboard Laptop Lenovo / Asus / HP',
      category: 'Keyboard',
      description: 'Ganti keyboard laptop error, ghosting, atau mati sebagian. Tersedia berbagai layout untuk mayoritas tipe laptop. Pemasangan cepat oleh teknisi profesional kami.',
      price: 250000,
      stock: 10,
    },
    {
      name: 'Layar LCD/LED 14.0 inch FHD IPS 30-Pin',
      category: 'Layar / Monitor',
      description: 'Solusi untuk layar laptop bergaris atau pecah. Panel layar IPS berkualitas tinggi (Full HD). Gratis biaya pasang jika membeli sparepart langsung di toko kami.',
      price: 950000,
      stock: 3,
    }
  ];

  for (const part of spareparts) {
    await prisma.sparepart.create({
      data: part,
    });
  }

  // --- Seed Promos ---
  await prisma.promo.deleteMany({});
  await prisma.promo.create({
    data: {
      slug: "promo-gila-testing",
      title: "PROMO GILA TESTING DATABASE",
      badge: "Diskon 99%",
      description: "Ini adalah promo yang disuntikkan langsung melalui mekanisme SEED database untuk membuktikan integrasinya berhasil.",
      validUntil: "Hari Kiamat",
      terms: "[\"Syarat 1: Buktikan ini berjalan\", \"Syarat 2: Berhasil!\"]",
      howToClaim: "Cukup lihat saja di layar Anda.",
      isActive: true,
    }
  });

  // --- Seed Settings ---
  await prisma.setting.deleteMany({});
  await prisma.setting.create({
    data: {
      id: "terms",
      content: "Ini adalah Teks Syarat & Ketentuan dari hasil pengujian Seed! Sistem dinamis berjalan 100% lancar."
    }
  });
  await prisma.setting.create({
    data: {
      id: "privacy",
      content: "Kebijakan Privasi dinamis berhasil di-load dari Database."
    }
  });

  console.log('Database seeded successfully with Promos, Settings, and targeted keywords!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
