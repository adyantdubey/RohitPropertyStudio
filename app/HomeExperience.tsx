"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  MoveDown,
} from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CourseCover } from "./components/CourseCover";
import { SectionHeading } from "./components/SectionHeading";
import { homeJourneyStages, products } from "./lib/content";

const coverVariant = {
  course: "system",
  pdf: "field",
  toolkit: "room",
} as const;

export function HomeExperience() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const node = root.current;
    if (!node) return;

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!reduceMotion) {
        const entrance = gsap.timeline({ defaults: { ease: "power4.out" } });
        entrance
          .from(".hero-line-inner", {
            yPercent: 120,
            rotateX: -14,
            duration: 1.1,
            stagger: 0.09,
          })
          .from(
            ".hero-architecture",
            {
              clipPath: "inset(0 100% 0 0)",
              x: 36,
              duration: 1.2,
            },
            0.12,
          )
          .from(
            ".hero-meta-reveal",
            { y: 16, autoAlpha: 0, stagger: 0.08, duration: 0.65 },
            0.46,
          );

        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".home-hero",
              start: "top top",
              end: "bottom top",
              scrub: 0.7,
            },
          })
          .to(".hero-grid-plane", { yPercent: 7, ease: "none" }, 0)
          .to(".architecture-sun", { yPercent: 18, ease: "none" }, 0)
          .to(".architecture-back", { yPercent: 12, ease: "none" }, 0)
          .to(".architecture-main", { yPercent: 5, ease: "none" }, 0)
          .to(".architecture-r", { yPercent: -10, ease: "none" }, 0)
          .to(".hero-heading", { yPercent: -5, ease: "none" }, 0);

        const revealItems = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        revealItems.forEach((item) => {
          gsap.from(item, {
            y: 44,
            autoAlpha: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          });
        });

        const media = gsap.matchMedia();
        media.add("(min-width: 960px)", () => {
          const cards = gsap.utils.toArray<HTMLElement>(".story-product-card");
          if (cards.length !== 3) return;

          gsap.set(cards, {
            position: "absolute",
            top: "50%",
            left: "67%",
            xPercent: -50,
            yPercent: -50,
            transformOrigin: "50% 100%",
          });
          gsap.set(cards[0], { x: -28, y: 18, rotateY: -4, rotateZ: -4, z: 40 });
          gsap.set(cards[1], { x: 0, y: 0, rotateY: 3, rotateZ: 1, z: 80 });
          gsap.set(cards[2], { x: 28, y: -16, rotateY: 7, rotateZ: 5, z: 120 });

          const story = gsap.timeline({
            scrollTrigger: {
              trigger: ".product-story",
              start: "top top",
              end: "+=2200",
              pin: ".product-stage",
              pinSpacing: true,
              scrub: 0.75,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          story
            .to(cards[0], { x: -360, y: -18, rotateY: -8, rotateZ: -3, z: 20, duration: 1 })
            .to(cards[1], { x: 0, y: -26, rotateY: 0, rotateZ: 0, z: 160, duration: 1 }, "<")
            .to(cards[2], { x: 330, y: 4, rotateY: 8, rotateZ: 3, z: 10, duration: 1 }, "<")
            .to(".product-measure-line", { scaleX: 1, duration: 0.75 }, "<0.15")
            .to(cards[0], { x: -420, y: 70, rotateY: 0, rotateZ: 0, z: 0, duration: 1 }, "+=0.3")
            .to(cards[1], { x: 0, y: 70, rotateY: 0, rotateZ: 0, z: 0, duration: 1 }, "<")
            .to(cards[2], { x: 420, y: 70, rotateY: 0, rotateZ: 0, z: 0, duration: 1 }, "<")
            .to(".product-stage-copy", { y: -22, duration: 0.7 }, "<");
        });

        const steps = gsap.utils.toArray<HTMLElement>(".journey-step");
        const floors = gsap.utils.toArray<HTMLElement>(".plan-floor");
        steps.forEach((step, index) => {
          ScrollTrigger.create({
            trigger: step,
            start: "top 58%",
            end: "bottom 42%",
            onEnter: () => {
              steps.forEach((item) => item.classList.remove("is-active"));
              step.classList.add("is-active");
              gsap.to(floors, {
                scaleX: (_, floor) => (floors.indexOf(floor) <= index ? 1 : 0.15),
                opacity: (_, floor) => (floors.indexOf(floor) <= index ? 1 : 0.18),
                duration: 0.7,
                stagger: 0.05,
                ease: "power3.out",
              });
            },
            onEnterBack: () => {
              steps.forEach((item) => item.classList.remove("is-active"));
              step.classList.add("is-active");
            },
          });
        });

        const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
        if (finePointer.matches) {
          const architecture = node.querySelector<HTMLElement>(".hero-architecture");
          const frame = node.querySelector<HTMLElement>(".architecture-frame");
          const monogram = node.querySelector<HTMLElement>(".architecture-r");
          if (architecture && frame && monogram) {
            const frameX = gsap.quickTo(frame, "x", { duration: 0.8, ease: "power3.out" });
            const frameY = gsap.quickTo(frame, "y", { duration: 0.8, ease: "power3.out" });
            const markX = gsap.quickTo(monogram, "x", { duration: 1, ease: "power3.out" });
            const markY = gsap.quickTo(monogram, "y", { duration: 1, ease: "power3.out" });
            const onPointer = (event: PointerEvent) => {
              const rect = architecture.getBoundingClientRect();
              const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
              const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
              frameX(x * 10);
              frameY(y * 8);
              markX(x * -7);
              markY(y * -5);
            };
            architecture.addEventListener("pointermove", onPointer);
            return () => architecture.removeEventListener("pointermove", onPointer);
          }
        }

        return () => media.revert();
      }
    }, root);

    return () => context.revert();
  }, []);

  return (
    <main ref={root} id="main-content" className="home-page">
      <section className="home-hero">
        <div className="hero-grid-plane" aria-hidden="true" />
        <div className="hero-coordinate hero-coordinate-left">28.6139° N</div>
        <div className="hero-coordinate hero-coordinate-right">77.2090° E</div>

        <div className="hero-eyebrow hero-meta-reveal">
          <span className="signal-dot" />
          REAL ESTATE, WITHOUT THE NOISE
        </div>

        <div className="hero-heading">
          <span className="hero-sequence hero-meta-reveal">INTRO / 001</span>
          <h1 aria-label="Property. Decoded.">
            <span className="hero-line"><span className="hero-line-inner">Property.</span></span>
            <span className="hero-line hero-line-offset"><span className="hero-line-inner hero-outline">Decoded.</span></span>
          </h1>
        </div>

        <div className="hero-architecture" aria-label="Architectural brand illustration">
          <div className="architecture-frame">
            <div className="architecture-sun" />
            <div className="architecture-back" />
            <div className="architecture-main">
              <div className="architecture-windows" />
            </div>
            <span className="architecture-r">R</span>
            <div className="architecture-label">
              <small>ROHIT / EDUCATOR</small>
              <strong>Clarity compounds.</strong>
            </div>
          </div>
        </div>

        <div className="hero-lower">
          <p className="hero-deck hero-meta-reveal">
            Rohit turns complex property questions into clear frameworks,
            practical tools, and focused learning—so the next step makes sense.
          </p>
          <div className="hero-ctas hero-meta-reveal">
            <Link className="button button-blue" href="/courses">
              Explore the learning <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
            <Link className="text-link" href="/about">
              Meet Rohit <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>
          <div className="hero-proof hero-meta-reveal">
            <span>01 / 03</span>
            <strong>Decision frameworks</strong>
            <small>Signal over noise</small>
          </div>
        </div>

        <a className="hero-scroll" href="#point-of-view" aria-label="Scroll to the next section">
          <ArrowDown aria-hidden="true" />
        </a>
      </section>

      <section className="point-of-view section-pad" id="point-of-view">
        <div className="pov-index" data-reveal>
          <span>01</span>
          <i />
          <small>THE POINT OF VIEW</small>
        </div>
        <div className="pov-copy" data-reveal>
          <h2>
            Real estate is full of information.
            <em> Very little of it helps you decide.</em>
          </h2>
          <p>
            Listings, opinions, urgency, numbers—each arrives at a different
            speed. Rohit brings them into one deliberate process: frame the
            question, examine the evidence, expose the trade-offs, and decide
            what deserves the next step.
          </p>
        </div>
        <blockquote data-reveal>
          <span>FIELD NOTE / 01</span>
          “Clarity is not certainty. It is knowing what to verify next.”
        </blockquote>
      </section>

      <section className="signal-strip" aria-label="Rohit's learning principles">
        {["STRUCTURED LEARNING", "PRACTICAL FRAMEWORKS", "DOWNLOADABLE TOOLS", "EDUCATION FIRST"].map((item) => (
          <span key={item}>{item}<i>↗</i></span>
        ))}
      </section>

      <section className="product-story" id="courses">
        <div className="product-stage">
          <div className="product-stage-copy">
            <p className="eyebrow eyebrow-light">THE COLLECTION / 001—003</p>
            <h2>Choose the depth<br /><em>you need.</em></h2>
            <p>
              One complete system. One field companion. One rigorous workspace.
              Different formats, the same discipline.
            </p>
            <Link className="text-link text-link-light" href="/courses">
              Compare all resources <ArrowUpRight aria-hidden="true" size={15} />
            </Link>
          </div>

          <div className="product-card-stage" aria-label="Featured learning resources">
            {products.map((product) => (
              <Link
                className="story-product-card"
                href={`/courses/${product.slug}`}
                key={product.slug}
              >
                <CourseCover
                  variant={coverVariant[product.kind]}
                  title={product.shortTitle}
                />
                <span className="story-product-meta">
                  <strong>{product.title}</strong>
                  <small>{product.price.formatted} / preview price</small>
                </span>
              </Link>
            ))}
          </div>
          <div className="product-measure" aria-hidden="true">
            <span className="product-measure-line" />
            <small>DEPTH / FORMAT / USE</small>
          </div>
        </div>
      </section>

      <section className="decision-architecture section-pad" id="method">
        <SectionHeading
          eyebrow="THE DECISION ARCHITECTURE"
          title={<>A property decision<br /><em>has structure.</em></>}
          body="Not a prediction. A process you can inspect, explain, and improve."
        />

        <div className="journey-layout">
          <div className="plan-stage" aria-hidden="true">
            <div className="plan-coordinate">FRAME / READ / INSPECT / COMPARE / DECIDE</div>
            <div className="plan-building">
              {homeJourneyStages.map((stage) => (
                <div className="plan-floor" key={stage.number}>
                  <span>{stage.number}</span>
                  <i />
                </div>
              ))}
            </div>
            <span className="plan-r">R</span>
          </div>

          <div className="journey-steps">
            {homeJourneyStages.map((stage, index) => (
              <article className={`journey-step${index === 0 ? " is-active" : ""}`} key={stage.number}>
                <span>{stage.number}</span>
                <div>
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                </div>
                <MoveDown aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-teaser section-pad" id="about">
        <div className="about-teaser-visual" data-reveal>
          <div className="teaser-portrait">
            <div className="teaser-head" />
            <div className="teaser-body" />
            <span>R</span>
          </div>
          <small>ROHIT / PERSON BEHIND THE PROCESS</small>
        </div>
        <div className="about-teaser-copy" data-reveal>
          <p className="eyebrow">THE PERSON BEHIND THE PROCESS</p>
          <h2>Rohit teaches the part of real estate that rarely fits inside a <em>sales pitch.</em></h2>
          <p>
            How to slow the noise down. How to interrogate an assumption. How to
            recognise what still needs expert verification. And how to make a
            major decision without pretending uncertainty has disappeared.
          </p>
          <Link className="button button-dark" href="/about">
            Know Rohit <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </section>

      <section className="results-teaser section-pad section-orange" id="results">
        <div className="results-title" data-reveal>
          <p className="eyebrow">LEARNER STORIES / PROOF WITH CONTEXT</p>
          <h2>Better questions change the quality of <em>every decision.</em></h2>
        </div>
        <div className="result-process" data-reveal>
          {["Situation", "Process", "Change"].map((label, index) => (
            <div key={label}>
              <span>0{index + 1}</span>
              <strong>{label}</strong>
              <Check aria-hidden="true" size={17} />
            </div>
          ))}
        </div>
        <div className="results-note" data-reveal>
          <p>
            No fictional testimonials. This space is reserved for verified learner
            stories about what became clearer, better organised, or more deliberate.
          </p>
          <Link className="text-link" href="/results">
            See the proof standard <ArrowUpRight aria-hidden="true" size={15} />
          </Link>
        </div>
      </section>

      <section className="home-help section-pad" id="contact">
        <div className="help-heading" data-reveal>
          <p className="eyebrow">FIND YOUR STARTING POINT</p>
          <h2>Ask about<br /><em>the learning.</em></h2>
          <p>
            Compare resources, understand what is included, or route a personal
            question to the right place.
          </p>
        </div>
        <div className="help-placeholder" data-reveal>
          <span>ROHIT DESK / AI-READY</span>
          <p>“Which resource suits a first-time learner?”</p>
          <Link href="/contact">Open Rohit Desk <ArrowUpRight aria-hidden="true" size={16} /></Link>
        </div>
      </section>
    </main>
  );
}
