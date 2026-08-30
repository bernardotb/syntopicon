import type { EntityId, Idea } from "@/lib/syntopicon";

export type RelationKind = "HAS_TOPIC" | "HAS_REFERENCE" | "REFERENCES_WORK" | "HAS_PASSAGE" | "CROSS_REFERENCES" | "POINTS_TO" | "CONTRIBUTES_TO";
export type Relation = { from: EntityId; to: EntityId; kind: RelationKind; sourceId: EntityId };

export type KnowledgeGraph = {
  nodes: ReadonlyMap<EntityId, Idea>;
  relations: readonly Relation[];
};

export function createKnowledgeGraph(ideas: readonly Idea[], relations: readonly Relation[] = []): KnowledgeGraph {
  const nodes: Map<EntityId, Idea> = new Map(ideas.map((idea) => [idea.id, idea]));
  for (const relation of relations) {
    if (!nodes.has(relation.from) || !nodes.has(relation.to)) {
      throw new Error(`Relation ${relation.kind} has an unresolved endpoint.`);
    }
  }
  return { nodes, relations };
}
