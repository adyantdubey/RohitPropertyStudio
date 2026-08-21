/**
 * Shared editorial content for the Rohitt Kumar Singh website.
 *
 * Editorial content source. The uploaded training deck is a real prepared
 * resource; prices, access, licence, support, and delivery terms remain pending.
 */

export type ContentStatus = "placeholder";
export type ProductKind = "deck" | "pdf" | "toolkit";

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
  index: string;
  title: string;
  category: "Decision strategy" | "Due diligence" | "Field notes" | "Learning";
  summary: string;
  deck: string;
  readTime: string;
  status: ContentStatus;
  reviewLabel: string;
  hero: EditorialMedia;
  thesis: string;
  sections: readonly InsightSection[];
  carryForward: readonly string[];
  relatedProductSlug: string;
}

export interface EditorialMedia {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
}

export interface InsightSection {
  heading: string;
  paragraphs: readonly string[];
  fieldNote?: string;
}

export interface AboutStoryChapter {
  number: string;
  title: string;
  marker: string;
  prompt: string;
  status: ContentStatus;
}

export interface BrandPrinciple {
  number: string;
  title: string;
  description: string;
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
  collectionRole: string;
  bestWhen: string;
  tangibleOutcome: string;
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
    "The training deck is a prepared resource. No digital product, price, checkout, or delivery promise is live until its review and commercial terms are approved.",
} as const satisfies ContentMeta;

export const navigation = [
  { label: "About", href: "/about" },
  { label: "Advisory", href: "/advisory" },
  { label: "Academy", href: "/courses" },
  { label: "Insights", href: "/insights" },
  { label: "Reel Se Real Estate", href: "/media" },
  { label: "Contact", href: "/contact" },
] as const satisfies readonly NavigationItem[];

export const rohitEditorialProfile = {
  status: "placeholder",
  name: "Rohitt Kumar Singh",
  role: "Managing Director · Hundred Yards Realtor Pvt Ltd",
  positioning:
    "A Bengaluru-based real-estate leader and educator focused on making consequential property decisions easier to understand.",
  portrait: {
    src: "/media/facade-detail.jpg",
    alt: "A close architectural study of a contemporary facade",
    width: 1800,
    height: 1170,
    caption:
      "Temporary editorial architecture. No stock person is presented as Rohitt; an approved portrait will replace this panel when supplied.",
  },
  launchNeeds: [
    "Rohitt's approved portrait and image-use confirmation",
    "Approved first-person biography and quotation",
    "Confirmed career milestones and credential documents",
    "Approved Hundred Yards logo kit and usage permission",
    "Final Academy files, prices, delivery, support, and commercial terms",
  ],
} as const;

export const aboutStoryChapters = [
  {
    number: "01",
    title: "A market-facing career",
    marker: "PRACTICE / BENGALURU",
    prompt:
      "Rohitt's public professional profile places him in Greater Bengaluru, working across sales, leadership, and real-estate decision-making.",
    status: "placeholder",
  },
  {
    number: "02",
    title: "Hundred Yards",
    marker: "LEADERSHIP / MANAGING DIRECTOR",
    prompt:
      "As Managing Director of Hundred Yards Realtor Pvt Ltd, Rohitt's published focus is transparent guidance, market understanding, and end-to-end support for serious property decisions.",
    status: "placeholder",
  },
  {
    number: "03",
    title: "Education in public",
    marker: "MEDIA / REEL SE REAL ESTATE",
    prompt:
      "His public content turns project walkthroughs, location context, diligence questions, and comparison logic into useful starting points for buyers and learners.",
    status: "placeholder",
  },
  {
    number: "04",
    title: "The work now",
    marker: "ADVISORY + ACADEMY",
    prompt:
      "The personal brand now gives two clear routes: a human Hundred Yards advisory conversation, or independent educational material from RKS Property Studio.",
    status: "placeholder",
  },
] as const satisfies readonly AboutStoryChapter[];

