import type { Metadata } from "next";
import { headers } from "next/headers";
import { Manrope, Playfair_Display } from "next/font/google";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/home.css";
import "./styles/pages.css";
import { EventTracker } from "./components/EventTracker";
import { MotionLayer } from "./components/MotionLayer";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { StickyCta } from "./components/StickyCta";
import { brand, course, courseJsonLd, personJsonLd } from "./lib/siteContent";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return {
    title: { default: `${course.title} — ${brand.name}`, template: `%s — ${brand.name}` },
    description: course.description,
    metadataBase: new URL(origin),
    openGraph: {
      type: "website",
      title: `${course.title} — ${brand.name}`,
      description: course.description,
      siteName: brand.academy,
      url: origin,
      images: [{ url: "/brand/og.png", width: 1200, height: 630, alt: `${course.title} — ${brand.name}` }],
    },
    twitter: { card: "summary_large_image", title: `${course.title} — ${brand.name}`, description: course.description, images: ["/brand/og.png"] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = JSON.stringify([personJsonLd, courseJsonLd]).replace(/</g, "\\u003c");
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${playfair.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <MotionLayer />
        <EventTracker />
        <SiteHeader />
        {children}
        <SiteFooter />
        <StickyCta />
      </body>
    </html>
  );
}
