import { ArrowUpRight } from "lucide-react";
import { brand, navigation } from "../lib/siteContent";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__main shell">
        <div>
          <span className="eyebrow">Rohit Real Estate Academy</span>
          <h2>Start with the language.<br />Move with more clarity.</h2>
        </div>
        <div className="site-footer__actions">
          <a className="button button--gold" href="/contact#early-access-form" data-track="early_access_cta">
            Join early access <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <a className="text-link" href={brand.companyUrl} target="_blank" rel="noreferrer" data-track="hundred_yards_clicked">
            Visit Hundred Yards <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
      <nav className="site-footer__nav shell" aria-label="Footer navigation">
        {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
      </nav>
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
