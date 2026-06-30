import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-surface-container-highest border-t border-outline-variant w-full mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-gutter px-4 md:px-8 lg:px-margin-desktop pt-12 md:pt-16 pb-12 max-w-container-max mx-auto">
        {/* Col 1: Brand */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Image
              alt="Pytafix Logo"
              className="h-8 w-8 md:h-10 md:w-10 object-contain"
              src="/logo.png"
              width={40}
              height={40}
            />
            <span className="font-headline-md text-xl md:text-headline-md font-bold text-primary">
              Pytafix
            </span>
          </Link>
          <p className="font-label-sm text-label-sm text-on-surface-variant mb-6 pr-4">
            Solusi perbaikan hardware terpercaya untuk keberlangsungan digital
            Anda.
          </p>
        </div>

        {/* Col 2: Navigasi */}
        <div className="col-span-1">
          <h4 className="font-label-bold text-label-bold text-on-surface mb-4">
            Navigasi Utama
          </h4>
          <ul className="flex flex-col gap-3">
            <li><Link href="/layanan" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Layanan Servis</Link></li>
            <li><Link href="/sparepart" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Sparepart</Link></li>
            <li><Link href="/portofolio" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Portofolio</Link></li>
            <li><Link href="/promo" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Promo Spesial</Link></li>
            <li><Link href="/artikel" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Artikel & Tips</Link></li>
          </ul>
        </div>

        {/* Col 3: Bantuan & Legal */}
        <div className="col-span-1">
          <h4 className="font-label-bold text-label-bold text-on-surface mb-4">
            Bantuan & Legal
          </h4>
          <ul className="flex flex-col gap-3">
            <li><Link href="/cek-status-servis" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Cek Status Servis</Link></li>
            <li><Link href="/kontak" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Hubungi Kami</Link></li>
            <li><Link href="/syarat-ketentuan" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Syarat & Ketentuan</Link></li>
            <li><Link href="/kebijakan-privasi" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Kebijakan Privasi</Link></li>
          </ul>
        </div>

        {/* Col 4: Kontak & Social */}
        <div className="col-span-1">
          <h4 className="font-label-bold text-label-bold text-on-surface mb-4">
            Kontak & Lokasi
          </h4>
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
          <div className="flex items-center gap-3">
            <a href="https://www.facebook.com/pytafix" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center rounded-full bg-surface hover:bg-primary hover:text-on-primary text-on-surface-variant transition-all border border-outline-variant shadow-sm hover:shadow-md hover:-translate-y-1" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/pytafix" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center rounded-full bg-surface hover:bg-primary hover:text-on-primary text-on-surface-variant transition-all border border-outline-variant shadow-sm hover:shadow-md hover:-translate-y-1" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.93 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.98 5.98 0 0 0 2.126-1.384 5.98 5.98 0 0 0 1.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.98 5.98 0 0 0-1.384-2.126C21.319 1.347 20.651.935 19.886.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@pytafix" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center rounded-full bg-surface hover:bg-primary hover:text-on-primary text-on-surface-variant transition-all border border-outline-variant shadow-sm hover:shadow-md hover:-translate-y-1" aria-label="TikTok">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.12-1.02 4.14-2.5 5.56-1.43 1.37-3.3 2.14-5.32 2.1-2.22-.05-4.32-1.02-5.71-2.65-1.39-1.63-2.07-3.8-1.92-5.94.15-2.22 1.25-4.25 2.93-5.59 1.63-1.3 3.73-1.89 5.8-1.58.07.02.15.03.22.05v4.22c-.06-.02-.13-.03-.19-.05-1.07-.3-2.21-.19-3.18.32-.93.48-1.62 1.34-1.89 2.36-.26 1.02-.09 2.14.48 3.01.57.88 1.48 1.46 2.54 1.58 1.07.13 2.16-.14 3.01-.76.85-.62 1.41-1.57 1.55-2.6.09-.64.04-1.3-.06-1.94-.01-.06-.01-.12-.02-.19-.02-.19-.03-.39-.03-.59V.02z"/>
              </svg>
            </a>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center rounded-full bg-surface hover:bg-primary hover:text-on-primary text-on-surface-variant transition-all border border-outline-variant shadow-sm hover:shadow-md hover:-translate-y-1" aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </a>
          </div>
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
