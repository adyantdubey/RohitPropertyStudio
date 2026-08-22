import type { Metadata } from "next";
import { ArrowUpRight, BookOpen, Building2, Mail, Phone, MonitorPlay } from "lucide-react";
import { AmbientBackdrop } from "../components/AmbientBackdrop";
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
    <main id="main-content">
      <section className="page-hero">
        <AmbientBackdrop />
        <div className="shell page-hero__grid">
          <div className="page-hero__copy">
            <p className="eyebrow" data-enter>Contact</p>
            <h1 data-split>Choose the conversation you want to start.</h1>
            <p data-enter>Course interest and property enquiries are routed separately so the team receives the right context.</p>
          </div>
          <div className="page-hero__aside" data-enter>
            <strong>No checkout yet</strong>
            <p>Early access records interest only. Pricing, delivery and payment terms will be published before orders open.</p>
          </div>
        </div>
      </section>

      <section className="section section--tight surface-light">
        <div className="shell route-grid">
          <article className="route-card" data-reveal>
            <BookOpen size={22} aria-hidden="true" />
            <span className="route-card__tag">Course</span>
            <h2>Join the learning launch list.</h2>
            <p>Use the form below for individual access or team-training interest.</p>
            <a className="text-link" href="#early-access-form">Open the form</a>
          </article>
          <article className="route-card" data-reveal data-reveal-delay="1">
            <Building2 size={22} aria-hidden="true" />
            <span className="route-card__tag">Property</span>
            <h2>Speak with Hundred Yards.</h2>
            <p>Property enquiries remain a separate professional conversation with the company team.</p>
            <a className="text-link" href={brand.companyUrl} target="_blank" rel="noreferrer" data-track="hundred_yards_clicked">
              Visit 100yards.in <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </article>
        </div>
      </section>

      <section className="section surface-dark">
        <div className="shell contact__grid">
          <div data-reveal><EarlyAccessForm siteKey={turnstileSiteKey} /></div>
          <aside className="contact-aside" data-reveal data-reveal-delay="1">
            <p className="eyebrow">Direct channels</p>
            <h2>Prefer to speak directly?</h2>
            <p>The same Hundred Yards team receives the academy&apos;s early-access enquiries.</p>
            <div className="channels">
              <a href={course.whatsapp} target="_blank" rel="noreferrer" data-track="whatsapp_clicked">
                <span><Phone size={16} aria-hidden="true" />WhatsApp</span><strong>{brand.phoneDisplay}</strong>
              </a>
              <a href={course.email}><span><Mail size={16} aria-hidden="true" />Email</span><strong>{brand.email}</strong></a>
              <a href={brand.phoneHref}><span><Phone size={16} aria-hidden="true" />Call</span><strong>{brand.phoneDisplay}</strong></a>
              <a href={brand.youtube} target="_blank" rel="noreferrer" data-track="youtube_clicked"><span><MonitorPlay size={16} aria-hidden="true" />YouTube</span><strong>@RealtorRohitSingh</strong></a>
            </div>
            <div className="contact-note">
              <strong>What happens next</strong>
              <p>The team can contact you about your selected enquiry. Submitting the form does not create a purchase, brokerage agreement or advisory engagement.</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
