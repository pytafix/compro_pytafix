"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Portfolio } from "@prisma/client";

export default function PortofolioClient({ cases }: { cases: Portfolio[] }) {
  return (
    <main className="min-h-screen bg-surface">
      {/* Hero Section */}
      <section className="bg-surface-container py-16 px-4 md:px-8 text-center border-b border-surface-container-highest">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="font-headline-md text-4xl md:text-5xl font-bold text-on-surface mb-4">
            Portofolio Servis
          </h1>
          <p className="font-body-md text-lg text-on-surface-variant">
            Lihat hasil kerja nyata dari teknisi ahli Pytafix. Kami menangani berbagai kerusakan gadget dengan tingkat keberhasilan yang tinggi, menggunakan sparepart berkualitas, dan memberikan garansi untuk setiap perbaikan.
          </p>
        </motion.div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface-container rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-surface-container-highest"
            >
              <div className="flex h-48 sm:h-56">
                <div className="w-1/2 relative bg-surface-variant">
                  <div className="absolute top-2 left-2 z-10 bg-error text-on-error text-xs font-bold px-2 py-1 rounded">Before</div>
                  <img src={item.beforeImage} alt={`${item.title} Before`} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="w-1/2 relative bg-surface-variant border-l border-surface-container-highest">
                  <div className="absolute top-2 right-2 z-10 bg-primary text-on-primary text-xs font-bold px-2 py-1 rounded">After</div>
                  <img src={item.afterImage} alt={`${item.title} After`} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-headline-md text-xl font-bold text-on-surface mb-2">{item.title}</h3>
                <p className="font-body-md text-on-surface-variant">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {cases.length === 0 && (
          <div className="text-center text-on-surface-variant py-12">
            Belum ada portofolio yang ditambahkan.
          </div>
        )}
        
        <div className="mt-16 text-center">
          <Link href="/booking-servis" className="inline-block bg-primary text-on-primary font-bold py-3 px-8 rounded-full hover:bg-primary/90 transition-colors shadow-sm">
            Jadwalkan Servis Sekarang
          </Link>
        </div>
      </section>
    </main>
  );
}
