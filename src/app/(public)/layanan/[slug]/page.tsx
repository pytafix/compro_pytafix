import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Metadata } from "next";
import { LOCATIONS, slugifyLocation } from "@/lib/locations";
import Image from "next/image";

interface Props {
  params: Promise<{ slug: string }>;
}

import { cache } from 'react';

const resolveServiceData = cache(async (slug: string) => {
  // 1. Direct match (e.g. /layanan/jual-beli-sparepart)
  let service = await prisma.serviceContent.findUnique({
    where: { slug }
  });
  
  if (service) return { service, location: null };

  // 2. Try matching with known locations (e.g. /layanan/jual-beli-sparepart-malang)
  for (const loc of LOCATIONS) {
    const locSlug = slugifyLocation(loc);
    const suffix = `-${locSlug}`;
    if (slug.endsWith(suffix)) {
      const baseSlug = slug.slice(0, -suffix.length);
      service = await prisma.serviceContent.findUnique({
        where: { slug: baseSlug }
      });
      if (service) return { service, location: loc };
    }
  }

  return { service: null, location: null };
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { service, location } = await resolveServiceData(slug);

  if (!service) {
    return {
      title: "Layanan Tidak Ditemukan | Pytafix",
      alternates: { canonical: `/layanan/${slug}` },
    };
  }

  if (location) {
    return {
      title: `${service.title} di ${location} | Pytafix`,
      description: `Layanan ${service.title.toLowerCase()} terdekat dan terpercaya di area ${location}. ${service.description}`,
      alternates: { canonical: `/layanan/${slug}` },
      openGraph: {
        title: `${service.title} di ${location} | Pytafix`,
        description: `Layanan ${service.title.toLowerCase()} terdekat dan terpercaya di area ${location}. ${service.description}`,
        url: `https://www.pytafix.web.id/layanan/${slug}`,
        images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: service.title }],
        locale: "id_ID",
        type: "website",
      },
    };
  }

  return {
    title: `${service.title} | Pytafix`,
    description: service.description,
    alternates: { canonical: `/layanan/${slug}` },
    openGraph: {
      title: `${service.title} | Pytafix`,
      description: service.description,
      url: `https://www.pytafix.web.id/layanan/${slug}`,
      images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: service.title }],
      locale: "id_ID",
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const { service, location } = await resolveServiceData(slug);

  if (!service || !service.isActive) {
    notFound();
  }

  const title = location ? `Layanan ${service.title} Terdekat di ${location}` : service.title;
  const introParagraph = location 
    ? `Apakah Anda mencari layanan **${service.title}** terpercaya di area **${location}** dan sekitarnya? Pytafix hadir sebagai solusi terbaik untuk kebutuhan Anda. ${service.description}`
    : service.description;

  const contentText = service.content || service.description;

  const waText = encodeURIComponent(`Halo Pytafix, saya tertarik dengan layanan:\n*${service.title}*${location ? ` di area ${location}` : ''}\n\nBisa dibantu untuk konsultasi/booking?`);
  const waLink = `https://wa.me/6281234567890?text=${waText}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://www.pytafix.web.id" },
          { "@type": "ListItem", "position": 2, "name": "Layanan", "item": "https://www.pytafix.web.id/layanan" },
          { "@type": "ListItem", "position": 3, "name": service.title }
        ]
      },
      {
        "@type": "Service",
        "serviceType": service.title,
        "provider": { "@type": "LocalBusiness", "name": "Pytafix" },
        "areaServed": location ? { "@type": "City", "name": location } : { "@type": "City", "name": "Malang" },
        "description": service.description,
      }
    ]
  };

  return (
    <main className="flex-grow">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="bg-surface-container-low py-16 md:py-20 px-4 md:px-8 lg:px-margin-desktop border-b border-outline-variant">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-headline-xl text-headline-xl text-primary mb-4 font-headline-lg-mobile text-headline-lg-mobile">
              {title}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-8 mx-auto md:mx-0">
              {introParagraph}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <Link href="/booking-servis">
                <button className="bg-primary text-on-primary font-label-bold text-label-bold px-6 py-3 md:px-8 md:py-4 rounded hover:opacity-90 transition-opacity cursor-pointer">
                  Booking Servis
                </button>
              </Link>
              <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#25D366] text-white font-label-bold text-label-bold px-6 py-3 md:px-8 md:py-4 rounded hover:bg-[#1DA851] transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">chat</span>
                Konsultasi WA
              </a>
            </div>
          </div>
          <div className="hidden md:flex w-40 h-40 lg:w-48 lg:h-48 bg-surface border border-outline-variant text-primary rounded-xl items-center justify-center overflow-hidden relative shadow-sm">
             {service.imageUrl ? (
                <Image src={service.imageUrl} alt={service.title} fill className="object-cover" />
              ) : (
                <span className="material-symbols-outlined text-[64px] lg:text-[80px]">
                  {service.icon || "build"}
                </span>
              )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-margin-desktop bg-background">
        <div className="max-w-3xl mx-auto">
          {/* Prose Markdown Slicing */}
          <div className="prose prose-lg max-w-none 
            prose-headings:font-headline-md prose-headings:text-primary prose-headings:mb-4
            prose-p:font-body-lg prose-p:text-on-surface-variant prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-primary hover:prose-a:underline
            prose-strong:text-on-surface prose-strong:font-bold
            prose-ul:text-on-surface-variant prose-ul:font-body-lg prose-li:my-1
            prose-li:marker:text-primary">
            <div className="whitespace-pre-wrap">
              {contentText}
            </div>
          </div>
          
          {location && (
             <div className="mt-12 p-6 md:p-8 bg-surface-container-lowest border border-outline-variant rounded-xl flex gap-4 items-start">
               <span className="material-symbols-outlined text-primary text-3xl shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                 location_on
               </span>
               <div>
                 <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Area Layanan {location}</h3>
                 <p className="font-body-md text-body-md text-on-surface-variant">
                   Untuk warga {location}, kami menyediakan opsi antar-jemput perangkat (pickup & delivery) atau pengerjaan langsung jika memungkinkan. Hubungi kami untuk mengatur jadwal pengecekan langsung di {location}.
                 </p>
               </div>
             </div>
          )}
          
          <hr className="my-12 border-outline-variant" />
          
          <div className="bg-surface-container border border-outline-variant p-6 md:p-8 rounded-xl flex flex-col md:flex-row items-start gap-4">
            <span className="material-symbols-outlined text-[32px] text-secondary shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified_user
            </span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Garansi Pengerjaan</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Setiap layanan perbaikan di Pytafix dilengkapi dengan garansi resmi mulai dari 14 hari hingga 6 bulan tergantung jenis perbaikan. Kepuasan Anda adalah prioritas kami.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Back Link */}
      <section className="pb-16 md:pb-24 px-4 bg-background text-center">
        <Link href="/layanan" className="text-primary font-label-bold text-label-bold hover:underline inline-flex items-center gap-2 cursor-pointer">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          Kembali ke Daftar Layanan
        </Link>
      </section>
    </main>
  );
}
