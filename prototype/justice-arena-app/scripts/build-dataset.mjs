// build-dataset.mjs — gera os datasets JSON do protótipo a partir das fontes canônicas.
//
// USO (a partir de um checkout/worktree do repositório bernardotb/syntopicon
// no commit 21d60ce — branch arena/01a06414-syntopicon):
//
//   cd <caminho/do/checkout-canônico>
//   npx tsx <caminho/do/protótipo>/scripts/build-dataset.mjs \
//     --source . --out <caminho/do/protótipo>/data
//
// O script é executado COM tsx a partir do diretório da fonte para que os
// aliases "@/..." do tsconfig da fonte resolvam. Ele NÃO altera nenhum arquivo
// da fonte: apenas lê os módulos de dados e o documento RAW, e grava JSONs
// versionados no diretório de saída do protótipo.
//
// Fontes lidas (todas em --source):
//   data/justice-1952-full.ts      (dataset canônico Justice 1952, RAW FIRST)
//   data/justice.ts                (camada de demonstração: obras/refs/passagens + autores PT)
//   data/ideas.ts                  (102 ideias, numeração canônica EN/PT)
//   data/source-registry.ts        (registro de fontes)
//   docs/corpus/justice-1952-texto-integral-colagem-dono.md  (RAW: Introduction EN + Additional Readings)
//
// Princípios:
//   RAW FIRST — locatorRaw e textos brutos são copiados sem transformação.
//   Nenhum dado é inventado; o que não existe na fonte não é gerado.
//   Proveniência por registro é preservada e propagada.

