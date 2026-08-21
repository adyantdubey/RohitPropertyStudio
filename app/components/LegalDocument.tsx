import type { ReactNode } from "react";

type LegalDocumentProps = {
  code: string;
  title: string;
  intro: string;
  children: ReactNode;
};

export function LegalDocument({ code, title, intro, children }: LegalDocumentProps) {
  return (
    <main id="main-content" className="legal-page authority-legal-page">
      <header className="authority-legal-page__header">
        <p className="eyebrow">{code} / CURRENT SITE NOTICE</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </header>
      <div className="legal-layout authority-legal-page__layout">
        <aside className="authority-legal-page__status">
          <span>STATUS</span>
          <strong>PRE-LAUNCH</strong>
          <p>
            No product, checkout, payment processor, account, download, or paid
            access is currently offered on this website.
          </p>
        </aside>
        <article className="legal-copy authority-legal-page__copy">{children}</article>
      </div>
    </main>
  );
}
