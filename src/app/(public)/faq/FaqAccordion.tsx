"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Faq } from "@prisma/client";

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  if (faqs.length === 0) {
    return (
      <div className="text-center p-8 bg-surface-container rounded-2xl border border-outline-variant">
        <p className="text-on-surface-variant font-body-lg">Belum ada FAQ yang tersedia saat ini.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div 
          key={faq.id} 
          className="border border-outline-variant rounded-2xl overflow-hidden bg-surface transition-colors hover:border-primary/50"
        >
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
          >
            <h3 className="font-headline-sm text-lg md:text-xl font-bold text-on-surface pr-4">
              {faq.question}
            </h3>
            <svg 
              className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="px-6 pb-5 pt-0 border-t border-outline-variant/30 mt-1">
                  <p className="font-body-md text-on-surface-variant whitespace-pre-wrap mt-4">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
