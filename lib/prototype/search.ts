import { ideas, ideaUrl } from "@/data/ideas";
import {
  justiceAuthors,
  justiceAuthorsForTopic,
  justiceTopicAuthors,
  justiceTopics,
  justiceWorks,
  JUSTICE,
} from "@/data/justice";

export type SearchType = "ideia" | "topico" | "autor" | "obra";

export type SearchEntry = {
  type: SearchType;
  title: string;
  subtitle: string;
  href: string;
  badge: string | null;
};

export const TYPE_LABELS: Record<SearchType, string> = {
  ideia: "Grandes Ideias",
  topico: "Tópicos",
  autor: "Autores",
  obra: "Obras",
};

export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const idea of ideas) {
    entries.push({
      type: "ideia",
      title: idea.name,
      subtitle: idea.nameEn ?? "",
      href: ideaUrl(idea),
      badge: idea.number === JUSTICE.ideaNumber ? "Golden case · incorporado" : "estrutura pendente",
    });
  }

  for (const topic of justiceTopics) {
    const authorsCount = (justiceTopicAuthors[topic.slug] ?? []).length;
    const refsCount = justiceAuthorsForTopic(topic.slug).length;
    entries.push({
      type: "topico",
      title: topic.titlePt ?? topic.titleEn,
      subtitle: topic.titlePt ? topic.titleEn : `Justiça · nível ${topic.level}`,
      href: `/ideias/${JUSTICE.ideaNumber}-${JUSTICE.ideaSlugEn}/${topic.slug}`,
      badge: topic.code ? `código ${topic.code}` : topic.provisional ? "código impresso pendente" : null,
    });
    void authorsCount;
    void refsCount;
  }

  for (const author of justiceAuthors) {
    entries.push({
      type: "autor",
      title: author.namePt,
      subtitle: author.nameEn,
      href: `/autores/${author.slug}`,
      badge: null,
    });
  }

  for (const work of justiceWorks) {
    entries.push({
      type: "obra",
      title: work.titlePt,
      subtitle: work.titleEn,
      href: `/obras/${work.slug}`,
      badge: null,
    });
  }

  return entries;
}

export function normalizeQuery(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function searchIndex(entries: readonly SearchEntry[], query: string): SearchEntry[] {
  const needle = normalizeQuery(query);
  if (!needle) return [];
  return entries.filter((entry) => {
    const haystack = normalizeQuery(`${entry.title} ${entry.subtitle}`);
    return haystack.includes(needle);
  });
}
