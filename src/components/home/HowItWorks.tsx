"use client";

import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "./animations";

export function HowItWorks() {
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="bg-primary text-on-primary py-16 md:py-24 border-y border-primary-fixed-variant"
    >
      <div className="max-w-container-max mx-auto px-4 md:px-8 lg:px-margin-desktop">
        <motion.h2 variants={fadeUpVariant} className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-center text-on-primary mb-16">
          Prosedur Layanan
        </motion.h2>
        <div className="flex flex-col md:flex-row justify-between relative gap-6 md:gap-4 lg:gap-6">
          <div className="hidden md:block absolute top-[50px] left-12 right-12 h-[2px] bg-white/20 z-0"></div>
          {/* Step 1 */}
          <motion.div variants={fadeUpVariant} className="flex flex-col items-center text-center relative z-10 w-full md:w-1/4 group bg-surface p-8 rounded-[2rem] shadow-xl">
            <div className="h-12 w-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-bold text-label-bold border-4 border-surface mb-6 group-hover:scale-110 transition-transform shadow-md">
              1
            </div>
            <span className="material-symbols-outlined text-primary text-[32px] mb-3 group-hover:scale-110 transition-transform" aria-hidden="true">edit_calendar</span>
            <h4 className="font-label-bold text-label-bold text-on-surface mb-2">Booking</h4>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              Jadwalkan servis via web atau WA.
            </p>
          </motion.div>
          {/* Step 2 */}
          <motion.div variants={fadeUpVariant} className="flex flex-col items-center text-center relative z-10 w-full md:w-1/4 group bg-surface p-8 rounded-[2rem] shadow-xl">
            <div className="h-12 w-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-bold text-label-bold border-4 border-surface mb-6 group-hover:scale-110 transition-transform shadow-md">
              2
            </div>
            <span className="material-symbols-outlined text-primary text-[32px] mb-3 group-hover:scale-110 transition-transform" aria-hidden="true">troubleshoot</span>
            <h4 className="font-label-bold text-label-bold text-on-surface mb-2">Diagnosis</h4>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              Pengecekan teknis & estimasi biaya.
            </p>
          </motion.div>
          {/* Step 3 */}
          <motion.div variants={fadeUpVariant} className="flex flex-col items-center text-center relative z-10 w-full md:w-1/4 group bg-surface p-8 rounded-[2rem] shadow-xl">
            <div className="h-12 w-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-bold text-label-bold border-4 border-surface mb-6 group-hover:scale-110 transition-transform shadow-md">
              3
            </div>
            <span className="material-symbols-outlined text-primary text-[32px] mb-3 group-hover:scale-110 transition-transform" aria-hidden="true">build</span>
            <h4 className="font-label-bold text-label-bold text-on-surface mb-2">Repair</h4>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              Pengerjaan dengan standar operasional.
            </p>
          </motion.div>
          {/* Step 4 */}
          <motion.div variants={fadeUpVariant} className="flex flex-col items-center text-center relative z-10 w-full md:w-1/4 group bg-surface p-8 rounded-[2rem] shadow-xl">
            <div className="h-12 w-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-bold text-label-bold border-4 border-surface mb-6 group-hover:scale-110 transition-transform shadow-md">
              4
            </div>
            <span className="material-symbols-outlined text-primary text-[32px] mb-3 group-hover:scale-110 transition-transform" aria-hidden="true">verified</span>
            <h4 className="font-label-bold text-label-bold text-on-surface mb-2">Warranty</h4>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              Pengujian akhir & penyerahan garansi.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
