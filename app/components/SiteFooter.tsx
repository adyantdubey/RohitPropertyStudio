import { ArrowUpRight } from "lucide-react";
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
        <p className="eyebrow eyebrow-light">ROHIT / PROPERTY DECISION STUDIO</p>
        <h2>
          Learn the process.
          <em>Keep the judgement.</em>
        </h2>
        <div className="footer-actions">
          <TransitionLink className="button button-light" href="/courses">
            Explore courses <ArrowUpRight aria-hidden="true" size={17} />
          </TransitionLink>
          <TransitionLink className="text-link text-link-light" href="/contact">
            Ask a question <ArrowUpRight aria-hidden="true" size={15} />
          </TransitionLink>
        </div>
      </div>

      <div className="footer-grid">
        <div>
          <TransitionLink className="footer-brand" href="/">
            <span>R</span>
            ROHIT
          </TransitionLink>
          <p>
            Rohit&apos;s clear frameworks, practical tools, and focused learning
            for more considered property decisions.
          </p>
        </div>

        <nav className="footer-links" aria-labelledby="footer-explore-title">
          <strong id="footer-explore-title">Explore</strong>
          <TransitionLink href="/about">About</TransitionLink>
          <TransitionLink href="/courses">Courses</TransitionLink>
          <TransitionLink href="/results">Results</TransitionLink>
          <TransitionLink href="/insights">Insights</TransitionLink>
          <TransitionLink href="/contact">Contact</TransitionLink>
        </nav>

        <nav className="footer-links" aria-labelledby="footer-information-title">
          <strong id="footer-information-title">Information</strong>
          <TransitionLink href="/privacy">Privacy</TransitionLink>
          <TransitionLink href="/terms">Terms</TransitionLink>
          <TransitionLink href="/refund">Refund policy</TransitionLink>
          <TransitionLink href="/disclaimer">Disclaimer</TransitionLink>
        </nav>

        <div className="footer-coordinate">
          <span>THE ROHIT METHOD</span>
          <span>FRAME / VERIFY / DECIDE</span>
          <small>INDIA / DIGITAL LEARNING</small>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} ROHIT</span>
        <p>
          Educational content only. Not financial, investment, legal, tax,
          valuation, or property-specific advice.
        </p>
        <a href="#main-content">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}
