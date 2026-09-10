// dataset.test.mjs — integridade do corpus: contagens derivadas, IDs únicos,
// relações resolvidas, locatorRaw literal, ausência de passagem inventada.
import test from "node:test";
import assert from "node:assert/strict";
import { loadDatasets, ROOT } from "./helpers.mjs";
import {
  buildContext,
  checkInvariants,
  refFlowArtifact,
  referencesForTopic,
  slugify,
  topicBySlug,
} from "../src/domain.js";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const ctx = buildContext(loadDatasets());

test("invariantes de domínio: IDs únicos e relações resolvidas", () => {
  const result = checkInvariants(ctx);
  assert.deepEqual(result.errors, []);
  assert.equal(result.ok, true);
});

test("contagens são derivadas e batem com a ingestão auditada da fonte", () => {
  assert.equal(ctx.counts.topics, 41);
  assert.equal(ctx.counts.topicsLevel1, 11);
  assert.equal(ctx.counts.topicsLevel2, 28);
  assert.equal(ctx.counts.topicsLevel3, 2);
  assert.equal(ctx.counts.references, 826);
  assert.equal(ctx.counts.authorReferences, 795);
  assert.equal(ctx.counts.bibleReferences, 31);
  assert.equal(ctx.counts.crossReferences, 10);
  assert.equal(ctx.counts.topicsWithReferences, 39);
  // tópicos 1 e 11 imprimem só o título (estado honesto na fonte)
  assert.deepEqual(ctx.counts.topicsWithoutReferences, ["1", "11"]);
});

test("golden case 8c(1): 18 referências na ordem impressa", () => {
  const refs = referencesForTopic(ctx.justice1952.references, "8c-1");
  assert.equal(refs.length, 18);
  const expectedHeads = [
    "ARISTOTLE", "PLUTARCH", "AQUINAS", "MILTON", "SWIFT", "ROUSSEAU", "SMITH",
    "GIBBON", "GIBBON", "KANT", "CONSTITUTION OF THE U.S.", "MILL", "BOSWELL",
    "HEGEL", "MARX", "MARX-ENGELS", "TOLSTOY", "DOSTOEVSKY",
  ];
  assert.deepEqual(refs.map((r) => r.authorRaw), expectedHeads);
});

test("locatorRaw permanece LITERAL — casos críticos com sobrescritos de Bekker, esp e passim", () => {
  const first = referencesForTopic(ctx.justice1952.references, "8c-1")[0];
  assert.equal(
    first.locatorRaw,
    "9 ARISTOTLE: *Ethics*, BK V, CH 6 [1134ᵇ7–17] 382b–c; BK VIII, CH 11 [1161ᵃ30–ᵇ10] 413c–d / *Politics*, BK I, CH 3–7 446d–449c; CH 11 [1259ᵃ18]–CH 13 [1260ᵇ7] 453c–455a; BK III, CH 6 [1278ᵇ32–37] 476a–b / *Athenian Constitution*, CH 2 553a–c",
  );
  const withEsp = ctx.justice1952.references.find((r) => r.locatorRaw.includes(" esp "));
  assert.ok(withEsp, "presença de 'esp' preservada em ao menos uma linha");
  const withPassim = ctx.justice1952.references.find((r) => r.locatorRaw.includes("passim"));
  assert.ok(withPassim, "presença de 'passim' preservada");
  const superscript = ctx.justice1952.references.find((r) => r.locatorRaw.includes("ᵇ"));
  assert.ok(superscript, "sobrescritos de Bekker preservados");
});

test("locatorRaw nunca é vazio nem normalizado silenciosamente", () => {
  for (const r of ctx.justice1952.references) {
    assert.ok(r.locatorRaw.trim().length > 0, `locatorRaw vazio em ${r.id}`);
    if (r.volume != null) {
      assert.ok(r.locatorRaw.startsWith(String(r.volume)), `volume não casa com locatorRaw em ${r.id}`);
    }
  }
});

test("estrutura do tópico 8c(1): código, títulos EN/PT e nota de tradução", () => {
  const t = topicBySlug(ctx.justice1952.topics, "8c-1");
  assert.equal(t.code, "8c(1)");
  assert.equal(t.titleEn, "Economic exploitation: chattel slavery and wage slavery");
  assert.ok(t.titlePt.includes("escravidão de propriedade"));
  assert.ok(!t.titlePt.includes("por dívida"));
  assert.ok(t.titlePtNote?.includes("chattel"));
});

test("Reference ≠ Passage: nenhuma passagem canônica; 4 demonstrações interpretativas", () => {
  assert.equal(ctx.demoLayer.demoPassages.length, 4);
  assert.equal(ctx.demoLayer.demoReferences.length, 4);
  for (const p of ctx.demoLayer.demoPassages) {
    assert.equal(p.provenance.layer, "interpretive-content");
    assert.ok(ctx.demoLayer.demoReferences.some((r) => r.id === p.referenceId), "passagem órfã");
  }
  // o corpus canônico não tem entidade de passagem
  assert.equal(ctx.justice1952.references.every((r) => !("passageText" in r)), true);
});

