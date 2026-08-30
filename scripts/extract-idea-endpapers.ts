/**
 * Reconhecimento estrutural — Volume 1 (The Great Conversation).
 *
 * Extrai, das end-papers do Volume 1, a lista "THE GREAT IDEAS, Volumes 2 and 3"
 * e audita o resultado:
 *   1. cardinalidade (esperado: 102 nomes de ideias);
 *   2. divergências contra a expectativa estrutural conhecida (lista alfabética
 *      canônica em inglês) — divergências são REPORTADAS, nunca corrigidas
 *      silenciosamente; a confirmação definitiva virá dos capítulos dos
 *      Volumes 2–3 (regra da numeração canônica);
 *   3. ponto de partição Volumes 2/3 (LOVE = #50, MAN = #51).
 *
 * O corpus é ruidoso (OCR do Internet Archive, 2012): linhas de lixo com
 * ^ £ § • dígitos, e ideias multi-linha ("CUSTOM AND\nCONVENTION").
 *
 * Uso:  npx tsx scripts/extract-idea-endpapers.ts
 * Saída: Volumes/raw/idea-endpapers-extract.txt  (zona raw — gitignored)
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = join(root, "Volumes", "gbww-vol-01-the-great-conversation.ocr.txt");
const outDir = join(root, "Volumes", "raw");
const outPath = join(outDir, "idea-endpapers-extract.txt");

/** Expectativa estrutural (alfabética EN) — usada SOMENTE para diff de auditoria.
 *  A fonte de verdade é o corpus; confirmação final: capítulos dos Vols. 2–3. */
const EXPECTED_CANONICAL_NAMES = [
  "ANGEL", "ANIMAL", "ARISTOCRACY", "ART", "ASTRONOMY", "BEAUTY", "BEING", "CAUSE",
  "CHANCE", "CHANGE", "CITIZEN", "CONSTITUTION", "COURAGE", "CUSTOM AND CONVENTION",
  "DEFINITION", "DEMOCRACY", "DESIRE", "DIALECTIC", "DUTY", "EDUCATION", "ELEMENT",
  "EMOTION", "ETERNITY", "EVOLUTION", "EXPERIENCE", "FAMILY", "FATE", "FORM", "GOD",
  "GOOD AND EVIL", "GOVERNMENT", "HABIT", "HAPPINESS", "HISTORY", "HONOR", "HYPOTHESIS",
  "IDEA", "IMMORTALITY", "INDUCTION", "INFINITY", "JUDGMENT", "JUSTICE", "KNOWLEDGE",
  "LABOR", "LANGUAGE", "LAW", "LIBERTY", "LIFE AND DEATH", "LOGIC", "LOVE", "MAN",
  "MATHEMATICS", "MATTER", "MECHANICS", "MEDICINE", "MEMORY AND IMAGINATION",
  "METAPHYSICS", "MIND", "MONARCHY", "NATURE", "NECESSITY AND CONTINGENCY", "OLIGARCHY",
  "ONE AND MANY", "OPINION", "OPPOSITION", "PHILOSOPHY", "PHYSICS", "PLEASURE AND PAIN",
  "POETRY", "PRINCIPLE", "PROGRESS", "PROPHECY", "PRUDENCE", "PUNISHMENT", "QUALITY",
  "QUANTITY", "REASONING", "RELATION", "RELIGION", "REVOLUTION", "RHETORIC",
  "SAME AND OTHER", "SCIENCE", "SENSE", "SIGN AND SYMBOL", "SIN", "SLAVERY", "SOUL",
  "SPACE", "STATE", "TEMPERANCE", "THEOLOGY", "TIME", "TRUTH", "TYRANNY AND DESPOTISM",
  "UNIVERSAL AND PARTICULAR", "VIRTUE AND VICE", "WAR AND PEACE", "WEALTH", "WILL",
  "WISDOM", "WORLD",
] as const;

const text = readFileSync(sourcePath, "utf8");
const MARKER = "THE GREAT IDEAS, Volumes 2 and 3";
const start = text.indexOf(MARKER);
if (start === -1) throw new Error("Marcador das end-papers nao encontrado no corpus.");
const region = text.slice(start);

// 1) Candidatos: linhas inteiramente maiúsculas (tolerando espaços e conectivos),
//    excluindo títulos com OF/THE e o carimbo da biblioteca.
const candidates: string[] = [];
for (const rawLine of region.split("\n")) {
  const line = rawLine.trim();
  if (!/^[A-Z][A-Z'&() .-]{1,40}$/.test(line)) continue;
  if (line.includes(" OF ") || line.includes(" THE ")) continue;
  if (line === MARKER || line === "ARCHBISHOP MITTY LIBRARY") continue;
  candidates.push(line);
}

// 2) Junção de ideias partidas em duas linhas ("CUSTOM AND" + "CONVENTION").
const joined: string[] = [];
for (const candidate of candidates) {
  const last = joined[joined.length - 1];
  if (last !== undefined && last.endsWith(" AND")) joined[joined.length - 1] = `${last} ${candidate}`;
  else joined.push(candidate);
}

// 3) Deduplicação preservando ordem (o carimbo/ruído pode repetir nomes).
const found = [...new Set(joined)].sort();
const expected: string[] = [...EXPECTED_CANONICAL_NAMES].sort();

const missing = expected.filter((name) => !found.includes(name));
const extra = found.filter((name) => !expected.includes(name));
const findings: string[] = [];

findings.push(`candidatos brutos: ${candidates.length}; nomes unicos extraidos: ${found.length}`);
findings.push(`cardinalidade 102: ${found.length === 102 ? "OK" : "DIVERGENTE"}`);
findings.push(`particao Vol.2/Vol.3 (LOVE=#50, MAN=#51): ${
  found[49] === "LOVE" && found[50] === "MAN" ? "OK" : "DIVERGENTE"}`);
findings.push(`ausentes em relacao a expectativa: ${missing.length ? missing.join(" | ") : "(nenhum)"}`);
findings.push(`fora da expectativa (candidatos a artefato de OCR): ${extra.length ? extra.join(" | ") : "(nenhum)"}`);

const artifact = [
  "# Extrato raw — end-papers do Volume 1 (The Great Conversation)",
  "# Fonte: Volumes/gbww-vol-01-the-great-conversation.ocr.txt",
  "# Gerado por: scripts/extract-idea-endpapers.ts — confirmacao pendente nos Vols. 2-3",
  "",
  "## Auditoria",
  ...findings.map((line) => `- ${line}`),
  "",
  "## Nomes extraidos (ordem alfabetica EN; posicao = numero canonico provisorio)",
  ...found.map((name, index) => `${String(index + 1).padStart(3, " ")}. ${name}`),
  "",
].join("\n");

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, artifact, "utf8");

console.log(findings.map((line) => `AUDIT ${line}`).join("\n"));
console.log(`\nArtefato raw: ${outPath}`);
if (missing.length > 0 || extra.length > 0 || found.length !== 102) {
  console.log("\nATENCAO: divergencias acima devem ser revisadas contra o raw e,");
  console.log("quando chegarem, contra os cabecalhos de capitulo dos Volumes 2-3.");
}
