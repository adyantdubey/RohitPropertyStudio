import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Download, Eye, Info, Mail } from "lucide-react";
import { CourseCover } from "../components/CourseCover";
import { getProductBySlug } from "../lib/content";

export const metadata: Metadata = {
  title: "Access Preview",
  description: "Preview of the post-purchase access experience.",
  robots: { index: false, follow: false },
};

const coverVariant = { course: "system", pdf: "field", toolkit: "room" } as const;

type SuccessPageProps = {
  searchParams: Promise<{ product?: string; preview?: string }>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const query = await searchParams;
  const product = getProductBySlug(query.product ?? "");
  const isPreview = query.preview === "1" && Boolean(product);

  if (!isPreview || !product) {
    return (
      <main id="main-content" className="success-page cin-success-page">
        <div className="success-grid" aria-hidden="true" />
        <section className="cin-success-masthead" aria-labelledby="no-order-title">
          <div className="cin-success-copy">
            <div className="success-signal">
              <Info aria-hidden="true" />
            </div>
            <p className="eyebrow">NO VERIFIED ORDER</p>
            <h1 id="no-order-title">
              No purchase has
              <br />
              <em>been confirmed.</em>
            </h1>
            <p className="success-lead">
              This page cannot verify payment or unlock a resource by itself.
              Start from a product page to review the clearly labelled checkout
              prototype.
            </p>
            <div className="success-actions">
              <Link className="text-link" href="/courses">
                Explore the collection
                <ArrowUpRight aria-hidden="true" size={15} />
              </Link>
              <Link className="text-link" href="/contact?type=support#contact-form">
                Visit support
                <ArrowUpRight aria-hidden="true" size={15} />
              </Link>
            </div>
          </div>
          <figure className="cin-success-media">
            <Image
              alt="Geometric architectural facade representing an unverified access point"
              height={1200}
              priority
              sizes="(max-width: 860px) 100vw, 48vw"
              src="/media/facade-detail.jpg"
              width={1800}
            />
            <figcaption>VERIFICATION REQUIRED / NO ACCESS CREATED</figcaption>
          </figure>
        </section>
      </main>
    );
  }

  return (
    <main id="main-content" className="success-page cin-success-page">
      <div className="success-grid" aria-hidden="true" />
      <section className="cin-success-masthead" aria-labelledby="preview-access-title">
        <div className="cin-success-copy">
          <div className="success-signal">
            <Eye aria-hidden="true" />
          </div>
          <p className="eyebrow">CONFIRMATION EXPERIENCE / PREVIEW ONLY</p>
          <h1 id="preview-access-title">Verified access,<br /><em>when payment is live.</em></h1>
          <p className="success-lead">
            This demonstrates the intended post-purchase experience. No payment
            was processed, no order was verified, and no access was created.
          </p>
        </div>
        <figure className="cin-success-media">
          <Image
            alt="Bright contemporary interior representing the planned learning access experience"
            height={1200}
            priority
            sizes="(max-width: 860px) 100vw, 48vw"
            src="/media/interior-daylight.jpg"
            width={1800}
          />
          <figcaption>PLANNED ACCESS / VERIFIED ORDERS ONLY</figcaption>
        </figure>
      </section>

      <div className="success-card">
        <CourseCover variant={coverVariant[product.kind]} title={product.shortTitle} />
        <div>
          <small>YOUR COLLECTION / 001</small>
          <h2>{product.title}</h2>
          <p>Planned delivery: {product.delivery}</p>
          <button className="button button-dark" type="button" disabled>
            <Download aria-hidden="true" size={17} /> Locked until a verified order exists
          </button>
        </div>
      </div>

      <div className="success-notes">
        <div><Mail aria-hidden="true" /><span><strong>Planned email delivery</strong>Receipt and access instructions after verification</span></div>
        <div><Check aria-hidden="true" /><span><strong>Planned purchase recovery</strong>A support path tied to each live order</span></div>
      </div>

      <div className="success-actions">
        <Link className="text-link" href={`/courses/${product.slug}`}>Back to the resource <ArrowUpRight aria-hidden="true" size={15} /></Link>
        <Link className="text-link" href="/contact?type=support#contact-form">Visit support <ArrowUpRight aria-hidden="true" size={15} /></Link>
      </div>
    </main>
  );
}
