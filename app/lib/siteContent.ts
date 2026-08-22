export const brand = {
  name: "Rohitt Kumar Singh",
  shortName: "Rohitt",
  academy: "Rohitt Real Estate Academy",
  role: "Managing Director",
  company: "Hundred Yards Realtor Pvt Ltd",
  location: "Bengaluru, India",
  companyUrl: "https://100yards.in/",
  aboutUrl: "https://100yards.in/about-us/",
  galleryUrl: "https://100yards.in/gallery/",
  phoneDisplay: "+91 99168 66667",
  phoneHref: "tel:+919916866667",
  email: "sales@100yards.in",
  facebook: "https://www.facebook.com/rohitt.kumar.singh.2025?mibextid=wwXIfr",
  youtube: "https://www.youtube.com/@RealtorRohitSingh",
} as const;

export const course = {
  title: "Basics of Real Estate",
  eyebrow: "Foundational visual course",
  promise: "Learn the language of property before you sell, advise or invest.",
  description:
    "A 49-slide visual foundation created to make property types, approvals, area terminology, charges and payment structures easier to understand.",
  format: "49-slide visual training deck",
  level: "Foundational",
  status: "Launch access opening soon",
  cover: "/course/cover.png",
  whatsapp:
    "https://wa.me/919916866667?text=I%20would%20like%20early%20access%20to%20the%20Basics%20of%20Real%20Estate%20course.",
  email:
    "mailto:sales@100yards.in?subject=Basics%20of%20Real%20Estate%20-%20Early%20Access",
} as const;

/**
 * Cinematic media. The hero renders a generated skyline canvas on its own; a video
 * file, when one exists, simply layers on top of it.
 *
 * To switch the hero video on: drop the encoded file at public/video/hero.mp4 and
 * change heroVideo below to "/video/hero.mp4". Nothing else needs to change.
 * Keep it under 2.5 MB. See public/video/README.md for the shopping list.
 */
export const media = {
  heroVideo: "/video/hero.mp4",
  heroPoster: "/brand/hero-poster.jpg",
} as const;

export const verifiedStats = [
  { value: 49, suffix: "", label: "Original course slides", source: "Course file" },
  { value: 4, suffix: "", label: "Structured learning chapters", source: "Course curriculum" },
  { value: 6, suffix: "", label: "Full-size preview slides", source: "Live course preview" },
  { value: 10, suffix: "+", label: "Years in real estate", source: "Official biography" },
] as const;

export const courseModules = [
  {
    number: "01",
    title: "Property fundamentals",
    copy: "Understand the real-estate industry, its purpose and the categories of property people work with every day.",
    outcome: "Recognise the major property categories and the language used to describe them.",
  },
  {
    number: "02",
    title: "The real-estate ecosystem",
    copy: "See how developers, channel partners, banks, regulators and customers connect across a transaction.",
    outcome: "Map the roles that come together across a typical property conversation.",
  },
  {
    number: "03",
    title: "Construction & approvals",
    copy: "Build fluency in construction stages, approval language and the documents that commonly enter a property conversation.",
    outcome: "Ask clearer questions when stages, approvals and documents are discussed.",
  },
  {
    number: "04",
    title: "Area, charges & payment",
    copy: "Decode carpet area, built-up area, undivided share, common charges and typical payment-plan structures.",
    outcome: "Compare common area, cost and payment terms without treating them as interchangeable.",
  },
] as const;

export const courseSlides = [
  { src: "/course/types-of-real-estate.png", alt: "Course slide introducing the types of real estate", label: "Types of real estate", slide: 7 },
  { src: "/course/real-estate-ecosystem.png", alt: "Course slide mapping the real-estate ecosystem", label: "The real-estate ecosystem", slide: 29 },
  { src: "/course/area-terminology.png", alt: "Course slide explaining area terminology", label: "Area terminology", slide: 31 },
  { src: "/course/common-charges.png", alt: "Course slide explaining common property charges", label: "Common charges", slide: 36 },
  { src: "/course/undivided-share.png", alt: "Course slide explaining undivided share", label: "Undivided share", slide: 42 },
  { src: "/course/payment-plan.png", alt: "Course slide explaining a construction-linked payment plan", label: "Payment plans", slide: 45 },
] as const;

export const learningOutcomes = [
  { number: "01", title: "Read the vocabulary", copy: "Build a working foundation for the terms that appear across projects, brochures and property conversations." },
  { number: "02", title: "Connect the participants", copy: "Understand why developers, banks, regulators, channel partners and customers enter the process at different stages." },
  { number: "03", title: "Compare with context", copy: "Separate similar-sounding area, charge and payment terms before making a comparison." },
  { number: "04", title: "Ask stronger questions", copy: "Use the course as a starting framework for better conversations—not as a replacement for current professional verification." },
] as const;

export const audiences = [
  "Aspiring real-estate professionals who need a clear starting point",
  "New sales and advisory teams building consistent property vocabulary",
  "Buyers and investors who want to understand the terms used around them",
] as const;

export const courseBoundaries = [
  "The course is a foundational learning resource, not a professional licence or certification.",
  "It does not verify a particular project, document, price, return or legal position.",
  "Final price, delivery format and access terms will be shown before any payment is accepted.",
] as const;

export const clientFeedback = [
  { name: "Nithya", theme: "Choices without pressure", quote: "The team shared several options without pressure and explained the advantages and trade-offs clearly." },
  { name: "Sendil Eswar", theme: "Continuity through the process", quote: "Support continued from the first site visit through the registration stage, making the process easier to navigate." },
  { name: "Darsini", theme: "Clarity for a first-time buyer", quote: "As a first-time buyer, the simple explanations helped make unfamiliar property decisions feel more manageable." },
] as const;

