"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { glossaryTerms } from "../lib/siteContent";

export function Glossary() {
  const [query, setQuery] = useState("");
  const matches = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return glossaryTerms;
    return glossaryTerms.filter((item) => `${item.term} ${item.definition}`.toLowerCase().includes(normalized));
  }, [query]);

  return (
    <div className="glossary">
      <label className="glossary-search">
        <Search size={18} aria-hidden="true" />
        <span className="sr-only">Search the property glossary</span>
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a term or idea" />
      </label>
      <div className="glossary-grid" aria-live="polite">
        {matches.map((item) => <article className="glossary-item" key={item.term}><h3>{item.term}</h3><p>{item.definition}</p></article>)}
        {matches.length === 0 && <p className="glossary-empty">No matching term yet. Try a broader search.</p>}
      </div>
      <p className="tool-note">Definitions are general educational summaries. Project documents, statutes and local usage may define a term more precisely.</p>
    </div>
  );
}
