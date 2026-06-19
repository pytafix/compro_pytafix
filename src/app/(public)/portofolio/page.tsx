import React from "react";
import prisma from "@/lib/prisma";
import PortofolioClient from "./portofolio-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portofolio | Pytafix",
  description: "Portofolio servis HP dan laptop dari Pytafix",
};

export const dynamic = "force-dynamic";

export default async function PortofolioPage() {
  const cases = await prisma.portfolio.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <PortofolioClient cases={cases} />;
}
