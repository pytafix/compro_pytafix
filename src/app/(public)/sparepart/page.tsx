import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { SparepartClient } from "@/components/SparepartClient";

export const metadata: Metadata = {
  title: "Jual Sparepart & Aksesoris Laptop di Malang | Pytafix",
  description: "Beli berbagai macam suku cadang (sparepart) original untuk komputer dan laptop Anda. Tersedia RAM, SSD, baterai, dan lainnya.",
  alternates: { canonical: "/sparepart" },
  openGraph: {
    title: "Sparepart & Aksesoris Laptop Original | Pytafix",
    description: "Beli sparepart laptop original di Pytafix Malang. Tersedia RAM, SSD, baterai, keyboard dengan garansi pemasangan resmi.",
    url: "https://www.pytafix.web.id/sparepart",
    images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: "Pytafix Sparepart" }],
    locale: "id_ID",
    type: "website",
  },
};

export default async function SparepartPage() {
  const spareparts = await prisma.sparepart.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-surface-container-lowest">
      {/* Hero Section */}
      <section className="bg-surface-container-low py-16 md:py-20 px-4 md:px-8 lg:px-margin-desktop text-center border-b border-outline-variant mb-16">
        <div className="max-w-container-max mx-auto">

          <h1 className="font-headline-xl text-headline-xl text-primary mb-4 md:font-headline-xl md:text-headline-xl font-headline-lg-mobile text-headline-lg-mobile">
            Katalog Sparepart & Aksesoris
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Tingkatkan performa perangkat Anda dengan suku cadang original. Dilengkapi garansi pemasangan untuk setiap pembelian.
          </p>
        </div>
      </section>

      {/* Client Component for Interactive Grid */}
      <SparepartClient initialSpareparts={spareparts} />
    </main>
  );
}
