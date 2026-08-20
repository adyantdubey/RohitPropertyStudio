import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-signal" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="footer-lead">
        <p className="eyebrow eyebrow-light">THE NEXT MOVE</p>
        <h2>
          Build the way
          <em>you decide.</em>
        </h2>
        <div className="footer-actions">
          <Link className="button button-light" href="/courses">
            Explore courses <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
          <Link className="text-link text-link-light" href="/contact">
            Ask a question <ArrowUpRight aria-hidden="true" size={15} />
          </Link>
        </div>
      </div>

      <div className="footer-grid">
        <div>
          <Link className="footer-brand" href="/">
            <span>R</span>
            ROHIT
          </Link>
          <p>
            Clear frameworks, practical tools, and focused learning for more
            considered property decisions.
          </p>
        </div>

        <div className="footer-links">
          <strong>Explore</strong>
          <Link href="/about">About</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/results">Results</Link>
          <Link href="/insights">Insights</Link>
        </div>

        <div className="footer-links">
          <strong>Information</strong>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/refund">Refund policy</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </div>

        <div className="footer-coordinate">
          <span>28.6139° N</span>
          <span>77.2090° E</span>
          <small>INDIA / WORLDWIDE LEARNING</small>
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
