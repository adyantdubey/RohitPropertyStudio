/**
 * Shared editorial content for the Rohit website.
 *
 * PLACEHOLDER DATA: prices, access terms, formats, and product details must be
 * reviewed and replaced with Rohit's approved commercial copy before launch.
 */

export type ContentStatus = "placeholder";
export type ProductKind = "course" | "pdf" | "toolkit";

export interface ContentMeta {
  status: ContentStatus;
  isPlaceholder: true;
  notice: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface JourneyStage {
  number: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Insight {
  slug: string;
  title: string;
  category: "Decision strategy" | "Due diligence" | "Field notes" | "Learning";
  summary: string;
  readTime: string;
  status: ContentStatus;
}

export interface ProductPrice {
  amount: number;
  currency: "INR";
  formatted: string;
  isPlaceholder: true;
}

export interface ProductSection {
  number: string;
  title: string;
  description: string;
}

export interface Product {
  slug: string;
  kind: ProductKind;
  featured: boolean;
  status: ContentStatus;
  isPlaceholder: true;
  eyebrow: string;
  title: string;
  subtitle?: string;
  shortTitle: string;
  tagline: string;
  description: string;
  price: ProductPrice;
  level: string;
  format: string;
  access: string;
  delivery: string;
  primaryCta: string;
  secondaryCta: string;
  idealFor: readonly string[];
  notFor: readonly string[];
  outcomes: readonly string[];
  includes: readonly string[];
  sections: readonly ProductSection[];
  disclaimer: string;
}

export const contentMeta = {
  status: "placeholder",
  isPlaceholder: true,
  notice:
    "Editorial and commercial placeholder data. Review prices, access terms, formats, and policies before launch.",
} as const satisfies ContentMeta;

export const navigation = [
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Results", href: "#results" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
] as const satisfies readonly NavigationItem[];

export const homeJourneyStages = [
  {
    number: "01",
    title: "Frame",
    description:
      "Define the objective, constraints, and non-negotiables before evaluating options.",
  },
  {
    number: "02",
    title: "Read",
    description:
      "Separate useful market context from urgency, opinion, and surface-level signals.",
  },
  {
    number: "03",
    title: "Inspect",
    description:
      "Collect the documents, observations, questions, and professional inputs the decision requires.",
  },
  {
    number: "04",
    title: "Compare",
    description:
      "Place unlike options inside the same reviewable frame and make the trade-offs visible.",
  },
  {
    number: "05",
    title: "Decide",
    description:
      "Document the reasoning, unresolved risks, and the most responsible next step.",
  },
] as const satisfies readonly JourneyStage[];

export const faqs = [
  {
    question: "Which resource should I begin with?",
    answer:
      "Choose The Property Decision System for guided, end-to-end learning; Before You Buy for a focused diligence reference; or The Deal Room when you understand the fundamentals and need an organised review toolkit.",
  },
  {
    question: "Are these resources financial or investment advice?",
    answer:
      "No. Every resource is educational and general in nature. Property decisions require independent verification and, where appropriate, qualified legal, tax, financial, valuation, and technical advice.",
  },
  {
    question: "How will I receive a digital product?",
    answer:
      "After confirmed payment, access instructions will appear on screen and be sent to the email address used at checkout.",
  },
  {
    question: "Can Rohit review a specific property for me?",
    answer:
      "Use the contact form to describe what you need. Availability, scope, and any applicable professional boundaries will be confirmed before an engagement is discussed.",
  },
  {
    question: "How long does course access last?",
    answer:
      "Course-access terms shown on this preview are placeholders. The confirmed access period will be displayed clearly on the product and checkout pages before purchase.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "Refund eligibility depends on the product and whether digital access has begun. The approved policy will be shown on each product page and again before payment.",
  },
] as const satisfies readonly FaqItem[];

export const insights = [
  {
    slug: "the-viewing-is-not-the-decision",
    title: "The Viewing Is Not the Decision",
    category: "Field notes",
    summary:
      "How to leave a property visit with useful observations instead of a persuasive but vague impression.",
    readTime: "5 min read",
    status: "placeholder",
  },
  {
    slug: "compare-unlike-properties",
    title: "A Cleaner Way to Compare Unlike Properties",
    category: "Decision strategy",
    summary:
      "Why one universal score can conceal the trade-offs that actually matter to the decision.",
    readTime: "7 min read",
    status: "placeholder",
  },
  {
    slug: "build-a-red-flag-register",
    title: "Build a Red-Flag Register, Not a Red-Flag Panic",
    category: "Due diligence",
    summary:
      "A practical method for recording concerns, supporting evidence, owners, and the next action.",
    readTime: "6 min read",
    status: "placeholder",
  },
  {
    slug: "before-you-ask-the-price",
    title: "What to Ask Before You Ask the Price",
    category: "Decision strategy",
    summary:
      "The context that gives a number meaning—and the questions that should precede comparison.",
    readTime: "4 min read",
    status: "placeholder",
  },
  {
    slug: "your-shortlist-is-a-hypothesis",
    title: "Your Shortlist Is a Hypothesis",
    category: "Learning",
    summary:
      "Treat early preferences as ideas to test rather than conclusions to defend.",
    readTime: "5 min read",
    status: "placeholder",
  },
] as const satisfies readonly Insight[];

export const products = [
  {
    slug: "property-decision-system",
    kind: "course",
    featured: true,
    status: "placeholder",
    isPlaceholder: true,
    eyebrow: "THE FLAGSHIP COURSE",
    title: "The Property Decision System",
    shortTitle: "Decision System",
    tagline: "A structured way to move from first interest to an informed next step.",
    description:
      "A guided learning experience for people who want to understand how a property decision is framed, researched, compared, documented, and escalated to the right professionals.",
    price: {
      amount: 4900,
      currency: "INR",
      formatted: "₹4,900",
      isPlaceholder: true,
    },
    level: "Foundation to intermediate",
    format: "Self-paced video course + workbook",
    access: "Placeholder: 12 months of course access",
    delivery: "Online access after confirmed payment",
    primaryCta: "Enter the Course",
    secondaryCta: "View the Curriculum",
    idealFor: [
      "First-time learners who need an end-to-end mental model",
      "Buyers or investors who want a more organised evaluation process",
      "Professionals who want a consistent way to document questions and trade-offs",
    ],
    notFor: [
      "Anyone seeking guaranteed returns or property recommendations",
      "Anyone looking for a substitute for qualified professional advice",
      "Anyone expecting the course to approve or reject a specific transaction",
    ],
    outcomes: [
      "Define an objective and explicit decision criteria",
      "Read market information with attention to source and context",
      "Build a structured first-pass property review",
      "Recognise when specialist verification is required",
      "Compare options and document unresolved risks",
      "Create a concise decision memo for the next step",
    ],
    includes: [
      "Six structured learning modules",
      "Course workbook",
      "Decision criteria canvas",
      "Property review worksheet",
      "Risk and questions register",
      "Decision memo template",
    ],
    sections: [
      {
        number: "01",
        title: "Frame the Decision",
        description:
          "Objectives, constraints, criteria, and the questions that belong at the beginning.",
      },
      {
        number: "02",
        title: "Read the Context",
        description:
          "Market signals, sources, local context, and the difference between information and interpretation.",
      },
      {
        number: "03",
        title: "Screen the Property",
        description:
          "A consistent first review of fit, condition, documentation, numbers, and open questions.",
      },
      {
        number: "04",
        title: "Build the Diligence Map",
        description:
          "What to collect, what to observe, what to verify, and which professional may need to verify it.",
      },
      {
        number: "05",
        title: "Compare the Trade-offs",
        description:
          "A disciplined comparison of options, assumptions, risks, and opportunity costs.",
      },
      {
        number: "06",
        title: "Prepare the Next Step",
        description:
          "Decision records, escalation questions, and a responsible path forward.",
      },
    ],
    disclaimer:
      "Educational content only. This course does not provide property-specific financial, investment, legal, tax, technical, or valuation advice.",
  },
  {
    slug: "before-you-buy-field-guide",
    kind: "pdf",
    featured: false,
    status: "placeholder",
    isPlaceholder: true,
    eyebrow: "THE FIELD GUIDE",
    title: "Before You Buy",
    subtitle: "The Property Due Diligence Field Guide",
    shortTitle: "Before You Buy",
    tagline: "The questions to ask before enthusiasm outruns evidence.",
    description:
      "A concise, portable reference for organising the questions, records, observations, and professional checks that may matter during a property review.",
    price: {
      amount: 799,
      currency: "INR",
      formatted: "₹799",
      isPlaceholder: true,
    },
    level: "All levels",
    format: "Digital PDF field guide",
    access: "Placeholder: personal-use digital licence",
    delivery: "Instant download after confirmed payment",
    primaryCta: "Get the Field Guide",
    secondaryCta: "Preview Sample Pages",
    idealFor: [
      "Learners preparing for a property visit or document review",
      "People who want a concise companion rather than a full course",
      "Anyone organising questions before consulting professionals",
    ],
    notFor: [
      "Anyone seeking an automated approval or rejection of a property",
      "Anyone using a checklist as a replacement for professional diligence",
      "Anyone expecting a property valuation or return forecast",
    ],
    outcomes: [
      "Prepare a clearer property-visit agenda",
      "Organise documents and unresolved questions",
      "Record observations without confusing them with conclusions",
      "Prepare focused questions for qualified professionals",
    ],
    includes: [
      "Field-ready question lists",
      "Document-request prompts",
      "Visit-note pages",
      "Red-flag register",
      "Professional consultation checklist",
      "Printable decision summary",
    ],
    sections: [
      {
        number: "01",
        title: "Start with the Objective",
        description: "Set the purpose, constraints, and questions before the review begins.",
      },
      {
        number: "02",
        title: "Read the Context",
        description: "Capture location, access, surroundings, and sources that need verification.",
      },
      {
        number: "03",
        title: "Build the Document Request",
        description: "Organise what has been supplied, what is missing, and who should review it.",
      },
      {
        number: "04",
        title: "Observe the Property",
        description: "Record what you see, what you were told, and what remains an assumption.",
      },
      {
        number: "05",
        title: "Register the Risks",
        description: "Turn vague concerns into named questions, evidence needs, and next actions.",
      },
      {
        number: "06",
        title: "Write the Summary",
        description: "Bring the open questions and professional checks into one concise record.",
      },
    ],
    disclaimer:
      "This guide helps organise diligence; it does not complete legal, technical, tax, valuation, financial, or property-specific diligence for the reader.",
  },
  {
    slug: "deal-room-toolkit",
    kind: "toolkit",
    featured: false,
    status: "placeholder",
    isPlaceholder: true,
    eyebrow: "THE REVIEW TOOLKIT",
    title: "The Deal Room",
    subtitle: "A Property Review Toolkit",
    shortTitle: "The Deal Room",
    tagline: "Turn scattered listings, calls, notes, and assumptions into one reviewable record.",
    description:
      "A practical set of templates for people who understand the fundamentals and want a repeatable workspace for comparing properties and documenting open questions.",
    price: {
      amount: 1499,
      currency: "INR",
      formatted: "₹1,499",
      isPlaceholder: true,
    },
    level: "Intermediate",
    format: "Downloadable workbook + PDF templates",
    access: "Placeholder: personal-use digital licence",
    delivery: "Instant download after confirmed payment",
    primaryCta: "Open the Deal Room",
    secondaryCta: "See What Is Included",
    idealFor: [
      "Learners actively comparing more than one option",
      "People who want a reusable property-review workspace",
      "Teams or families who need a common record of assumptions and questions",
    ],
    notFor: [
      "Anyone seeking automated property recommendations",
      "Anyone expecting a valuation or return guarantee",
      "Anyone using templates as a substitute for specialist review",
    ],
    outcomes: [
      "Bring each property into the same review structure",
      "Make assumptions and missing evidence visible",
      "Compare trade-offs without collapsing them into one opaque score",
      "Maintain a clear record of questions, owners, and next actions",
    ],
    includes: [
      "Decision criteria canvas",
      "Property comparison matrix",
      "Assumptions register",
      "Viewing and call notes",
      "Document tracker",
      "Risk and red-flag log",
      "Professional question sheet",
      "Decision memo template",
    ],
    sections: [
      {
        number: "01",
        title: "Criteria Canvas",
        description: "Define what matters, why it matters, and which criteria are non-negotiable.",
      },
      {
        number: "02",
        title: "Comparison Matrix",
        description: "Review options in a common frame while preserving important differences.",
      },
      {
        number: "03",
        title: "Assumptions Register",
        description: "Separate facts, claims, estimates, and items still waiting for evidence.",
      },
      {
        number: "04",
        title: "Document Tracker",
        description: "Track what has arrived, what is missing, and who should examine it.",
      },
      {
        number: "05",
        title: "Risk Log",
        description: "Name each concern, its source, its owner, and the next verification step.",
      },
      {
        number: "06",
        title: "Decision Memo",
        description: "Summarise the evidence, trade-offs, unresolved risks, and next action.",
      },
    ],
    disclaimer:
      "The toolkit organises user-provided information. It is not a valuation model and does not validate the accuracy or completeness of that information.",
  },
] as const satisfies readonly Product[];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

