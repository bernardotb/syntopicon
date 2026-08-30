import assert from "node:assert/strict";
import test from "node:test";
import { ideas } from "@/data/ideas";
import { createKnowledgeGraph } from "@/lib/knowledge-graph";
import { assertCanonicalIdeas, canonicalIdeaId, canonicalizeIdeaSlug } from "@/lib/syntopicon";

test("the canonical dataset has 102 unique IDs and slugs", () => {
  assertCanonicalIdeas(ideas);
});

test("every canonical idea retains provenance", () => {
  for (const idea of ideas) {
    assert.equal(idea.provenance.sourceId, "source:syntopicon-canonical-ideas-list");
    assert.equal(idea.provenance.layer, "derived-structure");
  }
});

test("normalization creates stable slugs and IDs", () => {
  assert.equal(canonicalizeIdeaSlug("Necessidade e Contingência"), "necessidade-e-contingencia");
  assert.equal(canonicalIdeaId("Necessidade e Contingência"), "idea:necessidade-e-contingencia");
});

test("a graph rejects a relation with an unknown endpoint", () => {
  assert.throws(() => createKnowledgeGraph(ideas, [{
    from: ideas[0].id,
    to: "idea:unknown",
    kind: "CROSS_REFERENCES",
    sourceId: "source:syntopicon-canonical-ideas-list",
  }]));
});
