import type { Metadata } from "next";
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
  if (!product) return { title: "Checkout" };
  return {
    title: `Checkout — ${product.title}`,
    description: `Review ${product.title} and continue to secure payment.`,
    openGraph: { title: `Checkout — ${product.title}`, description: product.tagline, images: [] },
    twitter: { card: "summary", title: `Checkout — ${product.title}`, description: product.tagline, images: [] },
  };
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <main id="main-content" className="checkout-page">
      <div className="checkout-topbar">
        <Link href={`/courses/${product.slug}`}><ArrowLeft aria-hidden="true" size={16} /> Back to product</Link>
        <span>SECURE CHECKOUT / PROTOTYPE</span>
      </div>
      <div className="checkout-intro">
        <p className="eyebrow">REVIEW / CONFIRM / CONTINUE</p>
        <h2>Complete your <em>access.</em></h2>
        <p>Review the product, buyer details, price, access terms, and policy before continuing.</p>
      </div>
      <CheckoutPanel
        product={{
          slug: product.slug,
          title: product.title,
          format: product.format,
          access: product.access,
          price: product.price.formatted,
        }}
      />
    </main>
  );
}
