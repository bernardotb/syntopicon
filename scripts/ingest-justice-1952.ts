/**
 * Ingestão canônica do capítulo Justice 1952.
 *
 * Entrada: docs/corpus/justice-1952-texto-integral-colagem-dono.md (RAW colado pelo Dono)
 *          docs/corpus/justice-1952-traducao-pt-chatgpt.md (camada de apresentação PT)
 * Saída:   data/justice-1952-full.ts (dataset canônico AUTO-GERADO — não editar à mão)
 *
 * Guarda-chuvas: o script FALHA se a estrutura esperada não bater
 * (41 nós; 18 linhas em 8c(1); 10 remissões; zero warnings de parsing).
 * Rodar: npx tsx scripts/ingest-justice-1952.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { parseJustice1952, codeToSlug, type ParsedTopic } from "@/lib/syntopicon/justice-1952-parser";

const MD_RAW = "docs/corpus/justice-1952-texto-integral-colagem-dono.md";
const MD_PT = "docs/corpus/justice-1952-traducao-pt-chatgpt.md";
const OUT = "data/justice-1952-full.ts";

/** Títulos PT da tradução ChatGPT — revisados (ver header do arquivo de tradução). */
const PT_TITLES: Record<string, { pt: string; note?: string }> = {
  "1": { pt: "Diversas concepções de justiça" },
  "1a": { pt: "A justiça como o interesse do mais forte ou a conformidade com a vontade do soberano" },
  "1b": { pt: "A justiça como harmonia ou reta ordem na alma: a justiça original" },
  "1c": { pt: "A justiça como virtude moral que direciona a atividade em relação aos outros e à comunidade: a distinção entre o homem justo e o ato justo" },
  "1d": { pt: "A justiça como totalidade da virtude e como virtude particular: a distinção entre o legal e o equitativo" },
  "1e": { pt: "A justiça como ato de vontade ou dever que cumpre obrigações para com o bem comum: a ação harmoniosa de vontades individuais sob uma lei universal de liberdade" },
  "1f": { pt: "A justiça como costume ou sentimento moral baseado em considerações de utilidade" },
  "2": { pt: "Os preceitos da justiça: fazer o bem, não lesar a ninguém, dar a cada um o que é seu, tratar os iguais com igualdade" },
  "3": { pt: "Os deveres da justiça comparados com a generosidade do amor e da amizade" },
  "4": { pt: "A comparação entre justiça e conveniência (utilidade): a escolha entre praticar e sofrer a injustiça; a relação da justiça com a felicidade" },
  "5": { pt: "Justiça e igualdade: as espécies de justiça em relação à medida e aos modos de igualdade e desigualdade" },
  "6": { pt: "Justiça e liberdade: a teoria dos direitos humanos" },
  "6a": { pt: "A relação dos direitos naturais com a lei natural e a justiça natural" },
  "6b": { pt: "A relação entre direitos naturais e positivos, direitos inatos e adquiridos, direitos privados e públicos: seus respectivos deveres correlativos" },
  "6c": { pt: "A inalienabilidade dos direitos naturais: sua violação pela tirania e pelo despotismo" },
  "6d": { pt: "A justiça como base para a distinção entre liberdade e licença (libertinagem)" },
  "6e": { pt: "A justiça e os direitos naturais como fonte da liberdade civil" },
  "7": { pt: "Justiça doméstica: os problemas de direito e dever na família" },
  "8": { pt: "Justiça econômica: justiça na produção, distribuição e troca" },
  "8a": { pt: "Propriedade privada e pública: a justa distribuição dos bens econômicos" },
  "8b": { pt: "Salários e preços justos: a troca justa de bens e serviços" },
  "8c": { pt: "Justiça na organização da produção" },
  "8c(1)": {
    pt: "Exploração econômica: escravidão de propriedade e escravidão assalariada",
    note: "Revisão da tradução (03/09): 'chattel' = propriedade/bem móvel — a tradução original dizia 'escravidão por dívida', incorreto.",
  },
  "8c(2)": { pt: "Lucro e ganho não decorrente do trabalho (unearned increment)" },
  "8d": { pt: "Justiça e o uso do dinheiro: usura e taxas de juros" },
  "9": { pt: "Justiça política: justiça no governo" },
  "9a": { pt: "O natural e o convencional na justiça política: lei natural e vontade geral" },
  "9b": { pt: "A justiça como princípio moral da organização política: o vínculo dos homens nos Estados" },
  "9c": { pt: "Os critérios de justiça em várias formas de governo e diversas constituições" },
  "9d": { pt: "A relação entre governante e governado: a justiça do príncipe ou estadista e do súdito ou cidadão" },
  "9e": { pt: "A justa distribuição de honras, postos, cargos e sufrágio" },
  "9f": { pt: "Justiça entre os Estados: o problema do direito e da força na feitura da guerra e da paz" },
  "9g": { pt: "A moderação da justiça política pela clemência: anistia, asilo e perdão" },
  "10": { pt: "Justiça e lei" },
  "10a": { pt: "A medida da justiça nas leis feitas pelo Estado: padrões naturais e constitucionais" },
  "10b": { pt: "A legalidade de leis injustas: o grau de obediência exigido do homem justo na sociedade injusta" },
  "10c": { pt: "A justiça da punição para atos injustos: a distinção entre retribuição e vingança" },
  "10d": { pt: "A correção da justiça legal: a equidade na aplicação da lei humana" },
  "11": { pt: "Justiça divina: a relação de Deus ou dos deuses com o homem" },
  "11a": { pt: "O governo divino sobre o homem: a justiça e a misericórdia de Deus ou dos deuses" },
  "11b": { pt: "A dívida do homem para com Deus ou os deuses: os atos religiosos de piedade e culto" },
};

