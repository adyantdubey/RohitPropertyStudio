import { ArrowUpRight } from "lucide-react";

export function ClosingCta({
  eyebrow = "Early access",
  title = "Start with the language of property.",
  copy = "Join the launch list for confirmed pricing, delivery and access details. No payment is collected today.",
}: {
  eyebrow?: string;
  title?: string;
  copy?: string;
}) {
  return (
    <section className="section surface-gold">
      <div className="shell closing__grid">
        <div className="head__main" data-reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <div className="closing__action" data-reveal data-reveal-delay="1">
          <p>{copy}</p>
          <a className="button button--gold" href="/contact#early-access-form" data-track="early_access_cta">
            Join early access <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
