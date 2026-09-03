"use client";

import { useMemo, useState } from "react";
import { searchIndex, TYPE_LABELS, type SearchEntry, type SearchType } from "@/lib/prototype/search";

const TYPE_ORDER: SearchType[] = ["ideia", "topico", "autor", "obra"];

const SUGGESTIONS = ["justiça", "escravidão", "hobbes", "liberdade", "exploração"];

export function InventorySearchClient({ index }: { index: readonly SearchEntry[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => searchIndex(index, query), [index, query]);

  const grouped = useMemo(() => {
    const map = new Map<SearchType, SearchEntry[]>();
    for (const entry of results) {
      const list = map.get(entry.type) ?? [];
      list.push(entry);
      map.set(entry.type, list);
    }
    return TYPE_ORDER.filter((type) => map.has(type)).map((type) => ({ type, entries: map.get(type) ?? [] }));
  }, [results]);

  return (
    <div className="inventory-search">
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Busque por ideia, tópico, autor ou obra…"
        aria-label="Buscar no inventário"
        autoFocus
      />
      <div className="suggestions" aria-label="Sugestões de busca">
        {SUGGESTIONS.map((suggestion) => (
          <button key={suggestion} type="button" onClick={() => setQuery(suggestion)}>
            {suggestion}
          </button>
        ))}
      </div>

      {query && results.length === 0 ? (
        <p className="empty-inline">
          Nada incorporado corresponde a “{query}”. A camada canônica do Inventory of Terms ainda não foi ingerida —
          ausência aqui não é ausência na fonte.
        </p>
      ) : null}

      {grouped.map((group) => (
        <section key={group.type} aria-label={TYPE_LABELS[group.type]}>
          <h2 className="group-title">
            {TYPE_LABELS[group.type]} <span className="group-count">{group.entries.length}</span>
          </h2>
          <ul className="group-list">
            {group.entries.slice(0, 12).map((entry) => (
              <li key={entry.href}>
                <a href={entry.href}>
                  <strong>{entry.title}</strong>
                  {entry.subtitle ? <em> · {entry.subtitle}</em> : null}
                </a>
                {entry.badge ? <span className="badge">{entry.badge}</span> : null}
              </li>
            ))}
          </ul>
          {group.entries.length > 12 ? (
            <p className="group-more">+ {group.entries.length - 12} resultados do mesmo tipo</p>
          ) : null}
        </section>
      ))}
    </div>
  );
}
