import type { Metadata } from "next";
import { HomeExperience } from "./HomeExperience";
import { brand } from "./lib/brand";

export const metadata: Metadata = {
  title: {
    absolute: `${brand.name} — Real Estate Leadership, Advisory & Education`,
  },
  description:
    `${brand.name} is ${brand.professionalTitle} at ${brand.organizationName}. Explore Hundred Yards-backed property advisory, practical real-estate learning, and ${brand.mediaLabel}.`,
};

export default function Home() {
  return <HomeExperience />;
}
