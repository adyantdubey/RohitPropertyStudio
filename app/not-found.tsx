import { TransitionLink as Link } from "./components/RouteCurtain";
import { ArrowUpRight } from "lucide-react";
import { brand } from "./lib/brand";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found-page">
      <div className="not-found-plan" aria-hidden="true">
        <span />
        <span />
        <span />
        <strong>404</strong>
      </div>
      <p className="eyebrow">RKS / DATUM NOT FOUND / 404</p>
      <h1>This address<br /><em>isn&apos;t on the plan.</em></h1>
      <p>
        The page may have moved. Return to {brand.name}&apos;s studio or continue
        into the academy.
      </p>
      <div>
        <Link className="button button-dark" href="/">Return home <ArrowUpRight aria-hidden="true" size={17} /></Link>
        <Link className="text-link" href="/courses">Enter the academy <ArrowUpRight aria-hidden="true" size={15} /></Link>
      </div>
    </main>
  );
}
