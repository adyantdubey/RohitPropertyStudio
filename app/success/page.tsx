import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, Download, Mail } from "lucide-react";
import { CourseCover } from "../components/CourseCover";
import { getProductBySlug, products } from "../lib/content";

export const metadata: Metadata = {
  title: "Access Preview",
  description: "Preview of the post-purchase access experience.",
};

const coverVariant = { course: "system", pdf: "field", toolkit: "room" } as const;

type SuccessPageProps = {
  searchParams: Promise<{ product?: string; preview?: string }>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const query = await searchParams;
  const product = getProductBySlug(query.product ?? "") ?? products[0];

  return (
    <main id="main-content" className="success-page">
      <div className="success-grid" aria-hidden="true" />
      <div className="success-signal"><Check aria-hidden="true" /></div>
      <p className="eyebrow">ACCESS EXPERIENCE / PREVIEW ONLY</p>
      <h1>Your learning<br /><em>starts here.</em></h1>
      <p className="success-lead">
        This is the designed post-purchase state. No payment has been processed
        and no access has been created in this prototype.
      </p>

      <div className="success-card">
        <CourseCover variant={coverVariant[product.kind]} title={product.shortTitle} />
        <div>
          <small>YOUR COLLECTION / 001</small>
          <h2>{product.title}</h2>
          <p>{product.delivery}</p>
          <button className="button button-dark" type="button" disabled>
            <Download aria-hidden="true" size={17} /> Access activates after verified payment
          </button>
        </div>
      </div>

      <div className="success-notes">
        <div><Mail aria-hidden="true" /><span><strong>Email delivery</strong>Receipt and access instructions</span></div>
        <div><Check aria-hidden="true" /><span><strong>Purchase recovery</strong>Support path for every order</span></div>
      </div>

      <div className="success-actions">
        <Link className="text-link" href="/courses">Back to collection <ArrowUpRight aria-hidden="true" size={15} /></Link>
        <Link className="text-link" href="/contact">Ask a question <ArrowUpRight aria-hidden="true" size={15} /></Link>
      </div>
    </main>
  );
}
