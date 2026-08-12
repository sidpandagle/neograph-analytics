'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[];
}

/**
 * Accordion. The open panel takes the primary blue — the one place in
 * long-form content where blue fills a whole surface.
 */
export default function FAQ({ faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section id="faq" className="mb-12 scroll-mt-24">
      <h2 className="mb-6 text-[24px] md:text-[28px]">Frequently asked questions</h2>

      <div className="flex flex-col gap-2.5">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`rounded-tile border transition-colors duration-200 ${
                isOpen
                  ? 'border-[var(--cmi-primary)] bg-[var(--cmi-primary)]'
                  : 'border-[var(--cmi-line)] bg-[var(--cmi-raisedsurface)]'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-[22px]"
              >
                <span
                  className={`text-[15px] font-semibold md:text-[15.5px] ${
                    isOpen ? 'text-white' : 'text-[var(--cmi-ink)]'
                  }`}
                >
                  {faq.question}
                </span>
                <span
                  className={`shrink-0 text-[13px] font-bold ${isOpen ? 'text-white' : 'text-[var(--cmi-ink)]'}`}
                  aria-hidden="true"
                >
                  {isOpen ? '—' : '+'}
                </span>
              </button>

              {isOpen && (
                <p className="px-5 pb-4 text-sm leading-[1.6] text-[var(--cmi-on-blue)] md:px-[22px]">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
