import React from "react";
import prisma from "@/lib/prisma";
import PortofolioClient from "./portofolio-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portofolio Servis | Pytafix",
  description: "Lihat hasil servis HP, laptop, dan komputer (before-after) yang telah dikerjakan oleh teknisi ahli Pytafix Malang.",
  alternates: {
    canonical: "/portofolio",
  },
};

export const dynamic = "force-dynamic";

export default async function PortofolioPage() {
  const cases = await prisma.portfolio.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <PortofolioClient cases={cases} />;
}
