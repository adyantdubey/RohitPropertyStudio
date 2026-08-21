import type { Metadata } from "next";
import { ArrowUpRight, BookOpen, Building2, Mail, Phone } from "lucide-react";
import { EarlyAccessForm } from "../components/EarlyAccessForm";
import { brand, course } from "../lib/siteContent";

export const metadata: Metadata = {
  title: "Contact",
  description: `Join ${course.title} early access or contact the Hundred Yards team for property enquiries.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY;

  return (
    <main id="main-content" className="contact-page">
      <section className="editorial-hero contact-hero">
        <div className="shell editorial-hero__grid">
          <div className="hero-entrance"><p className="eyebrow">Contact</p><h1>Choose the conversation you want to start.</h1><p>Course interest and property enquiries are routed separately so the team receives the right context.</p></div>
          <div className="editorial-hero__aside hero-entrance"><strong>No checkout yet</strong><p>Early access records interest only. Pricing, delivery and payment terms will be published before orders open.</p></div>
        </div>
      </section>

      <section className="contact-routes">
        <div className="shell contact-routes__grid">
          <article className="contact-route hero-entrance"><BookOpen aria-hidden="true" /><span>Course</span><h2>Join the learning launch list.</h2><p>Use the form below for individual access or team-training interest.</p><a href="#early-access-form">Open the form</a></article>
          <article className="contact-route hero-entrance"><Building2 aria-hidden="true" /><span>Property</span><h2>Speak with Hundred Yards.</h2><p>Property enquiries remain a separate professional conversation with the company team.</p><a href={brand.companyUrl} target="_blank" rel="noreferrer" data-track="hundred_yards_clicked">Visit 100yards.in <ArrowUpRight size={15} aria-hidden="true" /></a></article>
        </div>
      </section>

      <section className="section early-access-section">
        <div className="shell early-access-section__grid">
          <EarlyAccessForm siteKey={turnstileSiteKey} />
          <aside className="contact-aside reveal">
            <p className="eyebrow">Direct channels</p>
            <h2>Prefer to speak directly?</h2>
            <p>The same Hundred Yards team receives the academy&apos;s early-access enquiries.</p>
            <div className="direct-channel-list">
              <a href={course.whatsapp} target="_blank" rel="noreferrer" data-track="whatsapp_clicked"><span><Phone size={18} aria-hidden="true" />WhatsApp</span><strong>{brand.phoneDisplay}</strong></a>
              <a href={course.email}><span><Mail size={18} aria-hidden="true" />Email</span><strong>{brand.email}</strong></a>
              <a href={brand.phoneHref}><span><Phone size={18} aria-hidden="true" />Call</span><strong>{brand.phoneDisplay}</strong></a>
            </div>
            <div className="contact-aside__boundary"><strong>What happens next</strong><p>The team can contact you about your selected enquiry. Submitting the form does not create a purchase, brokerage agreement or advisory engagement.</p></div>
          </aside>
        </div>
      </section>
    </main>
  );
}
