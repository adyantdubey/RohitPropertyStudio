import type { Metadata } from "next";
import Image from "next/image";
import { TransitionLink as Link } from "../components/RouteCurtain";
import { ArrowUpRight, BookOpenCheck, ShieldCheck } from "lucide-react";
import { CourseCatalog } from "../components/CourseCatalog";
import { PageHero } from "../components/PageHero";

export const metadata: Metadata = {
  title: "Property Academy",
  description:
    "Explore Rohitt Kumar Singh's prepared 49-slide Basics of Real Estate training deck and the Property Academy roadmap.",
};

const roadmap = [
  {
    number: "01",
    status: "49-SLIDE DECK / FIRST ACCESS",
    title: "Basics of Real Estate — Training Deck",
    copy: "A visual foundation covering property types, construction, approvals, area terminology, charges, UDS, and payment-plan concepts.",
  },
  {
    number: "02",
    status: "COMING SOON",
    title: "Before You Buy — Field Guide",
    copy: "A practical buyer PDF designed for property visits, project comparison, due-diligence questions, and professional follow-ups.",
  },
  {
    number: "03",
    status: "ON THE ROADMAP",
    title: "The Deal Room",
    copy: "A planned toolkit for organising property comparisons, documents, assumptions, risks, and next actions.",
  },
] as const;

export default function CoursesPage() {
  return (
    <main
      id="main-content"
      className="page-shell course-editorial-page authority-academy-page"
    >
      <PageHero
        index="02 / ACADEMY"
        eyebrow="ROHITT PROPERTY ACADEMY / PRACTICAL REAL-ESTATE LEARNING"
        title={
          <>
            Understand real estate
            <br />
            <em>from the ground up.</em>
          </>
        }
        body="Start with the prepared 49-slide Basics of Real Estate deck, then follow the upcoming Before You Buy field guide and practical property tools."
        theme="ink"
        aside={<span>LEARN / APPLY / RETURN TO THE FIELD</span>}
      />

      <section
        className="course-editorial-opener authority-academy-flagship section-pad"
        id="training-deck"
      >
        <figure className="course-editorial-opener-media">
          <Image
            className="authority-academy-deck-cover"
            src="/media/real-estate-training-deck-cover.png"
            alt="Cover of the 100 Yards Basics of Real Estate training deck"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 52vw"
          />
          <figcaption>
            Authentic cover preview from the uploaded 100 Yards training deck.
            The full PowerPoint file is intentionally not public.
          </figcaption>
        </figure>

        <article className="course-editorial-opener-copy authority-academy-flagship__copy">
          <p className="eyebrow">FEATURED RESOURCE / JOIN THE LAUNCH LIST</p>
          <h2>
            Basics of Real Estate
            <br />
            <em>49-slide training deck.</em>
          </h2>
          <p>
            A two-part PowerPoint foundation spanning the real-estate industry,
            property and home types, Vaastu basics, amenities, development,
            construction, approvals, areas, charges, UDS, and payment plans.
          </p>
          <p>
            Designed for aspiring property professionals, new team members,
            buyers, and anyone who wants the language of real estate explained
            visually and without unnecessary jargon.
          </p>
          <Link
            className="button button-dark authority-academy-primary-cta"
            href="/contact?interest=training-deck#contact-form"
          >
            Join the launch list
            <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
        </article>
      </section>

      <section
        aria-labelledby="academy-roadmap-title"
        className="course-editorial-roles authority-academy-roadmap section-pad section-orange"
      >
        <header>
          <p className="eyebrow">THE ACADEMY COLLECTION / 001—003</p>
          <h2 id="academy-roadmap-title">Start with the foundation. Build toward the field.</h2>
        </header>
        <ol className="course-editorial-role-grid">
          {roadmap.map((item) => (
            <li
              id={item.number === "02" ? "field-guide" : undefined}
              key={item.number}
              className="authority-academy-roadmap__item"
            >
              <span>{item.number}</span>
              <small>{item.status}</small>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <div id="collection" className="authority-academy-collection">
        <CourseCatalog />
      </div>

      <section className="course-editorial-boundary authority-academy-boundary section-pad">
        <ShieldCheck aria-hidden="true" size={30} />
        <div>
          <p className="eyebrow">LAUNCH ACCESS / COMING SOON</p>
          <h2>Be first to know when access opens.</h2>
        </div>
        <div>
          <p>
            Checkout is not live yet. Join the launch list and the Hundred Yards
            team will share the reviewed price, access, licence, delivery,
            support, and refund terms before any purchase opens.
          </p>
          <Link
            className="button button-dark"
            href="/contact?interest=training-deck#contact-form"
          >
            <BookOpenCheck aria-hidden="true" size={17} />
            Join the training-deck list
          </Link>
        </div>
      </section>
    </main>
  );
}
