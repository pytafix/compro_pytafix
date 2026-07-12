import { Metadata } from "next";
import prisma from "@/lib/prisma";
import JualBeliClient from "./JualBeliClient";

export const metadata: Metadata = {
  title: "Jual Beli Laptop & HP Bekas Malang | Pytafix",
  description: "Beli dan jual laptop bekas, HP second, tablet dengan harga terbaik di Malang. MacBook, iPhone, Samsung, dan berbagai merek tersedia. Cek juga sparepart original.",
  alternates: { canonical: "/jual-beli" },
  openGraph: {
    title: "Jual Beli Laptop & HP Bekas Malang | Pytafix",
    description: "Pilihan laptop bekas dan HP second berkualitas di Malang. Harga terbaik, kondisi terjamin. MacBook, iPhone, Samsung, Xiaomi, dan lainnya.",
    url: "https://www.pytafix.web.id/jual-beli",
    images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: "Pytafix Jual Beli" }],
    locale: "id_ID",
    type: "website",
  },
};

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
            Jual Beli Laptop & HP
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Pilihan laptop bekas dan HP second berkualitas di Malang. Dapatkan harga terbaik untuk MacBook, iPhone, Samsung, Xiaomi, dan berbagai merek terpercaya.
          </p>
        </div>
      </section>

      <JualBeliClient initialProducts={products} />
    </main>
  );
}
