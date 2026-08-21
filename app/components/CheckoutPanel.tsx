import Link from "next/link";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import type { Product } from "../lib/content";

type CheckoutPanelProps = {
  product: Product;
};

/**
 * Retained for compatibility with older route imports. It deliberately exposes
 * no form or payment control while the Academy is pre-launch.
 */
export function CheckoutPanel({ product }: CheckoutPanelProps) {
  const isFieldGuide = product.slug === "before-you-buy-field-guide";
  const isTrainingDeck = product.slug === "basics-of-real-estate-training-deck";

  return (
    <section className="authority-commerce-panel" aria-labelledby="commerce-panel-title">
      <LockKeyhole aria-hidden="true" size={28} />
      <p className="eyebrow">PRE-LAUNCH / NO PAYMENT</p>
      <h2 id="commerce-panel-title">{product.title} is not available to buy yet.</h2>
      <p>
        No checkout, order, price, account, or digital delivery is active. Final
        commercial terms will be published before payment opens.
      </p>
      <Link
        className="button button-dark"
        href={
          isTrainingDeck
            ? "/contact?interest=training-deck#contact-form"
            : isFieldGuide
              ? "/contact?interest=field-guide#contact-form"
              : "/courses"
        }
      >
        {isTrainingDeck
          ? "Ask about launch access"
          : isFieldGuide
            ? "Join the first-access list"
            : "Return to the Academy"}
        <ArrowUpRight aria-hidden="true" size={17} />
      </Link>
    </section>
  );
}
