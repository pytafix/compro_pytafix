import { Promo, Sparepart, Testimonial, ServiceContent } from '@prisma/client';
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
import { SITE_URL } from '@/lib/config';
import type { PublicFaq } from '@/lib/site-content';
import { serializeJsonLd } from '@/lib/json-ld';

export default function HomeClient({ 
  promos, 
  spareparts, 
  testimonials, 
  faqs,
  services
}: { 
  promos: Promo[], 
  spareparts: Sparepart[], 
  testimonials: Testimonial[], 
  faqs: PublicFaq[],
  services: ServiceContent[]
}) {
  const publicFaqs = faqs;

  return (
    <main className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                "url": SITE_URL,
                "name": "Pytafix",
                "inLanguage": "id-ID",
                "publisher": { "@id": `${SITE_URL}/#organization` }
              },
              ...(publicFaqs.length > 0 ? [{
                "@type": "FAQPage",
                "mainEntity": publicFaqs.map(faq => ({
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
      <ServicesPreview services={services} />
      <HowItWorks />
      <PromoSection promos={promos} />
      <WhyUs />
      <StatsSection />
      <SparepartsCatalog spareparts={spareparts} />
      <Testimonials testimonials={testimonials} />
      <FaqSection faqs={publicFaqs} />
    </main>
  );
}
