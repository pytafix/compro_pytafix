
import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import { sanitizeContent } from '@/lib/sanitize';

export const metadata: Metadata = {
  title: "Syarat & Ketentuan | Pytafix",
  description: "Syarat dan ketentuan layanan perbaikan perangkat elektronik di Pytafix Malang.",
  alternates: { canonical: "/syarat-ketentuan" },
  openGraph: {
  title: "Syarat & Ketentuan",
    description: "Syarat dan ketentuan layanan perbaikan perangkat elektronik di Pytafix Malang.",
    url: "https://www.pytafix.web.id/syarat-ketentuan",
    images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: "Pytafix Syarat Ketentuan" }],
    locale: "id_ID",
    type: "website",
  },
};

export default async function TermsAndConditionsPage() {
  const setting = await prisma.setting.findUnique({ where: { id: "terms" } });

  return (
    <main className="min-h-screen bg-surface">
      {/* Hero Header */}
      <section className="bg-surface-container-low py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-headline-md text-headline-md text-on-surface mb-4">Syarat & Ketentuan</h1>
          <p className="font-body-lg text-on-surface-variant">
            Harap baca dengan saksama sebelum menggunakan layanan perbaikan kami.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="prose">
          {setting?.content ? (
            <div dangerouslySetInnerHTML={{ __html: sanitizeContent(setting.content) }} />
          ) : (
            <>
              <h2 className="font-headline-md text-on-surface mb-6 mt-8">1. Tanggung Jawab Kehilangan Data</h2>
              <p className="font-body-md text-on-surface-variant mb-4">
                Pytafix tidak bertanggung jawab atas kehilangan, kerusakan, atau kebocoran data yang terjadi selama proses perbaikan perangkat. Pelanggan diwajibkan untuk melakukan pencadangan (backup) seluruh data penting sebelum menyerahkan perangkat kepada teknisi kami. Segala bentuk kompensasi terkait kehilangan data tidak dapat kami berikan.
              </p>

              <h2 className="font-headline-md text-on-surface mb-6 mt-8">2. Garansi Perbaikan 90 Hari</h2>
              <p className="font-body-md text-on-surface-variant mb-4">
                Kami memberikan garansi perbaikan selama 90 hari sejak perangkat selesai diperbaiki dan diserahkan kembali kepada pelanggan. Garansi ini mencakup:
              </p>
              <ul className="list-disc pl-5 font-body-md text-on-surface-variant mb-4">
                <li>Kerusakan pada suku cadang yang sama yang kami ganti.</li>
                <li>Masalah pada layanan atau pengerjaan yang sebelumnya kami lakukan.</li>
              </ul>
              <p className="font-body-md text-on-surface-variant mb-4">
                Garansi batal jika kerusakan diakibatkan oleh kelalaian pengguna (seperti jatuh, terkena cairan), pembongkaran oleh pihak ketiga, atau masalah pada komponen lain yang tidak terkait dengan perbaikan awal.
              </p>

              <h2 className="font-headline-md text-on-surface mb-6 mt-8">3. Kebijakan Perangkat Terbengkalai</h2>
              <p className="font-body-md text-on-surface-variant mb-4">
                Perangkat yang telah selesai diperbaiki atau dibatalkan perbaikannya harus diambil oleh pelanggan selambat-lambatnya 90 hari sejak pemberitahuan diberikan. Jika perangkat tidak diambil melewati batas waktu tersebut, maka:
              </p>
              <ul className="list-disc pl-5 font-body-md text-on-surface-variant mb-4">
                <li>Perangkat dianggap telah ditinggalkan (abandoned device).</li>
                <li>Pytafix berhak mendaur ulang, menjual, atau membuang perangkat tersebut untuk menutupi biaya penyimpanan dan perbaikan (jika ada).</li>
                <li>Pelanggan kehilangan hak atas perangkat dan tidak dapat menuntut ganti rugi.</li>
              </ul>

              <h2 className="font-headline-md text-on-surface mb-6 mt-8">4. Persetujuan Layanan</h2>
              <p className="font-body-md text-on-surface-variant mb-4">
                Dengan menyerahkan perangkat kepada kami, pelanggan secara otomatis menyetujui seluruh Syarat & Ketentuan yang berlaku di Pytafix.
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
