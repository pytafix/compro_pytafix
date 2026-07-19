"use client";

import { Promo, Sparepart, Testimonial, Faq } from '@prisma/client';
import { Hero } from '@/components/home/Hero';
import { BrandsMarquee } from '@/components/home/BrandsMarquee';
import { TrustBadges } from '@/components/home/TrustBadges';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { HowItWorks } from '@/components/home/HowItWorks';
import { PromoSection } from '@/components/home/PromoSection';
import { WhyUs } from '@/components/home/WhyUs';
import { StatsSection } from '@/components/home/StatsSection';
import { SparepartsCatalog } from '@/components/home/SparepartsCatalog';
import { Testimonials } from '@/components/home/Testimonials';
import { FaqSection } from '@/components/home/FaqSection';
import { CONTACT } from '@/lib/config';

export default function HomeClient({ 
  promos, 
  spareparts, 
  testimonials, 
  faqs 
}: { 
  promos: Promo[], 
  spareparts: Sparepart[], 
  testimonials: Testimonial[], 
  faqs: Faq[] 
}) {
  return (
    <main className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://www.pytafix.web.id/#organization",
                "name": "Pytafix",
                "url": "https://www.pytafix.web.id",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.pytafix.web.id/logo.png",
                  "width": 800,
                  "height": 800
                },
                "sameAs": [
                  "https://www.instagram.com/pytafix",
                  "https://www.facebook.com/share/18g8dMfLV3/",
                  "https://www.tiktok.com/@pytafix",
                  "https://www.youtube.com/@pytafix",
                  "https://www.threads.net/@pytafix"
                ]
              },
              {
                "@type": "WebSite",
                "@id": "https://www.pytafix.web.id/#website",
                "url": "https://www.pytafix.web.id",
                "name": "Pytafix",
                "publisher": { "@id": "https://www.pytafix.web.id/#organization" },
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://www.pytafix.web.id/layanan?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@type": "LocalBusiness",
                "@id": "https://www.pytafix.web.id/#localbusiness",
                "name": "Pytafix",
                "image": "https://www.pytafix.web.id/logo.png",
                "url": "https://www.pytafix.web.id",
                "telephone": `+${CONTACT.whatsapp}`,
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Jl. Elektronik No. 123",
                  "addressLocality": "Malang",
                  "addressRegion": "Jawa Timur",
                  "postalCode": "65141",
                  "addressCountry": "ID"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": -7.983908,
                  "longitude": 112.621391
                },
                "priceRange": "$$",
                "description": "Pusat perbaikan elektronik terpercaya di Malang. Melayani servis laptop, smartphone, dan komputer bergaransi.",
                "openingHoursSpecification": [
                  {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "opens": "09:00",
                    "closes": "18:00"
                  },
                  {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": "Sunday",
                    "opens": "00:00",
                    "closes": "00:01"
                  }
                ],
                "aggregateRating": testimonials.length > 0 ? {
                  "@type": "AggregateRating",
                  "ratingValue": (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1),
                  "reviewCount": testimonials.length.toString(),
                  "bestRating": "5",
                  "worstRating": "1"
                } : undefined
              },
              ...(faqs.length > 0 ? [{
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                  "@type": "Question",
                  "name": faq.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                  }
                }))
              }] : []),
            ]
          })
        }}
      />
      {/* Background Gradient Blob */}
      <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute top-40 -left-40 w-[500px] h-[500px] bg-secondary-container/20 blur-[100px] rounded-full pointer-events-none"></div>
      </div>

      <Hero />
      <BrandsMarquee />
      <TrustBadges />
      <ServicesPreview />
      <HowItWorks />
      <PromoSection promos={promos} />
      <WhyUs />
      <StatsSection />
      <SparepartsCatalog spareparts={spareparts} />
      <Testimonials testimonials={testimonials} />
      <FaqSection faqs={faqs} />
    </main>
  );
}
