import { Metadata } from "next";
import prisma from "@/lib/prisma";
import JualBeliClient from "./JualBeliClient";

const productMetadata: Metadata = {
    title: "Jual Beli Laptop, HP, dan Tablet di Malang",
  description: "Lihat perangkat aktif yang ditawarkan Pytafix beserta kondisi, stok, harga, dan tautan pembelian.",
  alternates: { canonical: "/jual-beli" },
  openGraph: {
  title: "Jual Beli Laptop, HP, dan Tablet di Malang",
    description: "Lihat perangkat aktif beserta kondisi, stok, harga, dan tautan pembelian.",
    url: "https://www.pytafix.web.id/jual-beli",
    images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: "Pytafix Jual Beli" }],
    locale: "id_ID",
    type: "website",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const count = await prisma.product.count({ where: { isActive: true } });
  return {
    ...productMetadata,
    robots: count > 0 ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function JualBeliPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: { marketplaceLinks: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-surface-container-lowest">
      {/* Hero Section */}
      <section className="bg-surface-container-low py-16 md:py-20 px-4 md:px-8 lg:px-margin-desktop text-center border-b border-outline-variant mb-16">
        <div className="max-w-container-max mx-auto">
          <h1 className="font-headline-xl text-headline-xl text-primary mb-4 md:font-headline-xl md:text-headline-xl font-headline-lg-mobile text-headline-lg-mobile">
            Jual Beli Laptop, HP, dan Tablet
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Katalog hanya menampilkan perangkat yang ditandai aktif. Periksa kondisi, stok,
            harga, dan detail penjual sebelum mengambil keputusan.
          </p>
        </div>
      </section>

      <JualBeliClient initialProducts={products} />
    </main>
  );
}
