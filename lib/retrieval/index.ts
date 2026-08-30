import type { Idea } from "@/lib/syntopicon";

export function findIdeas(query: string, ideas: readonly Idea[]): readonly Idea[] {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];
  return ideas.filter((idea) => normalize(idea.name).includes(normalizedQuery));
}

function normalize(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}
