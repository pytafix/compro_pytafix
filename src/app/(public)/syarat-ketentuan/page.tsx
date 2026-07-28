
import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import { sanitizeContent } from '@/lib/sanitize';

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
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
  const reviewedSetting = setting?.content && setting.updatedAt >= new Date("2026-07-26T00:00:00+07:00")
    ? setting
    : null;

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
          {reviewedSetting ? (
            <div dangerouslySetInnerHTML={{ __html: sanitizeContent(reviewedSetting.content) }} />
          ) : (
            <>
              <p className="font-body-md text-on-surface-variant mb-4">Terakhir diperbarui: 26 Juli 2026.</p>
              <h2 className="font-headline-md text-on-surface mb-6 mt-8">1. Persetujuan pemeriksaan dan pengerjaan</h2>
              <p className="font-body-md text-on-surface-variant mb-4">
                Informasi awal belum merupakan diagnosis atau harga final. Pengerjaan dan penggantian komponen dilakukan setelah pelanggan menyetujui ruang lingkup serta estimasi biaya. Perubahan temuan perlu dikonfirmasi kembali.
              </p>

              <h2 className="font-headline-md text-on-surface mb-6 mt-8">2. Data pada perangkat</h2>
              <p className="font-body-md text-on-surface-variant mb-4">
                Pelanggan dianjurkan mencadangkan data dan keluar dari akun penting sebelum menyerahkan perangkat. Jika akses sistem diperlukan untuk diagnosis atau pengujian, kebutuhan dan batas akses harus dikonfirmasi. Pytafix akan mengambil langkah wajar untuk menjaga perangkat, tetapi proses perbaikan dapat memiliki risiko teknis yang akan dijelaskan bila diketahui.
              </p>

              <h2 className="font-headline-md text-on-surface mb-6 mt-8">3. Garansi dan klaim</h2>
              <p className="font-body-md text-on-surface-variant mb-4">
                Cakupan, durasi, komponen, dan pengecualian garansi mengikuti keterangan pada nota servis. Setiap klaim diperiksa terlebih dahulu. Kendala baru, benturan, cairan, penggunaan di luar spesifikasi, atau perubahan oleh pihak lain dapat berada di luar cakupan.
              </p>

              <h2 className="font-headline-md text-on-surface mb-6 mt-8">4. Pengambilan dan penyimpanan perangkat</h2>
              <p className="font-body-md text-on-surface-variant mb-4">
                Setelah pelanggan diberi pemberitahuan bahwa perangkat dapat diambil, Pytafix akan menghubungi pelanggan melalui data kontak yang diberikan. Biaya dan tindakan atas perangkat yang tidak diambil tidak boleh diberlakukan tanpa pemberitahuan tertulis, tenggat yang wajar, dan dasar yang sesuai hukum.
              </p>

              <h2 className="font-headline-md text-on-surface mb-6 mt-8">5. Kontak</h2>
              <p className="font-body-md text-on-surface-variant mb-4">
                Pertanyaan tentang ketentuan layanan dapat dikirim ke info@pytafix.web.id. Ketentuan khusus pada estimasi atau nota servis merupakan bagian dari persetujuan pekerjaan terkait.
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
