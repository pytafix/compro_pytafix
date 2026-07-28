import { notFound, permanentRedirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Metadata } from "next";
import { getCanonicalServiceSlug, splitLocationServiceSlug } from "@/lib/locations";
import Image from "next/image";
import { CONTACT } from '@/lib/config';
import { serializeJsonLd } from "@/lib/json-ld";
import { renderStoredContent } from "@/lib/content";
import { getPublicServiceCopy, isPublicReviewedServiceSlug } from "@/lib/site-content";

interface Props {
  params: Promise<{ slug: string }>;
}

import { cache } from 'react';

const resolveServiceData = cache(async (slug: string) => {
  const locationVariant = splitLocationServiceSlug(slug);
  if (locationVariant) {
    const canonicalSlug = getCanonicalServiceSlug(slug);
    const baseService = await prisma.serviceContent.findUnique({
      where: { slug: canonicalSlug },
    });
    if (baseService?.isActive && isPublicReviewedServiceSlug(baseService.slug)) {
      return {
        service: baseService,
        location: locationVariant.location,
        redirectSlug: baseService.slug,
      };
    }
  }

  const service = await prisma.serviceContent.findUnique({ where: { slug } });
  if (service && !isPublicReviewedServiceSlug(service.slug)) {
    return { service: null, location: null, redirectSlug: null };
  }
  return { service, location: null, redirectSlug: null };
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { service, location, redirectSlug } = await resolveServiceData(slug);

  if (!service) {
    return {
      title: "Layanan Tidak Ditemukan",
      robots: { index: false, follow: false },
      alternates: { canonical: `/layanan/${slug}` },
    };
  }

  const publicService = getPublicServiceCopy(service);

  if (location && redirectSlug) {
    return {
      title: `${publicService.title} di ${location}`,
      description: publicService.description,
      robots: { index: false, follow: true },
      alternates: { canonical: `/layanan/${redirectSlug}` },
      openGraph: {
        title: `${publicService.title} di ${location}`,
        description: publicService.description,
        url: `https://www.pytafix.web.id/layanan/${redirectSlug}`,
        images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: publicService.title }],
        locale: "id_ID",
        type: "website",
      },
    };
  }

  return {
    title: publicService.title,
    description: publicService.description,
    alternates: { canonical: `/layanan/${slug}` },
    openGraph: {
      title: publicService.title,
      description: publicService.description,
      url: `https://www.pytafix.web.id/layanan/${slug}`,
      images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: publicService.title }],
      locale: "id_ID",
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const { service, location, redirectSlug } = await resolveServiceData(slug);

  if (!service || !service.isActive) {
    notFound();
  }

  if (location && redirectSlug) {
    permanentRedirect(`/layanan/${redirectSlug}`);
  }

  const publicService = getPublicServiceCopy(service);

  const title = publicService.title;
  const introParagraph = publicService.description;

  const contentText = publicService.content || publicService.description;

  const waText = encodeURIComponent(`Halo Pytafix, saya tertarik dengan layanan:\n*${publicService.title}*\n\nBisa dibantu untuk konsultasi/booking?`);
  const waLink = `https://wa.me/${CONTACT.whatsapp}?text=${waText}`;

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
        "serviceType": publicService.title,
        "provider": { "@id": "https://www.pytafix.web.id/#localbusiness" },
        "areaServed": { "@type": "AdministrativeArea", "name": CONTACT.serviceArea },
        "description": publicService.description,
      }
    ]
  };

  return (
    <main className="flex-grow">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
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
                <Image src={service.imageUrl} alt={service.title} fill sizes="(max-width: 768px) 100vw, 42vw" className="object-cover" />
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
            <div dangerouslySetInnerHTML={{ __html: renderStoredContent(contentText) }} />
          </div>

          <nav aria-label="Informasi terkait" className="mt-8 rounded-xl border border-outline-variant bg-surface p-6">
            <h2 className="font-headline-sm text-headline-sm text-primary mb-3">Informasi terkait</h2>
            <div className="flex flex-wrap gap-x-5 gap-y-2 font-body-md">
              <Link href="/faq" className="text-primary underline underline-offset-4">FAQ servis</Link>
              <Link href="/kontak" className="text-primary underline underline-offset-4">Kontak dan lokasi</Link>
              <Link href="/booking-servis" className="text-primary underline underline-offset-4">Booking pemeriksaan</Link>
            </div>
          </nav>
          
          <hr className="my-12 border-outline-variant" />
          
          <div className="bg-surface-container border border-outline-variant p-6 md:p-8 rounded-xl flex flex-col md:flex-row items-start gap-4">
            <span className="material-symbols-outlined text-[32px] text-secondary shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified_user
            </span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Garansi Pengerjaan</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Cakupan dan durasi garansi mengikuti jenis pekerjaan, komponen, serta keterangan yang tercantum pada nota servis.
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
