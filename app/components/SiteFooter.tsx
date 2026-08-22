import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { brand, course, navigation } from "../lib/siteContent";

/**
 * The closing CTA section already asks for the signup, so the footer does not
 * repeat it. It carries the direct channels instead, which is what someone
 * scrolling this far actually wants.
 */
export function SiteFooter() {
  return (
    <footer className="site-footer surface-deep">
      <div className="site-footer__main shell">
        <div data-reveal>
          <p className="eyebrow">Rohitt Real Estate Academy</p>
          <h2>Foundational property literacy,<br />taught from the field.</h2>
        </div>
        <div className="site-footer__channels" data-reveal data-reveal-delay="1">
          <a href={course.whatsapp} target="_blank" rel="noreferrer" data-track="whatsapp_clicked">
            <MessageCircle size={16} aria-hidden="true" /> WhatsApp <strong>{brand.phoneDisplay}</strong>
          </a>
          <a href={`mailto:${brand.email}`}>
            <Mail size={16} aria-hidden="true" /> Email <strong>{brand.email}</strong>
          </a>
          <a href={brand.phoneHref}>
            <Phone size={16} aria-hidden="true" /> Call <strong>{brand.phoneDisplay}</strong>
          </a>
          <a className="text-link" href={brand.companyUrl} target="_blank" rel="noreferrer" data-track="hundred_yards_clicked">
            Visit Hundred Yards <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>

      <nav className="site-footer__nav shell" aria-label="Footer">
        {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
      </nav>

      <div className="site-footer__bottom shell">
        <p>© {new Date().getFullYear()} {brand.name} · {brand.company} · {brand.location}</p>
        <nav aria-label="Legal">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/refund">Refund status</a>
          <a href="/disclaimer">Disclaimer</a>
        </nav>
      </div>
    </footer>
  );
}