export const brandPrinciples = [
  {
    number: "01",
    title: "Clarity before urgency.",
    description:
      "A fast answer is not useful when the question has not been framed properly.",
  },
  {
    number: "02",
    title: "Evidence before excitement.",
    description:
      "Interest can begin the search. Evidence must shape the decision.",
  },
  {
    number: "03",
    title: "Process before prediction.",
    description:
      "No framework removes uncertainty. A good one makes uncertainty visible.",
  },
  {
    number: "04",
    title: "Context before conclusions.",
    description:
      "A number matters only when its source, assumptions, and limits are understood.",
  },
  {
    number: "05",
    title: "People before property.",
    description:
      "The right learning path begins with the person's objective—not an asset someone wants to sell.",
  },
] as const satisfies readonly BrandPrinciple[];

export const proofRequirements = [
  "Approved learner wording or an explicitly anonymous account",
  "Clear starting context without exposing private information",
  "A specific, supportable change in process or understanding",
  "Consent for every quotation, portrait, and shared artifact",
  "No implied financial, investment, or transaction guarantee",
] as const;

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
    question: "What can I access today?",
    answer:
      "The Advisory, Insights, and contact routes are available now. The 49-slide Basics of Real Estate training deck is prepared, but payment and protected delivery are not open. Before You Buy and the toolkit remain in development.",
  },
  {
    question: "Can I register interest in the field guide?",
    answer:
      "Yes. Use the first-access enquiry on the Academy or Contact page. It records the subject for your email to the Hundred Yards team; it does not take payment or promise a release date.",
  },
  {
    question: "Are the learning materials financial or investment advice?",
    answer:
      "No. The learning material is general and educational. Property decisions require independent verification and, where appropriate, qualified legal, tax, financial, valuation, and technical advice.",
  },
  {
    question: "Can Rohitt review a specific property for me?",
    answer:
      "Use the Advisory or Contact route to describe the need. A human team member can confirm availability, scope, the responsible entity, and any professional boundaries before an engagement is discussed.",
  },
  {
    question: "Is there a payment gateway on this site?",
    answer:
      "No. Prices, payment collection, digital delivery, access recovery, tax treatment, and receipts will only appear after the products and merchant setup are ready.",
  },
  {
    question: "Who receives a property enquiry?",
    answer:
      "The current contact path is labelled for the Hundred Yards team. The site does not imply that every message reaches Rohitt personally or that submitting an enquiry creates an advisory or brokerage engagement.",
  },
] as const satisfies readonly FaqItem[];

