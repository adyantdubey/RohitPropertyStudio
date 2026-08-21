import type { Metadata } from "next";
import { LegalPage } from "../components/LegalPage";
import { brand } from "../lib/siteContent";

export const metadata: Metadata = { title: "Privacy" };
export default function PrivacyPage() { return <LegalPage title="Privacy" intro="This website is currently an informational, pre-launch course website." sections={[{ title: "Information on this website", paragraphs: ["There is no account, checkout or on-site enquiry form. This website does not intentionally collect names, phone numbers, payment details or course orders."] }, { title: "External contact links", paragraphs: [`WhatsApp, email, telephone, Facebook and ${brand.company} links open third-party services. Any information you share there is handled under that service's policies and by the receiving Hundred Yards team.`] }, { title: "Technical data", paragraphs: ["The hosting provider may process basic request, security and performance logs needed to deliver and protect the website. No advertising tracker has been intentionally added."] }, { title: "Questions", paragraphs: [`Privacy questions can be sent to ${brand.email}.`] }]} />; }
