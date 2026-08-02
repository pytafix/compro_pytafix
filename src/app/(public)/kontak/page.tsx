import type { Metadata } from "next";
import KontakFormClient from "./KontakFormClient";
import { SocialIcons } from "@/components/SocialIcons";
import { CONTACT, SITE_URL } from "@/lib/config";
import { serializeJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Lokasi & Kontak Pytafix Malang",
  description:
    "Lihat alamat layanan Pytafix, jam operasional, area layanan, dan cara menghubungi tim untuk kebutuhan servis perangkat.",
  alternates: { canonical: "/kontak" },
  openGraph: {
    title: "Hubungi Pytafix",
    description: "Konfirmasi kebutuhan servis, area layanan, dan jadwal melalui kontak resmi Pytafix.",
    url: `${SITE_URL}/kontak`,
    images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: "Kontak Pytafix" }],
    locale: "id_ID",
    type: "website",
  },
};

export default function KontakPage() {
  const waLink = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Halo Pytafix, saya ingin berkonsultasi tentang pemeriksaan perangkat."
  )}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Hubungi Pytafix",
    description: "Kontak resmi Pytafix untuk layanan perangkat di Malang Raya.",
    url: `${SITE_URL}/kontak`,
    mainEntity: { "@id": `${SITE_URL}/#localbusiness` },
  };

  return (
    <main className="min-h-screen bg-surface-container-lowest">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />

      <section className="mb-16 border-b border-outline-variant bg-surface-container-low px-4 py-16 text-center md:px-8 md:py-20 lg:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <h1 className="mb-4 font-headline-lg-mobile text-headline-lg-mobile text-primary md:font-headline-xl md:text-headline-xl">
            Hubungi Pytafix
          </h1>
          <p className="mx-auto max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
            Ceritakan perangkat dan kendalanya. Tim akan meninjau informasi awal, lalu
            mengonfirmasi jadwal, area layanan, dan langkah pemeriksaan.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 font-headline-md text-primary">Informasi kontak resmi</h2>
            <p className="mb-8 font-body-lg text-on-surface-variant">
            Kunjungi alamat layanan kami atau hubungi tim untuk memastikan jadwal, area layanan,
            dan opsi penjemputan perangkat sebelum datang.
            </p>

            <div className="space-y-6">
              <ContactCard icon="location_on" title="Alamat layanan">
                <a
                  className="text-primary underline underline-offset-4"
                  href={CONTACT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {CONTACT.address}
                </a>
                <span className="mt-1 block text-sm">{CONTACT.visitNote}</span>
              </ContactCard>
              <ContactCard icon="call" title="Telepon dan WhatsApp">
                <a className="text-primary underline underline-offset-4" href={waLink} target="_blank" rel="noopener noreferrer">
                  {CONTACT.whatsappDisplay}
                </a>
              </ContactCard>
              <ContactCard icon="mail" title="Email">
                <a className="text-primary underline underline-offset-4" href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </a>
              </ContactCard>
              <ContactCard icon="schedule" title="Jam operasional">
                {CONTACT.hours.days}: {CONTACT.hours.opens}–{CONTACT.hours.closes}
                <br />
                Sabtu: {CONTACT.hours.saturday}
                <br />
                Minggu: {CONTACT.hours.sunday}
                <br />
                <span className="text-sm">{CONTACT.hours.note}</span>
              </ContactCard>

              <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-outline-variant bg-surface p-6 text-center shadow-sm">
                <h3 className="font-label-bold text-on-surface">Kanal sosial Pytafix</h3>
                <SocialIcons className="mt-2 flex items-center justify-center gap-4" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="rounded-xl border border-outline-variant bg-surface p-6">
              <h2 className="mb-4 font-headline-md text-primary">Kirim pesan</h2>
              <KontakFormClient />
            </div>
            <div className="rounded-xl border border-outline-variant bg-surface-container-low p-6">
              <h2 className="font-headline-md text-on-surface">Perlu konfirmasi lebih cepat?</h2>
              <p className="mb-4 mt-2 text-on-surface-variant">
                Kirim ringkasan kendala melalui WhatsApp. Waktu balasan mengikuti antrean dan jam operasional.
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-label-bold text-white"
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">chat</span>
                Buka WhatsApp
              </a>
            </div>
            <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-sm">
              <iframe
                src={CONTACT.mapEmbedUrl}
                title="Peta menuju alamat layanan Pytafix"
                className="h-[360px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="p-4">
                <a
                  href={CONTACT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-label-bold text-primary underline underline-offset-4"
                >
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                    directions
                  </span>
                  Buka rute di Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactCard({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-outline-variant bg-surface p-4 shadow-sm">
      <div className="shrink-0 rounded-lg bg-primary p-3 text-on-primary">
        <span className="material-symbols-outlined text-[28px]" aria-hidden="true">{icon}</span>
      </div>
      <div>
        <h3 className="mb-1 font-label-bold text-on-surface">{title}</h3>
        <p className="font-body-md text-on-surface-variant">{children}</p>
      </div>
    </div>
  );
}
