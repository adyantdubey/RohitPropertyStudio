/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { brand, course, navigation } from "../lib/siteContent";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.classList.add("menu-open");
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <header className="site-header">
      <a className="site-brand" href="/" aria-label={`${brand.name}, home`}>
        <span className="site-brand__mark" aria-hidden="true">RK</span>
        <span>
          <strong>{brand.name}</strong>
          <small>Real Estate Academy</small>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <a key={item.href} href={item.href}>{item.label}</a>
        ))}
      </nav>

      <a className="button button--gold header-cta" href={course.whatsapp} target="_blank" rel="noreferrer">
        Join early access <ArrowUpRight size={16} aria-hidden="true" />
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      <div id="mobile-navigation" className={`mobile-navigation${open ? " is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
          <a href="/about" onClick={() => setOpen(false)}>About Rohit</a>
          <a href="/contact" onClick={() => setOpen(false)}>Contact</a>
        </nav>
        <a className="button button--gold" href={course.whatsapp} target="_blank" rel="noreferrer">
          Join early access <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
