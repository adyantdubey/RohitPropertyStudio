"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { faqs, type FaqItem } from "../lib/content";

export type { FaqItem } from "../lib/content";

type FaqAccordionProps = {
  items?: readonly FaqItem[];
  initialOpenIndex?: number | null;
};

export function FaqAccordion({
  items = faqs,
  initialOpenIndex = 0,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(initialOpenIndex);
  const idPrefix = useId();

  return (
    <div className="faq-accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${idPrefix}-faq-trigger-${index}`;
        const panelId = `${idPrefix}-faq-panel-${index}`;

        return (
          <article
            className={`faq-item${isOpen ? " is-open" : ""}`}
            key={item.question}
          >
            <h3 className="faq-item__heading">
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className="faq-item__trigger"
                id={triggerId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                type="button"
              >
                <span className="faq-item__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="faq-item__question">
                  {item.question}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className="faq-item__chevron"
                  size={20}
                  strokeWidth={1.7}
                />
              </button>
            </h3>
            <div
              aria-labelledby={triggerId}
              className="faq-item__panel"
              hidden={!isOpen}
              id={panelId}
              role="region"
            >
              <div className="faq-item__answer">
                <p>{item.answer}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
