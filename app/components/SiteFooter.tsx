import { ArrowUpRight } from "lucide-react";
import { brand } from "../lib/brand";
import { RksMark } from "./RksMark";
import { TransitionLink } from "./RouteCurtain";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-signal" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="footer-lead">
        <p className="eyebrow eyebrow-light">
          {brand.name.toUpperCase()} / {brand.educationLabel.toUpperCase()}
        </p>
        <h2>
          Read the market.
          <em>Make the decision yours.</em>
        </h2>
        <div className="footer-actions">
          <TransitionLink className="button button-light" href="/courses">
            Enter the academy <ArrowUpRight aria-hidden="true" size={17} />
          </TransitionLink>
          <TransitionLink className="text-link text-link-light" href="/contact">
            Start a conversation <ArrowUpRight aria-hidden="true" size={15} />
          </TransitionLink>
        </div>
      </div>

      <div className="footer-grid">
        <div>
          <TransitionLink className="footer-brand" href="/" aria-label={`${brand.name} — home`}>
            <span aria-hidden="true">
              <RksMark />
            </span>
            {brand.name}
          </TransitionLink>
          <p>
            Clear property education, advisory perspectives, and market
            commentary from {brand.name}, {brand.credential}.
          </p>
        </div>

        <nav className="footer-links" aria-labelledby="footer-explore-title">
          <strong id="footer-explore-title">Navigate</strong>
          {brand.navigation.map((link) => (
            <TransitionLink key={link.href} href={link.href}>
              {link.label}
            </TransitionLink>
          ))}
        </nav>

        <nav className="footer-links" aria-labelledby="footer-information-title">
          <strong id="footer-information-title">Information</strong>
          <TransitionLink href="/privacy">Privacy</TransitionLink>
          <TransitionLink href="/terms">Terms</TransitionLink>
          <TransitionLink href="/refund">Refund policy</TransitionLink>
          <TransitionLink href="/disclaimer">Disclaimer</TransitionLink>
        </nav>

        <div className="footer-coordinate">
          <span>{brand.name.toUpperCase()}</span>
          <span>{brand.professionalTitle.toUpperCase()}</span>
          <small>{brand.organizationName.toUpperCase()}</small>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {brand.name.toUpperCase()}</span>
        <p>
          Educational content only. Not financial, investment, legal, tax,
          valuation, or property-specific advice.
        </p>
        <a href="#main-content">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}
