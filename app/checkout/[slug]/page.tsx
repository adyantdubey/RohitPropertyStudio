import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, LockKeyhole } from "lucide-react";
import { getProductBySlug, products } from "../../lib/content";

type CheckoutPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: CheckoutPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  return {
    title: product ? `${product.title} — Not available for purchase` : "Purchase unavailable",
    description:
      "Rohitt's Property Academy has no checkout, payment, protected download, or learner access currently available.",
    robots: { index: false, follow: false },
  };
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const isFieldGuide = slug === "before-you-buy-field-guide";
  const isTrainingDeck = slug === "basics-of-real-estate-training-deck";
  const status = isTrainingDeck
    ? "Launch setup pending"
    : isFieldGuide
      ? "Coming soon"
      : "In development";

  return (
    <main
      id="main-content"
      className="checkout-page cin-checkout-page authority-commerce-unavailable"
    >
      <div className="checkout-topbar authority-commerce-unavailable__topbar">
        <Link href={`/courses/${product.slug}`}>
          <ArrowLeft aria-hidden="true" size={16} /> Back to resource status
        </Link>
        <span>ROHITT PROPERTY ACADEMY / PRE-LAUNCH</span>
      </div>

      <section
        aria-labelledby="purchase-unavailable-title"
        className="checkout-intro cin-checkout-intro authority-commerce-unavailable__intro"
      >
        <div className="cin-checkout-intro__copy">
          <LockKeyhole aria-hidden="true" size={28} />
          <p className="eyebrow">{status.toUpperCase()} / NO CHECKOUT</p>
          <h1 id="purchase-unavailable-title">
            Nothing is being sold
            <br />
            <em>on this page.</em>
          </h1>
          <p>
            {isTrainingDeck
              ? `${product.title} exists as a prepared 49-slide resource, but its commercial setup is not complete.`
              : `${product.title} is ${status.toLowerCase()}.`} There is no payment
            gateway, order, protected download, account, or access promise today.
          </p>
          <div className="authority-commerce-unavailable__actions">
            <Link className="button button-dark" href="/courses">
              Return to the Academy
              <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
            <Link
              className="text-link"
              href={
                isTrainingDeck
                  ? "/contact?interest=training-deck#contact-form"
                  : isFieldGuide
                  ? "/contact?interest=field-guide#contact-form"
                  : "/contact?interest=academy#contact-form"
              }
            >
              {isTrainingDeck
                ? "Ask about launch access"
                : isFieldGuide
                ? "Join the first-access list"
                : "Ask about the Academy roadmap"}
              <ArrowUpRight aria-hidden="true" size={15} />
            </Link>
          </div>
        </div>
        <figure className="cin-checkout-intro__media">
          <Image
            alt={isTrainingDeck ? "Cover of the 100 Yards Basics of Real Estate training deck" : "Quiet architectural interior representing a paused purchase path"}
            height={isTrainingDeck ? 1080 : 1200}
            priority
            sizes="(max-width: 860px) 100vw, 48vw"
            src={isTrainingDeck ? "/media/real-estate-training-deck-cover.png" : "/media/interior-soft.jpg"}
            width={isTrainingDeck ? 1920 : 1800}
          />
          <figcaption>
            <span>PURCHASE / UNAVAILABLE</span>
            <strong>Release details come before payment.</strong>
          </figcaption>
        </figure>
      </section>
    </main>
  );
}
