"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PromoList({ promos }: { promos: any[] }) {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-surface-container py-16 px-4 md:px-8 text-center border-b border-surface-container-highest">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="font-headline-md text-4xl md:text-5xl font-bold text-on-surface mb-4">
            Promo & Penawaran Spesial
          </h1>
          <p className="font-body-md text-lg text-on-surface-variant">
            Nikmati berbagai promo menarik dan penawaran spesial dari Pytafix. Solusi perbaikan gadget yang hemat dan berkualitas untuk kebutuhan Anda.
          </p>
        </motion.div>
      </section>

      {/* Promos Grid */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promos.map((promo, index) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-primary/5 border border-primary rounded-2xl p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              {/* Decoration */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
              
              <div className="mb-4 relative z-10">
                <span className="inline-block bg-primary text-on-primary font-bold px-3 py-1 text-sm rounded-full mb-4 shadow-sm">
                  {promo.badge}
                </span>
                <h3 className="font-headline-md text-2xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">{promo.title}</h3>
                <p className="font-body-md text-on-surface-variant flex-grow mb-6">{promo.description}</p>
              </div>
              
              <div className="mt-auto relative z-10">
                <div className="flex items-center text-sm text-on-surface-variant mb-4">
                  <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Berlaku hingga: <strong className="ml-1 text-on-surface">{promo.validUntil}</strong>
                </div>
                <Link 
                  href={`/promo/${promo.slug}`}
                  className="block w-full text-center bg-surface border border-outline text-primary font-bold py-3 px-4 rounded-xl hover:bg-primary hover:text-on-primary hover:border-primary transition-all shadow-sm"
                >
                  Lihat Detail Promo
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
