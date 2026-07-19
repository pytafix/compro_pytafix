"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Faq } from "@prisma/client";
import { fadeUpVariant, staggerContainer } from "./animations";

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  const dummyFaqs = [
    {
      question: "Berapa lama proses servis biasanya selesai?",
      answer: "Waktu pengerjaan sangat bergantung pada jenis kerusakan. Untuk pergantian baterai atau layar umumnya 1-3 jam. Perbaikan motherboard bisa memakan waktu 1-3 hari kerja. Kami akan memberikan estimasi pasti setelah diagnosa."
    },
    {
      question: "Apakah data saya aman selama proses perbaikan?",
      answer: "Sangat aman. Privasi dan keamanan data Anda adalah prioritas utama kami. Kami menerapkan standar operasional yang ketat, dan Anda dipersilakan melakukan backup sebelum perangkat diserahkan jika memungkinkan."
    },
    {
      question: "Bagaimana sistem garansi di Pytafix?",
      answer: "Kami memberikan garansi resmi untuk setiap perbaikan dan sparepart. Durasi garansi bervariasi antara 30 hingga 90 hari tergantung jenis layanan. Jika masalah yang sama muncul dalam masa garansi, kami akan perbaiki secara gratis."
    },
    {
      question: "Apakah ada biaya pengecekan (diagnosa)?",
      answer: "Jika Anda melanjutkan proses servis dengan kami, biaya diagnosa 100% GRATIS. Transparansi biaya selalu kami berikan sebelum proses perbaikan dimulai."
    }
  ];

  const displayFaqs = faqs.length > 0 ? faqs : dummyFaqs;

  return (
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
          {displayFaqs.map((faq, idx) => (
            <FAQItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </motion.div>
      </div>
    </section>
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
