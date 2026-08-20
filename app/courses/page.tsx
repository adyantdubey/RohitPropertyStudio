import type { Metadata } from "next";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { CourseCatalog } from "../components/CourseCatalog";

export const metadata: Metadata = {
  title: "Courses & Property Resources",
  description:
    "Explore structured real-estate learning, field guides, and downloadable decision tools by Rohit.",
};

export default function CoursesPage() {
  return (
    <main id="main-content" className="page-shell">
      <PageHero
        index="02 / COURSES"
        eyebrow="THE LEARNING COLLECTION"
        title={<>Different depths.<br /><em>The same discipline.</em></>}
        body="Learn the complete decision process, prepare for a property review, or bring scattered information into one clear workspace."
        theme="blue"
        aside={<span>COURSE / FIELD GUIDE / TOOLKIT</span>}
      />

      <CourseCatalog />

      <section className="course-compare section-pad section-ink">
        <SectionHeading
          light
          eyebrow="COMPARE / BEFORE YOU CHOOSE"
          title={<>Find the resource that<br /><em>fits the question.</em></>}
          body="The preview catalogue uses placeholder pricing and access terms; the product structure is ready for Rohit’s final commercial details."
        />

        <div className="comparison-grid" role="table" aria-label="Resource comparison">
          <div className="comparison-row comparison-head" role="row">
            <span role="columnheader">Resource</span>
            <span role="columnheader">Best for</span>
            <span role="columnheader">Format</span>
            <span role="columnheader">Depth</span>
          </div>
          <div className="comparison-row" role="row">
            <strong role="cell">Decision System</strong>
            <span role="cell">End-to-end learning</span>
            <span role="cell">Course + workbook</span>
            <span role="cell">Complete</span>
          </div>
          <div className="comparison-row" role="row">
            <strong role="cell">Before You Buy</strong>
            <span role="cell">Visits and diligence</span>
            <span role="cell">Digital field guide</span>
            <span role="cell">Focused</span>
          </div>
          <div className="comparison-row" role="row">
            <strong role="cell">The Deal Room</strong>
            <span role="cell">Active comparisons</span>
            <span role="cell">Toolkit + templates</span>
            <span role="cell">Applied</span>
          </div>
        </div>
      </section>
    </main>
  );
}
