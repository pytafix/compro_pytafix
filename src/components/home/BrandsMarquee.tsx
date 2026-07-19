"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const brands = [
  { slug: "apple", label: "Apple" },
  { slug: "samsung", label: "Samsung" },
  { slug: "asus", label: "Asus" },
  { slug: "lenovo", label: "Lenovo" },
  { slug: "hp", label: "HP" },
  { slug: "dell", label: "Dell" },
  { slug: "acer", label: "Acer" },
  { slug: "xiaomi", label: "Xiaomi" },
  { slug: "oppo", label: "Oppo" },
  { slug: "vivo", label: "Vivo" },
];

// Duplicate for marquee effect
const marqueeBrands = [...brands, ...brands];

export function BrandsMarquee() {
  return (
    <section className="bg-surface-container-low py-10 border-y border-outline-variant overflow-hidden">
      <div className="max-w-container-max mx-auto px-4 md:px-8 lg:px-margin-desktop mb-6 text-center">
        <p className="font-label-bold text-on-surface-variant uppercase tracking-wider text-sm">Dipercaya untuk Memperbaiki Berbagai Merk</p>
      </div>
      <div className="flex gap-8 items-center w-max relative">
        <motion.div 
          className="flex gap-12 lg:gap-16 items-center w-max px-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        >
          {marqueeBrands.map((brand, i) => (
            <div key={i} className="flex items-center justify-center opacity-50 hover:opacity-100 transition-all duration-300 w-24 h-12 cursor-pointer shrink-0" title={brand.label}>
              <Image src={`/images/brands/${brand.slug}.svg`} alt={brand.label} width={96} height={48} className="object-contain" unoptimized />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
