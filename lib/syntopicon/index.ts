export type EntityId = `${"idea" | "topic" | "author" | "work" | "reference" | "passage" | "term" | "source"}:${string}`;

export type Source = {
  id: EntityId;
  title: string;
  kind: "original-corpus" | "derived-dataset" | "interpretive-content";
  status: "verified-local" | "unverified";
  note?: string;
};

export type Provenance = {
  sourceId: Source["id"];
  layer: "original-corpus" | "derived-structure" | "interpretive-content";
};

export type Idea = {
  id: `idea:${string}`;
  slug: string;
  name: string;
  provenance: Provenance;
};

export type Topic = { id: `topic:${string}`; name: string; provenance: Provenance };
export type Author = { id: `author:${string}`; name: string; provenance: Provenance };
export type Work = { id: `work:${string}`; title: string; provenance: Provenance };
export type Reference = { id: `reference:${string}`; provenance: Provenance };
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
