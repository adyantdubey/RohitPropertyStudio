import type { Metadata } from "next";
import { headers } from "next/headers";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./course-site.css";
import { MotionLayer } from "./components/MotionLayer";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
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
    alternates: { canonical: "/" },
    openGraph: { type: "website", title: `${course.title} — ${brand.name}`, description: course.description, siteName: brand.academy, url: origin, images: [{ url: "/course/cover.png", width: 1600, height: 900, alt: `${course.title} course preview` }] },
    twitter: { card: "summary_large_image", title: `${course.title} — ${brand.name}`, description: course.description, images: ["/course/cover.png"] },
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
        <SiteHeader />
        {children}
        <SiteFooter />
        <a className="mobile-cta" href={course.whatsapp} target="_blank" rel="noreferrer">Join early access</a>
      </body>
    </html>
  );
}
