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
    title: "Define the brief",
    description:
      "Put the purpose, location, budget frame, timing, and non-negotiables into one useful starting point.",
  },
  {
    number: "02",
    title: "Read the market",
    description:
      "Build context around the segment and location before individual options begin competing for attention.",
  },
  {
    number: "03",
    title: "Compare the options",
    description:
      "Review fit, trade-offs, and open questions in a consistent frame rather than relying on first impressions.",
  },
  {
    number: "04",
    title: "Verify the detail",
    description:
      "Route legal, financial, technical, and property-specific questions to the right qualified professionals.",
  },
  {
    number: "05",
    title: "Choose the next step",
    description:
      "Move forward only when the decision, the evidence, and the remaining uncertainty are clear enough to explain.",
  },
] as const;

const authorityPaths = [
  {
    number: "01",
    label: "PROPERTY ADVISORY",
    title: "Buy or invest with Hundred Yards",
    copy: "Bring a real requirement to a Bengaluru-based team working across buyer representation, investment consultation, market analysis, and end-to-end property support.",
    detail: "For homebuyers, investors, NRIs, and businesses",
    href: "/advisory",
    action: "Plan a consultation",
    image: "/media/interior-daylight.jpg",
    mark: "HY",
  },
  {
    number: "02",
    label: "LEARNING",
    title: "Learn with Rohitt",
    copy: "Start with the prepared 49-slide Basics of Real Estate training deck, then follow the field guide and practical tools as they are developed.",
    detail: "A real training deck, plus the upcoming buyer PDF",
    href: "/courses",
    action: "Explore the academy",
    image: "/media/blueprint-hands.jpg",
    mark: brand.initials,
  },
  {
    number: "03",
    label: brand.mediaLabel.toUpperCase(),
    title: "Watch the property conversation unfold",
    copy: "A focused editorial home for Rohitt’s public real-estate videos and the questions behind them—without manufactured reach or borrowed authority.",
    detail: "Public videos, field observations, and leadership notes",
    href: "/media",
    action: "Enter the media room",
    image: "/media/hero-poster.jpg",
    mark: "RSR",
  },
] as const;

const publicRecord = [
  {
    number: "01",
    title: "Managing Director",
    copy: `${brand.organizationName} publishes its Managing Director profile; this site uses ${brand.name} as the public-facing name.`,
  },
  {
    number: "02",
    title: brand.credential,
    copy: "Experience wording follows the published Hundred Yards company biography; it is not presented as an independently audited statistic.",
  },
  {
    number: "03",
    title: "Bengaluru",
    copy: "The company’s published contact presence is based in Kalyan Nagar, Bengaluru.",
  },
] as const;

