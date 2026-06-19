import React from "react";
import prisma from "@/lib/prisma";
import FaqAccordion from "./FaqAccordion";

export const metadata = {
  title: "Pertanyaan yang Sering Diajukan (FAQ) | Pytafix",
  description: "Temukan jawaban atas pertanyaan yang sering diajukan mengenai layanan perbaikan, garansi, dan proses servis di Pytafix.",
  alternates: {
    canonical: "/faq",
  },
};

export default async function FaqPage() {
  const faqs = await prisma.faq.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'asc' }
  });

  return (
    <main className="min-h-screen bg-surface">
      {/* Hero Section */}
      <section className="bg-surface-container-low py-16 px-4 md:px-8 text-center border-b border-surface-container-highest">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-headline-md text-4xl md:text-5xl font-bold text-on-surface mb-4">
            Pertanyaan yang Sering Diajukan
          </h1>
          <p className="font-body-md text-lg text-on-surface-variant">
            Punya pertanyaan seputar layanan Pytafix? Temukan jawabannya di sini.
          </p>
        </div>
      </section>

      {/* Faqs Grid/Accordion */}
      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
        <FaqAccordion faqs={faqs} />
      </section>
    </main>
  );
}
