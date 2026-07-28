import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CONTACT, LEGAL_ENTITY_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/config";
import { SERVICE_PRINCIPLES } from "@/lib/site-content";
import { serializeJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Tentang Pytafix",
  description:
    "Kenali Pytafix, proses pemeriksaan perangkat, prinsip layanan, dan area operasional di Malang Raya.",
  alternates: { canonical: "/tentang-kami" },
  openGraph: {
    title: "Tentang Pytafix",
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/tentang-kami`,
    images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: "Tentang Pytafix" }],
    locale: "id_ID",
    type: "website",
  },
};

export default function TentangKami() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Tentang Pytafix",
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/tentang-kami`,
    mainEntity: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <main className="flex-grow pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />

      <section className="mb-20 border-b border-outline-variant bg-surface-container-low px-4 py-20 text-center md:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 font-headline-lg-mobile text-headline-lg-mobile text-primary md:font-headline-xl md:text-headline-xl">
            Tentang Pytafix
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Pytafix adalah layanan perangkat dari {LEGAL_ENTITY_NAME}. Fokus kami adalah
            pemeriksaan dan perbaikan laptop, HP, serta komputer dengan persetujuan pelanggan
            sebelum pengerjaan.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-container-max px-4 md:px-8 lg:px-margin-desktop">
        <section className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="flex flex-col justify-center rounded-2xl border border-outline-variant bg-surface-container-lowest p-8 md:col-span-7 md:p-12">
            <h2 className="mb-5 font-headline-md text-headline-md text-primary">
              Peran dan tanggung jawab kami
            </h2>
            <p className="text-on-surface-variant">
              Informasi awal dari pelanggan digunakan untuk menyiapkan pemeriksaan. Hasil
              pemeriksaan, opsi tindakan, komponen, dan estimasi biaya perlu dikonfirmasi sebelum
              pekerjaan dilanjutkan. Kondisi tertentu baru dapat diketahui setelah perangkat
              dibuka dengan persetujuan pelanggan.
            </p>
            <p className="mt-4 text-on-surface-variant">
              Pytafix tidak memublikasikan angka keberhasilan, lama pengalaman, sertifikasi,
              ulasan, atau jaminan komponen yang belum dapat dibuktikan. Ketentuan garansi yang
              berlaku adalah yang tercantum pada nota servis.
            </p>
          </div>
          <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-outline-variant md:col-span-5">
            <Image
              alt="Ilustrasi papan sirkuit elektronik"
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&q=80"
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
        </section>

        <section className="mb-20">
          <h2 className="mb-10 text-center font-headline-lg text-headline-lg text-primary">
            Prinsip layanan
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SERVICE_PRINCIPLES.map((principle) => (
              <article key={principle.title} className="rounded-xl border border-outline-variant bg-surface p-6">
                <span className="material-symbols-outlined text-4xl text-primary" aria-hidden="true">
                  {principle.icon}
                </span>
                <h3 className="mb-2 mt-4 font-label-bold text-on-surface">{principle.title}</h3>
                <p className="text-on-surface-variant">{principle.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-outline-variant bg-surface-container-low p-8 md:p-12">
          <h2 className="font-headline-md text-headline-md text-primary">Area dan jadwal layanan</h2>
          <p className="mt-4 text-on-surface-variant">
            Area operasional: {CONTACT.serviceArea}. Ketersediaan kunjungan atau penjemputan
            bergantung pada lokasi dan antrean. {CONTACT.hours.note}
          </p>
          <p className="mt-3 text-on-surface-variant">
            Lokasi Pytafix:{" "}
            <a
              href={CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              {CONTACT.address}
            </a>
            .
          </p>
          <p className="mt-2 text-sm text-on-surface-variant">{CONTACT.locationNote}</p>
          <p className="mt-3 text-on-surface-variant">
            Jam operasional: {CONTACT.hours.days}, {CONTACT.hours.opens}–{CONTACT.hours.closes};
            Minggu {CONTACT.hours.sunday.toLowerCase()}.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/layanan" className="rounded-full bg-primary px-6 py-3 font-label-bold text-on-primary">
              Pelajari layanan
            </Link>
            <Link href="/kontak" className="rounded-full border border-primary px-6 py-3 font-label-bold text-primary">
              Hubungi Pytafix
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
