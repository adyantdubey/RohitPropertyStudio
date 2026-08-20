"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 70);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
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
        <Link className="brand" href="/" aria-label="Rohit — home">
          <span className="brand-mark">R</span>
          <span className="brand-copy">
            <strong>ROHIT</strong>
            <small>REAL ESTATE / EDUCATION</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link, index) => (
            <Link
              key={link.href}
              className={isActive(link.href) ? "is-active" : ""}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              <span>0{index + 1}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link className="header-cta" href="/contact">
          Start here <ArrowUpRight aria-hidden="true" size={16} />
        </Link>

        <button
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
        className={`mobile-menu${open ? " is-open" : ""}`}
        id="mobile-menu"
        aria-hidden={!open}
      >
        <div className="mobile-menu-meta">NAVIGATION / ROHIT</div>
        <nav aria-label="Mobile navigation">
          {links.map((link, index) => (
            <Link key={link.href} href={link.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>
              <strong>{link.label}</strong>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
          <Link href="/contact" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
            <span>05</span>
            <strong>Contact</strong>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </nav>
        <p>Property education for clearer thinking.</p>
      </div>
    </>
  );
}
