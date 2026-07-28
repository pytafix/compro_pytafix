
import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import { sanitizeContent } from '@/lib/sanitize';

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi Pytafix terkait pengelolaan data pengguna dan perangkat yang diservis.",
  alternates: { canonical: "/kebijakan-privasi" },
  openGraph: {
  title: "Kebijakan Privasi",
    description: "Kebijakan privasi Pytafix terkait pengelolaan data pengguna dan perangkat yang diservis.",
    url: "https://www.pytafix.web.id/kebijakan-privasi",
    images: [{ url: "/images/og-banner.png", width: 1200, height: 630, alt: "Pytafix Kebijakan Privasi" }],
    locale: "id_ID",
    type: "website",
  },
};

export default async function PrivacyPolicyPage() {
  const setting = await prisma.setting.findUnique({ where: { id: "privacy" } });
  const reviewedSetting = setting?.content && setting.updatedAt >= new Date("2026-07-26T00:00:00+07:00")
    ? setting
    : null;

  return (
    <main className="min-h-screen bg-surface">
      {/* Hero Header */}
      <section className="bg-surface-container-low py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-headline-md text-headline-md text-on-surface mb-4">Kebijakan Privasi</h1>
          <p className="font-body-lg text-on-surface-variant">
            Kami menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="prose">
          {reviewedSetting ? (
            <div dangerouslySetInnerHTML={{ __html: sanitizeContent(reviewedSetting.content) }} />
          ) : (
            <>
              <p className="font-body-md text-on-surface-variant mb-4">Terakhir diperbarui: 26 Juli 2026.</p>
              <h2 className="font-headline-md text-on-surface mb-6 mt-8">1. Data yang diproses</h2>
              <p className="font-body-md text-on-surface-variant mb-4">
                Pytafix memproses data yang Anda kirim melalui booking, kontak, pelacakan, dan klaim: nama, WhatsApp, alamat, detail perangkat, keluhan, jadwal, ID servis, komunikasi, serta riwayat proses servis. Email hanya dikumpulkan pada formulir yang memintanya.
              </p>
              <ul className="list-disc pl-5 font-body-md text-on-surface-variant mb-4">
                <li>Nama lengkap</li>
                <li>Nomor telepon (WhatsApp)</li>
                <li>Alamat rumah atau lokasi perbaikan</li>
                <li>Informasi detail perangkat (merk, model, dan masalah)</li>
              </ul>

              <h2 className="font-headline-md text-on-surface mb-6 mt-8">2. Tujuan dan akses</h2>
              <p className="font-body-md text-on-surface-variant mb-4">
                Data digunakan untuk meninjau permintaan, menghubungi pelanggan, menjadwalkan dan mengelola pekerjaan, menampilkan status, menangani klaim, menjaga catatan transaksi, serta memenuhi kewajiban hukum. Akses dibatasi sesuai kebutuhan operasional.
              </p>

              <h2 className="font-headline-md text-on-surface mb-6 mt-8">3. Penyedia layanan dan pengungkapan</h2>
              <p className="font-body-md text-on-surface-variant mb-4">
                Pytafix tidak menjual data pribadi. Data dapat diproses oleh penyedia hosting, basis data, penyimpanan media, analitik, dan komunikasi yang diperlukan untuk menjalankan layanan, atau diungkap bila diwajibkan oleh hukum. Penyedia tersebut memiliki kebijakan dan wilayah pemrosesan masing-masing.
              </p>

              <h2 className="font-headline-md text-on-surface mb-6 mt-8">4. Perangkat, keamanan, dan masa simpan</h2>
              <p className="font-body-md text-on-surface-variant mb-4">
                Jika akses perangkat diperlukan, pelanggan akan diminta menyetujui kebutuhan pengujian. Buat cadangan dan keluar dari akun penting sebelum servis. Data administrasi disimpan selama diperlukan untuk layanan, garansi, pembukuan, keamanan, dan kewajiban hukum, lalu dihapus atau dianonimkan ketika tidak lagi diperlukan.
              </p>

              <h2 className="font-headline-md text-on-surface mb-6 mt-8">5. Hak dan kontak privasi</h2>
              <p className="font-body-md text-on-surface-variant mb-4">
                Anda dapat meminta informasi, koreksi, atau penghapusan data yang tidak lagi diperlukan dengan menghubungi info@pytafix.web.id. Permintaan dapat memerlukan verifikasi identitas dan dapat dibatasi oleh kewajiban penyimpanan yang berlaku.
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
