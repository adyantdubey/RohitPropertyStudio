import type { Metadata } from "next";
import { LegalDocument } from "../components/LegalDocument";

export const metadata: Metadata = { title: "Educational Disclaimer" };

export default function DisclaimerPage() {
  return (
    <LegalDocument code="LGL / 04" title="Educational Disclaimer" intro="Rohit teaches a process for thinking—not a guaranteed property outcome.">
      <h2>No personal advice</h2>
      <p>All content is general education and is not financial, investment, legal, tax, engineering, valuation, brokerage, or property-specific advice.</p>
      <h2>No guaranteed outcome</h2>
      <p>Property markets, assets, financing, law, taxation, and personal circumstances change. No course, guide, tool, example, or learner story guarantees a return, price movement, transaction result, or suitability.</p>
      <h2>Independent verification</h2>
      <p>Users must verify information independently and consult appropriately qualified professionals before acting. Examples are illustrative and may omit facts that would matter in another context.</p>
      <h2>Third-party information</h2>
      <p>Any external data, links, tools, or services remain subject to their own accuracy, availability, and terms. Their inclusion does not amount to an endorsement unless explicitly stated.</p>
    </LegalDocument>
  );
}
