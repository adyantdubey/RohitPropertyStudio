"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CourseCover } from "./components/CourseCover";
import { CinematicMedia } from "./components/CinematicMedia";
import { useMotion } from "./components/MotionProvider";
import { homeJourneyStages, insights, products } from "./lib/content";

const coverVariant = {
  course: "system",
  pdf: "field",
  toolkit: "room",
} as const;

const methodImages = [
  "/media/blueprint-hands.jpg",
  "/media/facade-detail.jpg",
  "/media/interior-daylight.jpg",
  "/media/interior-soft.jpg",
  "/media/hero-poster.jpg",
] as const;

const insightImages = [
  "/media/facade-detail.jpg",
  "/media/interior-daylight.jpg",
  "/media/blueprint-hands.jpg",
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
    <main ref={root} id="main-content" className="cin-home">
      <section className="cin-hero">
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
          <span>ROHIT / PROPERTY DECISION STUDIO</span>
          <span>INDIA / DIGITAL LEARNING</span>
        </div>
        <span className="cin-hero-rule" aria-hidden="true" />

        <div className="cin-hero-title">
          <span className="cin-hero-kicker cin-hero-reveal">A CLEARER WAY TO DECIDE</span>
          <h1 aria-label="Property, read clearly.">
            <span className="cin-hero-title-line"><span>Property,</span></span>
            <span className="cin-hero-title-line cin-hero-title-offset"><span>read clearly.</span></span>
          </h1>
        </div>

        <div className="cin-hero-bottom">
          <p className="cin-hero-deck cin-hero-reveal">
            Rohit&apos;s decision studio is being built around a process you can
            inspect—frame the question, read the evidence, expose the
            trade-offs, and know what to verify next.
          </p>
          <div className="cin-hero-actions cin-hero-reveal">
            <Link className="cin-button cin-button-light" href="/courses/property-decision-system">
              Explore the Decision System <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
            <Link className="cin-link cin-link-light" href="/about">
              Meet Rohit <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>
          <div className="cin-hero-index cin-hero-reveal">
            <span>01</span>
            <p>Education before urgency.<br />Evidence before excitement.</p>
          </div>
        </div>

        <a className="cin-hero-scroll" href="#perspective" aria-label="Continue to Rohit's perspective">
          <span>SCROLL TO READ</span>
          <ArrowDown aria-hidden="true" size={15} />
        </a>
      </section>

      <section className="cin-perspective cin-section" id="perspective">
        <div className="cin-section-index cin-reveal"><span>01</span><i /><small>THE PERSPECTIVE</small></div>
        <div className="cin-perspective-copy cin-reveal">
          <p className="cin-kicker">INFORMATION IS NOT A DECISION</p>
          <h2>Property rarely lacks information.<em> It lacks a way to read it.</em></h2>
          <p>Listings, opinions, documents, urgency, numbers—each arrives with a different agenda. Rohit brings them into one deliberate process so that evidence, assumptions, and trade-offs can be seen separately.</p>
        </div>
        <blockquote className="cin-reveal"><span>ROHIT / FIELD NOTE 01</span>“Clarity is not certainty. It is knowing what deserves verification next.”</blockquote>
      </section>

      <section className="cin-tension cin-section cin-section-stone">
        <div className="cin-tension-copy cin-reveal">
          <p className="cin-kicker">THE MOMENT BEFORE THE METHOD</p>
          <h2>Research grows.<br /><em>Clarity should too.</em></h2>
          <p>The work begins by turning scattered material into a reviewable record—not by adding another opinion to the pile.</p>
        </div>
        <div className="cin-tension-stage" aria-label="Property research organised into a clearer process">
          <figure className="cin-tension-card"><Image src="/media/interior-daylight.jpg" alt="Bright contemporary apartment interior" width={1800} height={2700} sizes="(max-width: 700px) 64vw, 34vw" /><figcaption>OBSERVE / THE SPACE</figcaption></figure>
          <figure className="cin-tension-card"><Image src="/media/blueprint-hands.jpg" alt="Hands reviewing architectural drawings" width={2048} height={3072} sizes="(max-width: 700px) 58vw, 34vw" /><figcaption>READ / THE EVIDENCE</figcaption></figure>
          <figure className="cin-tension-card"><Image src="/media/facade-detail.jpg" alt="Close architectural facade detail" width={1800} height={1170} sizes="(max-width: 700px) 36vw, 20vw" /><figcaption>QUESTION / THE DETAIL</figcaption></figure>
          <span className="cin-tension-thread" aria-hidden="true" />
        </div>
      </section>

      <section className="cin-rohit cin-section">
        <figure className="cin-rohit-portrait cin-reveal">
          <div className="cin-media-crop"><Image data-parallax="8" src="/media/rohit-standin.jpg" alt="Temporary portrait stand-in beside modern architecture" width={1400} height={2100} sizes="(max-width: 860px) 100vw, 50vw" /></div>
          <figcaption>STAND-IN IMAGE / REPLACE WITH ROHIT PORTRAIT</figcaption>
        </figure>
        <div className="cin-rohit-copy cin-reveal">
          <p className="cin-kicker">THE PERSON BEHIND THE PROCESS</p>
          <h2>A trained eye is not the same as a <em>confident opinion.</em></h2>
          <p>Rohit&apos;s method focuses on the part of real estate that rarely fits inside a sales pitch: how to slow the noise down, examine an assumption, identify the missing expert input, and document the next move.</p>
          <Link className="cin-button cin-button-dark" href="/about">Meet Rohit <ArrowUpRight aria-hidden="true" size={18} /></Link>
        </div>
        <div className="cin-rohit-note cin-reveal"><span>THE STANDARD</span><p>Professional without being distant. Clear without pretending uncertainty has disappeared.</p></div>
      </section>

      <section className="cin-method cin-section cin-section-dark" id="method">
        <header className="cin-section-head cin-reveal">
          <div><p className="cin-kicker">THE DECISION ARCHITECTURE / 01—05</p><h2>A major decision<br /><em>needs structure.</em></h2></div>
          <p>Not a prediction. A process that can be inspected, explained, and improved.</p>
        </header>
        <div className="cin-method-layout">
          <div className="cin-method-visual cin-reveal">
            {methodImages.map((src, index) => (
              <figure className={`cin-method-frame${index === 0 ? " is-active" : ""}`} key={src}>
                <Image src={src} alt="" width={1800} height={2700} sizes="(max-width: 860px) 100vw, 50vw" /><figcaption>{homeJourneyStages[index]?.title.toUpperCase()} / 0{index + 1}</figcaption>
              </figure>
            ))}
            <div className="cin-method-progress" aria-hidden="true">{homeJourneyStages.map((stage) => <span key={stage.number} />)}</div>
          </div>
          <div className="cin-method-steps">
            {homeJourneyStages.map((stage, index) => (
              <article className={`cin-method-step${index === 0 ? " is-active" : ""}`} key={stage.number}>
                <span>{stage.number}</span><div><h3>{stage.title}</h3><p>{stage.description}</p></div><ArrowDown aria-hidden="true" size={18} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="cin-offer-story"
        data-offer-mode={offersPinned ? "pinned" : "stacked"}
        id="offers"
      >
        <div className="cin-offer-stage">
          <header className="cin-offer-intro"><p className="cin-kicker">THE COLLECTION / 001—003</p><h2>One system.<br /><em>Three ways in.</em></h2></header>
          <div className="cin-offer-panels">
            {products.map((product, index) => {
              const offerIsActive = index === activeOfferIndex;
              const offerIsHidden = offersPinned && !offerIsActive;

              return (
                <article
                  aria-hidden={offerIsHidden || undefined}
                  className={`cin-offer-panel${offerIsActive ? " is-active" : ""}`}
                  inert={offerIsHidden}
                  key={product.slug}
                >
                  <div className="cin-offer-image">
                    <Image src={index === 0 ? "/media/interior-daylight.jpg" : index === 1 ? "/media/blueprint-hands.jpg" : "/media/facade-detail.jpg"} alt="" width={1800} height={2700} sizes="(max-width: 860px) 100vw, 50vw" />
                    <CourseCover variant={coverVariant[product.kind]} title={product.shortTitle} />
                  </div>
                  <div className="cin-offer-copy">
                    <span className="cin-offer-number">0{index + 1} / {product.kind.toUpperCase()}</span>
                    <h3>{product.title}</h3><p className="cin-offer-tagline">{product.tagline}</p>
                    <div className="cin-offer-facts">
                      <span><small>BEST WHEN</small>{product.idealFor[0]}</span>
                      <span><small>FORMAT</small>{product.format}</span>
                      <span><small>INCLUDES</small>{product.includes.slice(0, 3).join(" · ")}</span>
                    </div>
                    <div className="cin-offer-action">
                      <span className="cin-offer-price">
                        <small>Preview price</small>
                        <strong>{product.price.formatted}</strong>
                      </span>
                      <Link
                        className="cin-button cin-button-light"
                        href={`/courses/${product.slug}`}
                        tabIndex={offerIsHidden ? -1 : undefined}
                      >
                        See inside <ArrowUpRight aria-hidden="true" size={17} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="cin-offer-nav" aria-hidden="true">{products.map((product, index) => <span key={product.slug}>0{index + 1}</span>)}</div>
        </div>
      </section>

      <section className="cin-inside cin-section">
        <header className="cin-section-head cin-reveal">
          <div><p className="cin-kicker">SEE THE WORK / NOT JUST THE COVER</p><h2>Built to be used.<br /><em>Designed to stay clear.</em></h2></div>
          <p>Real product files will replace these preview compositions before launch.</p>
        </header>
        <div className="cin-artifact-grid">
          {[
            ["01", "Decision criteria canvas", "Define what matters before options begin competing."],
            ["02", "Property review sheet", "Keep observations separate from claims and assumptions."],
            ["03", "Risk register", "Give each concern an owner, evidence need, and next action."],
            ["04", "Decision memo", "Bring the reasoning and unresolved questions into one record."],
          ].map(([number, title, copy], index) => (
            <article className="cin-artifact cin-reveal" key={number}>
              <div className={`cin-artifact-preview cin-artifact-preview-${index + 1}`} aria-hidden="true"><span>ROHIT / WORKING MATERIAL</span><strong>{number}</strong><i /><i /><i /></div>
              <span>{number}</span><h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cin-proof cin-section cin-section-forest" id="proof">
        <header className="cin-section-head cin-reveal">
          <div><p className="cin-kicker">PROOF / WITH CONTEXT INTACT</p><h2>No manufactured<br /><em>success stories.</em></h2></div>
          <p>When learner stories appear, they will show the starting situation, the process used, and what genuinely became clearer.</p>
        </header>
        <div className="cin-proof-path cin-reveal">
          <span className="cin-proof-line" aria-hidden="true" />
          {[["01", "Situation", "What the learner was trying to understand."], ["02", "Process", "Which questions, records, or tools were used."], ["03", "Change", "What improved in the way the decision was approached."]].map(([number, title, copy]) => (
            <div key={number}><span>{number}</span><Check aria-hidden="true" size={16} /><h3>{title}</h3><p>{copy}</p></div>
          ))}
        </div>
        <Link className="cin-link cin-link-light cin-reveal" href="/results">Read the proof standard <ArrowUpRight aria-hidden="true" size={15} /></Link>
      </section>

      <section className="cin-journal cin-section">
        <header className="cin-section-head cin-reveal">
          <div><p className="cin-kicker">THE FIELD NOTE</p><h2>Questions worth<br /><em>carrying forward.</em></h2></div>
          <Link className="cin-link" href="/insights">View all insights <ArrowRight aria-hidden="true" size={15} /></Link>
        </header>
        <div className="cin-journal-grid">
          {insights.slice(0, 3).map((insight, index) => (
            <Link className="cin-journal-card cin-reveal" href={`/insights/${insight.slug}`} key={insight.slug}>
              <div className="cin-journal-image"><Image data-parallax="6" src={insightImages[index]} alt="" width={1800} height={2700} sizes="(max-width: 700px) 100vw, 33vw" /></div>
              <div><span>{insight.category} / {insight.readTime}</span><h3>{insight.title}</h3><p>{insight.summary}</p><ArrowUpRight aria-hidden="true" size={18} /></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="cin-closing">
        <div className="cin-closing-media" aria-hidden="true"><Image data-parallax="10" src="/media/interior-soft.jpg" alt="" width={1200} height={800} sizes="100vw" /></div>
        <div className="cin-closing-shade" />
        <div className="cin-closing-copy cin-reveal">
          <p className="cin-kicker">START WITH THE QUESTION</p><h2>Know what deserves<br /><em>the next step.</em></h2>
          <p>Explore the learning, compare the resources, or bring Rohit a focused question.</p>
          <div><Link className="cin-button cin-button-light" href="/courses">Explore resources <ArrowUpRight aria-hidden="true" size={18} /></Link><Link className="cin-link cin-link-light" href="/contact">Ask Rohit <ArrowRight aria-hidden="true" size={15} /></Link></div>
        </div>
      </section>
    </main>
  );
}
