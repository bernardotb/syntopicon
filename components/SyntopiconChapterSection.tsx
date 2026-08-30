import type { ReactNode } from "react";

export function SyntopiconChapterSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="chapter-section" aria-labelledby={`section-${title}`}>
      <h2 id={`section-${title}`}>{title}</h2>
      {children}
    </section>
  );
}
