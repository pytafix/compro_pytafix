import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CONTACT, SITE_URL } from "@/lib/config";
import { getServiceArea, INDEXABLE_SERVICE_AREAS } from "@/lib/service-areas";
import { PUBLIC_SERVICE_COPY } from "@/lib/site-content";
import { serializeJsonLd } from "@/lib/json-ld";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return INDEXABLE_SERVICE_AREAS.map((serviceArea) => ({ slug: serviceArea.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const serviceArea = getServiceArea(slug);
  if (!serviceArea?.indexable) {
    return {
      title: "Area Layanan Tidak Ditemukan",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: "Servis HP & Laptop Batu",
    description:
      "Informasi servis HP, laptop, komputer, sparepart, dan jual laptop untuk pelanggan di Batu. Konfirmasi jadwal dan opsi pengambilan melalui WhatsApp.",
    alternates: { canonical: `/area-layanan/${serviceArea.slug}` },
    openGraph: {
      title: "Servis HP & Laptop Batu | Pytafix",
      description:
        "Cek langkah konfirmasi layanan Pytafix untuk area Batu dan pilih jenis pemeriksaan yang sesuai.",
      url: `${SITE_URL}/area-layanan/${serviceArea.slug}`,
      images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: "Layanan Pytafix untuk area Batu" }],
      locale: "id_ID",
      type: "website",
    },
  };
}

export default async function ServiceAreaPage({ params }: Props) {
  const { slug } = await params;
  const serviceArea = getServiceArea(slug);
  if (!serviceArea?.indexable) notFound();

  const serviceEntries = Object.entries(PUBLIC_SERVICE_COPY);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Area layanan", item: `${SITE_URL}/area-layanan` },
          { "@type": "ListItem", position: 3, name: serviceArea.name },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/area-layanan/${serviceArea.slug}#webpage`,
        name: "Servis HP, Laptop, dan Komputer untuk Area Batu",
        description: "Informasi layanan Pytafix untuk pelanggan di Kota Batu dengan konfirmasi area dan jadwal sebelum kunjungan.",
        url: `${SITE_URL}/area-layanan/${serviceArea.slug}`,
        about: { "@type": "Place", name: "Kota Batu", containedInPlace: { "@type": "AdministrativeArea", name: "Malang Raya" } },
        isPartOf: { "@id": `${SITE_URL}/area-layanan#webpage` },
      },
      {
        "@type": "ItemList",
        name: "Layanan Pytafix untuk Batu",
        itemListElement: serviceEntries.map(([serviceSlug, service], index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: service.title,
          url: `${SITE_URL}/layanan/${serviceSlug}`,
        })),
      },
    ],
  };

  return (
    <main className="flex-grow">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />

      <section className="border-b border-outline-variant bg-surface-container-low px-4 py-16 md:px-8 md:py-20 lg:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-on-surface-variant">
            <Link href="/area-layanan" className="text-primary underline underline-offset-4">Area layanan</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span>{serviceArea.name}</span>
          </nav>
          <p className="mb-3 font-label-bold text-label-bold uppercase tracking-[0.12em] text-secondary">Kota Batu · Malang Raya</p>
          <h1 className="mb-5 max-w-4xl font-headline-lg-mobile text-headline-lg-mobile text-primary md:font-headline-xl md:text-headline-xl">
            Servis HP, laptop, dan komputer untuk area Batu
          </h1>
          <p className="max-w-3xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
            Batu termasuk wilayah Malang Raya. Jika Anda berada di Batu dan membutuhkan pemeriksaan perangkat, kirim kecamatan atau
            pin lokasi, jenis perangkat, serta gejala melalui WhatsApp Pytafix. Alamat layanan Pytafix berada di Polehan, Blimbing,
            Kota Malang; jadwal kunjungan, opsi penjemputan, ketersediaan komponen, dan cara serah-terima perlu dikonfirmasi lebih dulu.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Halo Pytafix, saya berada di Batu dan ingin mengonfirmasi layanan untuk perangkat saya.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-primary px-6 py-3 font-label-bold text-on-primary hover:opacity-90"
            >
              Konfirmasi via WhatsApp
            </a>
            <Link href="/kontak" className="rounded-full border border-primary px-6 py-3 font-label-bold text-primary hover:bg-primary/5">
              Lihat kontak dan peta
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background px-4 py-14 md:px-8 md:py-20 lg:px-margin-desktop">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-headline-lg text-headline-lg text-primary">Apa yang perlu disiapkan dari Batu?</h2>
          <p className="mt-4 font-body-lg leading-relaxed text-on-surface-variant">
            Informasi awal yang rapi membantu tim menentukan jalur berikutnya tanpa menjanjikan diagnosis dari jarak jauh. Ceritakan
            kapan masalah mulai muncul, apakah perangkat masih menyala, dan apakah ada benturan, cairan, panas berlebih, atau perubahan
            setelah pembaruan. Sertakan model perangkat bila diketahui. Jangan kirim kata sandi akun; akses sistem hanya dibahas bila
            pemeriksaan benar-benar memerlukannya.
          </p>
          <ol className="mt-8 space-y-4">
            <li className="flex gap-4 rounded-xl border border-outline-variant bg-surface p-5">
              <span className="font-label-bold text-secondary">01</span>
              <div><h3 className="font-label-bold text-on-surface">Tentukan kebutuhan</h3><p className="mt-1 text-on-surface-variant">Pilih pemeriksaan HP, laptop, komputer, suku cadang, atau kebutuhan jual beli.</p></div>
            </li>
            <li className="flex gap-4 rounded-xl border border-outline-variant bg-surface p-5">
              <span className="font-label-bold text-secondary">02</span>
              <div><h3 className="font-label-bold text-on-surface">Kirim lokasi dan gejala</h3><p className="mt-1 text-on-surface-variant">Sebutkan area di Kota Batu dan ringkasan kendala agar jangkauan serta jadwal dapat diperiksa.</p></div>
            </li>
            <li className="flex gap-4 rounded-xl border border-outline-variant bg-surface p-5">
              <span className="font-label-bold text-secondary">03</span>
              <div><h3 className="font-label-bold text-on-surface">Setujui langkahnya</h3><p className="mt-1 text-on-surface-variant">Estimasi, opsi komponen, risiko data, waktu, dan ketentuan garansi dibahas sebelum pengerjaan.</p></div>
            </li>
          </ol>
        </div>
      </section>

      <section className="border-y border-outline-variant bg-surface-container-low px-4 py-14 md:px-8 md:py-20 lg:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-headline-lg text-headline-lg text-primary">Pilih layanan yang sesuai</h2>
            <p className="mt-4 font-body-lg leading-relaxed text-on-surface-variant">
              Empat layanan inti Pytafix tersedia sebagai rujukan awal. Halaman berikut menjelaskan ruang lingkup pemeriksaan dan
              pertanyaan yang sebaiknya disiapkan; ketersediaan akhir tetap mengikuti hasil konfirmasi untuk perangkat Anda.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {serviceEntries.map(([serviceSlug, service]) => (
              <Link key={serviceSlug} href={`/layanan/${serviceSlug}`} className="rounded-xl border border-outline-variant bg-surface p-6 transition-colors hover:border-primary">
                <h3 className="font-headline-sm text-primary">{service.title}</h3>
                <p className="mt-3 text-on-surface-variant">{service.description}</p>
                <span className="mt-5 inline-flex font-label-bold text-primary">Baca ruang lingkup <span aria-hidden="true">→</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-4 py-14 md:px-8 md:py-20 lg:px-margin-desktop">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-headline-lg text-headline-lg text-primary">Tentang cakupan Batu</h2>
          <p className="mt-4 leading-relaxed text-on-surface-variant">
            Kota Batu terdiri dari Kecamatan Batu, Junrejo, dan Bumiaji. Daftar ini dipakai untuk membantu menyebut lokasi dengan jelas,
            bukan untuk menyatakan adanya cabang Pytafix di tiga kecamatan tersebut. Bila Anda tinggal di Junrejo atau Bumiaji, kirim
            lokasi yang lebih spesifik saat menghubungi tim agar opsi serah-terima dapat dibahas secara tepat.
          </p>
          <div className="mt-8 rounded-xl border border-outline-variant bg-surface p-6">
            <h3 className="font-headline-sm text-primary">Alamat layanan Pytafix</h3>
            <p className="mt-3 text-on-surface-variant">{CONTACT.address}</p>
            <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex font-label-bold text-primary underline underline-offset-4">
              Buka rute di Google Maps
            </a>
            <p className="mt-3 text-sm text-on-surface-variant">{CONTACT.visitNote} {CONTACT.hours.note}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-outline-variant bg-primary px-4 py-14 text-on-primary md:px-8 md:py-20 lg:px-margin-desktop">
        <div className="mx-auto flex max-w-container-max flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-headline-lg text-headline-lg">Butuh memastikan area dan jadwal?</h2>
            <p className="mt-3 max-w-2xl opacity-90">Kirim lokasi Batu dan ringkasan kendala. Anda menerima jalur berikutnya sebelum datang.</p>
          </div>
          <Link href="/booking-servis" className="shrink-0 rounded-full bg-surface px-6 py-3 font-label-bold text-primary hover:bg-surface-container">
            Mulai booking
          </Link>
        </div>
      </section>
    </main>
  );
}