function extractIntroPt(md: string): string[] {
  const start = md.indexOf("\nINTRODUÇÃO\n");
  const end = md.indexOf("ESQUEMA DE TÓPICOS");
  if (start === -1 || end === -1 || end < start) throw new Error("Seção INTRODUÇÃO não encontrada na tradução PT");
  const slice = md.slice(start + "\nINTRODUÇÃO\n".length, end);
  return slice
    .split(/^---$/m)
    .flatMap((chunk) => chunk.split("\n"))
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}

const md = readFileSync(MD_RAW, "utf8");
const mdPt = readFileSync(MD_PT, "utf8");
const parsed = parseJustice1952(md);
const introPt = extractIntroPt(mdPt);

// ------------------------------------------------------------------
// Guarda-chuvas estruturais
// ------------------------------------------------------------------
const l1 = parsed.topics.filter((t) => t.level === 1);
const l2 = parsed.topics.filter((t) => t.level === 2);
const l3 = parsed.topics.filter((t) => t.level === 3);
const fail = (msg: string): never => {
  console.error(`✗ FALHA: ${msg}`);
  process.exit(1);
};
if (parsed.topics.length !== 41) fail(`esperados 41 nós, obtidos ${parsed.topics.length}`);
if (l1.length !== 11 || l2.length !== 28 || l3.length !== 2) fail(`hierarquia inesperada: ${l1.length}/${l2.length}/${l3.length}`);
if (parsed.crossRefs.length !== 10) fail(`esperadas 10 remissões, obtidas ${parsed.crossRefs.length}`);
if (parsed.warnings.length !== 0) fail(`parsing com warnings: ${JSON.stringify(parsed.warnings, null, 2)}`);
const refs8c1 = parsed.references.filter((r) => r.topicCode === "8c(1)");
if (refs8c1.length !== 18) fail(`esperadas 18 linhas em 8c(1), obtidas ${refs8c1.length}`);
for (const t of parsed.topics) {
  if (!PT_TITLES[t.code]) fail(`título PT ausente para o código ${t.code}`);
}
const refs8c1Aristotle = refs8c1.find((r) => r.authorRaw === "ARISTOTLE");
if (!refs8c1Aristotle || !refs8c1Aristotle.locatorRaw.includes("1134ᵇ7–17")) {
  fail("locatorRaw de Aristotle em 8c(1) sem sobrescrito Bekker esperado");
}

