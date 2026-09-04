import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  JUSTICE_1952_META,
  P_1952,
  justice1952Children,
  justice1952CrossRefs,
  justice1952IntroPtBr,
  justice1952ParseStats,
  justice1952References,
  justice1952ReferencesForTopic,
  justice1952Roots,
  justice1952TopicBySlug,
  justice1952TopicPath,
  justice1952Topics,
} from "@/data/justice-1952-full";
import { parseJustice1952 } from "@/lib/syntopicon/justice-1952-parser";

const MD_RAW = "docs/corpus/justice-1952-texto-integral-colagem-dono.md";

test("a edição ingerida é a 1952 e o selo canônico está marcado como pendente", () => {
  assert.equal(JUSTICE_1952_META.edition, "1952");
  assert.equal(JUSTICE_1952_META.chapterNumber, 42);
  assert.equal(JUSTICE_1952_META.canonicalSeal, "PENDING_PDF_UPLOAD_CORPUS");
  assert.equal(P_1952.sourceId, "source:syntopicon-1952");
});

test("o outline canônico tem 41 nós (11+28+2) na ordem impressa", () => {
  assert.equal(justice1952Topics.length, 41);
  assert.equal(justice1952Roots().length, 11);
  assert.equal(justice1952Topics.filter((t) => t.level === 2).length, 28);
  assert.equal(justice1952Topics.filter((t) => t.level === 3).length, 2);
  // ordem impressa: primeiro nó é "1", último é "11b"
  assert.equal(justice1952Topics[0].code, "1");
  assert.equal(justice1952Topics[40].code, "11b");
  // orderIndex é sequencial sem buracos
  justice1952Topics.forEach((t, i) => assert.equal(t.orderIndex, i + 1));
});

test("hierarquia de filhos confere com o outline impresso", () => {
  const codesOf = (slug: string) => justice1952Children(slug).map((c) => c.code);
  assert.deepEqual(codesOf("1"), ["1a", "1b", "1c", "1d", "1e", "1f"]);
  assert.deepEqual(codesOf("6"), ["6a", "6b", "6c", "6d", "6e"]);
  assert.deepEqual(codesOf("8"), ["8a", "8b", "8c", "8d"]);
  assert.deepEqual(codesOf("8c"), ["8c(1)", "8c(2)"]);
  assert.deepEqual(codesOf("9"), ["9a", "9b", "9c", "9d", "9e", "9f", "9g"]);
  assert.deepEqual(codesOf("10"), ["10a", "10b", "10c", "10d"]);
  assert.deepEqual(codesOf("11"), ["11a", "11b"]);
  // pais resolvem
  for (const t of justice1952Topics) {
    if (t.parentSlug) assert.ok(justice1952TopicBySlug(t.parentSlug), `pai ${t.parentSlug} de ${t.slug} não resolve`);
  }
});

test("códigos impressos de todos os 41 nós estão presentes (sem provisórios)", () => {
  for (const t of justice1952Topics) {
    assert.ok(t.code.length > 0, "todo nó canônico tem código impresso");
    assert.ok(t.titleEn.length > 10, "título EN não vazio");
    assert.ok(t.titlePt.length > 5, "título PT (displayPtBr) não vazio");
  }
});

test("títulos EN exatos batem com a fonte impressa (casos críticos)", () => {
  assert.equal(justice1952TopicBySlug("8c-1")?.titleEn, "Economic exploitation: chattel slavery and wage slavery");
  assert.equal(justice1952TopicBySlug("8d")?.titleEn, "Justice and the use of money: usury and interest rates");
  assert.equal(justice1952TopicBySlug("2")?.titleEn, "The precepts of justice: doing good, harming no one, rendering to each his own, treating equals equally");
});

test("título PT do 8c(1) usa a revisão 'escravidão de propriedade' e registra a nota", () => {
  const node = justice1952TopicBySlug("8c-1")!;
  assert.ok(node.titlePt.includes("escravidão de propriedade"));
  assert.ok(!node.titlePt.includes("por dívida"));
  assert.ok(node.titlePtNote?.includes("chattel"));
});

test("âncoras de página impressa: presentes só onde a fonte imprime âncora", () => {
  assert.equal(justice1952TopicBySlug("1")?.printedPageAnchor, null);
  assert.equal(justice1952TopicBySlug("2")?.printedPageAnchor, null);
  assert.equal(justice1952TopicBySlug("10")?.printedPageAnchor, null);
  assert.equal(justice1952TopicBySlug("1c")?.printedPageAnchor, 860);
  assert.equal(justice1952TopicBySlug("8b")?.printedPageAnchor, 867);
  assert.equal(justice1952TopicBySlug("8c")?.printedPageAnchor, 868);
  assert.equal(justice1952TopicBySlug("9e")?.printedPageAnchor, 871);
  assert.equal(justice1952TopicBySlug("10b")?.printedPageAnchor, 874);
  assert.equal(justice1952TopicBySlug("11")?.printedPageAnchor, 876);
});