test("autores/obras derivados: contagens, tipos e ausência de entidades inventadas", () => {
  assert.equal(ctx.counts.authors, 59); // 60 cabeçalhos - 1 artefato de fluxo
  assert.equal(ctx.counts.flowArtifacts, 1);
  const flow = ctx.justice1952.references.find(refFlowArtifact);
  assert.equal(flow.id, "jr1952:6e:03");
  assert.ok(!ctx.authors.some((a) => a.nameRaw === "CHAPTER 42"), "artefato de fluxo não vira autor");
  assert.equal(ctx.counts.authorDocuments, 4); // Declaration, Articles, Constitution, Federalist
  assert.equal(ctx.counts.authorScriptures, 3); // OT, NT, Apocrypha
  // MARX e MARX-ENGELS permanecem distintos (como impressos)
  assert.ok(ctx.authors.some((a) => a.nameRaw === "MARX"));
  assert.ok(ctx.authors.some((a) => a.nameRaw === "MARX-ENGELS"));
});

test("cross-references globais não têm tópico de origem artificial", () => {
  for (const x of ctx.justice1952.crossReferences) {
    assert.deepEqual(Object.keys(x).sort(), ["n", "textRaw"]);
  }
});

test("Introduction EN e PT presentes e não vazias (bilinguismo da fonte)", () => {
  assert.equal(ctx.counts.introductionEnParagraphs, 60);
  assert.equal(ctx.counts.introductionPtParagraphs, 55);
  assert.ok(ctx.introductionEn.paragraphs[0].startsWith("THE discussion of justice"));
  const last = ctx.introductionEn.paragraphs.at(-1);
  assert.ok(last.includes("Gorgias"), "fim da Introduction EN íntegro");
});

test("Additional Readings: seção bruta presente com os dois grupos", () => {
  const text = ctx.additionalReadings.paragraphs.join("\n");
  assert.ok(text.includes("Works by authors represented"));
  assert.ok(text.includes("Works by authors not represented"));
  assert.ok(text.includes("KELSEN")); // último item registrado na fonte
});

test("manifesto de proveniência dos datasets aponta a fonte canônica exata", () => {
  for (const file of ["justice-1952.json", "introduction-en.json", "additional-readings.json", "demo-layer.json", "ideas-102.json", "sources.json"]) {
    const data = JSON.parse(readFileSync(join(ROOT, "data", file), "utf8"));
    assert.equal(data.manifest.sourceRepository, "bernardotb/syntopicon");
    assert.equal(data.manifest.sourceCommit, "21d60ce065c5dd8a795e2fc8f6fe761b35ad6a35");
    assert.equal(data.manifest.sourceRef, "arena/01a06414-syntopicon");
  }
});

test("termos do inventário: vínculos resolvem e evidência é explícita", () => {
  assert.equal(ctx.terms.length, 2);
  for (const term of ctx.terms) {
    assert.ok(term.evidence.edition);
    assert.ok(term.evidence.status);
    assert.ok(term.evidence.note.length > 50);
    for (const target of term.targets) {
      assert.ok(topicBySlug(ctx.justice1952.topics, target.topicSlug));
      assert.ok(ctx.ideas102.list.some((i) => i.number === target.ideaNumber));
    }
  }
  const chattel = ctx.terms.find((t) => t.label === "Chattel slavery");
  assert.equal(chattel.evidence.status, "VERIFIED_VIA_LOCAL_ARTIFACT__FINGERPRINT_PENDING");
  // verbete integral do Inventory 1990 (via justice-codex-app @ 0f6196e)
  assert.equal(
    chattel.rawText,
    "Chattel slavery: see Family 3a; Justice 8c(1); Labor 1f, 5a; Slavery 2b, 4a, 5a; Wealth 7b(1)",
  );
  assert.ok(chattel.evidence.note.includes("fingerprint"));
  // ponte de edição declarada como derivada — nunca canônica
  assert.equal(chattel.targets[0].editionBridge.layer, "derived-structure");
  assert.equal(chattel.targets[0].editionBridge.correspondingIncorporatedEdition, "1952");
  // alvos em outros capítulos permanecem texto bruto (não incorporados, não inferidos)
  assert.deepEqual(chattel.otherTargetsRaw, ["Family 3a", "Labor 1f, 5a", "Slavery 2b, 4a, 5a", "Wealth 7b(1)"]);
  const exploitation = ctx.terms.find((t) => t.label === "Exploitation / Economic slavery");
  assert.equal(exploitation.evidence.status, "VERIFIED_VIA_LEDGER");
});

test("102 ideias: numeração densa e única; Justiça é a de número 42", () => {
  const ideas = ctx.ideas102.list;
  assert.equal(ideas.length, 102);
  const numbers = new Set(ideas.map((i) => i.number));
  assert.equal(numbers.size, 102);
  const justice = ideas.find((i) => i.number === 42);
  assert.equal(justice.nameEn, "Justice");
  assert.equal(justice.name, "Justiça");
});
