import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CheckoutPanel } from "../../components/CheckoutPanel";
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
  if (!product) {
    return {
      title: "Checkout",
      robots: { index: false, follow: false },
    };
  }
  return {
    title: `Checkout — ${product.title}`,
    description: `Review the prototype checkout experience for ${product.title}. No payment is collected.`,
    robots: { index: false, follow: false },
    openGraph: { title: `Checkout — ${product.title}`, description: product.tagline, images: [] },
    twitter: { card: "summary", title: `Checkout — ${product.title}`, description: product.tagline, images: [] },
  };
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <main id="main-content" className="checkout-page cin-checkout-page">
      <h1 className="sr-only">Checkout preview for {product.title}</h1>
      <div className="checkout-topbar">
        <Link href={`/courses/${product.slug}`}><ArrowLeft aria-hidden="true" size={16} /> Back to product</Link>
        <span>ROHIT / CHECKOUT PROTOTYPE</span>
      </div>
      <section
        aria-labelledby="checkout-intro-title"
        className="checkout-intro cin-checkout-intro"
      >
        <div className="cin-checkout-intro__copy">
          <p className="eyebrow">ROHIT / ACCESS REVIEW</p>
          <h2 id="checkout-intro-title">See the path to <em>access.</em></h2>
          <p>
            Review the proposed buyer details, price, delivery, access terms,
            and policies. This prototype does not collect payment or create
            access.
          </p>
        </div>
        <figure className="cin-checkout-intro__media">
          <Image
            alt="Quiet architectural interior with strong natural light"
            height={1200}
            priority
            sizes="(max-width: 860px) 100vw, 48vw"
            src="/media/interior-soft.jpg"
            width={1800}
          />
          <figcaption>
            <span>CHECKOUT / PROTOTYPE</span>
            <strong>Calm enough to review every detail.</strong>
          </figcaption>
        </figure>
      </section>
      <CheckoutPanel
        product={{
          slug: product.slug,
          kind: product.kind,
          title: product.title,
          shortTitle: product.shortTitle,
          format: product.format,
          access: product.access,
          delivery: product.delivery,
          disclaimer: product.disclaimer,
          price: product.price.formatted,
        }}
      />
    </main>
  );
}
