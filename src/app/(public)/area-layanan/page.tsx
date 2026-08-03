import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT, SITE_URL } from "@/lib/config";
import { MALANG_RAYA_AREAS, SERVICE_AREA_REGIONS } from "@/lib/service-areas";
import { PUBLIC_SERVICE_COPY } from "@/lib/site-content";
import { serializeJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Area Layanan Pytafix di Malang Raya",
  description:
    "Cek area layanan Pytafix di Kota Malang, Kota Batu, dan Kabupaten Malang. Konfirmasi jadwal, penjemputan, serta jenis servis melalui WhatsApp.",
  alternates: { canonical: "/area-layanan" },
  openGraph: {
    title: "Area Layanan Pytafix di Malang Raya",
    description:
      "Daftar wilayah Malang Raya dan cara mengonfirmasi layanan servis HP, laptop, komputer, sparepart, serta jual laptop.",
    url: `${SITE_URL}/area-layanan`,
    images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: "Area layanan Pytafix di Malang Raya" }],
    locale: "id_ID",
    type: "website",
  },
};

const regionDescriptions: Record<(typeof SERVICE_AREA_REGIONS)[number], string> = {
  "Kota Malang": "Wilayah lokasi layanan Pytafix di Polehan, Blimbing, serta kecamatan lain di dalam Kota Malang.",
  "Kota Batu": "Wilayah regional di sebelah barat Kota Malang. Informasi detail Batu membantu pelanggan menyiapkan konfirmasi area dan jadwal.",
  "Kabupaten Malang": "Kecamatan di sekitar Kota Malang dan wilayah Kabupaten Malang yang tercakup dalam istilah Malang Raya; ketersediaan layanan tetap dikonfirmasi per permintaan.",
};