// ------------------------------------------------------------------
// Relatório
// ------------------------------------------------------------------
console.log("=== RELATÓRIO DE INGESTÃO — Justice 1952 ===");
console.log(`nós: ${parsed.topics.length} (L1 ${l1.length} · L2 ${l2.length} · L3 ${l3.length})`);
console.log(`linhas de referência: ${parsed.references.length} (autores ${parsed.references.filter((r) => r.entryKind === "author").length} · bíblicas ${parsed.references.filter((r) => r.entryKind === "bible").length})`);
console.log(`artefatos de digitalização segregados: ${parsed.artifacts.length}`);
console.log(`remissões cruzadas: ${parsed.crossRefs.length}`);
console.log(`parágrafos da introdução PT: ${introPt.length}`);
console.log("linhas por tópico:");
for (const t of parsed.topics) {
  const n = parsed.references.filter((r) => r.topicCode === t.code).length;
  console.log(`  ${t.code.padEnd(6)} ${String(n).padStart(3)} refs  · ${t.titleEn.slice(0, 64)}`);
}

// ------------------------------------------------------------------
// Geração do dataset
// ------------------------------------------------------------------
const q = (v: string | number | null): string => JSON.stringify(v);
const topicLine = (t: ParsedTopic): string => {
  const pt = PT_TITLES[t.code]!;
  const fields = [
    `slug: ${q(codeToSlug(t.code))}`,
    `code: ${q(t.code)}`,
    `titleEn: ${q(t.titleEn)}`,
    `titlePt: ${q(pt.pt)}`,
    `titlePtNote: ${pt.note ? q(pt.note) : "null"}`,
    `level: ${t.level}`,
    `parentSlug: ${t.parentCode ? q(codeToSlug(t.parentCode)) : "null"}`,
    `printedPageAnchor: ${t.printedPageAnchor ?? "null"}`,
    `orderIndex: ${t.orderIndex}`,
    `provenance: P_1952`,
  ];
  return `  { ${fields.join(", ")} },`;
};
const refLine = (r: (typeof parsed.references)[number]): string => {
  const fields = [
    `id: ${q(r.id)}`,
    `topicSlug: ${q(codeToSlug(r.topicCode))}`,
    `entryKind: ${q(r.entryKind)}`,
    `volume: ${r.volume ?? "null"}`,
    `authorRaw: ${q(r.authorRaw)}`,
    `firstLineTail: ${q(r.firstLineTail)}`,
    `continuation: ${r.continuation === null ? "null" : q(r.continuation)}`,
    `locatorRaw: ${q(r.locatorRaw)}`,
    `workSegments: [${r.workSegments.map((s) => `{ workTitle: ${s.workTitle ? q(s.workTitle) : "null"}, raw: ${q(s.raw)} }`).join(", ")}]`,
    `provenance: P_1952`,
  ];
  return `  { ${fields.join(", ")} },`;
};

const countsJs = parsed.topics
  .map((t) => `  ${q(codeToSlug(t.code))}: ${parsed.references.filter((r) => r.topicCode === t.code).length},`)
  .join("\n");

