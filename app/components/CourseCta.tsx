import { ArrowUpRight } from "lucide-react";
import { course } from "../lib/siteContent";

export function CourseCta({
  eyebrow = "Early access",
  title = "Start with the language of property.",
  copy = "Join the launch list for confirmed pricing, delivery and access details. No payment is collected today.",
}: {
  eyebrow?: string;
  title?: string;
  copy?: string;
}) {
  return (
    <section className="section course-cta">
      <div className="shell course-cta__grid">
        <div className="reveal">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <div className="course-cta__action reveal">
          <p>{copy}</p>
          <a className="button button--gold" href="/contact#early-access-form" data-track="early_access_cta">
            Join early access <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
