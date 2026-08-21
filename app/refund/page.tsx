import type { Metadata } from "next";
import { LegalPage } from "../components/LegalPage";
import { course } from "../lib/siteContent";

export const metadata: Metadata = { title: "Refund status" };
export default function RefundPage() { return <LegalPage title="Refund status" intro="There is currently nothing to refund because this website does not collect payments." sections={[{ title: "Pre-launch only", paragraphs: [`${course.title} is not yet for sale. Joining early access is free and does not create an order.`] }, { title: "Before paid launch", paragraphs: ["The applicable price, delivery method, access terms, cancellation conditions and refund policy will be displayed before a future payment is accepted."] }]} />; }
