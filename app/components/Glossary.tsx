"use client";

import { useMemo, useState } from "react";
import { Search, Sparkles } from "lucide-react";
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
      <label className="glossary__search">
        <Search size={18} aria-hidden="true" />
        <span className="sr-only">Search the property glossary</span>
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a term or idea" />
      </label>

      <div className="glossary__grid" aria-live="polite">
        {matches.map((item) => (
          <article className="glossary__item" key={item.term}>
            <h3>{item.term}</h3>
            <p>{item.definition}</p>
          </article>
        ))}
        {matches.length === 0 && (
          <div className="glossary__empty">
            <p>No glossary entry matches that directly.</p>
            <button
              className="text-link glossary__ask"
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("academy:guide-ask", { detail: { question: query.trim() } }));
                document.getElementById("ask")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <Sparkles size={14} aria-hidden="true" /> Ask the AI guide about “{query.trim().slice(0, 60)}”
            </button>
          </div>
        )}
      </div>

      <p className="tool__note">
        Definitions are general educational summaries. Project documents, statutes and local usage may
        define a term more precisely.
      </p>
    </div>
  );
}
