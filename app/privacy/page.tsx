import type { Metadata } from "next";
import { LegalDocument } from "../components/LegalDocument";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalDocument code="LGL / 01" title="Privacy Policy" intro="A clear explanation of what information the site uses and why.">
      <h2>Information we collect</h2>
      <p>When connected for launch, the site may collect information you provide through enquiry, newsletter, checkout, and support forms, together with limited technical information needed for security and performance.</p>
      <h2>How information is used</h2>
      <p>Information is used to respond to enquiries, deliver purchased resources, provide account or order support, send opted-in communications, prevent abuse, and understand site performance.</p>
      <h2>Processors and retention</h2>
      <p>Approved payment, email, hosting, analytics, and support providers may process limited information on Rohit’s behalf. Final providers, retention periods, contact details, and user-rights instructions will be inserted before launch.</p>
      <h2>Your choices</h2>
      <p>You may unsubscribe from educational email and request access, correction, or deletion where applicable. The verified privacy contact will be published here.</p>
    </LegalDocument>
  );
}
