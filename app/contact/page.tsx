import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { brand, course } from "../lib/siteContent";

export const metadata: Metadata = { title: "Contact", description: `Contact ${brand.name}'s team for course early access or Hundred Yards property enquiries.` };

export default function ContactPage() {
  return (
    <main id="main-content">
      <section className="inner-hero"><div className="shell inner-hero__grid"><div className="inner-hero__copy hero-entrance"><p className="eyebrow">Contact</p><h1>Choose the conversation you want to start.</h1><p>Course interest and property enquiries are routed separately so the team can respond with the right context.</p></div></div></section>
      <section className="section inner-section"><div className="shell contact-grid"><div className="reveal"><p className="eyebrow">Course early access</p><h2>Be first to receive the launch details.</h2><p>No payment is collected today. Send a ready-made message by WhatsApp or email and the Hundred Yards team can record your interest.</p></div><div className="contact-options reveal"><a className="contact-option" href={course.whatsapp} target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>Join the course launch list ↗</strong></a><a className="contact-option" href={course.email}><span>Email</span><strong>{brand.email}</strong></a><a className="contact-option" href={brand.phoneHref}><span>Call</span><strong>{brand.phoneDisplay}</strong></a><a className="contact-option" href={brand.companyUrl} target="_blank" rel="noreferrer"><span>Property enquiries</span><strong>Visit Hundred Yards <ArrowUpRight size={20} aria-hidden="true" /></strong></a></div></div></section>
    </main>
  );
}
