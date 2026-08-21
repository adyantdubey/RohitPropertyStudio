import type { Metadata } from "next";
import Image from "next/image";
import { TransitionLink as Link } from "../components/RouteCurtain";
import { ArrowUpRight, ExternalLink, Film, Play } from "lucide-react";
import { CinematicMedia } from "../components/CinematicMedia";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { brand } from "../lib/brand";

export const metadata: Metadata = {
  title: brand.mediaLabel,
  description: `${brand.mediaLabel} is ${brand.name}’s public real-estate video and editorial hub—field observations, property questions, market context, and leadership notes without fabricated social metrics.`,
};

const editorialLanes = [
  {
    number: "01",
    title: "The property question",
    copy: "Begin with one practical question a buyer, seller, or investor may need to frame before the next conversation.",
  },
  {
    number: "02",
    title: "The market context",
    copy: "Separate a useful location or segment observation from the assumptions and time-sensitive data around it.",
  },
  {
    number: "03",
    title: "The field view",
    copy: "Use site-side observations to explain what deserves closer review without presenting a property conclusion from a short video.",
  },
  {
    number: "04",
    title: "The leadership note",
    copy: "Connect customer experience, team standards, technology, and transparency to the work of real-estate advisory.",
  },
] as const;

const channelLinks = [
  {
    label: "Watch the public Facebook feed",
    href: brand.sourceLinks.facebook,
    note: "Rohitt’s current public creator profile",
  },
  {
    label: "Follow the LinkedIn conversation",
    href: "https://in.linkedin.com/in/rohitt-kumar-singh-7465b8112",
    note: "Professional posts and #ReelSeRealEstate references",
  },
] as const;

export default function MediaPage() {
  return (
    <main id="main-content" className="page-shell insight-editorial-index authority-media">
      <PageHero
        index="05 / MEDIA"
        eyebrow={`${brand.mediaLabel.toUpperCase()} / PUBLIC VIDEO`}
        title={
          <>
            From reel to
            <br />
            <em>real-estate context.</em>
          </>
        }
        body={`${brand.name} uses #ReelSeRealEstate in his public posts. This hub gives that active content label a considered home for video, field observations, and the questions behind the screen.`}
        aside={<span>WATCH / QUESTION / CONTINUE</span>}
        theme="orange"
        media={{
          poster: "/media/hero-aerial-poster.jpg",
          mobilePoster: "/media/hero-aerial-poster-mobile.jpg",
          videoSrc: "/media/hero-aerial.mp4",
          mobileVideoSrc: "/media/hero-aerial-mobile.mp4",
          alt: "Aerial view of contemporary residential architecture",
          width: 1800,
          height: 1013,
          sizes: "(max-width: 860px) 100vw, 58vw",
          objectPosition: "50% 50%",
          parallax: 7,
        }}
      />

      <section className="featured-note insight-editorial-feature section-pad authority-media-intro">
        <figure className="insight-editorial-feature-media">
          <CinematicMedia
            poster="/media/interior-walkthrough-poster.jpg"
            mobilePoster="/media/interior-walkthrough-poster-mobile.jpg"
            alt="Slow movement through a contemporary residential interior"
            width={1800}
            height={1200}
            sizes="(max-width: 900px) 100vw, 54vw"
            parallax={5}
            showPauseControl={false}
          />
          <figcaption>
            Temporary Pexels architecture footage used for atmosphere. It is not
            a Rohitt video, a Hundred Yards listing, or evidence of a project or result.
          </figcaption>
        </figure>

        <article className="insight-editorial-feature-copy authority-media-intro__copy">
          <div className="insight-editorial-article-meta">
            <span>PUBLIC SERIES</span>
            <span><Film aria-hidden="true" size={14} /> NO METRICS FABRICATED</span>
          </div>
          <p className="eyebrow">#{brand.mediaLabel.replaceAll(" ", "")}</p>
          <h2>Short form, with the context left in.</h2>
          <p>
            The series name is evidenced by Rohitt&apos;s public social posts. This
            site does not infer ownership of a registered mark, invent audience
            numbers, or manufacture an episode archive. Only owner-supplied or
            approved videos, captions, thumbnails, dates, and links should appear here.
          </p>
          <a className="text-link" href={brand.sourceLinks.facebook} rel="noreferrer" target="_blank">
            Watch on Facebook <ExternalLink aria-hidden="true" size={15} />
          </a>
        </article>
      </section>

      <section className="insight-index insight-editorial-library section-pad section-ink authority-media-lanes">
        <SectionHeading
          light
          eyebrow="THE EDITORIAL LENS / 001—004"
          title={
            <>
              Four ways to make a
              <br />
              <em>short video more useful.</em>
            </>
          }
          body="These are editorial lanes for the owned hub, not claims about an existing episode count or publishing cadence."
        />
        <div className="insight-editorial-card-grid authority-media-lanes__grid">
          {editorialLanes.map((lane, index) => (
            <article className="insight-editorial-card authority-media-lane" key={lane.number}>
              <div className="insight-editorial-card-media authority-media-lane__visual" aria-hidden="true">
                <Image
                  alt=""
                  fill
                  sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 25vw"
                  src={index % 2 === 0 ? "/media/facade-detail.jpg" : "/media/blueprint-hands.jpg"}
                />
                <span><Play aria-hidden="true" size={24} /> {lane.number}</span>
              </div>
              <div className="insight-editorial-card-content">
                <div className="insight-editorial-article-meta">
                  <span>EDITORIAL LANE / {lane.number}</span>
                  <span>FORMAT TO BE APPROVED</span>
                </div>
                <h3>{lane.title}</h3>
                <p>{lane.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="insight-editorial-method section-pad authority-media-sources">
        <figure className="insight-editorial-method-media">
          <Image
            alt="Geometric building facade used as editorial atmosphere"
            height={1170}
            sizes="(max-width: 800px) 100vw, 50vw"
            src="/media/facade-detail.jpg"
            width={1800}
          />
          <figcaption>
            Editorial stock image / illustrative only / not a Rohitt or Hundred Yards project.
          </figcaption>
        </figure>
        <div className="insight-editorial-method-copy">
          <p className="eyebrow">WATCH AT THE SOURCE</p>
          <h2>No copied reach. No invented archive.</h2>
          <p>
            Until original video files, captions, thumbnails, and publishing
            permissions are supplied, the authoritative viewing experience remains
            on Rohitt&apos;s public profiles. This page links there directly and does
            not display follower, view, engagement, or episode counts.
          </p>
          <div className="authority-media-sources__links">
            {channelLinks.map((channel) => (
              <a href={channel.href} key={channel.href} rel="noreferrer" target="_blank">
                <span>{channel.note}</span>
                <strong>{channel.label}</strong>
                <ExternalLink aria-hidden="true" size={16} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="newsletter insight-editorial-newsletter section-pad section-blue authority-media-cta">
        <div>
          <p className="eyebrow eyebrow-light">MEDIA / SPEAKING / COLLABORATION</p>
          <h2>
            Bring a real audience
            <br />
            <em>and a useful brief.</em>
          </h2>
        </div>
        <div className="newsletter-form authority-media-cta__copy">
          <p>
            For a video collaboration, interview, speaking invitation, or
            partnership, share the audience, format, date, distribution plan, and
            intended outcome. Availability and scope are confirmed separately.
          </p>
          <Link className="button button-light" href="/contact?type=partnership#contact-form">
            Send a media brief <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
          <small>{brand.mediaLabel} is used here as a public editorial label; no social-performance claim is implied.</small>
        </div>
      </section>
    </main>
  );
}
