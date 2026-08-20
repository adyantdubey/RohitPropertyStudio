"use client";

import { ArrowUpRight, Check, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CourseCover } from "./CourseCover";

type CheckoutPanelProps = {
  product: {
    slug: string;
    kind: "course" | "pdf" | "toolkit";
    title: string;
    shortTitle: string;
    format: string;
    access: string;
    delivery: string;
    disclaimer: string;
    price: string;
  };
};

const coverVariant = {
  course: "system",
  pdf: "field",
  toolkit: "room",
} as const;

export function CheckoutPanel({ product }: CheckoutPanelProps) {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setProcessing(true);
    timerRef.current = window.setTimeout(() => {
      router.push(`/success?preview=1&product=${product.slug}`);
    }, 900);
  };

  return (
    <form
      aria-busy={processing}
      aria-labelledby="checkout-product-title"
      className="checkout-layout cin-checkout-layout"
      onSubmit={submit}
    >
      <div className="checkout-form-panel cin-checkout-form-panel">
        <div className="checkout-step">
          <span>01</span>
          <div>
            <small>ACCESS DETAILS</small>
            <h2 id="checkout-access-heading">
              Where should access be delivered?
            </h2>
          </div>
        </div>

        <div
          aria-labelledby="checkout-access-heading"
          className="checkout-fields"
          role="group"
        >
          <label>
            Full name
            <input
              autoComplete="name"
              maxLength={100}
              name="name"
              placeholder="Your full name"
              required
            />
          </label>
          <label>
            Email address
            <input
              aria-describedby="checkout-email-note"
              autoComplete="email"
              maxLength={254}
              name="email"
              placeholder="you@example.com"
              type="email"
              required
            />
          </label>
          <label>
            Phone <span>(optional)</span>
            <input
              autoComplete="tel"
              maxLength={30}
              name="phone"
              placeholder="+91 98765 43210"
              type="tel"
            />
          </label>
          <span className="sr-only" id="checkout-email-note">
            In the live checkout, the receipt and access instructions will be
            sent to this address. This preview does not transmit it.
          </span>
        </div>

        <div className="checkout-step checkout-payment-step">
          <span>02</span>
          <div>
            <small>SECURE PAYMENT</small>
            <h2>Review before processor handoff</h2>
          </div>
        </div>

        <div className="payment-placeholder">
          <LockKeyhole aria-hidden="true" />
          <div>
            <strong>No payment details are collected in this preview</strong>
            <p>
              A hosted Stripe or Razorpay page can replace this handoff only
              after Rohit’s merchant account, approved prices, policies, and
              payment verification are connected.
            </p>
          </div>
        </div>

        <div className="checkout-consent">
          <input id="checkout-acknowledgement" name="acknowledgement" type="checkbox" required />
          <div>
            <label htmlFor="checkout-acknowledgement">
              I understand no payment or access will be created by this preview.
            </label>{" "}
            <span>
              Review the <Link href="/refund">refund policy</Link>,{" "}
              <Link href="/terms">terms</Link>, and{" "}
              <Link href="/disclaimer">educational disclaimer</Link>.
            </span>
          </div>
        </div>
      </div>

      <aside
        aria-labelledby="checkout-product-title"
        className="order-summary cin-checkout-summary"
      >
        <p className="eyebrow">YOUR SELECTION</p>
        <div className="cin-checkout-cover" aria-hidden="true">
          <CourseCover
            title={product.shortTitle}
            variant={coverVariant[product.kind]}
          />
        </div>
        <h2 className="sr-only" id="checkout-product-title">
          Selected resource: {product.title}
        </h2>
        <h1 aria-hidden="true">{product.title}</h1>
        <div className="order-lines">
          <div><span>Format</span><strong>{product.format}</strong></div>
          <div><span>Access</span><strong>{product.access.replace("Placeholder: ", "")}</strong></div>
          <div><span>Delivery</span><strong>{product.delivery}</strong></div>
        </div>
        <div className="order-total">
          <span>Preview total</span>
          <strong>{product.price}</strong>
          <small>Taxes, if applicable, confirmed by the live processor.</small>
        </div>
        <p className="cin-checkout-disclosure" id="checkout-visible-note">
          Demonstration only. Continuing opens a designed confirmation preview;
          it never opens a payment processor.
        </p>
        <button
          aria-describedby="checkout-preview-note checkout-visible-note"
          className="button button-blue checkout-submit"
          disabled={processing}
          type="submit"
        >
          {processing ? "Opening preview…" : "Preview confirmation screen"}
          <ArrowUpRight aria-hidden="true" size={18} />
        </button>
        <p className="sr-only" id="checkout-preview-note">
          This button opens a demonstration confirmation screen. It does not
          charge a card or create access.
        </p>
        <p className="sr-only" aria-live="polite">
          {processing ? "Opening the demonstration confirmation screen." : ""}
        </p>
        <ul>
          <li><Check aria-hidden="true" size={14} /> Hosted payment planned for launch</li>
          <li><Check aria-hidden="true" size={14} /> Verified orders before access</li>
          <li><Check aria-hidden="true" size={14} /> {product.disclaimer}</li>
        </ul>
      </aside>
    </form>
  );
}
