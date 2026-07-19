import Link from "next/link";
import { SocialIcons } from "./SocialIcons";

export function Footer() {
  return (
    <footer className="bg-surface-container-highest border-t border-outline-variant w-full mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-gutter px-4 md:px-8 lg:px-margin-desktop pt-12 md:pt-16 pb-12 max-w-container-max mx-auto">
        {/* Col 1: Brand */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <span className="font-headline-md text-xl md:text-headline-md font-bold text-primary">
              Pytafix
            </span>
          </Link>
          <p className="font-label-sm text-label-sm text-on-surface-variant mb-6 pr-4 lg:pr-12">
            Solusi perbaikan hardware terpercaya untuk keberlangsungan digital Anda.
          </p>
          <div className="flex items-center gap-3">
            <SocialIcons />
          </div>
        </div>

        {/* Col 2: Layanan & Produk */}
        <div className="col-span-1">
          <h4 className="font-label-bold text-label-bold text-on-surface mb-4">
            Layanan & Produk
          </h4>
          <ul className="flex flex-col gap-3">
            <li><Link href="/layanan" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Semua Layanan</Link></li>
            <li><Link href="/booking-servis" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Booking Servis</Link></li>
            <li><Link href="/klaim-garansi" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Klaim Garansi</Link></li>
            <li><Link href="/sparepart" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Sparepart</Link></li>
            <li><Link href="/promo" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Promo Spesial</Link></li>
          </ul>
        </div>

        {/* Col 3: Informasi */}
        <div className="col-span-1">
          <h4 className="font-label-bold text-label-bold text-on-surface mb-4">
            Informasi
          </h4>
          <ul className="flex flex-col gap-3">
            <li><Link href="/tentang-kami" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Tentang Kami</Link></li>
            <li><Link href="/portofolio" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Portofolio</Link></li>
            <li><Link href="/testimoni" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Testimoni</Link></li>
            <li><Link href="/artikel" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Artikel & Tips</Link></li>
            <li><Link href="/faq" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">FAQ</Link></li>
          </ul>
        </div>

        {/* Col 4: Bantuan & Kontak */}
        <div className="col-span-1">
          <h4 className="font-label-bold text-label-bold text-on-surface mb-4">
            Bantuan
          </h4>
          <ul className="flex flex-col gap-3 mb-6">
            <li><Link href="/cek-status-servis" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Cek Status Servis</Link></li>
            <li><Link href="/kontak" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Hubungi Kami</Link></li>
            <li><Link href="/syarat-ketentuan" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Syarat & Ketentuan</Link></li>
            <li><Link href="/kebijakan-privasi" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Kebijakan Privasi</Link></li>
          </ul>
          
          <ul className="flex flex-col gap-3 mb-6">
            <li className="font-body-md text-body-md text-on-surface-variant flex items-start gap-2">
              <span className="material-symbols-outlined text-[20px] text-primary" aria-hidden="true">location_on</span>
              <span>Jl. Elektronik No. 123, Malang Raya</span>
            </li>
            <li className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-primary" aria-hidden="true">schedule</span>
              <span>Mon-Sat 09:00 - 18:00</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-outline-variant">
        <div className="max-w-container-max mx-auto px-4 md:px-8 lg:px-margin-desktop py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-label-sm text-label-sm text-on-surface-variant flex flex-col gap-2 text-center md:text-left">
            <p>
              © {new Date().getFullYear()} Pytafix. All rights reserved.
            </p>
            <p>
              Pytafix adalah bagian dari <strong>CV. Pyta Cipta Karya</strong> beserta anak usaha lainnya:{" "}
              <a href="https://www.pytafix.web.id" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Pytafix</a>,{" "}
              <a href="https://www.pytabelajar.web.id" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Pytabelajar</a>, dan{" "}
              <a href="https://www.pytagotech.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Pytagotech</a>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
