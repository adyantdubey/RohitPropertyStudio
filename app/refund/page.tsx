import type { Metadata } from "next";
import { TransitionLink as Link } from "../components/RouteCurtain";
import { LegalDocument } from "../components/LegalDocument";

export const metadata: Metadata = {
  title: "Sales & Refund Status",
  description:
    "Current pre-launch sales and refund status for Rohitt Kumar Singh's Property Academy.",
};

export default function RefundPage() {
  return (
    <LegalDocument
      code="LGL / 03"
      title="Sales & Refund Status"
      intro="The Academy is pre-launch, so no sale, charge, order, delivery, or refund can currently occur on this website."
    >
      <p><strong>Last updated:</strong> 21 August 2026</p>

      <h2>No sales are open</h2>
      <p>
        Before You Buy is coming soon, while the course and toolkit concepts are
        in development. This website has no live product, price, checkout,
        payment processor, order confirmation, download, or learner account.
      </p>

      <h2>No charge means no website refund</h2>
      <p>
        Because this website cannot collect a payment, it cannot create a charge
        or process a refund. A page, message, or screen on this site is not proof
        of purchase.
      </p>

      <h2>Before any future sale</h2>
      <p>
        If paid Academy products are introduced, the applicable seller, price,
        taxes, format, licence, delivery method, access terms, support path, and
        refund or cancellation rules will be presented before payment. Those
        terms must reflect the actual product and applicable law.
      </p>

      <h2>Unexpected payment request</h2>
      <p>
        Do not enter card, bank, UPI, or identity information on any page that
        claims to be this website&apos;s Academy checkout today. If someone claims
        to have charged you through this site, contact your payment provider and
        notify the Hundred Yards team at
        {" "}<a href="mailto:sales@100yards.in">sales@100yards.in</a>.
      </p>

      <h2>Field-guide updates</h2>
      <p>
        To ask about the unfinished field guide, use the
        {" "}<Link href="/contact?interest=field-guide#contact-form">
          first-access contact route
        </Link>. It prepares an email and does not take payment.
      </p>
    </LegalDocument>
  );
}