export const academyResources = [
  { number: "01", title: "Property glossary", description: "A plain-language index of the terms that appear across the course and common property conversations.", href: "/resources#glossary", type: "Reference" },
  { number: "02", title: "Area terminology visualizer", description: "Adjust an example apartment and see how carpet, built-up and saleable area relate without confusing the labels.", href: "/resources#area-visualizer", type: "Interactive tool" },
  { number: "03", title: "Payment-plan explorer", description: "Move through an illustrative construction-linked schedule and understand how milestone-based percentages accumulate.", href: "/resources#payment-plan", type: "Interactive tool" },
  { number: "04", title: "Site-visit questions", description: "A focused checklist of questions to carry into a project conversation before seeking project-specific advice.", href: "/resources#site-visit", type: "Checklist" },
] as const;

export const glossaryTerms = [
  { term: "Carpet area", definition: "The usable floor area inside an apartment, measured within the internal walls under the applicable definition." },
  { term: "Built-up area", definition: "A broader area measure that commonly adds wall thickness and certain attached spaces to the carpet area." },
  { term: "Saleable area", definition: "A marketing or allocation measure that may include a proportionate share of common spaces. The exact basis must be checked for the project." },
  { term: "Loading", definition: "The difference between carpet area and a broader quoted area, commonly expressed as a percentage. Definitions vary, so compare the calculation basis." },
  { term: "Undivided share", definition: "A buyer's proportionate share in the land associated with a property, subject to the governing documents and local law." },
  { term: "RERA", definition: "The regulatory framework and state authorities established under India's Real Estate (Regulation and Development) Act, 2016." },
  { term: "Occupancy certificate", definition: "A certificate issued by the relevant authority concerning occupation after applicable completion requirements are met." },
  { term: "Completion certificate", definition: "A document associated with completion against sanctioned requirements. Its issuing authority and scope depend on the jurisdiction." },
  { term: "Encumbrance certificate", definition: "A record used to review certain registered transactions or encumbrances over a stated period; it is not a complete substitute for legal due diligence." },
  { term: "Booking amount", definition: "An initial amount associated with reserving a unit, governed by the written booking and cancellation terms." },
  { term: "Construction-linked plan", definition: "A schedule in which payment instalments become due at stated construction milestones." },
  { term: "Possession", definition: "The stage at which possession is offered or handed over under the applicable agreement and project documentation." },
] as const;

export const siteVisitQuestions = [
  "Which project documents and approvals are currently available for review?",
  "Which area definition is used in the quoted price, and how is it calculated?",
  "Which charges are included, excluded or payable later?",
  "What construction milestone or date is the payment schedule tied to?",
  "What does the written cancellation and refund clause say?",
  "Who should independently verify the legal, financial and technical details?",
] as const;

export const profileTimeline = [
  { marker: "Foundation", title: "Engineering-led analytical thinking", copy: "Rohitt's Electronics & Communication engineering background informs a structured approach to unfamiliar systems and terminology." },
  { marker: "Experience", title: "Over a decade in real estate", copy: "His official Hundred Yards biography describes more than ten years of market experience and customer-facing leadership." },
  { marker: "Leadership", title: "Managing Director, Hundred Yards", copy: "Rohitt leads Hundred Yards Realtor Pvt Ltd with a stated focus on transparency, customer context and technology-enabled service." },
  { marker: "Academy", title: "Field experience turned into visual learning", copy: "The academy begins with one focused course: a practical foundation for people who need to understand the language before going deeper." },
] as const;

export const teachingPrinciples = [
  { title: "Context before jargon", copy: "Start with why a term appears, then define how it is commonly used." },
  { title: "Visual before abstract", copy: "Use diagrams, relationships and examples so learners can see how the pieces connect." },
  { title: "Questions before assumptions", copy: "Treat foundational knowledge as a prompt for stronger verification, not as transaction-specific advice." },
] as const;

export const faqs = [
  { question: "What does the course cover?", answer: "The current 49-slide foundation covers property categories, the industry ecosystem, construction and approval language, area terminology, charges, undivided share and payment-plan basics." },
  { question: "Who is this for?", answer: "It is designed for aspiring professionals, new property sales or advisory teams, and buyers or investors who want a structured introduction to real-estate terminology." },
  { question: "What format will I receive?", answer: "The core resource is a visual training deck. Final delivery format, access duration and any supporting material will be confirmed before launch." },
  { question: "Is certification included?", answer: "No certification has been announced. The course is positioned as a practical learning foundation, not a professional licence or statutory qualification." },
  { question: "Can I buy it today?", answer: "Not yet. Payment is not live and no money is collected on this website. Join early access to receive the launch details when the course is ready." },
] as const;

export const navigation = [
  { label: "Course", href: "/course" },
  { label: "Property Lab", href: "/lab" },
  { label: "About Rohitt", href: "/about" },
  { label: "Client Stories", href: "/stories" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
] as const;

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: brand.name,
  jobTitle: brand.role,
  worksFor: { "@type": "Organization", name: brand.company, url: brand.companyUrl },
  image: "/media/rohit-kumar-singh.jpg",
  url: "/about",
  sameAs: [brand.facebook, brand.youtube, brand.aboutUrl],
};

export const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: course.title,
  description: course.description,
  provider: { "@type": "Person", name: brand.name },
  educationalLevel: "Beginner",
  inLanguage: "English",
};
