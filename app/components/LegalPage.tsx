type LegalSection = { title: string; paragraphs?: string[]; bullets?: string[] };

export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return (
    <main id="main-content" className="legal">
      <header className="legal__header"><div className="shell"><p className="eyebrow">Pre-launch information</p><h1>{title}</h1><p>{intro}</p></div></header>
      <div className="legal__body">
        {sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
          </section>
        ))}
        <p><strong>Last updated:</strong> 21 August 2026</p>
      </div>
    </main>
  );
}
