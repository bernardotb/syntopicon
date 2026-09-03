export type EntityId = `${"idea" | "topic" | "author" | "work" | "reference" | "passage" | "term" | "source"}:${string}`;

export type Source = {
  id: EntityId;
  title: string;
  kind: "original-corpus" | "derived-dataset" | "interpretive-content" | "editorial-source" | "benchmark-observation";
  status: "verified-local" | "verified-secondary" | "unverified";
  note?: string;
};

export type Provenance = {
  sourceId: Source["id"];
  layer: "original-corpus" | "derived-structure" | "interpretive-content";
};

export type Idea = {
  id: `idea:${string}`;
  /** número canônico 1–102 (ordem alfabética EN do Syntopicon) */
  number?: number;
  name: string;
  /** slug derivado do nome em português (apresentação) */
  slug: string;
  /** nome canônico em inglês (fonte primária) */
  nameEn?: string;
  /** slug canônico EN — usado em URL; a tradução PT é apresentação */
  slugEn?: string;
  provenance: Provenance;
};

export type Topic = {
  id: `topic:${string}`;
  name: string;
  /** código impresso no outline do Syntopicon, ex.: "8", "8c(1)" — só quando confirmado */
  code?: string;
  /** título canônico EN */
  titleEn?: string;
  /** título de apresentação em PT (tradução derivada) */
  titlePt?: string;
  /** nível na árvore do outline (1..3) */
  level?: number;
  /** id do topic pai no outline */
  parentId?: string | null;
  provenance: Provenance;
};

export type Author = { id: `author:${string}`; name: string; provenance: Provenance };
export type Work = { id: `work:${string}`; title: string; provenance: Provenance };
export type Reference = {
  id: `reference:${string}`;
  provenance: Provenance;
};
export type Passage = { id: `passage:${string}`; provenance: Provenance };
export type Term = { id: `term:${string}`; label: string; provenance: Provenance };

export function canonicalizeIdeaSlug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function canonicalIdeaId(name: string): `idea:${string}` {
  return `idea:${canonicalizeIdeaSlug(name)}`;
}

export function assertCanonicalIdeas(ideas: readonly Idea[]): void {
  if (ideas.length !== 102) throw new Error(`Expected 102 canonical ideas; received ${ideas.length}.`);
  const ids = new Set(ideas.map((idea) => idea.id));
  const slugs = new Set(ideas.map((idea) => idea.slug));
  if (ids.size !== ideas.length) throw new Error("Canonical idea IDs must be unique.");
  if (slugs.size !== ideas.length) throw new Error("Canonical idea slugs must be unique.");
}

/** garante que a numeração canônica é 1..102 única e coerente com slugEn */
export function assertCanonicalIdeaOrder(ideas: readonly Idea[]): void {
  ideas.forEach((idea, index) => {
    if (idea.number !== index + 1) {
      throw new Error(`Idea ${idea.name} must occupy canonical position ${index + 1}; received ${idea.number}.`);
    }
    if (!idea.nameEn || !idea.slugEn) {
      throw new Error(`Idea ${idea.name} is missing canonical EN name/slug.`);
    }
  });
}
