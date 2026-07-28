
import prisma from "@/lib/prisma";
import PromoList from "./PromoList";
import type { Metadata } from "next";

const promoMetadata: Metadata = {
    title: "Promo & Penawaran Spesial",
  description: "Nikmati berbagai promo menarik dan penawaran spesial servis laptop, HP, dan komputer dari Pytafix Malang.",
  alternates: { canonical: "/promo" },
  openGraph: {
  title: "Promo & Penawaran Spesial",
    description: "Nikmati berbagai promo menarik dan penawaran spesial servis laptop, HP, dan komputer dari Pytafix Malang.",
    url: "https://www.pytafix.web.id/promo",
    images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: "Pytafix Promo" }],
    locale: "id_ID",
    type: "website",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const count = await prisma.promo.count({
    where: { isActive: true, validUntil: { gte: new Date() } },
  });
  return {
    ...promoMetadata,
    robots: count > 0 ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function PromoPage() {
  const promos = await prisma.promo.findMany({
    where: { isActive: true, validUntil: { gte: new Date() } },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen bg-surface">
      <PromoList promos={promos} />
    </main>
  );
}