test("8c(1) tem exatamente 18 linhas de referência, na ordem impressa", () => {
  const refs = justice1952ReferencesForTopic("8c-1");
  assert.equal(refs.length, 18);
  assert.deepEqual(
    refs.map((r) => r.authorRaw),
    [
      "ARISTOTLE", "PLUTARCH", "AQUINAS", "MILTON", "SWIFT", "ROUSSEAU", "SMITH",
      "GIBBON", "GIBBON", "KANT", "CONSTITUTION OF THE U.S.", "MILL", "BOSWELL",
      "HEGEL", "MARX", "MARX-ENGELS", "TOLSTOY", "DOSTOEVSKY",
    ],
  );
});

test("locatorRaw está INTOCADO: sobrescritos Bekker, 'esp', 'passim' e quebras preservados", () => {
  const aristotle = justice1952ReferencesForTopic("8c-1").find((r) => r.authorRaw === "ARISTOTLE")!;
  assert.ok(aristotle.locatorRaw.includes("1134ᵇ7–17"));
  assert.ok(aristotle.locatorRaw.includes("*Athenian Constitution*, CH 2 553a–c"));
  assert.equal(aristotle.volume, 9);
  const marx = justice1952ReferencesForTopic("8c-1").find((r) => r.authorRaw === "MARX")!;
  assert.ok(marx.locatorRaw.includes("1a–383d esp 102b–105c"));
  const locke = justice1952ReferencesForTopic("1a").find((r) => r.authorRaw === "LOCKE")!;
  assert.ok(locke.locatorRaw.includes("passim"));
});

test("segmentos de obra são derivados sem tocar o bruto (Aristotle em 8c(1))", () => {
  const aristotle = justice1952ReferencesForTopic("8c-1").find((r) => r.authorRaw === "ARISTOTLE")!;
  assert.deepEqual(
    aristotle.workSegments.map((s) => s.workTitle),
    ["Ethics", "Politics", "Athenian Constitution"],
  );
});

test("linhas bíblicas são obras, não autores (entryKind 'bible', volume null)", () => {
  const topic2 = justice1952ReferencesForTopic("2");
  const ot = topic2.find((r) => r.entryKind === "bible")!;
  assert.equal(ot.authorRaw, "OLD TESTAMENT");
  assert.equal(ot.volume, null);
  assert.equal(topic2.filter((r) => r.entryKind === "bible").length, 2); // OT + NT
  const topic4 = justice1952ReferencesForTopic("4");
  assert.ok(topic4.some((r) => r.authorRaw === "APOCRYPHA"));
});

test("total de linhas de referência é 826 e todo tópico menos 1 e 11 tem bloco próprio", () => {
  assert.equal(justice1952References.length, 826);
  const withRefs = new Set(justice1952References.map((r) => r.topicSlug));
  for (const t of justice1952Topics) {
    if (t.code === "1" || t.code === "11") {
      assert.ok(!withRefs.has(t.slug), `tópico ${t.code} não tem bloco próprio na fonte`);
    } else {
      assert.ok(withRefs.has(t.slug), `tópico ${t.code} deveria ter referências`);
    }
  }
});

test("as 10 remissões cruzadas entraram com conteúdo", () => {
  assert.equal(justice1952CrossRefs.length, 10);
  const five = justice1952CrossRefs.find((c) => c.n === 5)!;
  assert.ok(five.textRaw.includes("DEMOCRACY 4a(2)"));
  assert.ok(five.textRaw.includes("SLAVERY"));
});

test("a introdução PT (displayPtBr) entrou como parágrafos, nunca como substituta da fonte", () => {
  assert.ok(justice1952IntroPtBr.length >= 40, `esperados ≥40 parágrafos, obtidos ${justice1952IntroPtBr.length}`);
  assert.ok(justice1952IntroPtBr.some((p) => p.includes("Platão")));
  assert.ok(justice1952IntroPtBr.some((p) => p.includes("Trasmaco") || p.includes("Trasímaco") || p.includes("Thrasymachus")));
});

test("nenhum warning de parsing e artefatos segregados com rastreabilidade", () => {
  assert.equal(justice1952ParseStats.warnings.length, 0);
  assert.ok(justice1952ParseStats.artifactLinesDiscarded > 40);
});

test("o parser reproduz o dataset a partir do RAW (reprodutibilidade)", () => {
  const md = readFileSync(MD_RAW, "utf8");
  const parsed = parseJustice1952(md);
  assert.equal(parsed.topics.length, justice1952Topics.length);
  assert.equal(parsed.references.length, justice1952References.length);
  assert.equal(parsed.warnings.length, 0);
  const refs8c1 = parsed.references.filter((r) => r.topicCode === "8c(1)");
  assert.equal(refs8c1.length, 18);
});

test("o caminho de navegação de 8c(1) é 8 → 8c → 8c(1)", () => {
  const path = justice1952TopicPath("8c-1").map((t) => t.code);
  assert.deepEqual(path, ["8", "8c", "8c(1)"]);
});
