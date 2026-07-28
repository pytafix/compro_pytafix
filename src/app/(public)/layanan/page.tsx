import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { isLocationServiceSlug } from "@/lib/locations";
import { getPublicServiceCopy, isPublicReviewedServiceSlug, PUBLIC_SERVICE_COPY } from "@/lib/site-content";

const serviceMetadata: Metadata = {
  title: "Jasa Servis Laptop, HP, dan Komputer di Malang",
  description: "Pemeriksaan dan perbaikan laptop, HP, serta komputer di Malang dengan estimasi sebelum pengerjaan.",
  alternates: { canonical: "/layanan" },
  openGraph: {
    title: "Layanan Servis Laptop, HP & Komputer",
    description: "Lihat layanan pemeriksaan dan perbaikan perangkat Pytafix di Malang.",
    url: "https://www.pytafix.web.id/layanan",
    images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: "Pytafix Layanan Servis" }],
    locale: "id_ID",
    type: "website",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const count = await prisma.serviceContent.count({
    where: {
      isActive: true,
      slug: { in: Object.keys(PUBLIC_SERVICE_COPY) },
    },
  });
  return {
    ...serviceMetadata,
    robots: count > 0 ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function Layanan() {
  const serviceRecords = await prisma.serviceContent.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "asc" },
  });
  const services = serviceRecords
    .filter((service) => !isLocationServiceSlug(service.slug) && isPublicReviewedServiceSlug(service.slug))
    .map(getPublicServiceCopy);

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-surface-container-low py-16 md:py-20 px-4 md:px-8 lg:px-margin-desktop text-center border-b border-outline-variant">
        <div className="max-w-container-max mx-auto">
          <h1 className="font-headline-xl text-headline-xl text-primary mb-4 md:font-headline-xl md:text-headline-xl font-headline-lg-mobile text-headline-lg-mobile">
            Layanan Kami
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Pilih jenis layanan untuk melihat ruang lingkup awal. Diagnosis, opsi komponen,
            estimasi, dan ketentuan garansi dikonfirmasi sesuai kondisi perangkat.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-20 px-4 md:px-8 lg:px-margin-desktop bg-background">
        {services.length === 0 ? (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-[64px] text-on-surface-variant opacity-50 mb-4">build</span>
            <h2 className="font-headline-sm text-on-surface mb-2">Belum Ada Layanan</h2>
            <p className="text-on-surface-variant font-body-md">Layanan sedang diperbarui, silakan periksa kembali nanti.</p>
          </div>
        ) : (
          <div className="max-w-container-max mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-gutter">
            {services.map((service) => (
              <Link href={`/layanan/${service.slug}`} key={service.id} className="block group">
                <div className="bg-surface border border-outline-variant rounded p-6 hover:border-primary transition-colors flex flex-col h-full">
                  <div className="mb-4 text-primary">
                    {service.imageUrl ? (
                      <Image src={service.imageUrl} alt={service.title} width={48} height={48} className="w-12 h-12 rounded object-cover mb-2" />
                    ) : (
                      <span className="material-symbols-outlined text-4xl">
                        {service.icon || "build"}
                      </span>
                    )}
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-2 group-hover:underline">{service.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow whitespace-pre-wrap">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-secondary bg-secondary-container px-3 py-1 rounded w-fit">
                      <span className="material-symbols-outlined text-sm">
                        verified_user
                      </span>
                      <span className="font-label-bold text-label-bold">Ketentuan tertulis</span>
                    </div>
                    <span className="text-primary font-label-bold text-label-bold flex items-center gap-1 bg-primary/10 px-3 py-1 rounded group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      Lihat Detail <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Warranty Policy */}
      <section className="py-16 md:py-20 px-4 md:px-8 lg:px-margin-desktop bg-surface-container border-y border-outline-variant">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4 md:font-headline-lg md:text-headline-lg font-headline-lg-mobile text-headline-lg-mobile">
              Kebijakan Garansi
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Cakupan dan durasi mengikuti pekerjaan, komponen, serta keterangan pada nota servis.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-gutter">
            <div className="bg-surface p-6 border border-outline-variant rounded">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary" data-icon="schedule">
                  schedule
                </span>
                <h3 className="font-headline-md text-headline-md text-primary">Cakupan garansi</h3>
              </div>
              <ul className="list-disc list-inside font-body-md text-body-md text-on-surface-variant space-y-2">
                <li>Durasi dan bagian yang tercakup dicatat pada nota servis.</li>
                <li>Klaim diperiksa untuk memastikan kendala dan penyebabnya sesuai cakupan.</li>
                <li>Kerusakan baru, benturan, cairan, atau perubahan pihak lain dapat berada di luar cakupan.</li>
              </ul>
            </div>
            <div className="bg-surface p-6 border border-outline-variant rounded">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary" data-icon="fact_check">
                  fact_check
                </span>
                <h3 className="font-headline-md text-headline-md text-primary">Proses klaim</h3>
              </div>
              <ol className="list-decimal list-inside font-body-md text-body-md text-on-surface-variant space-y-2">
                <li>Siapkan ID servis dan nomor WhatsApp saat booking.</li>
                <li>Jelaskan kendala yang muncul setelah servis selesai.</li>
                <li>Tim memeriksa perangkat sebelum mengonfirmasi hasil klaim.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 md:px-8 lg:px-margin-desktop bg-primary text-on-primary text-center">
        <div className="max-w-container-max mx-auto">
          <h2 className="font-headline-lg text-headline-lg mb-4 md:font-headline-lg md:text-headline-lg font-headline-lg-mobile text-headline-lg-mobile">
            Butuh Bantuan Teknisi Kami?
          </h2>
          <p className="font-body-lg text-body-lg mb-8 max-w-2xl mx-auto opacity-90">
            Jangan biarkan masalah perangkat mengganggu produktivitas Anda. Jadwalkan perbaikan sekarang.
          </p>
          <Link href="/booking-servis">
            <button className="bg-surface text-primary font-label-bold text-label-bold px-8 py-4 rounded hover:bg-surface-container transition-colors cursor-pointer shadow-sm">
              Booking Sekarang
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
