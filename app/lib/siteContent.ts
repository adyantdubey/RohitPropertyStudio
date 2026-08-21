export const brand = {
  name: "Rohit Kumar Singh",
  shortName: "Rohit",
  academy: "Rohit Real Estate Academy",
  role: "Managing Director",
  company: "Hundred Yards Realtor Pvt Ltd",
  location: "Bengaluru, India",
  companyUrl: "https://100yards.in/",
  aboutUrl: "https://100yards.in/about-us/",
  phoneDisplay: "+91 99168 66667",
  phoneHref: "tel:+919916866667",
  email: "sales@100yards.in",
  facebook: "https://www.facebook.com/rohitt.kumar.singh.2025?mibextid=wwXIfr",
} as const;

export const course = {
  title: "Basics of Real Estate",
  eyebrow: "Foundational visual course",
  promise: "Learn the language of property before you sell, advise or invest.",
  description:
    "A 49-slide visual foundation created to make property types, approvals, area terminology, charges and payment structures easier to understand.",
  format: "49-slide visual training deck",
  status: "Launch access opening soon",
  cover: "/course/cover.png",
  whatsapp:
    "https://wa.me/919916866667?text=I%20would%20like%20early%20access%20to%20the%20Basics%20of%20Real%20Estate%20course.",
  email:
    "mailto:sales@100yards.in?subject=Basics%20of%20Real%20Estate%20-%20Early%20Access",
} as const;

export const courseModules = [
  {
    number: "01",
    title: "Property fundamentals",
    copy: "Understand the real-estate industry, its purpose and the categories of property people work with every day.",
  },
  {
    number: "02",
    title: "The real-estate ecosystem",
    copy: "See how developers, channel partners, banks, regulators and customers connect across a transaction.",
  },
  {
    number: "03",
    title: "Construction & approvals",
    copy: "Build fluency in construction stages, approval language and the documents that commonly enter a property conversation.",
  },
  {
    number: "04",
    title: "Area, charges & payment",
    copy: "Decode carpet area, built-up area, undivided share, common charges and typical payment-plan structures.",
  },
] as const;

export const courseSlides = [
  {
    src: "/course/types-of-real-estate.png",
    alt: "Course slide introducing the types of real estate",
    label: "Types of real estate",
    slide: 7,
  },
  {
    src: "/course/real-estate-ecosystem.png",
    alt: "Course slide mapping the real-estate ecosystem",
    label: "The real-estate ecosystem",
    slide: 29,
  },
  {
    src: "/course/area-terminology.png",
    alt: "Course slide explaining area terminology",
    label: "Area terminology",
    slide: 31,
  },
  {
    src: "/course/common-charges.png",
    alt: "Course slide explaining common property charges",
    label: "Common charges",
    slide: 36,
  },
  {
    src: "/course/undivided-share.png",
    alt: "Course slide explaining undivided share",
    label: "Undivided share",
    slide: 42,
  },
  {
    src: "/course/payment-plan.png",
    alt: "Course slide explaining a construction-linked payment plan",
    label: "Payment plans",
    slide: 45,
  },
] as const;

export const audiences = [
  "Aspiring real-estate professionals who need a clear starting point",
  "New sales and advisory teams building consistent property vocabulary",
  "Buyers and investors who want to understand the terms used around them",
] as const;

export const clientFeedback = [
  {
    name: "Nithya",
    quote:
      "The team shared several options without pressure and explained the advantages and trade-offs clearly.",
  },
  {
    name: "Sendil Eswar",
    quote:
      "Support continued from the first site visit through the registration stage, making the process easier to navigate.",
  },
  {
    name: "Darsini",
    quote:
      "As a first-time buyer, the simple explanations helped make unfamiliar property decisions feel more manageable.",
  },
] as const;

export const faqs = [
  {
    question: "What does the course cover?",
    answer:
      "The current 49-slide foundation covers property categories, the industry ecosystem, construction and approval language, area terminology, charges, undivided share and payment-plan basics.",
  },
  {
    question: "Who is this for?",
    answer:
      "It is designed for aspiring professionals, new property sales or advisory teams, and buyers or investors who want a structured introduction to real-estate terminology.",
  },
  {
    question: "What format will I receive?",
    answer:
      "The core resource is a visual training deck. Final delivery format, access duration and any supporting material will be confirmed before launch.",
  },
  {
    question: "Is certification included?",
    answer:
      "No certification has been announced. The course is positioned as a practical learning foundation, not a professional licence or statutory qualification.",
  },
  {
    question: "Can I buy it today?",
    answer:
      "Not yet. Payment is not live and no money is collected on this website. Join early access to receive the launch details when the course is ready.",
  },
] as const;

export const navigation = [
  { label: "Course", href: "/#course" },
  { label: "Preview", href: "/#inside-course" },
  { label: "Instructor", href: "/#instructor" },
  { label: "Reviews", href: "/#reviews" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: brand.name,
  jobTitle: brand.role,
  worksFor: {
    "@type": "Organization",
    name: brand.company,
    url: brand.companyUrl,
  },
  image: "/media/rohit-kumar-singh.jpg",
  url: "/about",
  sameAs: [brand.facebook, brand.aboutUrl],
};

export const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: course.title,
  description: course.description,
  provider: {
    "@type": "Person",
    name: brand.name,
  },
  educationalLevel: "Beginner",
  inLanguage: "English",
};
