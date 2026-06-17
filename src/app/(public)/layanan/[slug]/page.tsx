import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await prisma.serviceContent.findUnique({
    where: { slug }
  });

  if (!service) {
    return {
      title: "Layanan Tidak Ditemukan | Pytafix"
    };
  }

  return {
    title: `${service.title} | Pytafix`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await prisma.serviceContent.findUnique({
    where: { slug }
  });

  if (!service || !service.isActive) {
    notFound();
  }

  const waText = encodeURIComponent(`Halo Pytafix, saya tertarik dengan layanan:\n*${service.title}*\n\nBisa dibantu untuk konsultasi/booking?`);
  const waLink = `https://wa.me/6281234567890?text=${waText}`;

  return (
    <main className="min-h-screen bg-surface-container-lowest">
      {/* Hero Section */}
      <section className="bg-primary-container text-on-primary-container py-16 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-display-md text-display-md mb-4 leading-tight">
              {service.title}
            </h1>
            <p className="font-body-lg text-body-lg opacity-90 max-w-2xl mb-8">
              {service.description}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <Link href="/booking-servis">
                <button className="bg-primary text-on-primary font-label-bold text-label-bold px-6 py-3 rounded-full hover:opacity-90 shadow-sm transition-opacity">
                  Booking Servis
                </button>
              </Link>
              <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#25D366] text-white font-label-bold text-label-bold px-6 py-3 rounded-full hover:bg-[#1DA851] shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[20px]">chat</span>
                Konsultasi WA
              </a>
            </div>
          </div>
          <div className="hidden md:flex w-32 h-32 bg-surface text-primary rounded-full items-center justify-center shadow-md">
             {service.imageUrl ? (
                <img src={service.imageUrl} alt={service.title} className="w-full h-full rounded-full object-cover" />
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
            {service.content ? (
              <div className="font-body-lg text-on-surface whitespace-pre-wrap leading-relaxed">
                {service.content}
              </div>
            ) : (
              <div className="font-body-lg text-on-surface whitespace-pre-wrap leading-relaxed">
                {service.description}
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
        <Link href="/layanan" className="text-primary font-label-bold hover:underline inline-flex items-center gap-1">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          Kembali ke Daftar Layanan
        </Link>
      </div>
    </main>
  );
}
