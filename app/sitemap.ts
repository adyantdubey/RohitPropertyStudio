import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { products } from "./lib/content";
import { marketInsights } from "./lib/marketInsights";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const base = `${protocol}://${host}`;
  const routes = [
    "",
    "/about",
    "/advisory",
    "/courses",
    "/insights",
    "/media",
    "/results",
    "/contact",
    "/privacy",
    "/terms",
    "/refund",
    "/disclaimer",
  ];
  return [
    ...routes.map((route) => ({ url: `${base}${route}`, changeFrequency: "monthly" as const, priority: route === "" ? 1 : 0.7 })),
    ...products.map((product) => ({ url: `${base}/courses/${product.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...marketInsights.map((insight) => ({ url: `${base}/insights/${insight.slug}`, changeFrequency: "monthly" as const, priority: 0.75 })),
  ];
}
