import type { Metadata } from "next";
import { LegalDocument } from "../components/LegalDocument";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <LegalDocument code="LGL / 02" title="Terms & Conditions" intro="The ground rules for using Rohit’s website and educational resources.">
      <h2>Educational use</h2>
      <p>Site content, courses, guides, and tools provide general education. They do not create an advisory, brokerage, professional-services, or fiduciary relationship.</p>
      <h2>Product access</h2>
      <p>Verified format, licence, access period, support arrangement, price, taxes, and delivery terms will be displayed before purchase and form part of the applicable order.</p>
      <h2>Intellectual property</h2>
      <p>Unless a product licence states otherwise, purchased resources are for the buyer’s personal use and may not be copied, redistributed, resold, or used to provide a competing commercial service.</p>
      <h2>Acceptable use and availability</h2>
      <p>Users must not interfere with the site, bypass access controls, misuse downloads, or submit unlawful content. Availability may be interrupted for maintenance, security, or circumstances outside reasonable control.</p>
    </LegalDocument>
  );
}
