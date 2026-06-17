import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Metadata } from "next";
import { LOCATIONS, slugifyLocation } from "@/lib/locations";
import Image from "next/image";

interface Props {
  params: Promise<{ slug: string }>;
}

async function resolveServiceData(slug: string) {
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
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { service, location } = await resolveServiceData(slug);

  if (!service) {
    return {
      title: "Layanan Tidak Ditemukan | Pytafix"
    };
  }

  if (location) {
    return {
      title: `${service.title} di ${location} | Pytafix`,
      description: `Layanan ${service.title.toLowerCase()} terdekat dan terpercaya di area ${location}. ${service.description}`,
    };
  }

  return {
    title: `${service.title} | Pytafix`,
    description: service.description,
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

  return (
    <main className="min-h-screen bg-surface-container-lowest">
      {/* Hero Section */}
      <section className="bg-primary-container text-on-primary-container py-16 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-display-md text-display-md mb-4 leading-tight">
              {title}
            </h1>
            <p className="font-body-lg text-body-lg opacity-90 max-w-2xl mb-8">
              {introParagraph}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <Link href="/booking-servis">
                <button className="bg-primary text-on-primary font-label-bold text-label-bold px-6 py-3 rounded-full hover:opacity-90 shadow-sm transition-opacity cursor-pointer">
                  Booking Servis
                </button>
              </Link>
              <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#25D366] text-white font-label-bold text-label-bold px-6 py-3 rounded-full hover:bg-[#1DA851] shadow-sm transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">chat</span>
                Konsultasi WA
              </a>
            </div>
          </div>
          <div className="hidden md:flex w-32 h-32 bg-surface text-primary rounded-full items-center justify-center shadow-md overflow-hidden relative">
             {service.imageUrl ? (
                <Image src={service.imageUrl} alt={service.title} fill className="object-cover" />
              ) : (
                <span className="material-symbols-outlined text-[64px]">
                  {service.icon || "build"}
                </span>
              )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-surface border border-outline-variant p-8 md:p-12 rounded-2xl shadow-sm">
          <div className="prose prose-lg prose-headings:text-primary prose-a:text-primary max-w-none">
            <div className="font-body-lg text-on-surface whitespace-pre-wrap leading-relaxed">
              {contentText}
            </div>
            
            {location && (
               <div className="mt-8 p-4 bg-surface-container-lowest border border-outline-variant rounded-lg">
                 <h3 className="font-headline-sm text-primary mb-2">Area Layanan {location}</h3>
                 <p className="font-body-md text-on-surface-variant">
                   Untuk warga {location}, kami menyediakan opsi antar-jemput perangkat (pickup & delivery) atau pengerjaan langsung jika memungkinkan. Hubungi kami untuk mengatur jadwal pengecekan langsung di {location}.
                 </p>
               </div>
            )}
          </div>
          
          <hr className="my-10 border-outline-variant" />
          
          <div className="bg-secondary-container text-on-secondary-container p-6 rounded-xl flex items-start gap-4">
            <span className="material-symbols-outlined text-[32px] text-secondary">verified_user</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm mb-2">Garansi Pengerjaan</h3>
              <p className="font-body-md">Setiap layanan perbaikan di Pytafix dilengkapi dengan garansi resmi mulai dari 14 hari hingga 6 bulan tergantung jenis perbaikan. Kepuasan Anda adalah prioritas kami.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Back Link */}
      <div className="pb-16 text-center">
        <Link href="/layanan" className="text-primary font-label-bold hover:underline inline-flex items-center gap-1 cursor-pointer">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          Kembali ke Daftar Layanan
        </Link>
      </div>
    </main>
  );
}
