"use client";

import { useMemo, useState } from "react";

type Entry = { number: number; namePt: string; nameEn: string; href: string; hasData: boolean };

export function IdeasIndexClient({ entries }: { entries: readonly Entry[] }) {
  const [query, setQuery] = useState("");
  const [alphabetical, setAlphabetical] = useState(false);

  const visible = useMemo(() => {
    const needle = query
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
    const filtered = needle
      ? entries.filter((entry) =>
          `${entry.namePt} ${entry.nameEn} ${entry.number}`
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .includes(needle),
        )
      : entries;
    return alphabetical ? [...filtered].sort((a, b) => a.namePt.localeCompare(b.namePt, "pt-BR")) : filtered;
  }, [entries, query, alphabetical]);

  return (
    <div className="ideas-index">
      <div className="index-controls">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filtrar por nome (PT ou EN) ou número…"
          aria-label="Filtrar Grandes Ideias"
        />
        <button
          type="button"
          className="toggle"
          aria-pressed={alphabetical}
          onClick={() => setAlphabetical((current) => !current)}
        >
          {alphabetical ? "Ordem canônica" : "Índice A–Z"}
        </button>
      </div>
      <ol className="idea-index-list">
        {visible.map((entry) => (
          <li key={entry.number} className={entry.hasData ? "has-data" : undefined}>
            <a href={entry.href}>
              <span className="idea-number">{entry.number}</span>
              <span className="idea-names">
                <strong>{entry.namePt}</strong>
                <em>{entry.nameEn}</em>
              </span>
              {entry.hasData ? <span className="golden-tag">Golden case</span> : null}
            </a>
          </li>
        ))}
      </ol>
      {visible.length === 0 ? <p className="empty-inline">Nenhuma ideia corresponde ao filtro.</p> : null}
    </div>
  );
}
