import type { ReactNode } from "react";

type LegalDocumentProps = {
  code: string;
  title: string;
  intro: string;
  children: ReactNode;
};

export function LegalDocument({ code, title, intro, children }: LegalDocumentProps) {
  return (
    <main id="main-content" className="legal-page">
      <header>
        <p className="eyebrow">{code} / DRAFT FOR REVIEW</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </header>
      <div className="legal-layout">
        <aside>
          <span>STATUS</span>
          <strong>PLACEHOLDER</strong>
          <p>Final legal wording must be reviewed for Rohit’s business, jurisdiction, products, and processor.</p>
        </aside>
        <article className="legal-copy">{children}</article>
      </div>
    </main>
  );
}