const editorialDoors = [
  {
    href: "/media",
    image: "/media/hero-poster.jpg",
    meta: `${brand.mediaLabel} / VIDEO`,
    title: "Real estate, from the public conversation inward.",
    copy: "Follow Rohitt’s public video series and discover the thinking that sits behind each short-form story.",
  },
  {
    href: "/insights",
    image: "/media/facade-detail.jpg",
    meta: "FIELD NOTES / READ",
    title: "Questions worth carrying into the next conversation.",
    copy: "Longer-form notes on property context, comparison, verification, and responsible decision-making.",
  },
  {
    href: "/courses",
    image: "/media/blueprint-hands.jpg",
    meta: "ACADEMY / LEARN",
    title: "Turn useful questions into a repeatable practice.",
    copy: "See the prepared 49-slide training deck and follow the buyer field guide as it develops.",
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
          <h1 aria-label="Real estate, led with clarity.">
            <span className="cin-hero-title-line"><span>Real estate,</span></span>
            <span className="cin-hero-title-line cin-hero-title-offset"><span>led with clarity.</span></span>
          </h1>
        </div>

        <div className="cin-hero-bottom">
          <p className="cin-hero-deck cin-hero-reveal">
            {brand.name} leads {brand.organizationName} and builds practical
            real-estate education for clearer, better-informed decisions.
          </p>
          <div className="cin-hero-actions cin-hero-reveal authority-home-hero__paths">
            <Link className="cin-button cin-button-light" href="/advisory">
              Buy or invest with Hundred Yards <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
            <Link className="cin-link cin-link-light" href="/courses">
              Learn with {brand.shortName} <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>
          <div className="cin-hero-index cin-hero-reveal">
            <span>01</span>
            <p>{brand.credential}<br />Published by Hundred Yards</p>
          </div>
        </div>

        <a className="cin-hero-scroll" href="#perspective" aria-label={`Continue to ${brand.shortName}'s professional profile`}>
          <span>DISCOVER THE WORK</span>
          <ArrowDown aria-hidden="true" size={15} />
        </a>
        <p className="authority-media-disclosure cin-hero-reveal">
          Editorial architecture footage / not a Hundred Yards project or listing
        </p>
      </section>

      <section className="cin-perspective cin-section authority-home-intro" id="perspective">
        <div className="cin-section-index cin-reveal"><span>01</span><i /><small>THE POSITION</small></div>
        <div className="cin-perspective-copy cin-reveal">
          <p className="cin-kicker">LEADERSHIP / ADVISORY / EDUCATION</p>
          <h2>One public identity.<em> Two clear ways to begin.</em></h2>
          <p>Work with the Hundred Yards team on an active property requirement, or learn with {brand.shortName} through practical resources built for stronger questions and clearer next steps.</p>
        </div>
        <blockquote className="cin-reveal authority-home-intro__statement"><span>THE STANDARD</span>Clarity in the brief. Transparency in the process. Independent verification where it matters.</blockquote>
      </section>

      <section className="cin-tension cin-section cin-section-stone authority-home-context">
        <div className="cin-tension-copy cin-reveal">
          <p className="cin-kicker">THE DECISION ENVIRONMENT</p>
          <h2>More property options.<br /><em>A more deliberate brief.</em></h2>
          <p>Whether the next step is advisory or education, useful work begins with the requirement—not a manufactured promise.</p>
        </div>
        <div className="cin-tension-stage" aria-label="Property research organised into a clearer process">
          <figure className="cin-tension-card"><Image src="/media/interior-daylight.jpg" alt="Bright contemporary apartment interior" width={1800} height={2700} sizes="(max-width: 700px) 64vw, 34vw" /><figcaption>LIVE / THE REQUIREMENT</figcaption></figure>
          <figure className="cin-tension-card"><Image src="/media/blueprint-hands.jpg" alt="Hands reviewing architectural drawings" width={2048} height={3072} sizes="(max-width: 700px) 58vw, 34vw" /><figcaption>READ / THE DETAIL</figcaption></figure>
          <figure className="cin-tension-card"><Image src="/media/facade-detail.jpg" alt="Close architectural facade detail" width={1800} height={1170} sizes="(max-width: 700px) 36vw, 20vw" /><figcaption>CHOOSE / THE NEXT STEP</figcaption></figure>
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
          <h2>Real-estate leadership with an <em>educator&apos;s instinct.</em></h2>
          <p>{brand.organizationName} publishes {brand.shortName} as its {brand.professionalTitle.toLowerCase()} and credits him with more than a decade of hands-on real-estate experience. His public work now connects leadership, advisory context, and accessible education from Bengaluru.</p>
          <Link className="cin-button cin-button-dark" href="/about">Meet {brand.shortName} <ArrowUpRight aria-hidden="true" size={18} /></Link>
        </div>
        <div className="cin-rohit-note cin-reveal"><span>PUBLIC PROFILE</span><p>{brand.credential}. Published by Hundred Yards; source context is retained on the About page.</p></div>
      </section>

      <section className="cin-method cin-section cin-section-dark authority-home-journey" id="method">
        <header className="cin-section-head cin-reveal">
          <div><p className="cin-kicker">A RESPONSIBLE DECISION JOURNEY / 01—05</p><h2>Begin with the brief.<br /><em>Keep the detail visible.</em></h2></div>
          <p>A practical sequence for organising a conversation—not a guarantee, valuation, or substitute for qualified advice.</p>
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
          <header className="cin-offer-intro"><p className="cin-kicker">CHOOSE YOUR PATH / 001—003</p><h2>One profile.<br /><em>Two primary ways to begin.</em></h2></header>
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
                      <span><small>START HERE</small>{path.detail}</span>
                      <span><small>BASED IN</small>Bengaluru, India</span>
                      <span><small>LED BY</small>{brand.name}</span>
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
          <div><p className="cin-kicker">PREPARED / THE 100 YARDS TRAINING DECK</p><h2>Real-estate foundations,<br /><em>in 49 visual slides.</em></h2></div>
          <p>The file exists. A current-content review, price, licence, payment, protected delivery, support, and refund terms are being prepared before sales open.</p>
        </header>
        <div className="cin-artifact-grid authority-field-guide__grid">
          <figure className="cin-artifact cin-reveal authority-field-guide__cover">
            <Image src="/media/real-estate-training-deck-cover.png" alt="Cover of the 100 Yards Basics of Real Estate training deck" width={1920} height={1080} sizes="(max-width: 860px) 100vw, 42vw" />
            <figcaption>Authentic cover preview / full PowerPoint file remains private</figcaption>
          </figure>
          <article className="cin-artifact cin-reveal authority-field-guide__card">
            <div className="cin-artifact-preview cin-artifact-preview-1" aria-hidden="true"><span>100 YARDS / FOUNDATION TRAINING</span><strong>PPTX</strong><i /><i /><i /></div>
            <span>LAUNCH SETUP PENDING</span>
            <h3>Basics of Real Estate</h3>
            <p>A two-part PowerPoint introduction to property types, construction, approvals, area language, charges, UDS, and payment-plan concepts.</p>
            <Link className="cin-button cin-button-dark" href="/courses/basics-of-real-estate-training-deck">View the prepared resource <ArrowUpRight aria-hidden="true" size={17} /></Link>
            <Link className="cin-link" href="/courses#field-guide">The buyer PDF is also coming soon <ArrowRight aria-hidden="true" size={15} /></Link>
          </article>
        </div>
      </section>

      <section className="cin-proof cin-section cin-section-forest authority-public-record" id="proof">
        <header className="cin-section-head cin-reveal">
          <div><p className="cin-kicker">PUBLIC RECORD / WITH SOURCE CONTEXT</p><h2>Authority should be<br /><em>possible to trace.</em></h2></div>
          <p>These profile statements follow Hundred Yards&apos; published company material. No transaction count, return, or client outcome is implied.</p>
        </header>
        <div className="cin-proof-path cin-reveal">
          <span className="cin-proof-line" aria-hidden="true" />
          {publicRecord.map(({ number, title, copy }) => (
            <div key={number}><span>{number}</span><Check aria-hidden="true" size={16} /><h3>{title}</h3><p>{copy}</p></div>
          ))}
        </div>
        <a className="cin-link cin-link-light cin-reveal" href="https://100yards.in/about-us/" rel="noreferrer" target="_blank">Read the published company profile <ArrowUpRight aria-hidden="true" size={15} /></a>
      </section>

      <section className="cin-journal cin-section authority-editorial-doors">
        <header className="cin-section-head cin-reveal">
          <div><p className="cin-kicker">THE PUBLIC WORK</p><h2>Watch. Read.<br /><em>Learn at your pace.</em></h2></div>
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
          <p className="cin-kicker">CHOOSE THE CONVERSATION</p><h2>A real requirement.<br /><em>Or a better way to learn.</em></h2>
          <p>Start with Hundred Yards for an active property brief, or enter Rohitt&apos;s learning collection for education and practical tools.</p>
          <div><Link className="cin-button cin-button-light" href="/advisory">Buy or invest <ArrowUpRight aria-hidden="true" size={18} /></Link><Link className="cin-link cin-link-light" href="/courses">Learn with {brand.shortName} <ArrowRight aria-hidden="true" size={15} /></Link></div>
        </div>
      </section>
    </main>
  );
}
