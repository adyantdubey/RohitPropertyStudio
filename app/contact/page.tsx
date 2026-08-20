import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import {
  ContactForm,
  type ContactTopic,
} from "../components/ContactForm";
import { FaqAccordion } from "../components/FaqAccordion";
import { PageHero } from "../components/PageHero";
import { RohitDesk } from "../components/RohitDesk";
import { SectionHeading } from "../components/SectionHeading";

export const metadata: Metadata = {
  title: "Contact Rohit",
  description:
    "Ask a course question, request support, or contact Rohit about a relevant collaboration.",
};

const enquiryRoutes: Array<{
  number: string;
  title: string;
  copy: string;
  topic: ContactTopic;
}> = [
  {
    number: "01",
    title: "Course or PDF",
    copy: "Content, format, access, or the right starting resource.",
    topic: "course",
  },
  {
    number: "02",
    title: "Purchase support",
    copy: "Payment, email delivery, download, or course access.",
    topic: "support",
  },
  {
    number: "03",
    title: "Speaking & partnerships",
    copy: "Audience, format, dates, and the intended outcome.",
    topic: "partnership",
  },
  {
    number: "04",
    title: "Property enquiry",
    copy: "Context and help needed; scope is confirmed separately.",
    topic: "property",
  },
];

const topicMap: Record<string, ContactTopic> = {
  course: "course",
  pdf: "pdf",
  support: "support",
  story: "story",
  partnership: "partnership",
  property: "property",
  other: "other",
};

type ContactPageProps = {
  searchParams: Promise<{ type?: string | string[] }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const query = await searchParams;
  const requestedType = Array.isArray(query.type) ? query.type[0] : query.type;
  const defaultTopic = requestedType ? topicMap[requestedType] : undefined;

  return (
    <main id="main-content" className="page-shell cin-contact-page">
      <PageHero
        index="05 / CONTACT"
        eyebrow="START WITH THE QUESTION"
        title={<>Bring the question.<br /><em>Find the next step.</em></>}
        body="Choose the reason for reaching out so the message carries the context it needs. No pressure, no false urgency."
        aside={<span>COURSES / SUPPORT / PARTNERSHIPS</span>}
      />

      <section
        aria-labelledby="contact-routes-title"
        className="contact-routes section-pad cin-contact-routes"
      >
        <h2 className="sr-only" id="contact-routes-title">
          Choose an enquiry route
        </h2>
        <figure className="cin-contact-routes__media">
          <Image
            alt="Geometric detail of a contemporary building facade"
            height={1200}
            loading="lazy"
            sizes="(max-width: 900px) 100vw, 44vw"
            src="/media/facade-detail.jpg"
            width={1800}
          />
          <figcaption>
            <span>ROUTE / 01—04</span>
            <strong>Begin with context, not urgency.</strong>
          </figcaption>
        </figure>
        <div className="cin-contact-routes__list">
          {enquiryRoutes.map((route) => (
            <article key={route.number}>
              <span>{route.number}</span>
              <h2>{route.title}</h2>
              <p>{route.copy}</p>
              <Link
                className="text-link"
                href={`/contact?type=${route.topic}#contact-form`}
              >
                Use this route
                <ArrowDownRight aria-hidden="true" size={15} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="desk-section section-pad section-blue cin-contact-desk">
        <RohitDesk />
      </section>

      <section
        aria-label="Enquiry preview"
        className="contact-form-section section-pad cin-contact-form-section"
        id="contact-form"
      >
        <ContactForm defaultTopic={defaultTopic} />
        <aside className="contact-aside">
          <figure className="cin-contact-aside-media">
            <Image
              alt="Hands reviewing an architectural plan together"
              height={1200}
              loading="lazy"
              sizes="(max-width: 860px) 100vw, 28vw"
              src="/media/blueprint-hands.jpg"
              width={1800}
            />
            <figcaption>CONTEXT BEFORE CONCLUSIONS</figcaption>
          </figure>
          <p className="eyebrow">A NOTE ON ADVICE</p>
          <p>
            Rohit’s learning resources are educational. Personal legal,
            financial, tax, technical, and valuation questions should be taken
            to an appropriately qualified professional.
          </p>
        </aside>
      </section>

      <section className="faq-section section-pad section-ink cin-contact-faq">
        <SectionHeading
          light
          eyebrow="QUESTIONS / BEFORE YOU WRITE"
          title={<>A few answers,<br /><em>clearly stated.</em></>}
        />
        <FaqAccordion />
      </section>
    </main>
  );
}
