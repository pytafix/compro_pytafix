import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-surface flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <span className="material-symbols-outlined text-[120px] text-primary/30" style={{ fontVariationSettings: "'FILL' 1" }}>
            error
          </span>
        </div>
        <h1 className="font-headline-xl text-headline-xl text-on-surface mb-4">
          404 — Halaman Tidak Ditemukan
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
          Maaf, halaman yang kamu cari tidak tersedia atau telah dipindahkan.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-primary text-on-primary font-label-bold text-label-bold px-8 py-4 rounded hover:opacity-90 transition-opacity"
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="/kontak"
            className="border border-outline text-primary font-label-bold text-label-bold px-8 py-4 rounded hover:bg-surface-container transition-colors"
          >
            Hubungi Kami
          </Link>
        </div>
      </div>
    </main>
  );
}
