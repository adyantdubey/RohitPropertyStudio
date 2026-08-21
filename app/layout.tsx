import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist_Mono, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./site.css";
import "./cinematic.css";
import "./authority.css";
import { MotionProvider } from "./components/MotionProvider";
import { RouteCurtain } from "./components/RouteCurtain";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { brand, organizationJsonLd, personJsonLd } from "./lib/brand";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const socialImage = `${origin}/og-cinematic.png`;

  return {
    title: {
      default: `${brand.name} — ${brand.line}`,
      template: `%s — ${brand.name}`,
    },
    description:
      `${brand.name}, ${brand.professionalTitle} of ${brand.organizationName}, shares real-estate education, advisory perspectives, and market insights.`,
    metadataBase: new URL(origin),
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      title: `${brand.name} — ${brand.line}`,
      description:
        `${brand.educationLabel}: clear real-estate thinking for more considered property decisions.`,
      siteName: brand.name,
      url: origin,
      images: [{ url: socialImage, width: 1680, height: 941, alt: `${brand.name} — ${brand.line}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${brand.name} — ${brand.line}`,
      description:
        `${brand.educationLabel}: clear real-estate thinking for more considered property decisions.`,
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = JSON.stringify([personJsonLd, organizationJsonLd]).replace(
    /</g,
    "\\u003c",
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        <script
          id="rks-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
        <MotionProvider>
          <RouteCurtain>
            <SiteHeader />
            {children}
            <SiteFooter />
          </RouteCurtain>
        </MotionProvider>
      </body>
    </html>
  );
}
