import React from "react";
import prisma from "@/lib/prisma";
import PromoList from "./PromoList";

export const metadata = {
  title: "Promo & Penawaran Spesial | Pytafix",
  description: "Nikmati berbagai promo menarik dan penawaran spesial servis laptop, HP, dan komputer dari Pytafix Malang.",
  alternates: {
    canonical: "/promo",
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
