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
  description: `${brand.mediaLabel} is ${brand.name}’s video hub for project walkthroughs, location intelligence, buyer education, market context, and leadership conversations.`,
};

const editorialLanes = [
  {
    number: "01",
    title: "Project walkthroughs",
    copy: "See projects, sample homes, surroundings, layouts, amenities, and the details that deserve a closer look.",
  },
  {
    number: "02",
    title: "Location intelligence",
    copy: "Understand Bengaluru micro-markets through connectivity, neighbourhood maturity, development, and everyday use.",
  },
  {
    number: "03",
    title: "Buyer education",
    copy: "Make property types, costs, approvals, construction, layouts, and the buying process easier to understand.",
  },
  {
    number: "04",
    title: "Market and leadership",
    copy: "Follow conversations about customer experience, team standards, technology, and the direction of the market.",
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
            Real estate,
            <br />
            <em>seen from the field.</em>
          </>
        }
        body={`Follow ${brand.name} through project walkthroughs, location guides, buyer education, market conversations, and the leadership view behind Hundred Yards.`}
        aside={<span>WALKTHROUGHS / LOCATIONS / BUYER EDUCATION</span>}
        theme="ink"
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
            <span><Film aria-hidden="true" size={14} /> PROJECTS / MARKETS / PEOPLE</span>
          </div>
          <p className="eyebrow">#{brand.mediaLabel.replaceAll(" ", "")}</p>
          <h2>Short-form property content with a field point of view.</h2>
          <p>
            Reel Se Real Estate brings the property conversation closer to the
            places, projects, decisions, and questions people are already
            navigating in Bengaluru and beyond.
          </p>
          <a className="text-link" href={brand.sourceLinks.facebook} rel="noreferrer" target="_blank">
            Watch on Facebook <ExternalLink aria-hidden="true" size={15} />
          </a>
        </article>
      </section>

      <section className="insight-index insight-editorial-library section-pad section-ink authority-media-lanes">
        <SectionHeading
          light
          eyebrow="WHAT YOU&apos;LL FIND / 001—004"
          title={
            <>
              Four ways to experience
              <br />
              <em>the market with Rohitt.</em>
            </>
          }
          body="A clear content system spanning projects, locations, buyer education, and the leadership conversations behind the work."
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
                  <span>VIDEO SERIES / {lane.number}</span>
                  <span>{brand.mediaLabel.toUpperCase()}</span>
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
          <p className="eyebrow">CONTINUE THE CONVERSATION</p>
          <h2>Watch and follow on Rohitt&apos;s public channels.</h2>
          <p>
            Follow current videos, professional posts, project visits, and
            real-estate conversations directly on Rohitt&apos;s Facebook and LinkedIn profiles.
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
            Bring the right audience
            <br />
            <em>into the conversation.</em>
          </h2>
        </div>
        <div className="newsletter-form authority-media-cta__copy">
          <p>
            Invite Rohitt for a video collaboration, interview, speaking
            engagement, property conversation, or industry partnership.
          </p>
          <Link className="button button-light" href="/contact?type=partnership#contact-form">
            Discuss a collaboration <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
          <small>Availability and format are confirmed by the team.</small>
        </div>
      </section>
    </main>
  );
}
