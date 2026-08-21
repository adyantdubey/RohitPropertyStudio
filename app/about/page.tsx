import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { brand, course } from "../lib/siteContent";

export const metadata: Metadata = { title: "About Rohit", description: `${brand.name}, ${brand.role} of ${brand.company} and instructor of ${course.title}.` };

export default function AboutPage() {
  return (
    <main id="main-content">
      <section className="inner-hero">
        <div className="shell inner-hero__grid">
          <div className="inner-hero__copy hero-entrance"><p className="eyebrow">About the instructor</p><h1>Experience from the field, structured for the classroom.</h1><p>{brand.name} is {brand.role} of {brand.company} and the instructor behind {brand.academy}.</p><a className="button button--gold" href={course.whatsapp} target="_blank" rel="noreferrer">Join course early access <ArrowUpRight size={17} aria-hidden="true" /></a></div>
          <div className="inner-hero__portrait hero-entrance"><Image src="/media/rohit-kumar-singh.jpg" alt="Rohit Kumar Singh" width={1764} height={2352} priority sizes="(max-width: 800px) 92vw, 38vw" /></div>
        </div>
      </section>
      <section className="section inner-section">
        <div className="shell profile-grid">
          <div className="reveal"><p className="eyebrow">Professional profile</p><h2>Real estate explained with analytical discipline.</h2></div>
          <div className="profile-copy reveal">
            <p>An Electronics &amp; Communication engineering graduate, Rohit brings over a decade of real-estate experience to his work. The official Hundred Yards profile describes his approach as analytical, strategic, customer-centric and technology-driven.</p>
            <p>As Managing Director, he works across the property journey while building a learning platform that gives aspiring professionals and customers a clearer grasp of the industry&apos;s language.</p>
            <ul className="profile-points">
              <li><strong>Current role</strong><span>Managing Director, Hundred Yards Realtor Pvt Ltd</span></li>
              <li><strong>Experience</strong><span>Over a decade in real estate</span></li>
              <li><strong>Education</strong><span>Electronics &amp; Communication engineering</span></li>
              <li><strong>Teaching focus</strong><span>Foundational property knowledge presented visually and practically</span></li>
            </ul>
            <a className="text-link" href={brand.aboutUrl} target="_blank" rel="noreferrer">Read the official company profile <ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
