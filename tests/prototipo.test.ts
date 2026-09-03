import assert from "node:assert/strict";
import test from "node:test";
import { ideas, ideaByCanonicalUrlSlug, ideaUrl } from "@/data/ideas";
import {
  JUSTICE,
  JUSTICE_CANON,
  justiceAuthorsForTopic,
  justiceChildren,
  justicePassages,
  justiceReferences,
  justiceReferencesForTopic,
  justiceRootTopics,
  justiceTopicAuthors,
  justiceTopicBySlug,
  justiceTopicPath,
  justiceTopics,
  justiceWorkBySlug,
  justiceAuthorBySlug,
} from "@/data/justice";
import { assertCanonicalIdeaOrder } from "@/lib/syntopicon";
import { buildSearchIndex, searchIndex } from "@/lib/prototype/search";

test("a ordem canônica das 102 ideias é densa, única e âncoras batem", () => {
  assertCanonicalIdeaOrder(ideas);
  const justice = ideas.find((idea) => idea.number === 42);
  assert.equal(justice?.nameEn, "Justice");
  assert.equal(justice?.name, "Justiça");
  assert.equal(ideas.find((idea) => idea.number === 17)?.nameEn, "Desire");
  assert.equal(ideas.find((idea) => idea.number === 87)?.name, "Escravidão");
  assert.equal(ideas.find((idea) => idea.number === 102)?.nameEn, "World");
  const slugEns = new Set(ideas.map((idea) => idea.slugEn));
  assert.equal(slugEns.size, 102);
});

test("URL canônica da ideia usa número + slugEn", () => {
  const justice = ideas.find((idea) => idea.number === 42)!;
  assert.equal(ideaUrl(justice), "/ideias/42-justice");
  assert.equal(ideaByCanonicalUrlSlug("42-justice")?.name, "Justiça");
  assert.equal(ideaByCanonicalUrlSlug("42-justica"), undefined);
});

test("a estrutura canônica de Justice é 11+28+2=41", () => {
  assert.equal(JUSTICE_CANON.level1 + JUSTICE_CANON.level2 + JUSTICE_CANON.level3, JUSTICE_CANON.totalNodes);
  assert.equal(JUSTICE_CANON.totalNodes, 41);
  assert.equal(JUSTICE_CANON.referencesStartPagePrinted, 859);
});

test("nós incorporados de Justice têm slugs únicos e pais resolvíveis", () => {
  const slugs = new Set(justiceTopics.map((node) => node.slug));
  assert.equal(slugs.size, justiceTopics.length);
  for (const node of justiceTopics) {
    if (node.parentSlug) {
      assert.ok(justiceTopicBySlug(node.parentSlug), `pai ${node.parentSlug} de ${node.slug} não resolve`);
    }
    if (node.provisional) assert.equal(node.code, null, "nó provisório não pode carregar código canônico");
  }
  assert.equal(justiceRootTopics().length, 11);
});

test("o subtree impresso do Topic 8 está completo e hierárquico", () => {
  const childrenOf8 = justiceChildren("8").map((node) => node.slug).sort();
  assert.deepEqual(childrenOf8, ["8a", "8b", "8c"]);
  const childrenOf8c = justiceChildren("8c").map((node) => node.code);
  assert.deepEqual(childrenOf8c, ["8c(1)", "8c(2)"]);
  const golden = justiceTopicBySlug("8c-1")!;
  assert.equal(golden.titleEn, "Economic exploitation: chattel slavery and wage slavery");
  assert.equal(golden.level, 3);
  assert.deepEqual(justiceTopicPath("8c-1").map((node) => node.code), ["8", "8c", "8c(1)"]);
});

test("presença autor↔tópico soma exatamente as contagens do benchmark", () => {
  for (const node of justiceTopics) {
    const entries = justiceTopicAuthors[node.slug];
    if (!entries || node.mirrorPassages === null) continue;
    const sum = entries.reduce((total, [, count]) => total + count, 0);
    assert.equal(sum, node.mirrorPassages, `soma de autores em ${node.slug}`);
  }
});

test("todas as presenças resolvem autores reais", () => {
  for (const [slug, entries] of Object.entries(justiceTopicAuthors)) {
    assert.ok(justiceTopicBySlug(slug), `tópico ${slug} deve existir`);
    for (const [authorSlug] of entries) {
      assert.ok(justiceAuthorBySlug(authorSlug), `autor ${authorSlug} deve existir`);
    }
    assert.equal(justiceAuthorsForTopic(slug).length, entries.length);
  }
});

test("References têm locatorRaw, resolvem autor/obra/tópico e admitem ser honestas", () => {
  assert.equal(justiceReferences.length, 4);
  for (const reference of justiceReferences) {
    assert.ok(reference.locatorRaw.length > 0);
    assert.equal(reference.syntopiconLocator, null, "locator do Syntopicon segue pendente (RAW FIRST)");
    assert.ok(justiceAuthorBySlug(reference.authorSlug));
    assert.ok(justiceWorkBySlug(reference.workSlug));
    assert.ok(justiceTopicBySlug(reference.topicSlug));
  }
  const goldenRefs = justiceReferencesForTopic("8c-1").map((reference) => reference.authorSlug).sort();
  assert.deepEqual(goldenRefs, ["aristotle", "smith"]);
});

test("passagens de demonstração apontam para referências reais", () => {
  const referenceIds = new Set(justiceReferences.map((reference) => reference.id));
  for (const passage of justicePassages) {
    assert.ok(referenceIds.has(passage.referenceId), `passagem ${passage.id} sem referência`);
    assert.ok(passage.textEn.length > 0);
    assert.equal(passage.provenance.sourceId, "source:prototype-demo-passages");
  }
  const leviata = justiceReferencesForTopic("8");
  assert.equal(leviata.length, 2);
});

test("o índice de busca agrupa por tipo e resolve os três casos de navegação", () => {
  const index = buildSearchIndex();
  const types = new Set(index.map((entry) => entry.type));
  assert.deepEqual([...types].sort(), ["autor", "ideia", "obra", "topico"]);

  // CASO A: ideia → tópico → passagem
  const justica = searchIndex(index, "justiça");
  assert.ok(justica.some((entry) => entry.href === "/ideias/42-justice" && entry.type === "ideia"));
  assert.ok(searchIndex(index, "exploração").some((entry) => entry.href === "/ideias/42-justice/8c-1"));

  // CASO B: autor → obra
  assert.ok(searchIndex(index, "hobbes").some((entry) => entry.href === "/autores/hobbes"));
  assert.ok(searchIndex(index, "leviat").some((entry) => entry.href === "/obras/leviathan"));

  // CASO C: termo → tópico (por título, derivado)
  const escravidao = searchIndex(index, "escravidão");
  assert.ok(escravidao.some((entry) => entry.href === "/ideias/42-justice/8c-1" && entry.type === "topico"));
  assert.ok(escravidao.some((entry) => entry.href === "/ideias/87-slavery" && entry.type === "ideia"));
});
