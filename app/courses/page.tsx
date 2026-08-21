import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpenCheck, ShieldCheck } from "lucide-react";
import { CourseCatalog } from "../components/CourseCatalog";
import { PageHero } from "../components/PageHero";

export const metadata: Metadata = {
  title: "Property Academy | Rohitt Kumar Singh",
  description:
    "Explore Rohitt Kumar Singh's prepared 49-slide Basics of Real Estate training deck and the Property Academy roadmap.",
};

const roadmap = [
  {
    number: "01",
    status: "PREPARED / LAUNCH SETUP PENDING",
    title: "Basics of Real Estate — Training Deck",
    copy: "A real 49-slide PowerPoint resource. Content review, pricing, licence, payment, protected delivery, support, and refund terms are being prepared before sales open.",
  },
  {
    number: "02",
    status: "COMING SOON",
    title: "Before You Buy — Field Guide",
    copy: "The next planned release. The guide is still being written and reviewed; no finished PDF is available today.",
  },
  {
    number: "03",
    status: "IN DEVELOPMENT",
    title: "The Deal Room",
    copy: "A supporting toolkit concept. Contents, file formats, licence, and release date are not yet final.",
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
        eyebrow="ROHITT'S PROPERTY EDUCATION / PRE-LAUNCH"
        title={
          <>
            Learn before
            <br />
            <em>you commit.</em>
          </>
        }
        body="The Academy now has a real first resource: a 49-slide Basics of Real Estate training deck. The purchase layer is being prepared responsibly; the field guide and toolkit remain on the roadmap."
        theme="blue"
        aside={<span>FIELD GUIDE / COURSES / TOOLS</span>}
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
          <p className="eyebrow">PREPARED RESOURCE / LAUNCH SETUP PENDING</p>
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
            The resource exists. Sales remain closed until its current-content
            review, price, buyer licence, payment, protected delivery, support,
            and refund terms are ready. The raw 154 MB file is never exposed by
            this public website.
          </p>
          <Link
            className="button button-dark authority-academy-primary-cta"
            href="/contact?interest=training-deck#contact-form"
          >
            Ask about launch access
            <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
        </article>
      </section>

      <section
        aria-labelledby="academy-roadmap-title"
        className="course-editorial-roles authority-academy-roadmap section-pad section-orange"
      >
        <header>
          <p className="eyebrow">THE HONEST ROADMAP / 001—003</p>
          <h2 id="academy-roadmap-title">What exists—and what does not.</h2>
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
          <p className="eyebrow">RESOURCE READY / STOREFRONT NOT YET OPEN</p>
          <h2>A real training deck, without a pretend checkout.</h2>
        </div>
        <div>
          <p>
            The deck file exists, but this site has no payment gateway, learner
            account, or protected delivery today. Its reviewed content, pricing,
            access, licence, delivery, support, and refund terms will be
            published before purchase opens.
          </p>
          <Link
            className="button button-dark"
            href="/contact?interest=training-deck#contact-form"
          >
            <BookOpenCheck aria-hidden="true" size={17} />
            Ask about the training deck
          </Link>
        </div>
      </section>
    </main>
  );
}
