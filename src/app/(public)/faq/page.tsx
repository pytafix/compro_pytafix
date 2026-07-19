
import prisma from "@/lib/prisma";
import FaqAccordion from "./FaqAccordion";

export const metadata = {
  title: "Pertanyaan yang Sering Diajukan (FAQ)",
  description: "Temukan jawaban atas pertanyaan yang sering diajukan mengenai layanan perbaikan, garansi, dan proses servis di Pytafix.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ - Pertanyaan Seputar Servis Elektronik",
    description: "Temukan jawaban atas pertanyaan yang sering diajukan mengenai layanan perbaikan, garansi, dan proses servis di Pytafix Malang.",
    url: "https://www.pytafix.web.id/faq",
    images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: "Pytafix FAQ" }],
    locale: "id_ID",
    type: "website",
  },
};

export default async function FaqPage() {
  const faqs = await prisma.faq.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'asc' }
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
