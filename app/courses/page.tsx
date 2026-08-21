import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { CinematicMedia } from "../components/CinematicMedia";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { CourseCatalog } from "../components/CourseCatalog";
import { products } from "../lib/content";

export const metadata: Metadata = {
  title: "Courses & Property Resources",
  description:
    "Explore Rohit's structured real-estate course, field guide, and property review toolkit.",
};

export default function CoursesPage() {
  return (
    <main id="main-content" className="page-shell course-editorial-page">
      <PageHero
        index="02 / COURSES"
        eyebrow="THE PROPERTY DECISION COLLECTION"
        title={
          <>
            Learn the system.
            <br />
            <em>Carry it into the work.</em>
          </>
        }
        body="Three distinct resources for three different moments: understanding the full decision structure, preparing better questions, and organising an active review."
        theme="blue"
        aside={<span>LEARN / CARRY / RUN</span>}
      />

      <section className="course-editorial-opener section-pad">
        <figure className="course-editorial-opener-media">
          <CinematicMedia
            poster="/media/blueprint-process-poster.jpg"
            mobilePoster="/media/blueprint-process-poster-mobile.jpg"
            videoSrc="/media/blueprint-process.mp4"
            mobileVideoSrc="/media/blueprint-process-mobile.mp4"
            alt="Hands reviewing architectural drawings on a work table"
            width={2048}
            height={3072}
            sizes="(max-width: 800px) 100vw, 52vw"
            parallax={6}
            controlLabel="editorial process video"
          />
          <figcaption>
            Editorial stock process footage. The drawings are illustrative and
            are not a course preview, Rohit project, or learner artifact.
          </figcaption>
        </figure>

        <article className="course-editorial-opener-copy">
          <p className="eyebrow">ONE DISCIPLINE / THREE INSTRUMENTS</p>
          <h2>
            Choose by the work,
            <br />
            <em>not by the hype.</em>
          </h2>
          <p>
            The course teaches the end-to-end method. The field guide keeps a
            focused question set close during a review. The toolkit gives active
            comparisons a consistent working record. None promises a property,
            return, or transaction result.
          </p>
          <Link className="text-link" href="#collection">
            Compare the collection <ArrowUpRight aria-hidden="true" size={15} />
          </Link>
        </article>
      </section>

      <section className="course-editorial-roles section-pad section-orange" aria-labelledby="course-roles-title">
        <header>
          <p className="eyebrow">THE COLLECTION LOGIC / 001—003</p>
          <h2 id="course-roles-title">Start with the moment you are in.</h2>
        </header>
        <ol className="course-editorial-role-grid">
          {products.map((product, index) => (
            <li key={product.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>{product.kind === "pdf" ? "FIELD GUIDE" : product.kind.toUpperCase()}</small>
              <h3>{product.collectionRole}</h3>
              <p>{product.bestWhen}</p>
              <Link href={`/courses/${product.slug}`}>
                {product.title} <ArrowUpRight aria-hidden="true" size={15} />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <div id="collection">
        <CourseCatalog />
      </div>

      <section className="course-editorial-compare section-pad section-ink">
        <SectionHeading
          light
          eyebrow="COMPARE / BEFORE YOU CHOOSE"
          title={
            <>
              Different formats.
              <br />
              <em>One transparent view.</em>
            </>
          }
          body="Pricing, access, and formats remain launch placeholders. The comparison below describes the intended learning role of each resource without promising an outcome."
        />

        <p
          className="course-editorial-comparison-cue"
          id="course-comparison-scroll-hint"
        >
          Swipe or use horizontal scroll to review every column
          <span aria-hidden="true"> →</span>
        </p>
        {/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- This overflow region must be keyboard-focusable. */}
        <div
          aria-describedby="course-comparison-scroll-hint"
          aria-label="Resource comparison table; scroll horizontally to review every column"
          className="course-editorial-comparison-table-wrap"
          role="region"
          tabIndex={0}
        >
          <table className="course-editorial-comparison-table">
            <caption className="sr-only">
              Compare Rohit&apos;s course, field guide, and toolkit by intended use,
              format, working output, and placeholder price.
            </caption>
            <thead>
              <tr className="course-editorial-comparison-row course-editorial-comparison-row--head">
                <th scope="col">Resource</th>
                <th scope="col">Best when</th>
                <th scope="col">Format &amp; access</th>
                <th scope="col">Working output</th>
                <th scope="col">Preview price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr className="course-editorial-comparison-row" key={product.slug}>
                  <th scope="row">
                    <Link href={`/courses/${product.slug}`}>{product.title}</Link>
                    <small>{product.collectionRole}</small>
                  </th>
                  <td>{product.bestWhen}</td>
                  <td>
                    <span>{product.format}</span>
                    <small>{product.access.replace("Placeholder: ", "")}</small>
                  </td>
                  <td>{product.tangibleOutcome}</td>
                  <td>
                    <strong>{product.price.formatted}</strong>
                    <small>Placeholder</small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* eslint-enable jsx-a11y/no-noninteractive-tabindex */}
      </section>

      <section className="course-editorial-boundary section-pad">
        <ShieldCheck aria-hidden="true" size={30} />
        <div>
          <p className="eyebrow">BEFORE PAYMENT GOES LIVE</p>
          <h2>Every commercial detail must be confirmed.</h2>
        </div>
        <div>
          <p>
            Final prices, taxes, access periods, file formats, support, licence
            terms, fulfilment, and refund rules require Rohit&apos;s approval. These
            resources provide general education and do not replace financial,
            investment, legal, tax, engineering, valuation, or property-specific
            advice.
          </p>
          <Link className="button button-dark" href="/contact">
            Ask a product question <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
