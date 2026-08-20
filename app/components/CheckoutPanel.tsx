"use client";

import { ArrowUpRight, Check, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

type CheckoutPanelProps = {
  product: {
    slug: string;
    title: string;
    format: string;
    access: string;
    price: string;
  };
};

export function CheckoutPanel({ product }: CheckoutPanelProps) {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setProcessing(true);
    window.setTimeout(() => {
      router.push(`/success?preview=1&product=${product.slug}`);
    }, 900);
  };

  return (
    <form className="checkout-layout" onSubmit={submit}>
      <div className="checkout-form-panel">
        <div className="checkout-step">
          <span>01</span>
          <div>
            <small>ACCESS DETAILS</small>
            <h2>Where should we send your resource?</h2>
          </div>
        </div>

        <div className="checkout-fields">
          <label>
            Full name
            <input autoComplete="name" name="name" placeholder="Your full name" required />
          </label>
          <label>
            Email address
            <input autoComplete="email" name="email" placeholder="you@example.com" type="email" required />
          </label>
          <label>
            Phone <span>(optional)</span>
            <input autoComplete="tel" name="phone" placeholder="+91 98765 43210" type="tel" />
          </label>
        </div>

        <div className="checkout-step checkout-payment-step">
          <span>02</span>
          <div>
            <small>SECURE PAYMENT</small>
            <h2>Processor handoff</h2>
          </div>
        </div>

        <div className="payment-placeholder">
          <LockKeyhole aria-hidden="true" />
          <div>
            <strong>Hosted payment integration ready</strong>
            <p>
              Stripe or Razorpay will open here after Rohit’s merchant account and
              approved prices are connected. This preview never collects card data.
            </p>
          </div>
        </div>

        <label className="checkout-consent">
          <input type="checkbox" required />
          <span>
            I have reviewed the product description, placeholder access conditions,
            refund policy, and educational-use disclaimer.
          </span>
        </label>
      </div>

      <aside className="order-summary">
        <p className="eyebrow">YOUR SELECTION</p>
        <h1>{product.title}</h1>
        <div className="order-lines">
          <div><span>Format</span><strong>{product.format}</strong></div>
          <div><span>Access</span><strong>{product.access.replace("Placeholder: ", "")}</strong></div>
          <div><span>Delivery</span><strong>Email + on-screen</strong></div>
        </div>
        <div className="order-total">
          <span>Preview total</span>
          <strong>{product.price}</strong>
          <small>Taxes, if applicable, confirmed by the live processor.</small>
        </div>
        <button className="button button-blue checkout-submit" type="submit" disabled={processing}>
          {processing ? "Preparing preview…" : "Preview payment handoff"}
          <ArrowUpRight aria-hidden="true" size={18} />
        </button>
        <ul>
          <li><Check aria-hidden="true" size={14} /> Secure hosted payment at launch</li>
          <li><Check aria-hidden="true" size={14} /> Access instructions by email</li>
          <li><Check aria-hidden="true" size={14} /> Clear support and refund terms</li>
        </ul>
      </aside>
    </form>
  );
}
