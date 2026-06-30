"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

import { Promo, Sparepart } from '@prisma/client';

export default function HomeClient({ promos, spareparts }: { promos: Promo[], spareparts: Sparepart[] }) {
  return (
    <main className="relative overflow-hidden">
      {/* Background Gradient Blob */}
      <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute top-40 -left-40 w-[500px] h-[500px] bg-secondary-container/20 blur-[100px] rounded-full pointer-events-none"></div>
      </div>

      {/* Hero Section */}
      <motion.header 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUpVariant}
        className="max-w-container-max mx-auto px-4 md:px-8 lg:px-margin-desktop py-12 md:py-16 lg:py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-gutter items-center">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-xl md:text-headline-xl text-on-surface leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-on-primary-fixed-variant dark:from-primary dark:to-primary-fixed">
              Laptop Mati Total? Layar HP Retak? Kami Solusinya.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Jangan biarkan perangkat rusak menghentikan aktivitas Anda. Pytafix hadir di Malang dengan teknisi bersertifikat, pengerjaan cepat, dan jaminan keamanan data 100%. Servis jujur tanpa biaya tersembunyi.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <a href="/booking-servis" className="bg-primary text-on-primary font-label-bold text-label-bold px-8 py-3 rounded hover:bg-on-primary-fixed-variant hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer inline-flex items-center justify-center">
                Perbaiki Sekarang
              </a>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="border border-outline text-primary font-label-bold text-label-bold px-8 py-3 rounded hover:bg-surface-container hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
                  chat
                </span>
                Chat WhatsApp
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 relative h-[400px] md:h-[500px] lg:h-[600px] flex justify-center lg:justify-end items-end overflow-visible">
            {/* Dekoratif blob di belakang model */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-primary/20 blur-[60px] rounded-full -z-10"></div>
            <div className="relative w-full h-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
              <Image
                src="/images/hero-model.png"
                alt="Pytafix Customer Service"
                fill
                priority
                className="object-contain object-bottom drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
              />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Brands Marquee */}
      <section className="bg-surface-container-low py-10 border-y border-outline-variant overflow-hidden">
        <div className="max-w-container-max mx-auto px-4 md:px-8 lg:px-margin-desktop mb-6 text-center">
          <p className="font-label-bold text-on-surface-variant uppercase tracking-wider text-sm">Dipercaya untuk Memperbaiki Berbagai Merk</p>
        </div>
        <div className="flex gap-8 items-center w-max">
          <motion.div 
            className="flex gap-12 lg:gap-16 items-center w-max px-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {[
              "apple", "samsung", "asus", "lenovo", "hp", "dell", "acer", "xiaomi", "oppo", "vivo",
              "apple", "samsung", "asus", "lenovo", "hp", "dell", "acer", "xiaomi", "oppo", "vivo"
            ].map((brand, i) => (
              <div key={i} className="flex items-center justify-center opacity-50 hover:opacity-100 transition-all duration-300 w-24 h-12 cursor-pointer group" title={brand.charAt(0).toUpperCase() + brand.slice(1)}>
                <img src={`https://cdn.simpleicons.org/${brand}`} alt={brand} className="max-h-10 max-w-full object-contain" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-container-max mx-auto px-4 md:px-8 lg:px-margin-desktop mb-16 md:mb-24"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-gutter bg-surface-container-lowest/80 backdrop-blur-sm border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm">
          <motion.div variants={fadeUpVariant} className="flex items-center gap-4 group">
            <div className="h-14 w-14 rounded-xl bg-primary-fixed flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-on-primary-fixed text-[28px]" aria-hidden="true">verified</span>
            </div>
            <div>
              <h3 className="font-label-bold text-label-bold text-on-surface">Garansi Resmi</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Jaminan layanan hingga 90 hari</p>
            </div>
          </motion.div>
          <motion.div variants={fadeUpVariant} className="flex items-center gap-4 group">
            <div className="h-14 w-14 rounded-xl bg-primary-fixed flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-on-primary-fixed text-[28px]" aria-hidden="true">memory</span>
            </div>
            <div>
              <h3 className="font-label-bold text-label-bold text-on-surface">Sparepart Original</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Komponen bersertifikasi pabrik</p>
            </div>
          </motion.div>
          <motion.div variants={fadeUpVariant} className="flex items-center gap-4 group">
            <div className="h-14 w-14 rounded-xl bg-primary-fixed flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-on-primary-fixed text-[28px]" aria-hidden="true">home_repair_service</span>
            </div>
            <div>
              <h3 className="font-label-bold text-label-bold text-on-surface">Home Service</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Teknisi datang ke lokasi Anda</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Preview */}
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

      {/* How it Works */}
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

      {/* Promo & Penawaran Spesial Section */}
      <section className="bg-primary/5 py-16 md:py-24 border-y border-outline-variant relative overflow-hidden">
        {/* Dekorasi tipis */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-container-max mx-auto px-4 md:px-8 lg:px-margin-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface mb-4">
                Promo & Penawaran Spesial
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                Jangan lewatkan diskon menarik bulan ini. Klaim sekarang sebelum kehabisan!
              </p>
            </div>
            <Link href="/promo" className="hidden md:inline-flex items-center gap-2 text-primary font-label-bold hover:underline mt-4 md:mt-0">
              Lihat Semua Promo
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promos.length > 0 ? (
              promos.map((promo, idx) => (
                <motion.div 
                  key={promo.id}
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-surface rounded-2xl border border-outline-variant p-6 hover:shadow-lg transition-all group relative overflow-hidden flex flex-col"
                >
                  <div className="absolute top-4 right-4 bg-tertiary text-on-tertiary font-label-sm px-3 py-1 rounded-full text-xs font-bold tracking-wider">{promo.badge}</div>
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                    <span className="material-symbols-outlined text-3xl" aria-hidden="true">loyalty</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">{promo.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">
                    {promo.description}
                  </p>
                  <Link href={`/promo/${promo.slug}`} className="w-full text-center bg-surface-container-low text-primary font-label-bold py-3 rounded hover:bg-primary hover:text-on-primary transition-colors border border-outline-variant group-hover:border-primary">
                    Klaim Promo
                  </Link>
                </motion.div>
              ))
            ) : (
              <p className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-on-surface-variant font-body-md py-8">Belum ada promo aktif saat ini.</p>
            )}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/promo" className="inline-flex items-center gap-2 text-primary font-label-bold border border-outline-variant px-6 py-3 rounded-full hover:bg-surface-container-low transition-colors">
              Lihat Semua Promo
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
      {/* Why Us Section */}
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

      {/* Stats Section */}
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

      {/* Sparepart & Aksesoris Populer */}
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
      {/* Testimonials */}
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
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            >
              {[
                {
                  name: "Budi Santoso",
                  device: "MacBook Pro M1",
                  quote: "Luar biasa! MacBook saya yang mati total karena tersiram kopi berhasil dihidupkan kembali dengan data yang utuh. Teknisi sangat komunikatif dan transparan soal harga.",
                },
                {
                  name: "Siti Rahma",
                  device: "iPhone 13",
                  quote: "Ganti LCD iPhone di sini cuma butuh waktu 1 jam. Hasilnya super rapi dan layarnya responsif banget kayak baru beli. Garansi 3 bulannya juga bikin tenang.",
                },
                {
                  name: "Andi Wijaya",
                  device: "Asus ROG Zephyrus",
                  quote: "Laptop gaming saya sering overheat, setelah dibawa ke Pytafix untuk bersihin debu & ganti thermal paste, suhunya turun drastis. Pelayanannya bintang 5!",
                },
                {
                  name: "Ratna Sari",
                  device: "Samsung Galaxy S22",
                  quote: "Sangat puas dengan pelayanan home service-nya. Teknisi datang tepat waktu ke kantor, perbaiki baterai langsung beres. Gak perlu repot ke toko lagi.",
                }
              ].concat([
                {
                  name: "Budi Santoso",
                  device: "MacBook Pro M1",
                  quote: "Luar biasa! MacBook saya yang mati total karena tersiram kopi berhasil dihidupkan kembali dengan data yang utuh. Teknisi sangat komunikatif dan transparan soal harga.",
                },
                {
                  name: "Siti Rahma",
                  device: "iPhone 13",
                  quote: "Ganti LCD iPhone di sini cuma butuh waktu 1 jam. Hasilnya super rapi dan layarnya responsif banget kayak baru beli. Garansi 3 bulannya juga bikin tenang.",
                },
                {
                  name: "Andi Wijaya",
                  device: "Asus ROG Zephyrus",
                  quote: "Laptop gaming saya sering overheat, setelah dibawa ke Pytafix untuk bersihin debu & ganti thermal paste, suhunya turun drastis. Pelayanannya bintang 5!",
                },
                {
                  name: "Ratna Sari",
                  device: "Samsung Galaxy S22",
                  quote: "Sangat puas dengan pelayanan home service-nya. Teknisi datang tepat waktu ke kantor, perbaiki baterai langsung beres. Gak perlu repot ke toko lagi.",
                }
              ]).map((testi, idx) => (
                <div key={idx} className="w-[320px] md:w-[400px] shrink-0 bg-surface border border-outline-variant p-8 rounded-[2rem] shadow-sm hover:shadow-md hover:border-primary hover:-translate-y-1 transition-all flex flex-col h-full group">
                  <div className="flex text-[#FFB400] mb-6">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <p className="font-body-lg text-on-surface italic mb-8 flex-grow">
                    "{testi.quote}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="h-12 w-12 rounded-full bg-primary-container text-primary flex items-center justify-center font-headline-sm uppercase shrink-0 group-hover:scale-110 transition-transform">
                      {testi.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-label-bold text-on-surface">{testi.name}</h4>
                      <p className="font-label-sm text-on-surface-variant">{testi.device}</p>
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

      {/* FAQ Section */}
      <section className="bg-surface-container-lowest py-16 md:py-24 border-y border-outline-variant">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="text-center mb-12"
          >
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-4">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Temukan jawaban cepat untuk pertanyaan seputar layanan kami.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="space-y-4"
          >
            {[
              {
                q: "Berapa lama proses servis biasanya selesai?",
                a: "Waktu pengerjaan sangat bergantung pada jenis kerusakan. Untuk pergantian baterai atau layar umumnya 1-3 jam. Perbaikan motherboard bisa memakan waktu 1-3 hari kerja. Kami akan memberikan estimasi pasti setelah diagnosa."
              },
              {
                q: "Apakah data saya aman selama proses perbaikan?",
                a: "Sangat aman. Privasi dan keamanan data Anda adalah prioritas utama kami. Kami menerapkan standar operasional yang ketat, dan Anda dipersilakan melakukan backup sebelum perangkat diserahkan jika memungkinkan."
              },
              {
                q: "Bagaimana sistem garansi di Pytafix?",
                a: "Kami memberikan garansi resmi untuk setiap perbaikan dan sparepart. Durasi garansi bervariasi antara 30 hingga 90 hari tergantung jenis layanan. Jika masalah yang sama muncul dalam masa garansi, kami akan perbaiki secara gratis."
              },
              {
                q: "Apakah ada biaya pengecekan (diagnosa)?",
                a: "Jika Anda melanjutkan proses servis dengan kami, biaya diagnosa 100% GRATIS. Transparansi biaya selalu kami berikan sebelum proses perbaikan dimulai."
              }
            ].map((faq, idx) => (
              <FAQItem key={idx} question={faq.q} answer={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div variants={fadeUpVariant} className="bg-surface border border-outline-variant rounded-lg overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none hover:bg-surface-container-lowest transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="font-label-bold text-label-bold text-on-surface pr-4">{question}</span>
        <span className={`material-symbols-outlined text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      <div 
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="font-body-md text-body-md text-on-surface-variant pt-2 border-t border-outline-variant">
          {answer}
        </p>
      </div>
    </motion.div>
  );
}
