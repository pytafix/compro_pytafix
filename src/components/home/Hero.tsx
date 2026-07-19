"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUpVariant } from "./animations";
import { CONTACT } from '@/lib/config';

export function Hero() {
  return (
    <motion.header 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUpVariant}
      className="max-w-container-max mx-auto px-4 md:px-8 lg:px-margin-desktop py-12 md:py-16 lg:py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-gutter items-center">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-xl md:text-headline-xl text-on-surface leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-on-primary-fixed-variant dark:from-primary dark:to-primary-fixed">
            Laptop Mati Total? Layar HP Retak? Kami Solusinya.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Jangan biarkan perangkat rusak menghentikan aktivitas Anda. Pytafix hadir di Malang dengan teknisi bersertifikat, pengerjaan cepat, dan jaminan keamanan data 100%. Servis jujur tanpa biaya tersembunyi.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <a href="/booking-servis" className="bg-primary text-on-primary font-label-bold text-label-bold px-8 py-3 rounded hover:bg-on-primary-fixed-variant hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer inline-flex items-center justify-center">
              Perbaiki Sekarang
            </a>
            <a href={`https://wa.me/${CONTACT.whatsapp}?text=Halo%20Pytafix,%20saya%20butuh%20bantuan.`} target="_blank" rel="noopener noreferrer" className="border border-outline text-primary font-label-bold text-label-bold px-8 py-3 rounded hover:bg-surface-container hover:shadow transition-all flex items-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
                chat
              </span>
              Chat WhatsApp
            </a>
          </div>
        </div>
        <div className="lg:col-span-5 relative h-[400px] md:h-[500px] lg:h-[600px] flex justify-center lg:justify-end items-end overflow-visible">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-primary/20 blur-[60px] rounded-full -z-10"></div>
          <div className="relative w-full h-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
            <Image
              src="/images/hero-model.png"
              alt="Pytafix Customer Service"
              fill
              priority
              className="object-contain object-bottom drop-shadow-2xl hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
            />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