const output = `// AUTO-GERADO por scripts/ingest-justice-1952.ts — NÃO EDITAR À MÃO.
// Fonte: docs/corpus/justice-1952-texto-integral-colagem-dono.md (RAW colado pelo Dono, 03/09/2026;
// audidade: 41/41 nós, 18/18 refs em 8c(1) — ver docs/corpus/confronto-justice-rodada-1.md).
// Selo canônico pendente: upload do PDF na branch corpus (fingerprint no ledger).
// Tradução PT: docs/corpus/justice-1952-traducao-pt-chatgpt.md (displayPtBr — NUNCA substitui a fonte).
import type { Provenance } from "@/lib/syntopicon";

export const P_1952: Provenance = { sourceId: "source:syntopicon-1952", layer: "original-corpus" };
export const P_1952_PT: Provenance = { sourceId: "source:justice-pt-chatgpt-translation", layer: "interpretive-content" };

export const JUSTICE_1952_META = {
  edition: "1952",
  chapterNumber: 42,
  chapterTitle: "JUSTICE",
  pagesPrinted: "850–879",
  ingestedAt: "2026-09-04",
  canonicalSeal: "PENDING_PDF_UPLOAD_CORPUS",
} as const;

export type Justice1952Topic = {
  slug: string;
  code: string;
  titleEn: string;
  /** displayPtBr — camada de apresentação (tradução derivada); nunca substitui o título EN */
  titlePt: string;
  titlePtNote: string | null;
  level: 1 | 2 | 3;
  parentSlug: string | null;
  /** âncora de página impressa do outline; null quando a fonte não imprime âncora */
  printedPageAnchor: number | null;
  orderIndex: number;
  provenance: Provenance;
};

export type Justice1952Ref = {
  id: string;
  topicSlug: string;
  entryKind: "author" | "bible";
  volume: number | null;
  authorRaw: string | null;
  firstLineTail: string;
  continuation: string | null;
  /** linha(s) original(is) do Syntopicon — INTOCADO (RAW FIRST) */
  locatorRaw: string;
  workSegments: readonly { workTitle: string | null; raw: string }[];
  provenance: Provenance;
};

export const justice1952Topics: readonly Justice1952Topic[] = [
${parsed.topics.map(topicLine).join("\n")}
];

export const justice1952References: readonly Justice1952Ref[] = [
${parsed.references.map(refLine).join("\n")}
];

export const justice1952CrossRefs: readonly { n: number; textRaw: string }[] = [
${parsed.crossRefs.map((c) => `  { n: ${c.n}, textRaw: ${q(c.textRaw)} },`).join("\n")}
];

/** Introdução de Adler em PT-BR (displayPtBr; original EN permanece na fonte). */
export const justice1952IntroPtBr: readonly string[] = [
${introPt.map((p) => `  ${q(p)},`).join("\n")}
];

export const justice1952ParseStats = {
  artifactLinesDiscarded: ${parsed.artifacts.length},
  warnings: [] as readonly string[],
} as const;

export function justice1952TopicBySlug(slug: string): Justice1952Topic | undefined {
  return justice1952Topics.find((t) => t.slug === slug);
}

export function justice1952Roots(): readonly Justice1952Topic[] {
  return justice1952Topics.filter((t) => t.level === 1);
}

export function justice1952Children(slug: string): readonly Justice1952Topic[] {
  return justice1952Topics.filter((t) => t.parentSlug === slug);
}

export function justice1952TopicPath(slug: string): readonly Justice1952Topic[] {
  const path: Justice1952Topic[] = [];
  let cursor = justice1952TopicBySlug(slug);
  while (cursor) {
    path.unshift(cursor);
    cursor = cursor.parentSlug ? justice1952TopicBySlug(cursor.parentSlug) : undefined;
  }
  return path;
}

export function justice1952ReferencesForTopic(slug: string): readonly Justice1952Ref[] {
  return justice1952References.filter((r) => r.topicSlug === slug);
}

/** contagem de linhas de referência por slug de tópico */
export const justice1952RefCount: Readonly<Record<string, number>> = {
${countsJs}
};

export const justice1952RefCountTotal = ${parsed.references.length};
export const justice1952AuthorRefCount = ${parsed.references.filter((r) => r.entryKind === "author").length};
export const justice1952BibleCount = ${parsed.references.filter((r) => r.entryKind === "bible").length};
export const justice1952TopicsWithRefsCount = ${new Set(parsed.references.map((r) => r.topicCode)).size};
`;

writeFileSync(OUT, output);
console.log(`\n✓ dataset gerado: ${OUT} (${output.length} bytes)`);