import { mkdir, writeFile, readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const args = process.argv.slice(2);
const getArg = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const source = resolve(getArg("--source") ?? ".");
const out = resolve(getArg("--out") ?? new URL("../data", import.meta.url).pathname);

const GENERATED_AT = new Date().toISOString().slice(0, 10);
const SOURCE_COMMIT = getArg("--commit") ?? "21d60ce065c5dd8a795e2fc8f6fe761b35ad6a35";
const SOURCE_REF = getArg("--ref") ?? "arena/01a06414-syntopicon";

const sha256 = (s) => createHash("sha256").update(s, "utf8").digest("hex");

async function main() {
  // Importa os módulos TS da fonte (tsx resolve os aliases do tsconfig da fonte).
  const full = await import(resolve(source, "data/justice-1952-full.ts"));
  const justice = await import(resolve(source, "data/justice.ts"));
  const ideasMod = await import(resolve(source, "data/ideas.ts"));
  const registry = await import(resolve(source, "data/source-registry.ts"));

  mkdir(out, { recursive: true });

  // ── 1. justice-1952.json — o corpus canônico ─────────────────────────────
  const justice1952 = {
    manifest: {
      generatedAt: GENERATED_AT,
      sourceRepository: "bernardotb/syntopicon",
      sourceRef: SOURCE_REF,
      sourceCommit: SOURCE_COMMIT,
      sourceFile: "data/justice-1952-full.ts",
      method: "Importação direta do módulo TS canônico (sem transformação de conteúdo). locatorRaw copiado byte a byte.",
      provenanceRule: "Cada registro preserva o provenance da fonte (sourceId + layer).",
    },
    meta: full.JUSTICE_1952_META,
    canonicalProvenance: full.P_1952,
    displayProvenance: full.P_1952_PT,
    topics: full.justice1952Topics,
    references: full.justice1952References,
    crossReferences: full.justice1952CrossRefs,
    introPtBr: full.justice1952IntroPtBr,
    parseStats: full.justice1952ParseStats,
  };
  await writeFile(resolve(out, "justice-1952.json"), JSON.stringify(justice1952, null, 2) + "\n");

  // ── 2. introduction-en.json — Introduction EN, extraída do RAW (não editada à mão) ──
  const rawPath = resolve(source, "docs/corpus/justice-1952-texto-integral-colagem-dono.md");
  const raw = await readFile(rawPath, "utf8");
  const lines = raw.split("\n");
  const introStart = lines.findIndex((l) => l.trim() === "*INTRODUCTION*");
  const outlineStart = lines.findIndex((l) => l.trim() === "*OUTLINE OF TOPICS*");
  if (introStart < 0 || outlineStart < 0 || outlineStart <= introStart) {
    throw new Error("Limites da Introduction não encontrados no RAW.");
  }
  // Artefatos de digitalização removidos (não são texto de sentença):
  //  - "--- Página N ---"        (separadores do export)
  //  - "CHAPTER 42: JUSTICE 8xx" (cabeçalho corrido)
  //  - "8xx THE GREAT IDEAS"     (cabeçalho corrido)
  //  - números de página isolados ("850")
  //  - "--- BEGIN RAW ..." / "--- END RAW ---"
  const ARTIFACT = /^(--- Página \d+ ---|CHAPTER 42: JUSTICE \d+|\d+ THE GREAT IDEAS|\d{3}|--- BEGIN RAW.*|--- END RAW.*|)$/i;
  const introLines = lines.slice(introStart + 1, outlineStart);
  const paragraphs = [];
  let buf = [];
  for (const line of introLines) {
    const t = line.trim();
    if (t === "") {
      if (buf.length) paragraphs.push(buf.join(" "));
      buf = [];
    } else if (!ARTIFACT.test(t)) {
      buf.push(t);
    }
  }
  if (buf.length) paragraphs.push(buf.join(" "));

  const introductionEn = {
    manifest: {
      generatedAt: GENERATED_AT,
      sourceRepository: "bernardotb/syntopicon",
      sourceRef: SOURCE_REF,
      sourceCommit: SOURCE_COMMIT,
      sourceFile: "docs/corpus/justice-1952-texto-integral-colagem-dono.md",
      method: "Extração automática: parágrafos entre *INTRODUCTION* e *OUTLINE OF TOPICS*. Apenas artefatos de digitalização (separadores de página, cabeçalhos corridos, folhas soltas de número de página) foram excluídos; nenhum texto de sentença foi alterado, unido ou reescrito.",
      rawSha256: sha256(raw),
    },
    provenance: {
      sourceId: "source:syntopicon-1952",
      layer: "original-corpus",
      note: "Texto EN da Introduction, edição 1952, pp. impressas 850–858. RAW de leitura; a camada canônica de ingestão permanece a do PDF (branch corpus).",
    },
    paragraphs,
  };
  await writeFile(resolve(out, "introduction-en.json"), JSON.stringify(introductionEn, null, 2) + "\n");

  // ── 3. additional-readings.json — seção RAW final do capítulo ────────────
  const arStart = lines.findIndex((l) => l.trim() === "ADDITIONAL READINGS");
  if (arStart < 0) throw new Error("Seção ADDITIONAL READINGS não encontrada no RAW.");
  const arLines = lines.slice(arStart);
  const arParagraphs = [];
  buf = [];
  for (const line of arLines) {
    const t = line.trim();
    if (t === "") {
      if (buf.length) arParagraphs.push(buf.join(" "));
      buf = [];
    } else if (!/^(--- Página \d+ ---|CHAPTER 42: JUSTICE \d+|\d+ THE GREAT IDEAS|--- END RAW.*)$/i.test(t)) {
      buf.push(t);
    }
  }
  if (buf.length) arParagraphs.push(buf.join(" "));
  const additionalReadings = {
    manifest: {
      generatedAt: GENERATED_AT,
      sourceRepository: "bernardotb/syntopicon",
      sourceRef: SOURCE_REF,
      sourceCommit: SOURCE_COMMIT,
      sourceFile: "docs/corpus/justice-1952-texto-integral-colagem-dono.md",
      method: "Extração automática da seção ADDITIONAL READINGS até o fim do RAW. Texto preservado como está (RAW, não parseado).",
    },
    provenance: {
      sourceId: "source:syntopicon-1952",
      layer: "original-corpus",
      note: "Additional Readings do cap. Justice, edição 1952 (p. impressa 879). Obras FORA dos Great Books — não geram entidades Work/Author no corpus digital; exibidas como lista bruta.",
    },
    paragraphs: arParagraphs,
  };
  await writeFile(resolve(out, "additional-readings.json"), JSON.stringify(additionalReadings, null, 2) + "\n");

  // ── 4. demo-layer.json — camada de demonstração (interpretiva, rotulada) ──
  const demo = {
    manifest: {
      generatedAt: GENERATED_AT,
      sourceRepository: "bernardotb/syntopicon",
      sourceRef: SOURCE_REF,
      sourceCommit: SOURCE_COMMIT,
      sourceFile: "data/justice.ts",
      method: "Importação direta. Passagens de demonstração: texto real de domínio público; o vínculo passagem↔tópico é seleção editorial — SEMPRE marcado como INTERPRETIVE/DEMONSTRAÇÃO.",
    },
    ideaIdentity: justice.JUSTICE,
    canonStructure: justice.JUSTICE_CANON,
    notIngested: justice.JUSTICE_NOT_INGESTED,
    works: justice.justiceWorks,
    demoReferences: justice.justiceReferences,
    demoPassages: justice.justicePassages,
    authorDisplay: justice.justiceAuthors.map((a) => ({
      slug: a.slug, nameEn: a.nameEn, namePt: a.namePt, note: a.note ?? null,
      provenance: a.provenance,
    })),
  };
  await writeFile(resolve(out, "demo-layer.json"), JSON.stringify(demo, null, 2) + "\n");

  // ── 5. ideas-102.json — identidade das 102 ideias ────────────────────────
  const ideas = {
    manifest: {
      generatedAt: GENERATED_AT,
      sourceRepository: "bernardotb/syntopicon",
      sourceRef: SOURCE_REF,
      sourceCommit: SOURCE_COMMIT,
      sourceFile: "data/ideas.ts",
    },
    list: ideasMod.ideas,
  };
  await writeFile(resolve(out, "ideas-102.json"), JSON.stringify(ideas, null, 2) + "\n");

  // ── 6. sources.json — registro de fontes ──────────────────────────────────
  const sources = {
    manifest: {
      generatedAt: GENERATED_AT,
      sourceRepository: "bernardotb/syntopicon",
      sourceRef: SOURCE_REF,
      sourceCommit: SOURCE_COMMIT,
      sourceFile: "data/source-registry.ts",
    },
    registry: registry.sources,
  };
  await writeFile(resolve(out, "sources.json"), JSON.stringify(sources, null, 2) + "\n");

  // ── Resumo ────────────────────────────────────────────────────────────────
  console.log("Datasets gerados em", out);
  console.log("  justice-1952.json:      topics=%d references=%d crossRefs=%d introPt=%d",
    justice1952.topics.length, justice1952.references.length, justice1952.crossReferences.length, justice1952.introPtBr.length);
  console.log("  introduction-en.json:   paragraphs=%d", introductionEn.paragraphs.length);
  console.log("  additional-readings.json: paragraphs=%d", additionalReadings.paragraphs.length);
  console.log("  demo-layer.json:        works=%d demoRefs=%d demoPassages=%d authors=%d",
    demo.works.length, demo.demoReferences.length, demo.demoPassages.length, demo.authorDisplay.length);
  console.log("  ideas-102.json:         ideas=%d", ideas.list.length);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
