"use client";

import { motion } from "framer-motion";
import { Testimonial } from "@prisma/client";
import { fadeUpVariant, staggerContainer } from "./animations";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const dummyTestimonials = [
    { name: "Budi Santoso", comment: "Luar biasa! MacBook saya yang mati total karena tersiram kopi berhasil dihidupkan kembali dengan data yang utuh. Teknisi sangat komunikatif dan transparan soal harga.", rating: 5 },
    { name: "Siti Rahma", comment: "Ganti LCD iPhone di sini cuma butuh waktu 1 jam. Hasilnya super rapi dan layarnya responsif banget kayak baru beli. Garansi 3 bulannya juga bikin tenang.", rating: 5 },
    { name: "Andi Wijaya", comment: "Laptop gaming saya sering overheat, setelah dibawa ke Pytafix untuk bersihin debu & ganti thermal paste, suhunya turun drastis. Pelayanannya bintang 5!", rating: 5 },
    { name: "Ratna Sari", comment: "Sangat puas dengan pelayanan home service-nya. Teknisi datang tepat waktu ke kantor, perbaiki baterai langsung beres. Gak perlu repot ke toko lagi.", rating: 5 },
  ];

  const displayTestimonials = testimonials.length > 0 ? [...testimonials, ...testimonials] : [...dummyTestimonials, ...dummyTestimonials];
  const duration = testimonials.length > 0 ? 30 : 30;

  return (
    <section className="bg-surface-container-low py-16 md:py-24 border-y border-outline-variant">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-container-max mx-auto px-4 md:px-8 lg:px-margin-desktop"
      >
        <motion.div variants={fadeUpVariant} className="text-center mb-16">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-4">
            Apa Kata Pelanggan Kami?
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Lebih dari 1,000+ pelanggan telah mempercayakan perbaikan perangkat mereka kepada Pytafix.
          </p>
        </motion.div>
        
        <div className="overflow-hidden w-full relative pb-8 mt-12">
          <motion.div 
            className="flex gap-6 lg:gap-gutter w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: duration }}
          >
            {displayTestimonials.map((t, idx) => (
              <div key={idx} className="w-[320px] md:w-[400px] shrink-0 bg-surface border border-outline-variant p-8 rounded-[2rem] shadow-sm hover:shadow-md hover:border-primary hover:-translate-y-1 transition-all flex flex-col h-full group">
                <div className="flex text-[#FFB400] mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: i < t.rating ? "'FILL' 1" : "'FILL' 0" }}>
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-lg text-on-surface italic mb-8 flex-grow">
                  &quot;{t.comment}&quot;
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="h-12 w-12 rounded-full bg-primary-container text-primary flex items-center justify-center font-headline-sm uppercase shrink-0 group-hover:scale-110 transition-transform">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-label-bold text-on-surface">{t.name}</h4>
                    <p className="font-label-sm text-on-surface-variant">Pelanggan Pytafix</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
          {/* Fade Edges for Marquee Effect */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-surface-container-low to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-surface-container-low to-transparent z-10 pointer-events-none"></div>
        </div>
      </motion.div>
    </section>
  );
}
