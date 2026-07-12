import React from 'react';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import sanitizeHtml from 'sanitize-html';

export const metadata: Metadata = {
  title: "Kebijakan Privasi | Pytafix",
  description: "Kebijakan privasi Pytafix terkait pengelolaan data pengguna dan perangkat yang diservis.",
  alternates: { canonical: "/kebijakan-privasi" },
  openGraph: {
    title: "Kebijakan Privasi | Pytafix",
    description: "Kebijakan privasi Pytafix terkait pengelolaan data pengguna dan perangkat yang diservis.",
    url: "https://www.pytafix.web.id/kebijakan-privasi",
    images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: "Pytafix Kebijakan Privasi" }],
    locale: "id_ID",
    type: "website",
  },
};

export default async function PrivacyPolicyPage() {
  const setting = await prisma.setting.findUnique({ where: { id: "privacy" } });

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Header */}
      <section className="bg-surface-container-low py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-display-md text-on-surface mb-4">Kebijakan Privasi</h1>
          <p className="font-body-lg text-on-surface-variant">
            Kami menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="prose">
          {setting?.content ? (
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(setting.content) }} />
          ) : (
            <>
              <h2 className="font-headline-md text-on-surface mb-6 mt-8">1. Pengumpulan Data Selama Pemesanan</h2>
              <p className="font-body-md text-on-surface-variant mb-4">
                Saat Anda melakukan pemesanan (booking) layanan perbaikan Pytafix, kami akan mengumpulkan beberapa informasi pribadi untuk keperluan administrasi dan layanan pelanggan. Data yang dikumpulkan antara lain:
              </p>
              <ul className="list-disc pl-5 font-body-md text-on-surface-variant mb-4">
                <li>Nama lengkap</li>
                <li>Nomor telepon (WhatsApp)</li>
                <li>Alamat email</li>
                <li>Alamat rumah atau lokasi perbaikan</li>
                <li>Informasi detail perangkat (merk, model, dan masalah)</li>
              </ul>

              <h2 className="font-headline-md text-on-surface mb-6 mt-8">2. Keamanan Data</h2>
              <p className="font-body-md text-on-surface-variant mb-4">
                Kami mengimplementasikan standar keamanan yang ketat untuk melindungi data pribadi yang Anda berikan. Seluruh informasi disimpan di server yang aman dan hanya dapat diakses oleh staf internal Pytafix yang berwenang, secara eksklusif untuk kepentingan komunikasi dan penyelesaian layanan perbaikan.
              </p>

              <h2 className="font-headline-md text-on-surface mb-6 mt-8">3. Tidak Ada Pembagian kepada Pihak Ketiga</h2>
              <p className="font-body-md text-on-surface-variant mb-4">
                Privasi Anda adalah prioritas kami. Pytafix <strong>tidak akan pernah</strong> menjual, menyewakan, atau membagikan informasi pribadi Anda kepada pihak ketiga mana pun untuk tujuan pemasaran atau komersial. Data Anda mungkin hanya akan dibagikan jika diwajibkan oleh hukum atau atas permintaan otoritas yang berwenang.
              </p>

              <h2 className="font-headline-md text-on-surface mb-6 mt-8">4. Akses ke Perangkat Anda</h2>
              <p className="font-body-md text-on-surface-variant mb-4">
                Teknisi kami mungkin perlu mengakses menu utama perangkat Anda untuk menguji fungsi dasar setelah perbaikan (misalnya kamera, layar sentuh, atau speaker). Namun, teknisi kami dilarang keras membuka file pribadi, foto, aplikasi pesan, atau data sensitif lainnya tanpa izin spesifik dari Anda.
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
