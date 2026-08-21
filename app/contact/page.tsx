import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, Clock3, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import {
  ContactForm,
  type ContactTopic,
} from "../components/ContactForm";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";

export const metadata: Metadata = {
  title: "Contact Rohitt Kumar Singh",
  description:
    "Contact the Hundred Yards team about Rohitt Kumar Singh's training deck, upcoming field guide, property guidance, or a professional collaboration.",
};

const enquiryRoutes: Array<{
  number: string;
  title: string;
  copy: string;
  href: string;
}> = [
  {
    number: "01",
    title: "Basics of Real Estate deck",
    copy: "Ask about launch access to the prepared 49-slide 100 Yards training resource.",
    href: "/contact?interest=training-deck#contact-form",
  },
  {
    number: "02",
    title: "Before You Buy",
    copy: "Ask to hear when the first verified field-guide edition is ready.",
    href: "/contact?interest=field-guide#contact-form",
  },
  {
    number: "03",
    title: "Property guidance",
    copy: "Share the market, objective, and help needed; availability and scope are confirmed separately.",
    href: "/contact?type=property#contact-form",
  },
  {
    number: "04",
    title: "Speaking & partnerships",
    copy: "Share the audience, format, dates, and the purpose of the collaboration.",
    href: "/contact?type=partnership#contact-form",
  },
];

const topicMap: Record<string, ContactTopic> = {
  property: "property",
  partnership: "partnership",
  other: "other",
};

const interestMap: Record<string, ContactTopic> = {
  "training-deck": "training-deck",
  "field-guide": "field-guide",
  academy: "academy",
};

const contactNotes = [
  {
    question: "Does this form submit on the website?",
    answer:
      "No. It prepares an email in your own mail application. You review and send that email directly to sales@100yards.in.",
  },
  {
    question: "Can I buy the training deck today?",
    answer:
      "Not yet. The 49-slide PowerPoint file exists, but its review, price, buyer licence, payment, protected delivery, support, and refund terms are still being prepared.",
  },
  {
    question: "Can the website approve a property?",
    answer:
      "No. Website material is general education. Property-specific legal, tax, financial, technical, valuation, and engineering questions require appropriately qualified professionals.",
  },
] as const;

type ContactPageProps = {
  searchParams: Promise<{
    type?: string | string[];
    interest?: string | string[];
  }>;
};

function firstQueryValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const query = await searchParams;
  const requestedType = firstQueryValue(query.type);
  const requestedInterest = firstQueryValue(query.interest);
  const defaultTopic = requestedInterest
    ? interestMap[requestedInterest]
    : requestedType
      ? topicMap[requestedType]
      : undefined;

  return (
    <main
      id="main-content"
      className="page-shell cin-contact-page authority-contact-page"
    >
      <PageHero
        index="05 / CONTACT"
        eyebrow="ROHITT KUMAR SINGH / HUNDRED YARDS"
        title={
          <>
            Bring the context.
            <br />
            <em>Start the conversation.</em>
          </>
        }
        body="Choose the reason for writing, then send your note directly to the Hundred Yards team through your own email application."
        aside={<span>TRAINING / PROPERTY / PARTNERSHIPS</span>}
      />

      <section
        aria-labelledby="contact-routes-title"
        className="contact-routes section-pad cin-contact-routes authority-contact-routes"
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
            <article className="authority-contact-route" key={route.number}>
              <span>{route.number}</span>
              <h2>{route.title}</h2>
              <p>{route.copy}</p>
              <Link className="text-link" href={route.href}>
                Use this route
                <ArrowDownRight aria-hidden="true" size={15} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="desk-section section-pad section-blue authority-contact-handoff">
        <div>
          <p className="eyebrow eyebrow-light">VERIFIED COMPANY CONTACT</p>
          <h2>
            Your note goes to
            <br />
            <em>the Hundred Yards team.</em>
          </h2>
        </div>
        <div>
          <p>
            The current handoff uses the company&apos;s published email address.
            The website does not claim to submit, queue, or store an enquiry.
          </p>
          <a className="button button-light" href="mailto:sales@100yards.in">
            <Mail aria-hidden="true" size={17} />
            sales@100yards.in
          </a>
          <ul className="authority-contact-official-facts">
            <li>
              <Phone aria-hidden="true" size={17} />
              <span>India</span>
              <a href="tel:+919916866667">+91 99168 66667</a>
            </li>
            <li>
              <Clock3 aria-hidden="true" size={17} />
              <span>Hours</span>
              <strong>Every day · 09:00–20:00</strong>
            </li>
            <li>
              <MapPin aria-hidden="true" size={17} />
              <span>Bengaluru office</span>
              <strong>
                430, Uniworks Pro, 4th floor, 5th A Cross Rd, HRBR Layout 2nd
                Block, Kalyan Nagar, Bengaluru 560043
              </strong>
            </li>
          </ul>
        </div>
      </section>

      <section
        aria-label="Email enquiry builder"
        className="contact-form-section section-pad cin-contact-form-section authority-contact-form-section"
        id="contact-form"
      >
        <ContactForm defaultTopic={defaultTopic} />
        <aside className="contact-aside authority-contact-aside">
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
          <ShieldCheck aria-hidden="true" size={24} />
          <p className="eyebrow">A NOTE ON ADVICE</p>
          <p>
            Academy material is educational. Do not send confidential property
            documents, identity documents, bank details, payment information,
            or other sensitive information through ordinary email.
          </p>
        </aside>
      </section>

      <section className="faq-section section-pad section-ink cin-contact-faq authority-contact-faq">
        <SectionHeading
          light
          eyebrow="BEFORE YOU WRITE"
          title={
            <>
              The current path,
              <br />
              <em>plainly stated.</em>
            </>
          }
        />
        <div className="authority-contact-faq__grid">
          {contactNotes.map((item, index) => (
            <article key={item.question}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
