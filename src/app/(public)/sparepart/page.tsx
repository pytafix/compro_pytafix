import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { SparepartClient } from "@/components/SparepartClient";

const sparepartMetadata: Metadata = {
  title: "Jual Sparepart & Aksesoris Laptop di Malang",
  description: "Lihat katalog suku cadang perangkat, kondisi, stok, harga, dan pilihan pemasangan di Pytafix Malang.",
  alternates: { canonical: "/sparepart" },
  openGraph: {
    title: "Sparepart & Aksesoris Perangkat",
    description: "Lihat katalog, kondisi, stok, harga, dan pilihan pemasangan suku cadang.",
    url: "https://www.pytafix.web.id/sparepart",
    images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: "Pytafix Sparepart" }],
    locale: "id_ID",
    type: "website",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const count = await prisma.sparepart.count();
  return {
    ...sparepartMetadata,
    robots: count > 0 ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function SparepartPage() {
  const spareparts = await prisma.sparepart.findMany({
    include: { marketplaceLinks: true },
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
            Lihat stok dan detail komponen yang tersedia. Kompatibilitas, kondisi, pemasangan,
            serta cakupan garansi dikonfirmasi untuk setiap item.
          </p>
        </div>
      </section>

      {/* Client Component for Interactive Grid */}
      <SparepartClient initialSpareparts={spareparts} />
    </main>
  );
}
