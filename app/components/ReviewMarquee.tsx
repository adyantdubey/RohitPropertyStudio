import { clientFeedback } from "../lib/siteContent";

/**
 * One voice carries the section; the others sit quietly beneath it. Static on
 * purpose — an auto-scrolling wall of praise reads as manufactured, a single
 * well-chosen sentence reads as chosen by a person.
 */
export function EditorialReviews() {
  const [lead, ...rest] = clientFeedback;
  return (
    <>
      <figure className="pullquote" data-reveal>
        <blockquote>{lead.quote}</blockquote>
        <figcaption>
          {lead.name} <span>· Hundred Yards property client, not a course learner</span>
        </figcaption>
      </figure>
      <div className="review-row" data-reveal-group>
        {rest.map((review) => (
          <figure className="review" key={review.name}>
            <blockquote>“{review.quote}”</blockquote>
            <figcaption>
              {review.name}
              <span>Hundred Yards property client · not a course learner</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
