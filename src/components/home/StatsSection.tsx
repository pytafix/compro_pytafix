"use client";

import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "./animations";

export function StatsSection() {
  return (
    <section className="bg-surface-container-lowest py-16 md:py-24 border-y border-outline-variant">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-container-max mx-auto px-4 md:px-8 lg:px-margin-desktop"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 text-center">
          <motion.div variants={fadeUpVariant} className="flex flex-col items-center bg-surface border border-outline-variant p-8 rounded-[2rem] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
            <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[32px] text-primary">handyman</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface font-bold mb-2">5.000+</h3>
            <p className="font-label-md text-on-surface-variant">Perangkat Diperbaiki</p>
          </motion.div>
          <motion.div variants={fadeUpVariant} className="flex flex-col items-center bg-surface border border-outline-variant p-8 rounded-[2rem] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
            <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[32px] text-primary">group</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface font-bold mb-2">99%</h3>
            <p className="font-label-md text-on-surface-variant">Pelanggan Puas</p>
          </motion.div>
          <motion.div variants={fadeUpVariant} className="flex flex-col items-center bg-surface border border-outline-variant p-8 rounded-[2rem] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
            <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[32px] text-primary">workspace_premium</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface font-bold mb-2">10+</h3>
            <p className="font-label-md text-on-surface-variant">Teknisi Ahli</p>
          </motion.div>
          <motion.div variants={fadeUpVariant} className="flex flex-col items-center bg-surface border border-outline-variant p-8 rounded-[2rem] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
            <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[32px] text-primary">verified_user</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface font-bold mb-2">90 Hari</h3>
            <p className="font-label-md text-on-surface-variant">Garansi Servis</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
