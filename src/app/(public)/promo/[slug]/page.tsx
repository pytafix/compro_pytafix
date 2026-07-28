
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import PromoDetailClient from "./PromoDetailClient";
import type { Metadata } from "next";
import { serializeJsonLd } from "@/lib/json-ld";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const promo = await prisma.promo.findFirst({
    where: { slug, isActive: true, validUntil: { gte: new Date() } },
  });

  if (!promo) {
    return {
      title: "Promo Tidak Ditemukan",
      alternates: { canonical: `/promo/${slug}` },
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${promo.title} - Promo`,
    description: promo.description,
    alternates: {
      canonical: `/promo/${slug}`,
    },
    openGraph: {
    title: promo.title,
      description: promo.description,
      url: `https://www.pytafix.web.id/promo/${slug}`,
      images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: promo.title }],
      locale: "id_ID",
      type: "website",
    },
  };
}

export default async function PromoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const promoRecord = await prisma.promo.findFirst({
    where: { slug, isActive: true, validUntil: { gte: new Date() } },
  });

  if (!promoRecord) {
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
    validUntil: promoRecord.validUntil.toISOString(),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://www.pytafix.web.id" },
          { "@type": "ListItem", "position": 2, "name": "Promo", "item": "https://www.pytafix.web.id/promo" },
          { "@type": "ListItem", "position": 3, "name": promo.title }
        ]
      },
      {
        "@type": "Offer",
        "name": promo.title,
        "description": promo.description,
        "url": `https://www.pytafix.web.id/promo/${promo.slug}`,
        "validThrough": promoRecord.validUntil.toISOString(),
        "seller": { "@id": "https://www.pytafix.web.id/#organization" },
      }
    ]
  };

  return (
    <main className="min-h-screen bg-surface">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <PromoDetailClient promo={promo} />
    </main>
  );
}
