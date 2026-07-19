"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Sparepart } from "@prisma/client";
import { fadeUpVariant } from "./animations";

export function SparepartsCatalog({ spareparts }: { spareparts: Sparepart[] }) {
  return (
    <section className="bg-surface-container-lowest py-16 md:py-24 border-y border-outline-variant">
      <div className="max-w-container-max mx-auto px-4 md:px-8 lg:px-margin-desktop">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface mb-4">
            Sparepart & Komponen Original
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Tersedia berbagai suku cadang berkualitas dengan garansi resmi. Kami pastikan gadget Anda mendapatkan yang terbaik.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {spareparts.length > 0 ? (
            spareparts.map((sparepart, idx) => (
              <motion.div 
                key={sparepart.id}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-surface border border-outline-variant rounded-2xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col"
              >
                <div className="aspect-square bg-surface-container-low p-6 flex items-center justify-center relative">
                  <div className="absolute top-3 right-3 bg-surface text-on-surface font-label-sm text-xs px-2 py-1 rounded-md border border-outline-variant shadow-sm z-10">{sparepart.category}</div>
                  <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-500">
                    <Image src={sparepart.imageUrl || "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=500&q=80"} alt={sparepart.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover rounded-xl" />
                  </div>
                </div>
                <div className="p-4 md:p-5 flex flex-col flex-grow">
                  <h3 className="font-label-bold text-label-bold text-on-surface mb-1 line-clamp-2">{sparepart.name}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 line-clamp-1">{sparepart.description || "Garansi Resmi"}</p>
                  <div className="mt-auto flex flex-col gap-3">
                    <p className="font-headline-sm text-headline-sm text-primary">
                      Rp {new Intl.NumberFormat('id-ID').format(sparepart.price)}
                    </p>
                    <Link href="/sparepart" className="w-full py-2 bg-surface text-on-surface border border-outline font-label-bold text-center rounded hover:bg-primary hover:text-on-primary hover:border-primary transition-colors text-sm">
                      Pesan Pasang
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="col-span-2 lg:col-span-3 text-center text-on-surface-variant font-body-md py-8">Belum ada sparepart yang ditampilkan.</p>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link href="/sparepart" className="inline-flex items-center gap-2 bg-surface text-on-surface font-label-bold border border-outline-variant shadow-sm px-8 py-4 rounded-full hover:bg-surface-container-low hover:shadow transition-all">
            Lihat Katalog Sparepart Lengkap
          </Link>
        </div>
      </div>
    </section>
  );
}