export const insights = [
  {
    slug: "the-viewing-is-not-the-decision",
    index: "01",
    title: "The Viewing Is Not the Decision",
    category: "Field notes",
    summary:
      "How to leave a property visit with useful observations instead of a persuasive but vague impression.",
    deck:
      "A viewing is a source of observations, claims, and new questions. Treating it as a verdict gives atmosphere more authority than evidence.",
    readTime: "5 min read",
    status: "placeholder",
    reviewLabel: "RKS Property Note · Educational reading",
    hero: {
      src: "/media/interior-daylight.jpg",
      alt: "A sunlit residential interior with a dining counter, plants, and contrasting materials",
      width: 1800,
      height: 2700,
      caption:
        "Temporary editorial stock image. It is not a Rohitt or Hundred Yards project, listing, or learner property.",
    },
    thesis:
      "Leave with a record you can inspect later: what you observed, what somebody told you, what you inferred, and what still needs verification.",
    sections: [
      {
        heading: "Atmosphere is information—not a conclusion",
        paragraphs: [
          "Light, proportion, noise, movement, and condition all matter. But a strong first impression can quietly turn an observation into a conclusion. A room that feels generous is not yet a verified area. A quiet visit is not yet evidence of a quiet street. A confident explanation is not yet a checked fact.",
          "The useful discipline is to preserve the observation before interpreting it. Write down what was visible or audible in plain language. Record who supplied each additional claim. Leave the conclusion open until the relevant source or professional input is available.",
        ],
        fieldNote:
          "Try four columns: observed / stated / inferred / verify next. The separation matters more than the scoring system.",
      },
      {
        heading: "Give every viewing the same questions",
        paragraphs: [
          "Comparison becomes unreliable when each property is reviewed according to whatever happens to attract attention. Begin with a short list tied to the objective: daily use, access, layout, physical condition, documentation, recurring costs, constraints, and unresolved specialist questions.",
          "The list is not a substitute for technical or legal diligence. It is a way to notice when one option has received a careful review and another has only received enthusiasm.",
        ],
      },
      {
        heading: "Leave with next actions, not a verdict",
        paragraphs: [
          "The most responsible result of a first visit may be a better document request, a second visit at another time, a question for a qualified professional, or a decision to stop investigating. None of those requires pretending the viewing settled the decision.",
          "A useful final note is simple: what changed, what remains unknown, and what evidence would justify the next step.",
        ],
      },
    ],
    carryForward: [
      "Record observations separately from claims and interpretations.",
      "Use the same core questions for every option being compared.",
      "End the visit with verification tasks rather than a rushed verdict.",
    ],
    relatedProductSlug: "before-you-buy-field-guide",
  },
  {
    slug: "compare-unlike-properties",
    index: "02",
    title: "A Cleaner Way to Compare Unlike Properties",
    category: "Decision strategy",
    summary:
      "Why one universal score can conceal the trade-offs that actually matter to the decision.",
    deck:
      "A compact score feels objective. It can also hide the reasons two properties are difficult to compare in the first place.",
    readTime: "7 min read",
    status: "placeholder",
    reviewLabel: "RKS Property Note · Educational reading",
    hero: {
      src: "/media/blueprint-hands.jpg",
      alt: "Hands reviewing several architectural drawings on a working desk",
      width: 2048,
      height: 3072,
      caption:
        "Temporary editorial stock image. The plans are illustrative and are not linked to Rohitt, Hundred Yards, or a learner case.",
    },
    thesis:
      "Compare from the decision outward: establish what matters, preserve the evidence behind each judgement, and keep trade-offs visible instead of burying them in a total.",
    sections: [
      {
        heading: "Start with the decision, not the options",
        paragraphs: [
          "Before building a comparison table, write down the objective, constraints, non-negotiables, and preferences. A criterion only deserves weight when its relationship to the decision is clear. Otherwise, the table can become a polished record of somebody else's priorities.",
          "Separate hard constraints from negotiable preferences. That prevents an attractive strength from quietly compensating for a condition that was never meant to be compromised.",
        ],
      },
      {
        heading: "Keep the evidence beside the judgement",
        paragraphs: [
          "A label such as ‘good access’ is difficult to audit. Record the underlying observation, source, date, and assumption: the route considered, the time checked, the transport mode, and what has not been tested. The same principle applies to condition, cost, documentation, and local context.",
          "This does not make the information complete. It makes the basis of the comparison visible enough to question and update.",
        ],
        fieldNote:
          "If a score cannot be explained in one sentence with its source, it may be compressing uncertainty rather than resolving it.",
      },
      {
        heading: "Let trade-offs remain trade-offs",
        paragraphs: [
          "Two options can each be plausible for different reasons. A single total encourages a winner even when the real decision depends on which compromise the buyer is prepared to carry.",
          "Use the comparison to produce a short decision memo: where each option fits, where it does not, what evidence is missing, and which questions need specialist review. The memo is often more useful than declaring a numerical winner.",
        ],
      },
    ],
    carryForward: [
      "Separate constraints, non-negotiables, and preferences.",
      "Keep sources and assumptions beside every judgement.",
      "Summarise trade-offs in words before relying on a total score.",
    ],
    relatedProductSlug: "deal-room-toolkit",
  },
  {
    slug: "build-a-red-flag-register",
    index: "03",
    title: "Build a Red-Flag Register, Not a Red-Flag Panic",
    category: "Due diligence",
    summary:
      "A practical method for recording concerns, supporting evidence, owners, and the next action.",
    deck:
      "A concern becomes more useful when it is named precisely, tied to a source, and given a responsible verification path.",
    readTime: "6 min read",
    status: "placeholder",
    reviewLabel: "RKS Property Note · Educational reading",
    hero: {
      src: "/media/facade-detail.jpg",
      alt: "Close view of a geometric building facade in warm daylight",
      width: 1800,
      height: 1170,
      caption:
        "Temporary editorial stock image. It does not identify a defect, Rohitt or Hundred Yards project, or learner property.",
    },
    thesis:
      "A red-flag register should slow interpretation down: state the concern, preserve the evidence, identify who can assess it, and record what happens next.",
    sections: [
      {
        heading: "Name the concern without diagnosing it",
        paragraphs: [
          "Words such as ‘problematic’ or ‘unsafe’ can outrun the available evidence. Begin with what prompted the concern: a missing document, a visible condition, inconsistent information, an unusual term, or a question that has not received a clear answer.",
          "Unless the reader is appropriately qualified, the register should not convert that observation into a technical, legal, financial, or valuation conclusion. Its role is to route the question, not answer it by confidence.",
        ],
      },
      {
        heading: "Give every item an owner and a source",
        paragraphs: [
          "A useful entry records where the concern came from, what supporting material exists, which qualified person may need to review it, and when the status was last updated. It should distinguish ‘not supplied’ from ‘does not exist’ and ‘not yet assessed’ from ‘acceptable.’",
          "This turns an anxious list into a review workflow. It also makes it easier to see which questions remain open when attention moves to another property.",
        ],
        fieldNote:
          "A practical register can use: concern / source / potential relevance / reviewer / next action / status. Severity should be set only with an appropriate basis.",
      },
      {
        heading: "Close the loop—or keep it visibly open",
        paragraphs: [
          "Do not remove an item because a reassuring answer arrived. Add the answer, its source, and any evidence received. If the issue remains unresolved, say so plainly.",
          "The objective is not a perfectly clean register. It is an honest record of what was raised, what was checked, and which uncertainty still belongs in the decision.",
        ],
      },
    ],
    carryForward: [
      "Describe the trigger before attempting a diagnosis.",
      "Assign each question to the appropriate source or professional reviewer.",
      "Preserve unresolved items instead of smoothing them out for a decision.",
    ],
    relatedProductSlug: "before-you-buy-field-guide",
  },
  {
    slug: "before-you-ask-the-price",
    index: "04",
    title: "What to Ask Before You Ask the Price",
    category: "Decision strategy",
    summary:
      "The context that gives a number meaning—and the questions that should precede comparison.",
    deck:
      "A price is easy to repeat and difficult to interpret well. Context determines what can responsibly be compared and what still needs verification.",
    readTime: "4 min read",
    status: "placeholder",
    reviewLabel: "RKS Property Note · Educational reading",
    hero: {
      src: "/media/hero-poster.jpg",
      alt: "Aerial editorial view of a modern residence within a neighbourhood",
      width: 1800,
      height: 1013,
      caption:
        "Temporary editorial stock image. The property is not presented as a Rohitt or Hundred Yards listing, project, recommendation, or transaction.",
    },
    thesis:
      "Before comparing a price, define the object, source, date, terms, and assumptions attached to it. Similar-looking numbers may describe materially different things.",
    sections: [
      {
        heading: "First define what the number describes",
        paragraphs: [
          "Ask which area definition, rights, inclusions, condition, payment terms, and date sit behind the figure. Record whether the number is an asking figure, a documented transaction figure, an estimate, or an informal claim.",
          "The vocabulary and legal meaning of property measurements and interests can vary. Relevant documents and qualified advice should govern the conclusion, not a label copied from a listing.",
        ],
      },
      {
        heading: "Make comparison conditions explicit",
        paragraphs: [
          "A comparison is only as useful as the differences it acknowledges. Time, exact location, property type, condition, floor, rights, amenities, payment schedule, and transaction circumstances may all affect whether two figures belong in the same frame.",
          "Rather than deleting inconvenient differences, add them to the comparison. A range with visible limitations is often more honest than one precise number with hidden assumptions.",
        ],
        fieldNote:
          "For every price reference, retain five fields: what / where / when / source / terms. Add assumptions rather than carrying them silently.",
      },
      {
        heading: "Price is not suitability",
        paragraphs: [
          "Even a well-supported price comparison does not answer whether a property fits the person's objective, constraints, financing, risk tolerance, or professional advice. It answers one bounded question inside a larger decision.",
          "The next useful step may be better evidence, a different comparison set, or an independent valuation—not a faster conclusion.",
        ],
      },
    ],
    carryForward: [
      "Record the type, source, date, and terms behind every price reference.",
      "Make material differences visible before comparing figures.",
      "Keep price analysis separate from personal suitability and specialist advice.",
    ],
    relatedProductSlug: "basics-of-real-estate-training-deck",
  },
  {
    slug: "your-shortlist-is-a-hypothesis",
    index: "05",
    title: "Your Shortlist Is a Hypothesis",
    category: "Learning",
    summary:
      "Treat early preferences as ideas to test rather than conclusions to defend.",
    deck:
      "A shortlist is most useful when it explains why each option remains under consideration—and what evidence could remove it.",
    readTime: "5 min read",
    status: "placeholder",
    reviewLabel: "RKS Property Note · Educational reading",
    hero: {
      src: "/media/interior-soft.jpg",
      alt: "A bright residential hallway leading toward a small dining area",
      width: 1800,
      height: 1170,
      caption:
        "Temporary editorial stock image. It is not a Rohitt or Hundred Yards project, listing, recommendation, or learner property.",
    },
    thesis:
      "Write down why an option entered the shortlist, which assumptions support it, and what evidence would change your mind. Then test every option consistently.",
    sections: [
      {
        heading: "State the reason each option is still here",
        paragraphs: [
          "A shortlist can become an attachment list: options remain because time has already been spent on them or because one memorable feature dominates the review. Give every option a current, decision-related reason for remaining under consideration.",
          "If that reason depends on an unverified claim, mark it as an assumption. The list should show the present state of the evidence, not only the strength of the preference.",
        ],
      },
      {
        heading: "Define what could disconfirm the preference",
        paragraphs: [
          "A useful hypothesis can be tested. Write down which missing fact, professional finding, constraint, or trade-off would materially change the option's position. This creates a deliberate search for disconfirming information instead of a search for reassurance.",
          "The threshold should reflect the person's objective and qualified advice. It should not be borrowed from a generic scoring model.",
        ],
        fieldNote:
          "Complete this sentence for every option: ‘This remains on the shortlist because ____. I would reconsider it if ____.’",
      },
      {
        heading: "Review the shortlist as a living record",
        paragraphs: [
          "New evidence should be able to change the shortlist without making the earlier work feel wasted. Date material updates, retain the reason for a status change, and record why an option was paused or removed.",
          "The value of the shortlist is not that it predicts the winner early. It keeps the investigation aligned with the decision while the evidence develops.",
        ],
      },
    ],
    carryForward: [
      "Give every shortlisted option a current, decision-related reason.",
      "Name the evidence that would change the option's status.",
      "Date changes and preserve why an option moved, paused, or left the list.",
    ],
    relatedProductSlug: "deal-room-toolkit",
  },
] as const satisfies readonly Insight[];

