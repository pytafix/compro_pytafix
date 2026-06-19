"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PromoDetailClient({ promo }: { promo: any }) {
  return (
    <>
      {/* Detail Header */}
      <section className="bg-surface-container py-16 px-4 md:px-8 border-b border-surface-container-highest">
        <div className="max-w-4xl mx-auto">
          <Link href="/promo" className="inline-flex items-center text-primary font-bold mb-6 hover:underline">
            <span className="material-symbols-outlined mr-2">arrow_back</span>
            Kembali ke Daftar Promo
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-primary/10 text-primary font-bold px-4 py-2 rounded-full mb-6 text-sm border border-primary/20">
              {promo.badge}
            </span>
            <h1 className="font-headline-md text-3xl md:text-5xl font-bold text-on-surface mb-6 leading-tight">
              {promo.title}
            </h1>
            <div className="flex items-center text-on-surface-variant bg-surface px-4 py-2 rounded-xl inline-flex shadow-sm border border-outline-variant">
              <span className="material-symbols-outlined text-[20px] text-primary mr-2">event_available</span>
              <span>Berlaku hingga: <strong className="text-on-surface ml-1">{promo.validUntil}</strong></span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="font-headline-md text-2xl font-bold text-on-surface mb-4">Deskripsi Promo</h2>
              <p className="font-body-md text-lg text-on-surface-variant mb-10 leading-relaxed">
                {promo.description}
              </p>

              <h2 className="font-headline-md text-2xl font-bold text-on-surface mb-4">Syarat & Ketentuan</h2>
              <ul className="list-disc pl-6 space-y-3 font-body-md text-on-surface-variant mb-10">
                {promo.terms.map((term: string, i: number) => (
                  <li key={i} className="pl-2">{term}</li>
                ))}
              </ul>

              <h2 className="font-headline-md text-2xl font-bold text-on-surface mb-4">Cara Mengklaim Promo</h2>
              <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl text-on-surface-variant font-body-md">
                {promo.howToClaim}
              </div>
            </motion.div>
          </div>

          {/* Sticky Sidebar CTA */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="sticky top-28 bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-xl"
            >
              <div className="text-center mb-6">
                <div className="text-on-surface-variant mb-2">Gunakan penawaran ini sekarang</div>
                <div className="text-2xl font-bold text-primary">{promo.badge}</div>
              </div>
              <Link 
                href="/booking-servis" 
                className="flex items-center justify-center w-full bg-primary text-on-primary font-bold py-4 px-6 rounded-xl hover:bg-primary/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
              >
                Klaim Promo Sekarang
              </Link>
              <p className="text-center text-xs text-on-surface-variant mt-4">
                Promo dapat berakhir sewaktu-waktu. Syarat dan Ketentuan berlaku.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
