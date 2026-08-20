import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found-page">
      <div className="not-found-plan" aria-hidden="true">
        <span />
        <span />
        <span />
        <strong>404</strong>
      </div>
      <p className="eyebrow">COORDINATE NOT FOUND / 404</p>
      <h1>This property<br /><em>doesn’t exist.</em></h1>
      <p>The page moved, the address changed, or this route was never built.</p>
      <div>
        <Link className="button button-dark" href="/">Return home <ArrowUpRight aria-hidden="true" size={17} /></Link>
        <Link className="text-link" href="/courses">Explore courses <ArrowUpRight aria-hidden="true" size={15} /></Link>
      </div>
    </main>
  );
}
