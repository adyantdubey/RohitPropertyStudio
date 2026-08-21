"use client";

import { TransitionLink as Link } from "./components/RouteCurtain";
import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CinematicMedia } from "./components/CinematicMedia";
import { useMotion } from "./components/MotionProvider";
import { brand } from "./lib/brand";
import {
  companyServices,
  companySource,
  customerStories,
  featuredProperties,
} from "./lib/companyContent";

const methodImages = [
  "/media/blueprint-hands.jpg",
  "/media/facade-detail.jpg",
  "/media/interior-daylight.jpg",
  "/media/interior-soft.jpg",
  "/media/hero-poster.jpg",
] as const;

const authoritySteps = [
  {
    number: "01",
    title: "Understand what fits",
    description:
      "The team begins with your goals, preferred locations, budget, timing, and the way you intend to use the property.",
  },
  {
    number: "02",
    title: "Curate relevant options",
    description:
      "Projects are shortlisted against your requirement so the search becomes more focused and easier to compare.",
  },
  {
    number: "03",
    title: "Visit and compare",
    description:
      "Site visits, virtual walkthroughs, location context, and project trade-offs are brought into one useful conversation.",
  },
  {
    number: "04",
    title: "Coordinate the detail",
    description:
      "Hundred Yards supports the loan, legal-verification, documentation, and registration conversations around the transaction.",
  },
  {
    number: "05",
    title: "Support the close",
    description:
      "The relationship continues through negotiation, paperwork, registration, and the hand-offs that follow selection.",
  },
] as const;

const authorityPaths = featuredProperties.map((property, index) => ({
  number: String(index + 1).padStart(2, "0"),
  label: "FEATURED OPPORTUNITY",
  title: property.name,
  copy: `${property.developer} · ${property.configuration}.`,
  detail: property.location,
  href: property.href,
  action: "View current details",
  image: property.image,
  mark: String(index + 1).padStart(2, "0"),
}));

const publicRecord = customerStories.slice(0, 3).map((story, index) => ({
  number: String(index + 1).padStart(2, "0"),
  title: story.name,
  copy: story.summary,
}));

const editorialDoors = [
  {
    href: "/media",
    image: "/media/hero-poster.jpg",
    meta: `${brand.mediaLabel} / VIDEO`,
    title: "Walkthroughs, market conversations, and property stories.",
    copy: "Follow Rohitt’s public video series for project visits, locality context, buyer education, and market observations.",
  },
  {
    href: "/insights",
    image: "/media/facade-detail.jpg",
    meta: "PROPERTY INSIGHTS / READ",
    title: "Bengaluru property insights for real buyer questions.",
    copy: "Explore location guides, project comparisons, buyer education, and market context in a practical editorial format.",
  },
  {
    href: "/courses",
    image: "/media/blueprint-hands.jpg",
    meta: "ACADEMY / LEARN",
    title: "Build your real-estate foundation with the Academy.",
    copy: "Preview the prepared 49-slide training deck and join the first-access list for the upcoming buyer field guide.",
  },
] as const;

