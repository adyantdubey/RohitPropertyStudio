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
    "Editorial and commercial placeholder data. Review prices, access terms, formats, and policies before launch.",
} as const satisfies ContentMeta;

export const navigation = [
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Results", href: "/results" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const satisfies readonly NavigationItem[];

export const rohitEditorialProfile = {
  status: "placeholder",
  name: "Rohit",
  role: "Real estate educator",
  positioning:
    "A calmer way to frame, review, and document property decisions—without pretending uncertainty has disappeared.",
  portrait: {
    src: "/media/rohit-standin.jpg",
    alt: "A stock stand-in photographed from behind between two modern buildings",
    width: 1400,
    height: 2100,
    caption:
      "Editorial stock stand-in. This photograph does not depict Rohit and must be replaced with his approved portrait before launch.",
  },
  launchNeeds: [
    "Rohit's approved portrait and image-use confirmation",
    "A verified short and long biography",
    "Verified career milestones, dates, markets, and roles",
    "Approved first-person wording or quotations",
    "Confirmed public role, service scope, and location",
  ],
} as const;

export const aboutStoryChapters = [
  {
    number: "01",
    title: "The beginning",
    marker: "ORIGIN / AWAITING ROHIT",
    prompt:
      "Insert the verified moment, place, or experience that first made property decisions feel consequential to Rohit.",
    status: "placeholder",
  },
  {
    number: "02",
    title: "The work",
    marker: "PRACTICE / AWAITING ROHIT",
    prompt:
      "Document only verified roles, responsibilities, markets, and projects—and explain what the work taught rather than inflating its scale.",
    status: "placeholder",
  },
  {
    number: "03",
    title: "The teaching turn",
    marker: "METHOD / AWAITING ROHIT",
    prompt:
      "Add Rohit's verified reason for translating experience into courses, field guides, or practical tools.",
    status: "placeholder",
  },
  {
    number: "04",
    title: "The work now",
    marker: "NOW / AWAITING ROHIT",
    prompt:
      "State Rohit's current educational focus, audience, and service boundaries in his approved words.",
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
    index: "01",
    title: "The Viewing Is Not the Decision",
    category: "Field notes",
    summary:
      "How to leave a property visit with useful observations instead of a persuasive but vague impression.",
    deck:
      "A viewing is a source of observations, claims, and new questions. Treating it as a verdict gives atmosphere more authority than evidence.",
    readTime: "5 min read",
    status: "placeholder",
    reviewLabel: "Editorial draft — Rohit review required",
    hero: {
      src: "/media/interior-daylight.jpg",
      alt: "A sunlit residential interior with a dining counter, plants, and contrasting materials",
      width: 1800,
      height: 2700,
      caption:
        "Editorial stock image for this draft. It is not a Rohit project, listing, or learner property.",
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
    reviewLabel: "Editorial draft — Rohit review required",
    hero: {
      src: "/media/blueprint-hands.jpg",
      alt: "Hands reviewing several architectural drawings on a working desk",
      width: 2048,
      height: 3072,
      caption:
        "Editorial stock image for this draft. The plans are illustrative and are not linked to Rohit or a learner case.",
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
    reviewLabel: "Editorial draft — Rohit review required",
    hero: {
      src: "/media/facade-detail.jpg",
      alt: "Close view of a geometric building facade in warm daylight",
      width: 1800,
      height: 1170,
      caption:
        "Editorial stock image for this draft. It does not identify a defect, Rohit project, or learner property.",
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
    reviewLabel: "Editorial draft — Rohit review required",
    hero: {
      src: "/media/hero-poster.jpg",
      alt: "Aerial editorial view of a modern residence within a neighbourhood",
      width: 1800,
      height: 1013,
      caption:
        "Editorial stock image for this draft. The property is not presented as a Rohit listing, project, recommendation, or transaction.",
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
    relatedProductSlug: "property-decision-system",
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
    reviewLabel: "Editorial draft — Rohit review required",
    hero: {
      src: "/media/interior-soft.jpg",
      alt: "A bright residential hallway leading toward a small dining area",
      width: 1800,
      height: 1170,
      caption:
        "Editorial stock image for this draft. It is not a Rohit project, listing, recommendation, or learner property.",
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
    slug: "property-decision-system",
    kind: "course",
    featured: true,
    status: "placeholder",
    isPlaceholder: true,
    eyebrow: "THE FLAGSHIP COURSE",
    title: "The Property Decision System",
    shortTitle: "Decision System",
    tagline: "A structured way to move from first interest to an informed next step.",
    collectionRole: "Learn the system",
    bestWhen:
      "You want an end-to-end learning path before or alongside active property research.",
    tangibleOutcome:
      "A documented criteria set, review workflow, risk register, and decision memo practice.",
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
    collectionRole: "Carry the questions",
    bestWhen:
      "You are preparing for a viewing, document request, or conversation with a qualified professional.",
    tangibleOutcome:
      "A repeatable field record for observations, open questions, requested documents, and next checks.",
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
    collectionRole: "Run the review",
    bestWhen:
      "You are actively comparing options and need one consistent place for evidence and open questions.",
    tangibleOutcome:
      "A working comparison, assumptions register, document tracker, risk log, and decision memo.",
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
