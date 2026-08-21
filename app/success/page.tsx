import type { Metadata } from "next";
import Image from "next/image";
import { TransitionLink as Link } from "../components/RouteCurtain";
import { ArrowUpRight, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "No Order or Access",
  description:
    "Rohitt's Property Academy is pre-launch. No payment, order, download, or learner access is currently available.",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <main
      id="main-content"
      className="success-page cin-success-page authority-access-unavailable"
    >
      <div className="success-grid" aria-hidden="true" />
      <section
        className="cin-success-masthead authority-access-unavailable__masthead"
        aria-labelledby="no-order-title"
      >
        <div className="cin-success-copy">
          <div className="success-signal">
            <Info aria-hidden="true" />
          </div>
          <p className="eyebrow">ACADEMY / LAUNCH ACCESS</p>
          <h1 id="no-order-title">
            No order was found.
            <br />
            <em>Join the launch list instead.</em>
          </h1>
          <p className="success-lead">
            Academy checkout is not live yet, so this page cannot confirm a
            payment or unlock a resource. Return to the Academy or join the
            first-access list for launch details.
          </p>
          <div className="success-actions authority-access-unavailable__actions">
            <Link className="button button-dark" href="/courses">
              Return to the Academy
              <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
            <Link
              className="text-link"
              href="/contact?interest=field-guide#contact-form"
            >
              Join the field-guide first-access list
              <ArrowUpRight aria-hidden="true" size={15} />
            </Link>
          </div>
        </div>
        <figure className="cin-success-media">
          <Image
            alt="Geometric architectural facade representing an unavailable access route"
            height={1200}
            priority
            sizes="(max-width: 860px) 100vw, 48vw"
            src="/media/facade-detail.jpg"
            width={1800}
          />
          <figcaption>ACADEMY / FIRST ACCESS</figcaption>
        </figure>
      </section>
    </main>
  );
}
