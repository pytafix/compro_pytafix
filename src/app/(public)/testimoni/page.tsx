import { Metadata } from "next";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Testimoni & Ulasan Pelanggan | Pytafix",
  description: "Lihat apa kata pelanggan kami tentang layanan perbaikan dan service dari Pytafix Malang.",
  alternates: { canonical: "/testimoni" },
  openGraph: {
    title: "Testimoni & Ulasan Pelanggan | Pytafix",
    description: "Lihat apa kata pelanggan kami tentang layanan perbaikan dan service dari Pytafix Malang.",
    url: "https://www.pytafix.web.id/testimoni",
    images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: "Pytafix Testimoni" }],
    locale: "id_ID",
    type: "website",
  },
};

export default async function TestimoniPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: [
      { isFeatured: 'desc' },
      { createdAt: 'desc' }
    ]
  });

  const avgRating = testimonials.length > 0
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Testimoni & Ulasan Pelanggan | Pytafix",
    "mainEntity": avgRating ? {
      "@type": "AggregateRating",
      "itemReviewed": {
        "@type": "Organization",
        "name": "Pytafix",
        "url": "https://www.pytafix.web.id"
      },
      "ratingValue": avgRating,
      "reviewCount": testimonials.length,
      "bestRating": 5
    } : undefined
  };

  return (
    <main className="flex-grow bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="bg-surface-container-low py-16 md:py-20 px-4 md:px-8 lg:px-margin-desktop text-center border-b border-outline-variant mb-12">
        <div className="max-w-container-max mx-auto">
          <span className="material-symbols-outlined text-[48px] text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
            reviews
          </span>
          <h1 className="font-headline-xl text-headline-xl text-primary mb-4 md:font-headline-xl md:text-headline-xl font-headline-lg-mobile text-headline-lg-mobile">
            Kata Pelanggan Kami
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Kepercayaan Anda adalah motivasi terbesar kami. Berikut adalah pengalaman mereka yang telah mempercayakan perbaikan perangkatnya di Pytafix.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-8 px-4 md:px-8 lg:px-margin-desktop max-w-container-max mx-auto mb-24">
        {testimonials.length === 0 ? (
          <div className="text-center py-16 bg-surface-container-lowest rounded-2xl border border-outline-variant">
            <span className="material-symbols-outlined text-[64px] text-on-surface-variant opacity-50 mb-4">rate_review</span>
            <h2 className="font-headline-sm text-on-surface mb-2">Belum Ada Ulasan</h2>
            <p className="text-on-surface-variant font-body-md">Jadilah yang pertama memberikan ulasan setelah menggunakan layanan kami.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <div 
                key={item.id} 
                className={`bg-surface p-6 md:p-8 rounded-2xl border transition-all ${
                  item.isFeatured 
                    ? 'border-primary/30 shadow-md bg-primary/5' 
                    : 'border-outline-variant shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-headline-sm shrink-0">
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-title-md text-on-surface">{item.name}</h3>
                    <div className="flex text-amber-500 text-sm mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: i < item.rating ? "'FILL' 1" : "'FILL' 0" }}>
                          star
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="font-body-lg text-on-surface-variant italic relative z-10">
                  <span className="text-4xl font-serif text-primary/20 absolute -top-4 -left-2 -z-10">&quot;</span>
                  {item.comment}
                  <span className="text-4xl font-serif text-primary/20 absolute -bottom-6 ml-1 -z-10">&quot;</span>
                </p>
                
                <div className="mt-6 pt-4 border-t border-outline-variant/50 text-right">
                  <span className="font-label-sm text-on-surface-variant/60">
                    {new Date(item.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
