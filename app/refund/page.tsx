import type { Metadata } from "next";
import { LegalDocument } from "../components/LegalDocument";

export const metadata: Metadata = { title: "Refund Policy" };

export default function RefundPage() {
  return (
    <LegalDocument code="LGL / 03" title="Refund Policy" intro="Product-specific terms will be stated plainly before payment.">
      <h2>Digital products</h2>
      <p>The approved policy must explain eligibility once a PDF, template, toolkit, or other digital file has been delivered or accessed, together with any rights required by applicable law.</p>
      <h2>Course access</h2>
      <p>The final policy will specify any request window, access or consumption limits, exclusions, and the evidence needed to investigate technical access problems.</p>
      <h2>Duplicate or incorrect charges</h2>
      <p>Verified duplicate charges and billing errors will be investigated promptly. Customers should include the purchase email and order reference when contacting support.</p>
      <h2>How to request help</h2>
      <p>The verified support email, response window, payment processor, and refund timing will be inserted before checkout is enabled.</p>
    </LegalDocument>
  );
}
