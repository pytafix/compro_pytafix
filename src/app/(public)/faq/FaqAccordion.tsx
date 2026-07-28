import type { PublicFaq } from "@/lib/site-content";

export default function FaqAccordion({ faqs }: { faqs: PublicFaq[] }) {
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
        <details
          key={faq.id}
          open={index === 0}
          className="border border-outline-variant rounded-2xl overflow-hidden bg-surface transition-colors hover:border-primary/50"
        >
          <summary className="cursor-pointer list-none px-6 py-5 font-headline-sm text-lg md:text-xl font-bold text-on-surface">
            {faq.question}
          </summary>
          <div id={`faq-answer-${faq.id}`} className="px-6 pb-5 pt-4 border-t border-outline-variant/30">
            <p className="font-body-md text-on-surface-variant whitespace-pre-wrap">{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
