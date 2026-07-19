"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUpVariant, staggerContainer } from "./animations";

export function ServicesPreview() {
  return (
    <section className="bg-surface-container-lowest py-16 md:py-24 border-y border-outline-variant">
      <div className="max-w-container-max mx-auto px-4 md:px-8 lg:px-margin-desktop">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12"
        >
          <div>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface mb-2">
              Layanan Teknis
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Spesialisasi kami dalam penanganan perangkat elektronik.
            </p>
          </div>
          <Link className="font-label-bold text-label-bold text-primary flex items-center gap-2 hover:underline mt-4 md:mt-0" href="/layanan">
            Lihat Semua Layanan <span className="material-symbols-outlined text-[20px]" aria-hidden="true">arrow_forward</span>
          </Link>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-gutter"
        >
          {/* Card 1 - Spans 2 columns on lg */}
          <motion.div variants={fadeUpVariant} className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant p-8 rounded-[2rem] hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer group relative z-10 flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center">
            <div className="bg-primary/10 p-6 rounded-[1.5rem] shrink-0 group-hover:bg-primary transition-colors duration-300">
              <span className="material-symbols-outlined text-primary group-hover:text-on-primary text-[56px] transition-colors duration-300" aria-hidden="true">
                laptop_mac
              </span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Service Laptop & PC</h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">
                Laptop mati total, lemot, bluescreen, ganti keyboard, hingga upgrade SSD/RAM. Kami memberikan diagnosa presisi tinggi untuk performa perangkat yang optimal.
              </p>
              <div className="mt-6 flex items-center gap-2 text-primary font-label-bold opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
                Selengkapnya <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </div>
            </div>
          </motion.div>
          
          {/* Card 2 */}
          <motion.div variants={fadeUpVariant} className="bg-surface-container-lowest border border-outline-variant p-8 rounded-[2rem] hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer group relative z-10">
            <span className="material-symbols-outlined text-primary text-[48px] mb-6 group-hover:scale-110 transition-transform" aria-hidden="true">
              smartphone
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">HP & Tablet</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Penggantian baterai, perbaikan LCD presisi tinggi, dan pemulihan data sistem.
            </p>
            <div className="mt-6 flex items-center gap-2 text-primary font-label-bold opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
              Selengkapnya <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </div>
          </motion.div>
          
          {/* Card 3 */}
          <motion.div variants={fadeUpVariant} className="bg-surface-container-lowest border border-outline-variant p-8 rounded-[2rem] hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer group relative z-10">
            <span className="material-symbols-outlined text-primary text-[48px] mb-6 group-hover:scale-110 transition-transform" aria-hidden="true">
              inventory_2
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Sparepart</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Penyediaan komponen OEM bersertifikat dengan garansi pemasangan yang aman.
            </p>
            <div className="mt-6 flex items-center gap-2 text-primary font-label-bold opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
              Selengkapnya <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </div>
          </motion.div>

          {/* Card 4 - Spans 2 columns on lg */}
          <motion.div variants={fadeUpVariant} className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant p-8 rounded-[2rem] hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer group relative z-10 flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center">
            <div className="bg-primary/10 p-6 rounded-[1.5rem] shrink-0 group-hover:bg-primary transition-colors duration-300 order-1 md:order-2">
              <span className="material-symbols-outlined text-primary group-hover:text-on-primary text-[56px] transition-colors duration-300" aria-hidden="true">
                directions_car
              </span>
            </div>
            <div className="order-2 md:order-1 flex-1">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Home Service</h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">
                Tidak perlu repot keluar rumah. Teknisi ahli kami siap datang ke lokasi Anda di seluruh area Malang Raya untuk perbaikan cepat langsung di tempat.
              </p>
              <div className="mt-6 flex items-center gap-2 text-primary font-label-bold opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
                Selengkapnya <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
