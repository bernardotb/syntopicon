import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createDomain, validateDomain, PASSAGE_ABSENT } from "../src/domain.mjs";

const data = JSON.parse(await readFile(new URL("../data/justice.json", import.meta.url), "utf8"));
const domain = createDomain(data);

test("integridade, IDs e relações resolvidas", () => {
  const result = validateDomain(domain);
  assert.equal(result.valid, true, JSON.stringify(result));
  assert.deepEqual(result.duplicates, []);
  assert.deepEqual(result.brokenParents, []);
  assert.deepEqual(result.brokenReferences, []);
});

test("contagens são derivadas do snapshot", () => {
  assert.deepEqual(domain.counts, { topics: 41, references: 18, authors: 17, works: 20, terms: 1, crossReferences: 10, passages: 0, additionalReadings: 60 });
  assert.equal(domain.refsForTopic("8c(1)").length, 18);
});

test("localizadores literais pertencem ao rawText", () => {
  assert.deepEqual(validateDomain(domain).alteredLocators, []);
});

test("Reference e Passage são entidades distintas", () => {
  assert.equal(data.passages.length, 0);
  assert.equal(PASSAGE_ABSENT, "Passagem não incorporada ao corpus digital.");
  assert.ok(data.references.every((reference) => reference.resolution.passage === "unresolved"));
});

test("golden path resolve tópico, reference, work e author", () => {
  const reference = domain.refsById.get("ref:justice:8c1:001");
  const work = domain.works.get("work:aristotle:ethics");
  const author = domain.authors.get("author:aristotle");
  assert.equal(domain.topicsByCode.get("8c(1)").titleOriginal, "Economic exploitation: chattel slavery and wage slavery");
  assert.equal(reference.authorRaw, "ARISTOTLE");
  assert.ok(work.referenceIds.includes(reference.id));
  assert.ok(author.referenceIds.includes(reference.id));
});

test("busca lexical encontra Chattel slavery e aponta para 8c(1)", () => {
  const results = domain.search("chattel slavery");
  assert.ok(results.some((result) => result.kind === "term"));
  assert.equal(validateDomain(domain).chattelValid, true);
});

test("cross-references globais não recebem tópico de origem", () => {
  assert.ok(data.crossReferences.every((reference) => reference.sourceTopicId === null));
});
