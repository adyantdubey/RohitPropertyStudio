/* eslint-disable @next/next/no-html-link-for-pages */
import { ArrowUpRight } from "lucide-react";
import { AmbientBackdrop } from "./components/AmbientBackdrop";

export default function NotFound() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <AmbientBackdrop />
        <div className="shell notfound">
          <p className="eyebrow" data-enter>404</p>
          <h1 data-split>This page is not part of the course.</h1>
          <p data-enter>The website is built around Rohitt&apos;s foundational real-estate course. Start there.</p>
          <a className="button button--gold" href="/" data-enter>Explore the course <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </section>
    </main>
  );
}
