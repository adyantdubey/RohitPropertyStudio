import { clientFeedback } from "../lib/siteContent";

/**
 * Hundred Yards property-service feedback — deliberately labelled as such,
 * because the course has not launched and has no learner reviews yet.
 */
export function ReviewMarquee() {
  // Duplicated once so the loop is seamless; the copy is hidden from assistive tech.
  const items = [...clientFeedback, ...clientFeedback];

  const card = (review: (typeof clientFeedback)[number], key: string, duplicate: boolean) => (
    <figure className="review" key={key} aria-hidden={duplicate || undefined}>
      <span className="review__theme">{review.theme}</span>
      <blockquote>“{review.quote}”</blockquote>
      <figcaption>
        {review.name}
        <span>Hundred Yards property client · not a course learner</span>
      </figcaption>
    </figure>
  );

  return (
    <div className="marquee">
      <div className="marquee__row">
        {items.map((review, index) => card(review, `r-${index}`, index >= clientFeedback.length))}
      </div>
    </div>
  );
}
