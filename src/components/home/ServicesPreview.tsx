"use client";

import { ServiceContent } from '@prisma/client';
import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUpVariant, staggerContainer } from "./animations";

interface ServicesPreviewProps {
  services: ServiceContent[];
}

export function ServicesPreview({ services }: ServicesPreviewProps) {
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
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-gutter"
        >
          {services.map((service, index) => (
            <motion.div key={service.id} variants={fadeUpVariant} className="bg-surface-container-lowest border border-outline-variant p-8 rounded-[2rem] hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer group relative z-10">
              <div className="bg-primary/10 p-6 rounded-[1.5rem] shrink-0 group-hover:bg-primary transition-colors duration-300">
                <span className="material-symbols-outlined text-primary group-hover:text-on-primary text-[48px] transition-colors duration-300" aria-hidden="true">
                  {service.icon || "build"}
                </span>
              </div>
              <div className="mt-6">
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3">{service.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-primary font-label-bold opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
                  Selengkapnya <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}