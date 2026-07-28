"use client";

import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "./animations";

export function TrustBadges() {
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="max-w-container-max mx-auto px-4 md:px-8 lg:px-margin-desktop mb-16 md:mb-24 mt-16"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-gutter bg-surface-container-lowest/80 backdrop-blur-sm border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm">
        <motion.div variants={fadeUpVariant} className="flex items-center gap-4 group">
          <div className="h-14 w-14 rounded-xl bg-primary-fixed flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-on-primary-fixed text-[28px]" aria-hidden="true">verified</span>
          </div>
          <div>
            <p className="font-label-bold text-label-bold text-on-surface">Estimasi Disetujui</p>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Biaya dikonfirmasi sebelum pengerjaan</p>
          </div>
        </motion.div>
        <motion.div variants={fadeUpVariant} className="flex items-center gap-4 group">
          <div className="h-14 w-14 rounded-xl bg-primary-fixed flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-on-primary-fixed text-[28px]" aria-hidden="true">memory</span>
          </div>
          <div>
            <p className="font-label-bold text-label-bold text-on-surface">Pilihan Komponen Jelas</p>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Jenis dan kondisi komponen dijelaskan</p>
          </div>
        </motion.div>
        <motion.div variants={fadeUpVariant} className="flex items-center gap-4 group">
          <div className="h-14 w-14 rounded-xl bg-primary-fixed flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-on-primary-fixed text-[28px]" aria-hidden="true">home_repair_service</span>
          </div>
          <div>
            <p className="font-label-bold text-label-bold text-on-surface">Antar-Jemput Berdasarkan Area</p>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Ketersediaan dikonfirmasi sesuai area</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
