"use client";

import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "./animations";
import { SERVICE_PRINCIPLES } from "@/lib/site-content";

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
          {SERVICE_PRINCIPLES.map((principle) => (
            <motion.div
              key={principle.title}
              variants={fadeUpVariant}
              className="flex flex-col items-center bg-surface border border-outline-variant p-8 rounded-[2rem] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[32px] text-primary" aria-hidden="true">
                  {principle.icon}
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">
                {principle.title}
              </h3>
              <p className="font-label-md text-on-surface-variant">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
