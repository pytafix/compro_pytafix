import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import PromoDetailClient from "./PromoDetailClient";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const promo = await prisma.promo.findUnique({
    where: { slug: params.slug },
  });

  if (!promo) {
    return {
      title: "Promo Tidak Ditemukan - Pytafix",
    };
  }

  return {
    title: `${promo.title} - Promo Pytafix`,
    description: promo.description,
  };
}

export default async function PromoDetailPage({ params }: { params: { slug: string } }) {
  const promoRecord = await prisma.promo.findUnique({
    where: { slug: params.slug },
  });

  if (!promoRecord || !promoRecord.isActive) {
    notFound();
  }

  let terms: string[] = [];
  try {
    terms = JSON.parse(promoRecord.terms);
  } catch {
    terms = promoRecord.terms.split('\n').filter(Boolean);
  }

  const promo = {
    ...promoRecord,
    terms,
  };

  return (
    <main className="min-h-screen bg-surface">
      <PromoDetailClient promo={promo} />
    </main>
  );
}
