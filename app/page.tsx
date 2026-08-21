import type { Metadata } from "next";
import { HomeExperience } from "./HomeExperience";
import { brand } from "./lib/brand";

export const metadata: Metadata = {
  title: {
    absolute: `${brand.name} — Real Estate Leadership, Advisory & Education`,
  },
  description:
    `Find residential and investment opportunities with Hundred Yards, meet ${brand.name}, explore Bengaluru property insights, and join the ${brand.educationLabel} launch list.`,
};

export default function Home() {
  return <HomeExperience />;
}
