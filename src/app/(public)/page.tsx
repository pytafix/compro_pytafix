"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

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

export default function Home() {
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
          <div className="md:col-span-7 flex flex-col gap-6">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-xl md:text-headline-xl text-on-surface leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-on-primary-fixed-variant">
              Laptop Mati Total? Layar HP Retak? Kami Solusinya.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Jangan biarkan perangkat rusak menghentikan aktivitas Anda. Pytafix hadir di Malang dengan teknisi bersertifikat, pengerjaan cepat, dan jaminan keamanan data 100%. Servis jujur tanpa biaya tersembunyi.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <a href="/booking-servis" className="bg-primary text-on-primary font-label-bold text-label-bold px-8 py-3 rounded hover:bg-on-primary-fixed-variant hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer inline-flex items-center justify-center">
                Perbaiki Sekarang
              </a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="border border-outline text-primary font-label-bold text-label-bold px-8 py-3 rounded hover:bg-surface-container hover:shadow transition-all flex items-center gap-2 cursor-pointer">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
                  chat
                </span>
                Chat WhatsApp
              </a>
            </div>
          </div>
          <div className="md:col-span-5 h-[400px] md:h-[500px] rounded-2xl border border-outline-variant overflow-hidden bg-surface-container-low shadow-xl">
            <img
              alt="Technical Repair Workspace"
              className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 hover:scale-105 transition-all duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqF0jqivhdbQ4AuLxzDky2D5JGwbHIPyR7RyIXyXJb5nAv5UGAFaQug9sIMTiUyI78AEZhcipbtWkS9DaBWsrKziKIVHFtMr__veQgpv-eEuhgQJPIznpGYvI5yMgDgzpo9t-UhmCeN-79ioojmn8ye2WL3nLU22cYYnWVx9SIAODvqs7X-CjfKrWGPYCyjwUGyOABV9RByMf7OW3SMOtg8NPvqWAjsA2vUXeP08yvrx32rXO0_2UP01lSD8lMCls1oVVPldHB0eKH"
            />
          </div>
        </div>
      </motion.header>

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
              <span className="material-symbols-outlined text-primary text-[28px]" aria-hidden="true">verified</span>
            </div>
            <div>
              <h3 className="font-label-bold text-label-bold text-on-surface">Garansi Resmi</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Jaminan layanan hingga 90 hari</p>
            </div>
          </motion.div>
          <motion.div variants={fadeUpVariant} className="flex items-center gap-4 group">
            <div className="h-14 w-14 rounded-xl bg-primary-fixed flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary text-[28px]" aria-hidden="true">memory</span>
            </div>
            <div>
              <h3 className="font-label-bold text-label-bold text-on-surface">Sparepart Original</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Komponen bersertifikasi pabrik</p>
            </div>
          </motion.div>
          <motion.div variants={fadeUpVariant} className="flex items-center gap-4 group">
            <div className="h-14 w-14 rounded-xl bg-primary-fixed flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary text-[28px]" aria-hidden="true">home_repair_service</span>
            </div>
            <div>
              <h3 className="font-label-bold text-label-bold text-on-surface">Home Service</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Teknisi datang ke lokasi Anda</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Preview */}
      <section className="bg-surface-container-low/50 py-16 md:py-24 border-y border-outline-variant">
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-gutter"
          >
            {/* Card 1 */}
            <motion.div variants={fadeUpVariant} className="bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group">
              <span className="material-symbols-outlined text-primary text-[40px] mb-6 group-hover:scale-110 transition-transform" aria-hidden="true">
                laptop_mac
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Service Laptop & PC</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Laptop mati total, lemot, bluescreen, ganti keyboard, hingga upgrade SSD/RAM.
              </p>
            </motion.div>
            {/* Card 2 */}
            <motion.div variants={fadeUpVariant} className="bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group">
              <span className="material-symbols-outlined text-primary text-[40px] mb-6 group-hover:scale-110 transition-transform" aria-hidden="true">
                smartphone
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">HP & Tablet</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Penggantian baterai, perbaikan LCD presisi tinggi, dan pemulihan data sistem.
              </p>
            </motion.div>
            {/* Card 3 */}
            <motion.div variants={fadeUpVariant} className="bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group">
              <span className="material-symbols-outlined text-primary text-[40px] mb-6 group-hover:scale-110 transition-transform" aria-hidden="true">
                inventory_2
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Sparepart</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Penyediaan komponen OEM bersertifikat dengan garansi pemasangan.
              </p>
            </motion.div>
            {/* Card 4 */}
            <motion.div variants={fadeUpVariant} className="bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group">
              <span className="material-symbols-outlined text-primary text-[40px] mb-6 group-hover:scale-110 transition-transform" aria-hidden="true">
                directions_car
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Home Service</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Penjadwalan kunjungan teknisi untuk perbaikan di tempat (khusus area Malang).
              </p>
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
        className="py-16 md:py-24 max-w-container-max mx-auto px-4 md:px-8 lg:px-margin-desktop"
      >
        <motion.h2 variants={fadeUpVariant} className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-center text-on-surface mb-16">
          Prosedur Layanan
        </motion.h2>
        <div className="flex flex-col md:flex-row justify-between relative">
          <div className="hidden md:block absolute top-6 left-12 right-12 h-[2px] bg-outline-variant z-0"></div>
          {/* Step 1 */}
          <motion.div variants={fadeUpVariant} className="flex flex-col items-center text-center relative z-10 w-full md:w-1/4 mb-8 md:mb-0 group">
            <div className="h-12 w-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-bold text-label-bold border-4 border-surface mb-4 group-hover:scale-110 transition-transform shadow-md">
              1
            </div>
            <h4 className="font-label-bold text-label-bold text-on-surface mb-2">Booking</h4>
            <p className="font-label-sm text-label-sm text-on-surface-variant px-4">
              Jadwalkan servis via web atau WA.
            </p>
          </motion.div>
          {/* Step 2 */}
          <motion.div variants={fadeUpVariant} className="flex flex-col items-center text-center relative z-10 w-full md:w-1/4 mb-8 md:mb-0 group">
            <div className="h-12 w-12 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center font-label-bold text-label-bold border-4 border-surface mb-4 group-hover:bg-primary group-hover:text-on-primary group-hover:scale-110 transition-all shadow-sm">
              2
            </div>
            <h4 className="font-label-bold text-label-bold text-on-surface mb-2">Diagnosis</h4>
            <p className="font-label-sm text-label-sm text-on-surface-variant px-4">
              Pengecekan teknis & estimasi biaya.
            </p>
          </motion.div>
          {/* Step 3 */}
          <motion.div variants={fadeUpVariant} className="flex flex-col items-center text-center relative z-10 w-full md:w-1/4 mb-8 md:mb-0 group">
            <div className="h-12 w-12 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center font-label-bold text-label-bold border-4 border-surface mb-4 group-hover:bg-primary group-hover:text-on-primary group-hover:scale-110 transition-all shadow-sm">
              3
            </div>
            <h4 className="font-label-bold text-label-bold text-on-surface mb-2">Repair</h4>
            <p className="font-label-sm text-label-sm text-on-surface-variant px-4">
              Pengerjaan dengan standar operasional ketat.
            </p>
          </motion.div>
          {/* Step 4 */}
          <motion.div variants={fadeUpVariant} className="flex flex-col items-center text-center relative z-10 w-full md:w-1/4 group">
            <div className="h-12 w-12 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center font-label-bold text-label-bold border-4 border-surface mb-4 group-hover:bg-primary group-hover:text-on-primary group-hover:scale-110 transition-all shadow-sm">
              4
            </div>
            <h4 className="font-label-bold text-label-bold text-on-surface mb-2">Warranty</h4>
            <p className="font-label-sm text-label-sm text-on-surface-variant px-4">
              Pengujian akhir & penyerahan garansi.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <section className="bg-surface-container-low py-16 md:py-24 border-t border-outline-variant">
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
