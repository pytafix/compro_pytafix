
import prisma from "@/lib/prisma";
import PortofolioClient from "./portofolio-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portofolio Servis | Pytafix",
  description: "Lihat hasil servis HP, laptop, dan komputer (before-after) yang telah dikerjakan oleh teknisi ahli Pytafix Malang.",
  alternates: { canonical: "/portofolio" },
  openGraph: {
    title: "Portofolio Servis | Pytafix",
    description: "Lihat hasil servis HP, laptop, dan komputer (before-after) yang telah dikerjakan oleh teknisi ahli Pytafix Malang.",
    url: "https://www.pytafix.web.id/portofolio",
    images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: "Pytafix Portofolio" }],
    locale: "id_ID",
    type: "website",
  },
};

export const revalidate = 3600;

export default async function PortofolioPage() {
  const cases = await prisma.portfolio.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <PortofolioClient cases={cases} />;
}