export default function AreaLayananPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/area-layanan#webpage`,
        name: "Area Layanan Pytafix di Malang Raya",
        description: metadata.description,
        url: `${SITE_URL}/area-layanan`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "ItemList",
        name: "Kecamatan di Malang Raya",
        numberOfItems: MALANG_RAYA_AREAS.length,
        itemListElement: MALANG_RAYA_AREAS.map((serviceArea, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${serviceArea.name}, ${serviceArea.region}`,
        })),
      },
    ],
  };

  return (
    <main className="flex-grow">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />

      <section className="border-b border-outline-variant bg-surface-container-low px-4 py-16 md:px-8 md:py-20 lg:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <p className="mb-3 font-label-bold text-label-bold uppercase tracking-[0.12em] text-secondary">Malang Raya</p>
          <h1 className="mb-5 max-w-4xl font-headline-lg-mobile text-headline-lg-mobile text-primary md:font-headline-xl md:text-headline-xl">
            Area layanan Pytafix di Malang Raya
          </h1>
          <p className="max-w-3xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
            Pytafix beralamat di Polehan, Kecamatan Blimbing, Kota Malang. Istilah Malang Raya mencakup Kota Malang,
            Kota Batu, dan Kabupaten Malang. Untuk pelanggan di luar alamat layanan, kirimkan kecamatan, jenis perangkat,
            dan kendala melalui WhatsApp. Tim akan mengonfirmasi apakah perangkat perlu dibawa ke lokasi, apakah opsi
            penjemputan tersedia, serta jadwal yang dapat diterima sebelum Anda datang.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/kontak" className="rounded-full bg-primary px-6 py-3 font-label-bold text-on-primary hover:opacity-90">
              Konfirmasi area
            </Link>
            <Link href="/layanan" className="rounded-full border border-primary px-6 py-3 font-label-bold text-primary hover:bg-primary/5">
              Lihat semua layanan
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background px-4 py-14 md:px-8 md:py-20 lg:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <div className="max-w-3xl">
            <h2 className="font-headline-lg text-headline-lg text-primary">Cara memastikan layanan tersedia di area Anda</h2>
            <p className="mt-4 font-body-lg leading-relaxed text-on-surface-variant">
              Daftar kecamatan membantu menemukan cakupan regional, tetapi bukan janji bahwa Pytafix memiliki cabang atau teknisi
              tetap di setiap tempat. Konfirmasi singkat mencegah Anda datang ketika jadwal, komponen, atau opsi pengambilan belum siap.
            </p>
          </div>
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            <li className="rounded-xl border border-outline-variant bg-surface p-6">
              <p className="font-label-bold text-secondary">01</p>
              <h3 className="mt-3 font-headline-sm text-primary">Kirim lokasi</h3>
              <p className="mt-2 text-on-surface-variant">Sebutkan kecamatan atau kirim pin lokasi melalui WhatsApp.</p>
            </li>
            <li className="rounded-xl border border-outline-variant bg-surface p-6">
              <p className="font-label-bold text-secondary">02</p>
              <h3 className="mt-3 font-headline-sm text-primary">Jelaskan perangkat</h3>
              <p className="mt-2 text-on-surface-variant">Tulis jenis perangkat, model bila ada, dan gejala yang terlihat.</p>
            </li>
            <li className="rounded-xl border border-outline-variant bg-surface p-6">
              <p className="font-label-bold text-secondary">03</p>
              <h3 className="mt-3 font-headline-sm text-primary">Tunggu konfirmasi</h3>
              <p className="mt-2 text-on-surface-variant">Jadwal, estimasi, komponen, dan ketentuan servis dibahas sebelum pengerjaan.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="border-y border-outline-variant bg-surface-container-low px-4 py-14 md:px-8 md:py-20 lg:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-headline-lg text-headline-lg text-primary">Layanan yang dapat dibahas</h2>
            <p className="mt-4 font-body-lg leading-relaxed text-on-surface-variant">
              Ruang lingkup setiap pekerjaan mengikuti hasil pemeriksaan dan persetujuan Anda. Ketersediaan item, komponen,
              dan waktu pengerjaan perlu dikonfirmasi untuk kasus tertentu.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(PUBLIC_SERVICE_COPY).map(([slug, service]) => (
              <Link key={slug} href={`/layanan/${slug}`} className="rounded-xl border border-outline-variant bg-surface p-6 transition-colors hover:border-primary">
                <h3 className="font-headline-sm text-primary">{service.title}</h3>
                <p className="mt-3 text-on-surface-variant">{service.description}</p>
                <span className="mt-5 inline-flex font-label-bold text-primary">Lihat detail <span aria-hidden="true">→</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-4 py-14 md:px-8 md:py-20 lg:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-headline-lg text-headline-lg text-primary">Daftar wilayah Malang Raya</h2>
            <p className="mt-4 font-body-lg leading-relaxed text-on-surface-variant">
              Daftar ini mengikuti pembagian administratif resmi. Informasi detail tersedia untuk Batu, sementara area lain tetap dapat
              dikonfirmasi melalui kontak tanpa membuat halaman kota yang isinya berulang.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {SERVICE_AREA_REGIONS.map((region) => {
              const areas = MALANG_RAYA_AREAS.filter((serviceArea) => serviceArea.region === region);
              return (
                <section key={region} aria-labelledby={`region-${areas[0]?.slug}`}>
                  <h3 id={`region-${areas[0]?.slug}`} className="font-headline-sm text-primary">{region}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{regionDescriptions[region]}</p>
                  <ul className="mt-4 space-y-2">
                    {areas.map((serviceArea) => (
                      <li key={serviceArea.slug} className="flex items-start gap-2 text-on-surface-variant">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                        {serviceArea.indexable ? (
                          <Link href={`/area-layanan/${serviceArea.slug}`} className="text-primary underline underline-offset-4">
                            {serviceArea.name}
                          </Link>
                        ) : (
                          <span>{serviceArea.name}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-outline-variant bg-surface-container px-4 py-14 md:px-8 md:py-20 lg:px-margin-desktop">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-headline-lg text-headline-lg text-primary">Pertanyaan yang sering muncul</h2>
          <div className="mt-8 divide-y divide-outline-variant rounded-xl border border-outline-variant bg-surface">
            <details className="p-5" open>
              <summary className="cursor-pointer font-label-bold text-on-surface">Apakah Pytafix memiliki cabang di setiap area?</summary>
              <p className="mt-3 leading-relaxed text-on-surface-variant">Tidak. Alamat layanan yang dapat dikunjungi ada di Polehan, Blimbing, Kota Malang. Area lain perlu dikonfirmasi sebelum kunjungan atau pengaturan penjemputan.</p>
            </details>
            <details className="p-5">
              <summary className="cursor-pointer font-label-bold text-on-surface">Apa yang perlu dikirim saat meminta konfirmasi?</summary>
              <p className="mt-3 leading-relaxed text-on-surface-variant">Kirim kecamatan atau pin lokasi, jenis dan model perangkat, gejala utama, serta waktu yang diinginkan. Tim akan membahas langkah berikutnya melalui WhatsApp.</p>
            </details>
            <details className="p-5">
              <summary className="cursor-pointer font-label-bold text-on-surface">Apakah semua layanan tersedia untuk setiap area?</summary>
              <p className="mt-3 leading-relaxed text-on-surface-variant">Jenis layanan tersedia di situs, tetapi stok, komponen, jadwal, dan opsi pengambilan berbeda menurut kasus dan lokasi. Konfirmasi diperlukan sebelum pengerjaan.</p>
            </details>
          </div>
          <p className="mt-8 text-sm leading-relaxed text-on-surface-variant">
            Alamat layanan: <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">{CONTACT.address}</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
