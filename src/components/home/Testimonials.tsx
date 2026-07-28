"use client";

import { motion } from "framer-motion";
import { Testimonial } from "@prisma/client";
import { fadeUpVariant, staggerContainer } from "./animations";
import Link from "next/link";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const displayTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="bg-surface-container-low py-16 md:py-24 border-y border-outline-variant">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-container-max mx-auto px-4 md:px-8 lg:px-margin-desktop"
      >
        <motion.div variants={fadeUpVariant} className="text-center mb-16">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-4">
            Apa Kata Pelanggan Kami?
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Ulasan yang tampil berasal dari catatan pelanggan yang dipublikasikan melalui panel Pytafix.
          </p>
        </motion.div>

        {testimonials.length === 0 ? (
          <div className="max-w-2xl mx-auto bg-surface border border-outline-variant rounded-2xl p-8 text-center">
            <span className="material-symbols-outlined text-[48px] text-primary mb-4" aria-hidden="true">
              rate_review
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">
              Belum ada ulasan yang dipublikasikan
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              Kami tidak menampilkan nama atau pengalaman pelanggan contoh. Ulasan akan muncul setelah ada catatan nyata yang disetujui untuk dipublikasikan.
            </p>
            <Link href="/testimoni" className="font-label-bold text-primary hover:underline">
              Lihat halaman ulasan
            </Link>
          </div>
        ) : (
        <div className="overflow-hidden w-full relative pb-8 mt-12">
          <motion.div 
            className="flex gap-6 lg:gap-gutter w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
            {displayTestimonials.map((t, idx) => (
              <div key={idx} aria-hidden={idx >= testimonials.length} className="w-[320px] md:w-[400px] shrink-0 bg-surface border border-outline-variant p-8 rounded-[2rem] shadow-sm hover:shadow-md hover:border-primary hover:-translate-y-1 transition-all flex flex-col h-full group">
                <div className="flex text-[#FFB400] mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: i < t.rating ? "'FILL' 1" : "'FILL' 0" }}>
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-lg text-on-surface italic mb-8 flex-grow">
                  &quot;{t.comment}&quot;
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="h-12 w-12 rounded-full bg-primary-container text-primary flex items-center justify-center font-headline-sm uppercase shrink-0 group-hover:scale-110 transition-transform">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-label-bold text-on-surface">{t.name}</h3>
                    <p className="font-label-sm text-on-surface-variant">Pelanggan Pytafix</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
          {/* Fade Edges for Marquee Effect */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-surface-container-low to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-surface-container-low to-transparent z-10 pointer-events-none"></div>
        </div>
        )}
      </motion.div>
    </section>
  );
}
