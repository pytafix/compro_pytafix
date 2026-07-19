import { Metadata } from "next";
import KontakFormClient from "./KontakFormClient";
import { SocialIcons } from "@/components/SocialIcons";
import { CONTACT } from "@/lib/config";

export const metadata: Metadata = {
  title: "Kontak Kami",
  description: "Hubungi Pytafix untuk layanan perbaikan HP, Tablet, Laptop, dan PC. Kami siap membantu menyelesaikan masalah perangkat elektronik Anda di Malang.",
  alternates: { canonical: "/kontak" },
  openGraph: {
    title: "Hubungi Pytafix | Servis Laptop, HP & Komputer Malang",
    description: "Hubungi tim teknisi profesional Pytafix untuk konsultasi dan booking servis perbaikan perangkat elektronik di Malang.",
    url: "https://www.pytafix.web.id/kontak",
    images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: "Pytafix Kontak" }],
    locale: "id_ID",
    type: "website",
  },
};

export default function KontakPage() {
  const waLink = `https://wa.me/${CONTACT.whatsapp}?text=Halo%20Pytafix,%20saya%20ingin%20berkonsultasi%20tentang%20perbaikan%20perangkat%20saya.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Hubungi Pytafix",
    "description": "Hubungi Pytafix untuk layanan perbaikan HP, Tablet, Laptop, dan PC di Malang.",
    "url": "https://www.pytafix.web.id/kontak",
    "mainEntity": {
      "@type": "Organization",
      "name": "Pytafix",
      "telephone": `+${CONTACT.whatsapp}`,
      "email": CONTACT.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jl. Elektronik No. 123",
        "addressLocality": "Malang",
        "addressRegion": "Jawa Timur",
        "addressCountry": "ID"
      }
    }
  };

  return (
    <main className="min-h-screen bg-surface-container-lowest">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="bg-surface-container-low py-16 md:py-20 px-4 md:px-8 lg:px-margin-desktop text-center border-b border-outline-variant mb-16">
        <div className="max-w-container-max mx-auto">
          <h1 className="font-headline-xl text-headline-xl text-primary mb-4 md:font-headline-xl md:text-headline-xl font-headline-lg-mobile text-headline-lg-mobile">
            Hubungi Pytafix
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Tim teknisi profesional kami siap mendengarkan dan mengatasi masalah perangkat elektronik Anda dengan cepat dan transparan.
          </p>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <div>
            <h2 className="font-headline-md text-primary mb-6">Informasi Kontak</h2>
            <p className="font-body-lg text-on-surface-variant mb-8">
              Kunjungi pusat perbaikan kami atau hubungi kami melalui saluran berikut untuk konsultasi gratis.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-outline-variant shadow-sm">
                <div className="bg-primary text-on-primary p-3 rounded-lg flex-shrink-0">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                </div>
                <div>
                  <h3 className="font-label-bold text-on-surface mb-1">Alamat Bengkel</h3>
                  <p className="font-body-md text-on-surface-variant">Jl. Elektronik No. 123<br/>Kec. Lowokwaru, Malang Raya<br/>Jawa Timur 65141</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-outline-variant shadow-sm">
                <div className="bg-primary text-on-primary p-3 rounded-lg flex-shrink-0">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
                </div>
                <div>
                  <h3 className="font-label-bold text-on-surface mb-1">Telepon & WhatsApp</h3>
                  <p className="font-body-md text-on-surface-variant">+62 881-4081-894</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-outline-variant shadow-sm">
                <div className="bg-primary text-on-primary p-3 rounded-lg flex-shrink-0">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                </div>
                <div>
                  <h3 className="font-label-bold text-on-surface mb-1">Jam Operasional</h3>
                  <p className="font-body-md text-on-surface-variant">Senin - Sabtu: 09:00 - 18:00<br/>Minggu: Tutup</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-4 p-6 bg-surface rounded-xl border border-outline-variant shadow-sm text-center">
                <h3 className="font-label-bold text-on-surface">Ikuti Sosial Media Kami</h3>
                <SocialIcons className="flex items-center justify-center gap-4 mt-2" />
              </div>
            </div>
          </div>

          {/* Right: Form, Map, Action */}
          <div className="flex flex-col gap-8">
            <div className="bg-surface border border-outline-variant rounded-xl p-6">
              <h2 className="font-headline-md text-primary mb-4">Kirim Pesan</h2>
              <KontakFormClient />
            </div>

            <div className="bg-surface-container border border-outline-variant rounded-xl overflow-hidden min-h-[250px] relative">
              <iframe
                src="https://maps.google.com/maps?q=-7.983908,112.621391&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="Lokasi Pytafix di Mapa"
              ></iframe>
            </div>

            <div className="text-center bg-surface p-6 rounded-xl border border-outline-variant shadow-sm">
               <h3 className="font-headline-sm text-on-surface mb-2">Butuh Respon Cepat?</h3>
               <p className="font-body-sm text-on-surface-variant mb-4">Chat langsung via WhatsApp untuk jawaban instan.</p>
               <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-label-bold text-label-bold transition-all bg-[#25D366] hover:bg-[#1DA851] text-white shadow-md hover:shadow-lg cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  Chat WhatsApp
               </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
