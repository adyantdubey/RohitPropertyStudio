export const brand = {
  name: "Rohitt Kumar Singh",
  shortName: "Rohitt",
  initials: "RKS",
  professionalTitle: "Managing Director",
  organizationName: "Hundred Yards Realtor Pvt Ltd",
  credential: "Managing Director · Hundred Yards Realtor Pvt Ltd",
  line: "Real estate, made legible.",
  educationLabel: "RKS Property Studio",
  mediaLabel: "Reel Se Real Estate",
  companyContact: {
    email: "sales@100yards.in",
    phoneDisplay: "+91 99168 66667",
    phoneHref: "+919916866667",
    hours: "Every day · 09:00–20:00",
    address: {
      street:
        "430, Uniworks Pro, 4th floor, 5th A Cross Rd, HRBR Layout 2nd Block, Kalyan Nagar",
      city: "Bengaluru",
      region: "Karnataka",
      postalCode: "560043",
      country: "IN",
    },
  },
  sourceLinks: {
    facebook: "https://www.facebook.com/rohitt.kumar.singh.2025",
    linkedIn: "https://in.linkedin.com/in/rohitt-kumar-singh-7465b8112",
    company: "https://100yards.in/",
    companyLinkedIn: "https://www.linkedin.com/company/100-yards/",
  },
  navigation: [
    { href: "/about", label: "About" },
    { href: "/advisory", label: "Advisory" },
    { href: "/courses", label: "Academy" },
    { href: "/insights", label: "Insights" },
    { href: "/media", label: "Reel Se Real Estate" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: brand.name,
  jobTitle: brand.professionalTitle,
  worksFor: {
    "@type": "Organization",
    name: brand.organizationName,
  },
  sameAs: [brand.sourceLinks.facebook, brand.sourceLinks.linkedIn],
} as const;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.organizationName,
  url: brand.sourceLinks.company,
  email: brand.companyContact.email,
  telephone: brand.companyContact.phoneHref,
  address: {
    "@type": "PostalAddress",
    streetAddress: brand.companyContact.address.street,
    addressLocality: brand.companyContact.address.city,
    addressRegion: brand.companyContact.address.region,
    postalCode: brand.companyContact.address.postalCode,
    addressCountry: brand.companyContact.address.country,
  },
  sameAs: [brand.sourceLinks.companyLinkedIn],
} as const;
