
import prisma from "@/lib/prisma";
import PromoList from "./PromoList";

export const metadata = {
  title: "Promo & Penawaran Spesial | Pytafix",
  description: "Nikmati berbagai promo menarik dan penawaran spesial servis laptop, HP, dan komputer dari Pytafix Malang.",
  alternates: { canonical: "/promo" },
  openGraph: {
    title: "Promo & Penawaran Spesial | Pytafix",
    description: "Nikmati berbagai promo menarik dan penawaran spesial servis laptop, HP, dan komputer dari Pytafix Malang.",
    url: "https://www.pytafix.web.id/promo",
    images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: "Pytafix Promo" }],
    locale: "id_ID",
    type: "website",
  },
};

export default async function PromoPage() {
  const promos = await prisma.promo.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen bg-surface">
      <PromoList promos={promos} />
    </main>
  );
}
