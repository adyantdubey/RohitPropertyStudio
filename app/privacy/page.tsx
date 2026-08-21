import type { Metadata } from "next";
import { TransitionLink as Link } from "../components/RouteCurtain";
import { LegalDocument } from "../components/LegalDocument";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How Rohitt Kumar Singh's current pre-launch website handles information.",
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      code="LGL / 01"
      title="Privacy Notice"
      intro="A plain-language description of how the current pre-launch website handles information."
    >
      <p><strong>Last updated:</strong> 21 August 2026</p>

      <h2>Contact form</h2>
      <p>
        The contact form does not submit information to this website. When you
        select the email button, the details you entered are used in your
        browser to prepare a message in your own email application. Nothing is
        sent unless you review and send that email yourself.
      </p>

      <h2>Email communication</h2>
      <p>
        If you email <a href="mailto:sales@100yards.in">sales@100yards.in</a>,
        the Hundred Yards team and the email providers involved will process the
        information contained in your message so the team can review and reply.
        Do not send sensitive identity, financial, payment, or confidential
        property documents through ordinary email.
      </p>

      <h2>Technical request data</h2>
      <p>
        Hosting and security infrastructure may process limited technical data,
        such as an IP address, browser information, requested URL, timestamp,
        and security signals, to deliver the site, maintain reliability, and
        prevent abuse. Retention and handling by those providers are governed by
        their applicable terms and settings.
      </p>

      <h2>Services not connected today</h2>
      <p>
        This website does not currently offer a newsletter signup, customer
        account, checkout, payment processing, purchase history, or digital
        product delivery. No information is collected for those purposes on the
        current site.
      </p>

      <h2>External links</h2>
      <p>
        Links to Hundred Yards, social networks, public sources, and other
        external websites take you to services with their own privacy practices.
        Review those services&apos; notices before providing information.
      </p>

      <h2>Questions or requests</h2>
      <p>
        For a privacy question about the current site or an email you sent,
        contact <a href="mailto:sales@100yards.in">sales@100yards.in</a>. You can
        also use the <Link href="/contact">contact page</Link> to prepare the
        message in your email application.
      </p>
    </LegalDocument>
  );
}
