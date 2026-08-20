import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./site.css";
import "./cinematic.css";
import { MotionProvider } from "./components/MotionProvider";
import { RouteCurtain } from "./components/RouteCurtain";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const socialImage = `${origin}/og-cinematic.png`;

  return {
    title: {
      default: "Rohit — Real Estate Education for Clearer Decisions",
      template: "%s — Rohit",
    },
    description:
      "Clear real-estate frameworks, practical field guides, and decision tools by Rohit.",
    metadataBase: new URL(origin),
    openGraph: {
      type: "website",
      title: "Rohit — Property, Read Clearly.",
      description:
        "Real-estate education for people who would rather understand the decision than follow the noise.",
      images: [{ url: socialImage, width: 1680, height: 941, alt: "Rohit — Property, Read Clearly." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Rohit — Property, Read Clearly.",
      description:
        "Real-estate education for people who would rather understand the decision than follow the noise.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
