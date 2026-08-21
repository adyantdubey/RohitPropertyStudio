import type { Metadata } from "next";
import Image from "next/image";
import { TransitionLink as Link } from "../components/RouteCurtain";
import { ArrowDownRight, Clock3, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import {
  ContactForm,
  type ContactTopic,
} from "../components/ContactForm";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";

export const metadata: Metadata = {
  title: "Contact",
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
    title: "Buy a home",
    copy: "Share your preferred Bengaluru locations, configuration, budget range, and purchase timing.",
    href: "/contact?type=property#contact-form",
  },
  {
    number: "02",
    title: "Invest in property",
    copy: "Discuss residential, plotted, or commercial opportunities and the market context you need.",
    href: "/contact?type=investment#contact-form",
  },
  {
    number: "03",
    title: "Sell or manage a remote search",
    copy: "Ask about seller representation, NRI coordination, video walkthroughs, and local transaction support.",
    href: "/contact?type=nri#contact-form",
  },
  {
    number: "04",
    title: "Academy & partnerships",
    copy: "Join the training-deck or buyer-PDF list, or discuss speaking, media, and professional collaborations.",
    href: "/contact?interest=training-deck#contact-form",
  },
];

const topicMap: Record<string, ContactTopic> = {
  property: "property",
  investment: "investment",
  seller: "seller",
  nri: "nri",
  commercial: "commercial",
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
    question: "How is my enquiry sent?",
    answer:
      "The form prepares an email in your own mail application. Review it and send it directly to sales@100yards.in; the website itself stores nothing.",
  },
  {
    question: "When can I access the training deck?",
    answer:
      "The 49-slide deck is prepared and the launch list is open. Pricing, licence, protected delivery, support, and refund terms will be shared before access opens.",
  },
  {
    question: "When can I contact the property team?",
    answer:
      "Hundred Yards publishes property-consultation hours every day from 09:00 to 20:00. Availability for a specific call or site visit is confirmed by the team.",
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
            Let&apos;s talk about
            <br />
            <em>your next property move.</em>
          </>
        }
        body="Buy, invest, sell, explore an NRI or commercial requirement, join an Academy launch list, or discuss a collaboration with Rohitt and Hundred Yards."
        aside={<span>PROPERTY / ACADEMY / PARTNERSHIPS</span>}
        theme="ink"
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
            <strong>Choose the conversation that fits your goal.</strong>
          </figcaption>
        </figure>
        <div className="cin-contact-routes__list">
          {enquiryRoutes.map((route) => (
            <article className="authority-contact-route" key={route.number}>
              <span>{route.number}</span>
              <h2>{route.title}</h2>
              <p>{route.copy}</p>
              <Link className="text-link" href={route.href}>
                Start this enquiry
                <ArrowDownRight aria-hidden="true" size={15} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="desk-section section-pad section-blue authority-contact-handoff">
        <div>
          <p className="eyebrow eyebrow-light">DIRECT COMPANY CONTACT</p>
          <h2>
            Your note goes to
            <br />
            <em>the Hundred Yards team.</em>
          </h2>
        </div>
        <div>
          <p>
            Call during the published consultation hours or prepare an email to
            the Bengaluru-based Hundred Yards team.
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
            <figcaption>PROPERTY / ACADEMY / COLLABORATION</figcaption>
          </figure>
          <ShieldCheck aria-hidden="true" size={24} />
          <p className="eyebrow">KEEP YOUR FIRST MESSAGE SIMPLE</p>
          <p>
            Share the goal and basic context first. Do not email confidential
            property documents, identity documents, bank details, or payment information.
          </p>
        </aside>
      </section>

      <section className="faq-section section-pad section-ink cin-contact-faq authority-contact-faq">
        <SectionHeading
          light
          eyebrow="BEFORE YOU CONTACT THE TEAM"
          title={
            <>
              What happens
              <br />
              <em>from here.</em>
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
