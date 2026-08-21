type LegalSection = { title: string; paragraphs?: string[]; bullets?: string[] };

export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return (
    <main id="main-content">
      <section className="page-hero surface-deep">
        <div className="shell page-hero__copy">
          <p className="eyebrow" data-enter>Pre-launch information</p>
          <h1 data-split>{title}</h1>
          <p data-enter>{intro}</p>
        </div>
      </section>

      <section className="section surface-dark">
        <div className="shell prose">
          {sections.map((section) => (
            <section key={section.title} data-reveal>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
            </section>
          ))}
          <p><strong>Last updated:</strong> 21 August 2026</p>
        </div>
      </section>
    </main>
  );
}