export const products = [
  {
    slug: "basics-of-real-estate-training-deck",
    kind: "deck",
    featured: true,
    status: "placeholder",
    isPlaceholder: true,
    eyebrow: "THE 100 YARDS TRAINING DECK",
    title: "Basics of Real Estate",
    subtitle: "A 49-Slide Foundation Training Deck",
    shortTitle: "Real Estate Basics",
    tagline:
      "A visual foundation in the property types, construction process, approvals, areas, charges, and transaction language used in Indian real estate.",
    collectionRole: "Build the foundation",
    bestWhen:
      "You are entering real estate or need a structured refresher on the industry's essential language and development process.",
    tangibleOutcome:
      "A reusable PowerPoint reference spanning industry fundamentals, construction, approvals, area definitions, charges, and payment-plan concepts.",
    description:
      "A prepared 49-slide PowerPoint training resource carrying 100 Yards branding. Part one introduces the industry, property categories, home formats, Vaastu basics, and amenities. Part two moves through development, construction, approvals, area terminology, charges, guidance value, UDS, and payment-plan examples.",
    price: {
      amount: 0,
      currency: "INR",
      formatted: "Launch setup pending",
      isPlaceholder: true,
    },
    level: "Foundation",
    format: "49-slide PowerPoint presentation (.pptx)",
    access: "Prepared asset — purchase access is not open",
    delivery: "Protected delivery will be configured before sales open",
    primaryCta: "Ask about launch access",
    secondaryCta: "View the training-deck scope",
    idealFor: [
      "New real-estate team members who need a visual foundation",
      "Property learners who want key terminology in one structured resource",
      "Sales and training teams preparing an introductory learning session",
    ],
    notFor: [
      "Anyone seeking a property recommendation or guaranteed return",
      "Anyone using training material as a substitute for current legal, tax, financial, or technical advice",
      "Anyone expecting every regulatory example to apply unchanged across locations and dates",
    ],
    outcomes: [
      "Recognise major real-estate and property categories",
      "Understand common residential formats and amenity language",
      "Follow the broad property-development and construction sequence",
      "Distinguish carpet, built-up, and super built-up area concepts",
      "Read common approval, charge, UDS, and payment-plan terminology",
    ],
    includes: [
      "One PowerPoint-format presentation file",
      "49 visual training slides",
      "Two-part foundation-to-transaction learning sequence",
      "Property, construction, approval, area, and charge examples",
    ],
    sections: [
      {
        number: "01",
        title: "Industry and Real-Estate Overview",
        description:
          "A starting view of the industry, its development in India, and the major property categories.",
      },
      {
        number: "02",
        title: "Property and Home Formats",
        description:
          "Residential, commercial, and industrial real estate alongside common home configurations.",
      },
      {
        number: "03",
        title: "Vaastu and Amenities",
        description:
          "Introductory visual material on Vaastu directions and the amenity language used in projects.",
      },
      {
        number: "04",
        title: "Development and Construction",
        description:
          "The broad development sequence, construction stages, cement grades, and common formwork systems.",
      },
      {
        number: "05",
        title: "Approvals and Area Language",
        description:
          "Commencement, occupancy, and completion certificates plus carpet, built-up, super built-up, FAR, and FSI concepts.",
      },
      {
        number: "06",
        title: "Charges, UDS, and Payment Plans",
        description:
          "Guidance value, UDS, common project charges, and worked payment-plan examples.",
      },
    ],
    disclaimer:
      "General educational material only. Regulatory references, charges, terminology, and examples should receive a current editorial review before launch and must not replace qualified location-specific professional advice.",
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
    collectionRole: "Carry the questions",
    bestWhen:
      "You are preparing for a viewing, document request, or conversation with a qualified professional.",
    tangibleOutcome:
      "A repeatable field record for observations, open questions, requested documents, and next checks.",
    description:
      "A concise, portable reference in development for organising the questions, records, observations, and professional checks that may matter during a property review.",
    price: {
      amount: 0,
      currency: "INR",
      formatted: "Coming soon",
      isPlaceholder: true,
    },
    level: "All levels",
    format: "Planned digital PDF field guide",
    access: "Coming soon — licence terms not announced",
    delivery: "No file or payment flow is live",
    primaryCta: "Join the first-access list",
    secondaryCta: "See the planned purpose",
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
    collectionRole: "Run the review",
    bestWhen:
      "You are actively comparing options and need one consistent place for evidence and open questions.",
    tangibleOutcome:
      "A working comparison, assumptions register, document tracker, risk log, and decision memo.",
    description:
      "A planned set of templates for people who understand the fundamentals and want a repeatable workspace for comparing properties and documenting open questions.",
    price: {
      amount: 0,
      currency: "INR",
      formatted: "In development",
      isPlaceholder: true,
    },
    level: "Intermediate",
    format: "Planned workbook + PDF templates",
    access: "In development — licence terms not announced",
    delivery: "Not available for purchase or delivery",
    primaryCta: "Join the interest list",
    secondaryCta: "See the planned direction",
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
