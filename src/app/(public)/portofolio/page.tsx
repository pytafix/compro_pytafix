
import prisma from "@/lib/prisma";
import PortofolioClient from "./portofolio-client";
import { Metadata } from "next";

const portfolioMetadata: Metadata = {
  title: "Portofolio Servis",
  description: "Lihat dokumentasi perbaikan perangkat yang dipublikasikan Pytafix, termasuk keluhan awal dan hasil pengerjaan.",
  alternates: { canonical: "/portofolio" },
  openGraph: {
  title: "Portofolio Servis",
    description: "Lihat dokumentasi perbaikan perangkat yang dipublikasikan Pytafix, termasuk keluhan awal dan hasil pengerjaan.",
    url: "https://www.pytafix.web.id/portofolio",
    images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: "Pytafix Portofolio" }],
    locale: "id_ID",
    type: "website",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const count = await prisma.portfolio.count();
  return {
    ...portfolioMetadata,
    robots: count > 0 ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export const revalidate = 3600;

export default async function PortofolioPage() {
  const cases = await prisma.portfolio.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <PortofolioClient cases={cases} />;
}
