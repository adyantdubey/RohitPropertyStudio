import { ArrowUpRight } from "lucide-react";
import { brand, course } from "../lib/siteContent";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__main shell">
        <div>
          <span className="eyebrow">Rohit Real Estate Academy</span>
          <h2>Start with the language.<br />Move with more clarity.</h2>
        </div>
        <div className="site-footer__actions">
          <a className="button button--gold" href={course.whatsapp} target="_blank" rel="noreferrer">
            Join early access <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <a className="text-link" href={brand.companyUrl} target="_blank" rel="noreferrer">
            Visit Hundred Yards <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="site-footer__bottom shell">
        <p>© {new Date().getFullYear()} {brand.name}</p>
        <nav aria-label="Legal navigation">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/refund">Refund status</a>
          <a href="/disclaimer">Disclaimer</a>
        </nav>
      </div>
    </footer>
  );
}
