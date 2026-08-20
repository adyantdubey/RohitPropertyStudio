"use client";

import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TransitionLink } from "./RouteCurtain";

const links = [
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/results", label: "Results" },
  { href: "/insights", label: "Insights" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 70);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 861px)");
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    desktopQuery.addEventListener("change", closeAtDesktop);
    return () => desktopQuery.removeEventListener("change", closeAtDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;

    const menu = menuRef.current;
    const trigger = menuButtonRef.current;
    if (!menu || !trigger) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : trigger;
    const previousOverflow = document.body.style.overflow;
    const inertTargets = [
      document.querySelector<HTMLElement>("main"),
      document.querySelector<HTMLElement>(".site-footer"),
      document.querySelector<HTMLElement>(".brand"),
      document.querySelector<HTMLElement>(".header-cta"),
      document.querySelector<HTMLElement>(".desktop-nav"),
    ].filter((target): target is HTMLElement => Boolean(target));
    const priorInert = inertTargets.map((target) =>
      target.hasAttribute("inert"),
    );

    document.body.style.overflow = "hidden";
    inertTargets.forEach((target) => target.setAttribute("inert", ""));

    const getFocusable = () => [
      trigger,
      ...Array.from(
        menu.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ),
    ];

    const focusFrame = window.requestAnimationFrame(() => {
      getFocusable()[1]?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = getFocusable();
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (!focusable.includes(document.activeElement as HTMLElement)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      inertTargets.forEach((target, index) => {
        if (!priorInert[index]) target.removeAttribute("inert");
      });
      if (document.contains(previouslyFocused)) previouslyFocused.focus();
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className={`site-header${compact ? " is-compact" : ""}`}>
        <TransitionLink className="brand" href="/" aria-label="Rohit — home">
          <span className="brand-mark">R</span>
          <span className="brand-copy">
            <strong>ROHIT</strong>
            <small>REAL ESTATE / EDUCATION</small>
          </span>
        </TransitionLink>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link, index) => (
            <TransitionLink
              key={link.href}
              className={isActive(link.href) ? "is-active" : ""}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              <span>0{index + 1}</span>
              {link.label}
            </TransitionLink>
          ))}
        </nav>

        <TransitionLink className="header-cta" href="/contact">
          Start here <ArrowUpRight aria-hidden="true" size={16} />
        </TransitionLink>

        <button
          ref={menuButtonRef}
          className="menu-button"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </header>

      <div
        ref={menuRef}
        className={`mobile-menu${open ? " is-open" : ""}`}
        id="mobile-menu"
        aria-hidden={!open}
        aria-label="Site navigation"
        role="region"
      >
        <div className="mobile-menu-meta">NAVIGATION / ROHIT</div>
        <nav aria-label="Mobile navigation">
          {links.map((link, index) => (
            <TransitionLink
              aria-current={isActive(link.href) ? "page" : undefined}
              key={link.href}
              href={link.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              <span>0{index + 1}</span>
              <strong>{link.label}</strong>
              <ArrowUpRight aria-hidden="true" />
            </TransitionLink>
          ))}
          <TransitionLink
            aria-current={isActive("/contact") ? "page" : undefined}
            href="/contact"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            <span>05</span>
            <strong>Contact</strong>
            <ArrowUpRight aria-hidden="true" />
          </TransitionLink>
        </nav>
        <p>Property education for clearer thinking.</p>
      </div>
    </>
  );
}
