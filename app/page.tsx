import type { Metadata } from "next";
import { HomeExperience } from "./HomeExperience";

export const metadata: Metadata = {
  title: { absolute: "Rohit — Real Estate Education for Clearer Decisions" },
  description:
    "Explore Rohit's real-estate courses, field guides, and practical decision tools.",
};

export default function Home() {
  return <HomeExperience />;
}
