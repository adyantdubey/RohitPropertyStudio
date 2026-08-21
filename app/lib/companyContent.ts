export type CompanyService = {
  title: string;
  description: string;
  outcome: string;
};

export type FeaturedProperty = {
  name: string;
  developer: string;
  location: string;
  configuration: string;
  href: string;
  image: string;
};

export type CustomerStory = {
  name: string;
  summary: string;
  context: string;
};

export const companyServices: readonly CompanyService[] = [
  {
    title: "Home buying",
    description:
      "Relevant residential options, site-visit coordination, project comparison, and support from shortlist to registration.",
    outcome: "A home search shaped around your needs, budget, and preferred location.",
  },
  {
    title: "Property investment",
    description:
      "Location intelligence, project context, market analysis, and practical comparisons for residential and plotted opportunities.",
    outcome: "A clearer view of fit, trade-offs, and the questions that still need verification.",
  },
  {
    title: "Seller representation",
    description:
      "Property positioning, buyer conversations, marketing coordination, negotiation, and transaction support.",
    outcome: "A structured route from market entry to a qualified buyer conversation.",
  },
  {
    title: "NRI assistance",
    description:
      "Remote shortlisting, video walkthroughs, local coordination, and support across documentation and registration workflows.",
    outcome: "A Bengaluru-based team when you cannot be present for every step.",
  },
  {
    title: "Commercial property",
    description:
      "Advisory for businesses and investors exploring commercial and income-oriented property opportunities.",
    outcome: "Options considered against use case, location, access, and commercial priorities.",
  },
  {
    title: "Transaction support",
    description:
      "Coordination for home-loan conversations, legal verification, documentation, registration, and after-sales follow-through.",
    outcome: "Fewer disconnected hand-offs between selection and completion.",
  },
] as const;

export const featuredProperties: readonly FeaturedProperty[] = [
  {
    name: "Sattva Vasanta Sky",
    developer: "Sattva Group",
    location: "Devanahalli · Airport Road",
    configuration: "1, 2, 3 & 4 BHK residences",
    href: "https://100yards.in/sattva-vasanta-skye/",
    image: "/media/hero-poster.jpg",
  },
  {
    name: "Rohan Ekanta",
    developer: "Rohan Builders",
    location: "Gunjur · Varthur Road",
    configuration: "1.5, 2 & 3 BHK residences",
    href: "https://100yards.in/rohan-ekanta/",
    image: "/media/interior-daylight.jpg",
  },
  {
    name: "Bengaluru Collection",
    developer: "Hundred Yards curated inventory",
    location: "North, East & South Bengaluru",
    configuration: "Apartments, villas & plotted opportunities",
    href: "https://100yards.in/residential-projects/",
    image: "/media/facade-detail.jpg",
  },
] as const;

export const customerStories: readonly CustomerStory[] = [
  {
    name: "Nithya",
    summary:
      "The team presented multiple options and explained the trade-offs without pressuring the decision.",
    context: "Homebuyer feedback published by Hundred Yards",
  },
  {
    name: "Shree Sharan",
    summary:
      "A more relevant shortlist helped turn a tiring property search into a focused set of options.",
    context: "Property-search feedback published by Hundred Yards",
  },
  {
    name: "Sendil Eswar",
    summary:
      "Support continued from the first site visit through the registration stage.",
    context: "Transaction-support feedback published by Hundred Yards",
  },
  {
    name: "Krishna Guru",
    summary:
      "Detailed videos and virtual walkthroughs made it easier to evaluate projects while living outside Bengaluru.",
    context: "NRI/remote-buyer feedback published by Hundred Yards",
  },
] as const;

export const trustValues = [
  { letter: "T", title: "Transparency", copy: "Clear communication and openness at every stage." },
  { letter: "R", title: "Reliability", copy: "Dependable coordination from the first conversation onward." },
  { letter: "U", title: "Understanding", copy: "Advice shaped around the client’s goals and circumstances." },
  { letter: "S", title: "Service excellence", copy: "Professional expertise, conduct, and accountability." },
  { letter: "T", title: "Timely execution", copy: "Respect for the client’s time and agreed next steps." },
] as const;

export const companySource = {
  label: "First-party information published by Hundred Yards",
  website: "https://100yards.in/",
  about: "https://100yards.in/about-us/",
  properties: "https://100yards.in/residential-projects/",
  gallery: "https://100yards.in/gallery/",
} as const;
