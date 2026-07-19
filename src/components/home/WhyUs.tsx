"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUpVariant, staggerContainer } from "./animations";

export function WhyUs() {
  return (
    <section className="bg-surface-container-low py-16 md:py-24 border-y border-outline-variant">
      <div className="max-w-container-max mx-auto px-4 md:px-8 lg:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="order-2 lg:order-1"
          >
            <motion.h2 variants={fadeUpVariant} className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-6">
              Mengapa Memilih Pytafix?
            </motion.h2>
            <motion.p variants={fadeUpVariant} className="font-body-lg text-body-lg text-on-surface-variant mb-8">
              Kami memahami betapa pentingnya perangkat elektronik bagi produktivitas Anda. Pytafix hadir dengan komitmen layanan prima, pengerjaan rapi, dan keamanan data 100%.
            </motion.p>
            
            <div className="flex flex-col gap-6">
              {[
                {
                  icon: "speed",
                  title: "Pengerjaan Cepat & Tepat",
                  desc: "Kami berusaha menyelesaikan setiap kasus perbaikan dalam waktu kurang dari 24 jam dengan hasil yang maksimal."
                },
                {
                  icon: "admin_panel_settings",
                  title: "Keamanan Data Terjamin",
                  desc: "Privasi dan dokumen Anda sangat aman. Kami tidak pernah membongkar atau menyalin data privasi pelanggan tanpa izin."
                },
                {
                  icon: "payments",
                  title: "Harga Transparan & Masuk Akal",
                  desc: "Konsultasikan keluhan Anda secara gratis. Anda akan mendapatkan estimasi rincian biaya sebelum kami mulai memperbaiki perangkat."
                }
              ].map((item, idx) => (
                <motion.div key={idx} variants={fadeUpVariant} className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-md">
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">{item.title}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden border border-outline-variant aspect-[4/3] lg:aspect-auto lg:h-[600px] shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80"
                alt="Teknisi Pytafix sedang bekerja secara profesional"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
                <div className="bg-surface/90 backdrop-blur-md p-6 rounded-2xl border border-outline-variant shadow-lg inline-block">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center text-on-primary">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                    <div>
                      <div className="font-headline-sm text-headline-sm text-on-surface font-bold">4.9/5 Rating</div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant">Dari 1000+ Pelanggan Puas</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
