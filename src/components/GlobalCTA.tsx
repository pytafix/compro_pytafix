"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function GlobalCTA() {
  const pathname = usePathname();

  if (pathname === "/booking-servis" || pathname === "/kontak") {
    return null;
  }

  return (
    <div className="mx-4 lg:mx-8 mb-16 mt-24 md:mt-32 relative max-w-container-max xl:mx-auto">
      <div className="bg-primary text-on-primary rounded-[2rem] p-8 md:p-12 relative flex flex-col md:flex-row items-center justify-between overflow-visible shadow-xl">
        <div className="w-full md:w-2/3 text-center md:text-left z-10 relative">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline-md mb-4 leading-tight">
            Perangkat Bermasalah?<br className="hidden md:block" /> Jangan Tunggu Sampai Parah.
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 font-body-md max-w-xl mx-auto md:mx-0">
            Konsultasikan gratis sekarang dan dapatkan estimasi biaya perbaikan oleh tim profesional kami.
          </p>
          <Link
            href="/booking-servis"
            className="inline-flex items-center gap-2 bg-surface text-primary font-label-bold px-8 py-4 rounded hover:bg-surface-container-low hover:-translate-y-1 hover:shadow-lg transition-all text-lg cursor-pointer"
          >
            Booking Servis Sekarang
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }} aria-hidden="true">
              arrow_forward
            </span>
          </Link>
        </div>
        
        {/* Model Image - Pop out effect */}
        <div className="w-full md:w-1/3 mt-8 md:mt-0 flex justify-center md:static pointer-events-none">
          <div className="relative w-64 h-64 md:absolute md:bottom-0 md:right-8 lg:right-12 md:w-[350px] md:h-[400px] lg:w-[450px] lg:h-[500px]">
            <Image 
              src="/images/cta-model.png" 
              alt="Customer Service Pytafix" 
              fill
              className="object-contain object-bottom drop-shadow-[0_15px_15px_rgba(0,0,0,0.3)]"
              sizes="(max-width: 768px) 256px, (max-width: 1024px) 350px, 450px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
