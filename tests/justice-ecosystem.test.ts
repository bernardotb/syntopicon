import assert from "node:assert/strict";
import test from "node:test";
import { ecosystemByIdeaSlug, ecosystemTieRelations, justiceEcosystem } from "@/data/justice-ecosystem";
import { ideas } from "@/data/ideas";
import { createKnowledgeGraph } from "@/lib/knowledge-graph";
import { canonicalIdeaId } from "@/lib/syntopicon";

const CURATED_KINDS = ["CONTRIBUTES_TO", "CROSS_REFERENCES", "OPPOSES"] as const;

test("the justice ecosystem only relates canonical ideas", () => {
  // Throws if any endpoint is unresolved in the canonical dataset.
  createKnowledgeGraph(ideas, ecosystemTieRelations(justiceEcosystem));
});

test("every ecosystem tie touches only the center, with a curated kind and gloss", () => {
  assert.equal(justiceEcosystem.centerId, canonicalIdeaId("Justiça"));
  const seen = new Set<string>();
  for (const tie of justiceEcosystem.ties) {
    assert.notEqual(tie.withIdeaId, justiceEcosystem.centerId);
    assert.ok((CURATED_KINDS as readonly string[]).includes(tie.kind));
    assert.ok(tie.gloss.trim().length > 0);
    assert.ok(!seen.has(tie.withIdeaId), "a neighbor must not repeat");
    seen.add(tie.withIdeaId);
  }
  assert.equal(justiceEcosystem.ties.length, seen.size);
});

test("every ecosystem tie belongs to a declared cluster", () => {
  const clusterIds = new Set(justiceEcosystem.clusters.map((cluster) => cluster.id));
  for (const tie of justiceEcosystem.ties) assert.ok(clusterIds.has(tie.clusterId));
  for (const cluster of justiceEcosystem.clusters) {
    assert.ok(cluster.name.trim().length > 0);
    assert.ok(cluster.description.trim().length > 0);
  }
});

test("the ecosystem declares its own interpretive provenance", () => {
  assert.equal(justiceEcosystem.provenance.sourceId, "source:justice-ecosystem-reading");
  assert.equal(justiceEcosystem.provenance.layer, "interpretive-content");
  for (const relation of ecosystemTieRelations(justiceEcosystem)) {
    assert.equal(relation.sourceId, justiceEcosystem.provenance.sourceId);
  }
});

test("the ecosystem is a deliberate part of the whole, not the whole graph", () => {
  assert.ok(justiceEcosystem.ties.length < ideas.length - 1);
});

test("the ecosystem is registered for static generation", () => {
  assert.equal(ecosystemByIdeaSlug.get("justica"), justiceEcosystem);
});
