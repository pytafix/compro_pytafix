"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Promo } from "@prisma/client";
import { fadeUpVariant } from "./animations";

export function PromoSection({ promos }: { promos: Promo[] }) {
  return (
    <section className="bg-primary/5 py-16 md:py-24 border-y border-outline-variant relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="max-w-container-max mx-auto px-4 md:px-8 lg:px-margin-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface mb-4">
              Promo & Penawaran Spesial
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Jangan lewatkan diskon menarik bulan ini. Klaim sekarang sebelum kehabisan!
            </p>
          </div>
          <Link href="/promo" className="hidden md:inline-flex items-center gap-2 text-primary font-label-bold hover:underline mt-4 md:mt-0">
            Lihat Semua Promo
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promos.length > 0 ? (
            promos.map((promo, idx) => (
              <motion.div 
                key={promo.id}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-surface rounded-2xl border border-outline-variant p-6 hover:shadow-lg transition-all group relative overflow-hidden flex flex-col"
              >
                <div className="absolute top-4 right-4 bg-tertiary text-on-tertiary font-label-sm px-3 py-1 rounded-full text-xs font-bold tracking-wider">{promo.badge}</div>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                  <span className="material-symbols-outlined text-3xl" aria-hidden="true">loyalty</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">{promo.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">
                  {promo.description}
                </p>
                <Link href={`/promo/${promo.slug}`} className="w-full text-center bg-surface-container-low text-primary font-label-bold py-3 rounded hover:bg-primary hover:text-on-primary transition-colors border border-outline-variant group-hover:border-primary">
                  Klaim Promo
                </Link>
              </motion.div>
            ))
          ) : (
            <p className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-on-surface-variant font-body-md py-8">Belum ada promo aktif saat ini.</p>
          )}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/promo" className="inline-flex items-center gap-2 text-primary font-label-bold border border-outline-variant px-6 py-3 rounded-full hover:bg-surface-container-low transition-colors">
            Lihat Semua Promo
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