export function HomeExperience() {
  const root = useRef<HTMLElement>(null);
  const { motionQuality } = useMotion();
  const [activeOfferIndex, setActiveOfferIndex] = useState(0);
  const [offersPinned, setOffersPinned] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 960px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const syncOfferMode = () =>
      setOffersPinned(motionQuality === "full" && query.matches);

    syncOfferMode();
    query.addEventListener("change", syncOfferMode);

    return () => query.removeEventListener("change", syncOfferMode);
  }, [motionQuality]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const node = root.current;
    if (!node) return;

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const entrance = gsap.timeline({
          paused: true,
          defaults: { ease: "power3.out" },
        });
        entrance
          .from(".cin-hero-rule", { scaleX: 0, duration: 0.65, transformOrigin: "left" })
          .from(
            ".cin-hero-title-line > span",
            { yPercent: 110, rotateX: -8, duration: 1, stagger: 0.08 },
            0.1,
          )
          .from(
            ".cin-hero-reveal",
            { y: 22, autoAlpha: 0, duration: 0.62, stagger: 0.07 },
            0.42,
          );

        let entranceObserver: MutationObserver | null = null;
        const entranceFrame = window.requestAnimationFrame(() => {
          const playEntrance = () => entrance.play(0);

          if (document.documentElement.hasAttribute("data-route-transition")) {
            entranceObserver = new MutationObserver(() => {
              if (document.documentElement.hasAttribute("data-route-transition")) return;
              entranceObserver?.disconnect();
              entranceObserver = null;
              playEntrance();
            });
            entranceObserver.observe(document.documentElement, {
              attributes: true,
              attributeFilter: ["data-route-transition"],
            });
          } else {
            playEntrance();
          }
        });

        ScrollTrigger.batch(".cin-reveal", {
          start: "top 88%",
          once: true,
          onEnter: (items) =>
            gsap.from(items, {
              y: 38,
              autoAlpha: 0,
              duration: 0.78,
              stagger: 0.08,
              ease: "power3.out",
            }),
        });

        return () => {
          window.cancelAnimationFrame(entranceFrame);
          entranceObserver?.disconnect();
          entrance.kill();
        };
      });
    }, root);

    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  useEffect(() => {
    if (motionQuality !== "full") return;

    gsap.registerPlugin(ScrollTrigger);
    const node = root.current;
    if (!node) return;

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: ".cin-hero",
                start: "top top",
                end: "bottom top",
                scrub: 0.7,
              },
            })
            .to(
              ".cin-hero-media .cinematic-media__motion",
              { yPercent: 9, scale: 1.02, ease: "none" },
              0,
            )
            .to(".cin-hero-title", { yPercent: -5, ease: "none" }, 0)
            .to(".cin-hero-index", { yPercent: -18, ease: "none" }, 0);

          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((item) => {
            const amount = Number(item.dataset.parallax ?? 8);
            gsap.fromTo(
              item,
              { yPercent: -amount / 2 },
              {
                yPercent: amount / 2,
                ease: "none",
                scrollTrigger: {
                  trigger: item.parentElement ?? item,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.7,
                },
              },
            );
          });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: ".cin-tension",
                start: "top 72%",
                end: "center 42%",
                scrub: 0.7,
              },
            })
            .from(".cin-tension-card:nth-child(1)", { xPercent: -18, rotate: -5 }, 0)
            .from(".cin-tension-card:nth-child(2)", { yPercent: 22, rotate: 4 }, 0)
            .from(".cin-tension-card:nth-child(3)", { xPercent: 20, rotate: 7 }, 0)
            .to(".cin-tension-thread", { scaleX: 1, transformOrigin: "left" }, 0.2);

          const steps = gsap.utils.toArray<HTMLElement>(".cin-method-step");
          const frames = gsap.utils.toArray<HTMLElement>(".cin-method-frame");
          const setMethod = (index: number) => {
            steps.forEach((step, stepIndex) =>
              step.classList.toggle("is-active", stepIndex === index),
            );
            frames.forEach((frame, frameIndex) =>
              frame.classList.toggle("is-active", frameIndex === index),
            );
          };
          steps.forEach((step, index) => {
            ScrollTrigger.create({
              trigger: step,
              start: "top 58%",
              end: "bottom 42%",
              onEnter: () => setMethod(index),
              onEnterBack: () => setMethod(index),
            });
          });

          gsap.fromTo(
            ".cin-proof-line",
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: "left",
              ease: "none",
              scrollTrigger: {
                trigger: ".cin-proof",
                start: "top 72%",
                end: "center 45%",
                scrub: 0.65,
              },
            },
          );

          return () => setMethod(0);
        },
      );

      media.add(
        "(min-width: 960px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          let currentOfferIndex = 0;
          const setOffer = (index: number) => {
            if (index === currentOfferIndex) return;
            currentOfferIndex = index;
            setActiveOfferIndex(index);
          };
          const offerTrigger = ScrollTrigger.create({
            trigger: ".cin-offer-story",
            start: "top top",
            end: () => `+=${window.innerHeight * 2.8}`,
            pin: ".cin-offer-stage",
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) =>
              setOffer(Math.min(2, Math.floor(self.progress * 3))),
          });

          return () => {
            offerTrigger.kill();
            setActiveOfferIndex(0);
          };
        },
      );
    }, root);

    return () => {
      media.revert();
      context.revert();
    };
  }, [motionQuality]);

  return (
    <main ref={root} id="main-content" className="cin-home authority-home">
      <section className="cin-hero authority-home-hero">
        <CinematicMedia
          className="cin-hero-media"
          poster="/media/hero-aerial-poster.jpg"
          mobilePoster="/media/hero-aerial-poster-mobile.jpg"
          videoSrc="/media/hero-aerial.mp4"
          mobileVideoSrc="/media/hero-aerial-mobile.mp4"
          alt="Aerial view of a contemporary residence and its architectural setting"
          width={1800}
          height={1013}
          sizes="100vw"
          priority
          showPauseControl
          controlLabel="architectural background video"
        >
          <div className="cin-hero-shade" />
        </CinematicMedia>

        <div className="cin-hero-top cin-hero-reveal">
          <span>{brand.name.toUpperCase()} / BENGALURU</span>
          <span>{brand.professionalTitle.toUpperCase()}</span>
        </div>
        <span className="cin-hero-rule" aria-hidden="true" />

        <div className="cin-hero-title">
          <span className="cin-hero-kicker cin-hero-reveal">{brand.line.toUpperCase()}</span>
          <h1 aria-label="Find the right property. Move with clarity.">
            <span className="cin-hero-title-line"><span>Find the</span></span>
            <span className="cin-hero-title-line cin-hero-title-offset"><span>right property.</span></span>
            <span className="cin-hero-title-line"><span>Move with clarity.</span></span>
          </h1>
        </div>

        <div className="cin-hero-bottom">
          <p className="cin-hero-deck cin-hero-reveal">
            Residential, investment, NRI, and commercial property advisory
            through Hundred Yards—led by {brand.name}.
          </p>
          <div className="cin-hero-actions cin-hero-reveal authority-home-hero__paths">
            <Link className="cin-button cin-button-light" href="/advisory">
              Explore property advisory <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
            <Link className="cin-link cin-link-light" href="/courses">
              Explore the Academy <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>
          <div className="cin-hero-index cin-hero-reveal">
            <span>01</span>
            <p>{brand.credential}<br />Bengaluru</p>
          </div>
        </div>

        <a className="cin-hero-scroll" href="#perspective" aria-label={`Continue to ${brand.shortName}'s professional profile`}>
          <span>EXPLORE THE STUDIO</span>
          <ArrowDown aria-hidden="true" size={15} />
        </a>
        <p className="authority-media-disclosure cin-hero-reveal">
          Editorial architecture footage / not a Hundred Yards project or listing
        </p>
      </section>

      <section className="cin-perspective cin-section authority-home-intro" id="perspective">
        <div className="cin-section-index cin-reveal"><span>01</span><i /><small>HOW WE CAN HELP</small></div>
        <div className="cin-perspective-copy cin-reveal">
          <p className="cin-kicker">PROPERTY ADVISORY / MARKET INSIGHT / EDUCATION</p>
          <h2>A property team for the search.<em> A clearer guide through the process.</em></h2>
          <p>Discover residential and investment opportunities with Hundred Yards, or build your real-estate foundations through {brand.shortName}&apos;s practical Academy resources.</p>
        </div>
        <blockquote className="cin-reveal authority-home-intro__statement"><span>THE PROMISE</span>Relevant options, straight answers, and support that continues beyond the first site visit.</blockquote>
      </section>

      <section className="cin-tension cin-section cin-section-stone authority-home-context">
        <div className="cin-tension-copy cin-reveal">
          <p className="cin-kicker">SERVICES BUILT AROUND THE CLIENT</p>
          <h2>From finding a home<br /><em>to completing the transaction.</em></h2>
          <p>Buyer representation, investment advice, NRI coordination, seller support, and practical help through documentation and registration.</p>
        </div>
        <div className="cin-tension-stage" aria-label="Property research organised into a clearer process">
          <figure className="cin-tension-card"><Image src="/media/interior-daylight.jpg" alt="Bright contemporary apartment interior" width={1800} height={2700} sizes="(max-width: 700px) 64vw, 34vw" /><figcaption>{companyServices[0].title.toUpperCase()}</figcaption></figure>
          <figure className="cin-tension-card"><Image src="/media/blueprint-hands.jpg" alt="Hands reviewing architectural drawings" width={2048} height={3072} sizes="(max-width: 700px) 58vw, 34vw" /><figcaption>{companyServices[1].title.toUpperCase()}</figcaption></figure>
          <figure className="cin-tension-card"><Image src="/media/facade-detail.jpg" alt="Close architectural facade detail" width={1800} height={1170} sizes="(max-width: 700px) 36vw, 20vw" /><figcaption>{companyServices[3].title.toUpperCase()}</figcaption></figure>
          <span className="cin-tension-thread" aria-hidden="true" />
        </div>
      </section>

      <section className="cin-rohit cin-section authority-home-profile">
        <figure className="cin-rohit-portrait cin-reveal">
          <div className="cin-media-crop"><Image data-parallax="8" src="/media/facade-detail.jpg" alt="Geometric architectural facade in warm light" width={1800} height={1170} sizes="(max-width: 860px) 100vw, 50vw" /></div>
          <figcaption>EDITORIAL ARCHITECTURE IMAGE / NOT A HUNDRED YARDS PROJECT</figcaption>
        </figure>
        <div className="cin-rohit-copy cin-reveal">
          <p className="cin-kicker">{brand.name.toUpperCase()}</p>
          <h2>Market experience with an <em>educator&apos;s instinct.</em></h2>
          <p>As Managing Director of Hundred Yards, {brand.shortName} brings more than a decade of company-published real-estate experience to homebuyers, investors, NRIs, businesses, and the professionals learning alongside them.</p>
          <Link className="cin-button cin-button-dark" href="/about">Meet {brand.shortName} <ArrowUpRight aria-hidden="true" size={18} /></Link>
        </div>
        <div className="cin-rohit-note cin-reveal"><span>LEADERSHIP</span><p>{brand.credential}. Bengaluru-based advisory, public market education, and customer-first service.</p></div>
      </section>

      <section className="cin-method cin-section cin-section-dark authority-home-journey" id="method">
        <header className="cin-section-head cin-reveal">
          <div><p className="cin-kicker">HOW HUNDRED YARDS SUPPORTS YOU / 01—05</p><h2>From first conversation<br /><em>to a confident next step.</em></h2></div>
          <p>A connected advisory experience across discovery, comparison, visits, coordination, and completion.</p>
        </header>
        <div className="cin-method-layout">
          <div className="cin-method-visual cin-reveal">
            {methodImages.map((src, index) => (
              <figure className={`cin-method-frame${index === 0 ? " is-active" : ""}`} key={src}>
                <Image src={src} alt="" width={1800} height={2700} sizes="(max-width: 860px) 100vw, 50vw" /><figcaption>{authoritySteps[index]?.title.toUpperCase()} / 0{index + 1} · EDITORIAL IMAGE</figcaption>
              </figure>
            ))}
            <div className="cin-method-progress" aria-hidden="true">{authoritySteps.map((stage) => <span key={stage.number} />)}</div>
          </div>
          <div className="cin-method-steps">
            {authoritySteps.map((stage, index) => (
              <article className={`cin-method-step${index === 0 ? " is-active" : ""}`} key={stage.number}>
                <span>{stage.number}</span><div><h3>{stage.title}</h3><p>{stage.description}</p></div><ArrowDown aria-hidden="true" size={18} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="cin-offer-story authority-home-paths"
        data-offer-mode={offersPinned ? "pinned" : "stacked"}
        id="offers"
      >
        <div className="cin-offer-stage">
          <header className="cin-offer-intro"><p className="cin-kicker">CURRENT PROPERTY OPPORTUNITIES / 001—003</p><h2>Homes and locations<br /><em>worth exploring now.</em></h2></header>
          <div className="cin-offer-panels">
            {authorityPaths.map((path, index) => {
              const offerIsActive = index === activeOfferIndex;
              const offerIsHidden = offersPinned && !offerIsActive;

              return (
                <article
                  aria-hidden={offerIsHidden || undefined}
                  className={`cin-offer-panel authority-path-card${index < 2 ? " authority-path-card--primary" : ""}${offerIsActive ? " is-active" : ""}`}
                  inert={offerIsHidden}
                  key={path.href}
                >
                  <div className="cin-offer-image">
                    <Image src={path.image} alt="" width={1800} height={2700} sizes="(max-width: 860px) 100vw, 50vw" />
                    <div className="authority-path-card__mark" aria-hidden="true"><span>{path.mark}</span><small>{path.label}</small></div>
                    <span className="authority-path-card__disclosure">Editorial architecture image / illustrative only</span>
                  </div>
                  <div className="cin-offer-copy">
                    <span className="cin-offer-number">{path.number} / {path.label}</span>
                    <h3>{path.title}</h3><p className="cin-offer-tagline">{path.copy}</p>
                    <div className="cin-offer-facts">
                      <span><small>LOCATION</small>{path.detail}</span>
                      <span><small>ADVISORY</small>Hundred Yards</span>
                      <span><small>DETAILS</small>Live on 100yards.in</span>
                    </div>
                    <div className="cin-offer-action">
                      <span className="cin-offer-price"><small>PATH</small><strong>{path.number}</strong></span>
                      <Link
                        className="cin-button cin-button-light"
                        href={path.href}
                        tabIndex={offerIsHidden ? -1 : undefined}
                      >
                        {path.action} <ArrowUpRight aria-hidden="true" size={17} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="cin-offer-nav" aria-hidden="true">{authorityPaths.map((path) => <span key={path.href}>{path.number}</span>)}</div>
        </div>
      </section>

      <section className="cin-inside cin-section authority-field-guide" id="training-deck-preview">
        <header className="cin-section-head cin-reveal">
          <div><p className="cin-kicker">ROHITT PROPERTY ACADEMY / FIRST RESOURCE</p><h2>Real-estate foundations,<br /><em>in 49 visual slides.</em></h2></div>
          <p>Build a practical understanding of property types, construction, approvals, area terminology, charges, UDS, and payment plans.</p>
        </header>
        <div className="cin-artifact-grid authority-field-guide__grid">
          <figure className="cin-artifact cin-reveal authority-field-guide__cover">
            <Image src="/media/real-estate-training-deck-cover.png" alt="Cover of the 100 Yards Basics of Real Estate training deck" width={1920} height={1080} sizes="(max-width: 860px) 100vw, 42vw" />
            <figcaption>Authentic cover preview / full PowerPoint file remains private</figcaption>
          </figure>
          <article className="cin-artifact cin-reveal authority-field-guide__card">
            <div className="cin-artifact-preview cin-artifact-preview-1" aria-hidden="true"><span>100 YARDS / FOUNDATION TRAINING</span><strong>PPTX</strong><i /><i /><i /></div>
            <span>JOIN THE LAUNCH LIST</span>
            <h3>Basics of Real Estate</h3>
            <p>A two-part PowerPoint foundation for aspiring professionals, new team members, buyers, and anyone who wants the language of real estate explained clearly.</p>
            <Link className="cin-button cin-button-dark" href="/courses/basics-of-real-estate-training-deck">Preview the training deck <ArrowUpRight aria-hidden="true" size={17} /></Link>
            <Link className="cin-link" href="/courses#field-guide">Before You Buy PDF · coming soon <ArrowRight aria-hidden="true" size={15} /></Link>
          </article>
        </div>
      </section>

      <section className="cin-proof cin-section cin-section-forest authority-public-record" id="proof">
        <header className="cin-section-head cin-reveal">
          <div><p className="cin-kicker">CUSTOMER STORIES / PUBLISHED BY HUNDRED YARDS</p><h2>What clients remember<br /><em>about the experience.</em></h2></div>
          <p>First-party customer feedback currently published by Hundred Yards, summarised here with source context.</p>
        </header>
        <div className="cin-proof-path cin-reveal">
          <span className="cin-proof-line" aria-hidden="true" />
          {publicRecord.map(({ number, title, copy }) => (
            <div key={number}><span>{number}</span><Check aria-hidden="true" size={16} /><h3>{title}</h3><p>{copy}</p></div>
          ))}
        </div>
        <a className="cin-link cin-link-light cin-reveal" href={companySource.website} rel="noreferrer" target="_blank">Read all published customer feedback <ArrowUpRight aria-hidden="true" size={15} /></a>
      </section>

      <section className="cin-journal cin-section authority-editorial-doors">
        <header className="cin-section-head cin-reveal">
          <div><p className="cin-kicker">ROHITT&apos;S PUBLIC WORK</p><h2>Watch the market.<br /><em>Learn what matters.</em></h2></div>
          <Link className="cin-link" href="/media">Enter {brand.mediaLabel} <ArrowRight aria-hidden="true" size={15} /></Link>
        </header>
        <div className="cin-journal-grid">
          {editorialDoors.map((door) => (
            <Link className="cin-journal-card cin-reveal" href={door.href} key={door.href}>
              <div className="cin-journal-image"><Image data-parallax="6" src={door.image} alt="" width={1800} height={2700} sizes="(max-width: 700px) 100vw, 33vw" /><span className="authority-media-disclosure">Editorial image / illustrative only</span></div>
              <div><span>{door.meta}</span><h3>{door.title}</h3><p>{door.copy}</p><ArrowUpRight aria-hidden="true" size={18} /></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="cin-closing authority-home-closing">
        <div className="cin-closing-media" aria-hidden="true"><Image data-parallax="10" src="/media/interior-soft.jpg" alt="" width={1200} height={800} sizes="100vw" /></div>
        <div className="cin-closing-shade" />
        <div className="cin-closing-copy cin-reveal">
          <p className="cin-kicker">YOUR NEXT MOVE</p><h2>Find your property.<br /><em>Or strengthen your knowledge.</em></h2>
          <p>Speak with Hundred Yards about buying, selling, or investing—or explore Rohitt&apos;s Academy for practical real-estate learning.</p>
          <div><Link className="cin-button cin-button-light" href="/advisory">Speak with the property team <ArrowUpRight aria-hidden="true" size={18} /></Link><Link className="cin-link cin-link-light" href="/courses">Visit the Academy <ArrowRight aria-hidden="true" size={15} /></Link></div>
        </div>
      </section>
    </main>
  );
}
