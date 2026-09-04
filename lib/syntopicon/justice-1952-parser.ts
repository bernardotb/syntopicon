/**
 * Parser do RAW do capítulo Justice 1952 (colagem integral do Dono).
 *
 * Regras invioláveis (memorando v3.1 · Anexo B · RAW FIRST):
 * - locatorRaw é INTOCADO: a linha original do arquivo entra inteira, sem normalização
 *   (inclui sobrescritos ᵃ/ᵇ, "esp", "passim", "—(D)", abreviações).
 * - Artefatos de digitalização (cabeçalhos/rodapés de página, colunas "PAGE",
 *  _running heads_ entre parênteses) são SEGREGADOS em `artifacts`, nunca fundidos ao dado.
 * - Linhas não classificadas vão para `warnings` — nunca descartadas em silêncio.
 * - Nada é inventado: título, código e âncora de página só existem se impressos na fonte.
 *
 * Entrada: o conteúdo de docs/corpus/justice-1952-texto-integral-colagem-dono.md
 * (seção RAW entre os marcadores BEGIN/END).
 */

export type ParsedTopic = {
  code: string; // "1", "1a", "8c(1)"
  slug: string; // "1", "1a", "8c-1"
  titleEn: string;
  level: 1 | 2 | 3;
  parentCode: string | null;
  /** página impressa da âncora "— NNN" do outline; null quando a fonte não imprime âncora */
  printedPageAnchor: number | null;
  orderIndex: number;
};

export type ParsedWorkSegment = {
  /** primeiro título em itálico do segmento, quando presente */
  workTitle: string | null;
  /** segmento bruto (obra + locators), intocado */
  raw: string;
};

export type ParsedReferenceRow = {
  id: string;
  topicCode: string;
  entryKind: "author" | "bible";
  /** volume GBWW quando a linha abre com número; null p/ OLD/NEW TESTAMENT e APOCRYPHA */
  volume: number | null;
  /** texto entre o número e ":" (fonte exata: "ARISTOTLE", "CONSTITUTION OF THE U.S.", …) */
  authorRaw: string | null;
  /** 1ª linha após ":" (obras + locators) */
  firstLineTail: string;
  /** linhas de continuação (quebra de página no original), unidas por \n */
  continuation: string | null;
  /** linha(s) original(is) completa(s) — INTOCADO */
  locatorRaw: string;
  workSegments: ParsedWorkSegment[];
};

export type ParsedCrossRef = { n: number; textRaw: string };

export type Justice1952Parse = {
  topics: ParsedTopic[];
  references: ParsedReferenceRow[];
  crossRefs: ParsedCrossRef[];
  /** cabeçalhos/rodapés de digitalização descartados (rastreabilidade) */
  artifacts: string[];
  /** linhas não classificadas — devem terminar vazias; se não, o parser precisa de ajuste */
  warnings: string[];
};

const RE_PAGE_SEP = /^--- Página \d+ ---$/;
const RE_RUNNING_HEAD_PAREN = /^\(.*\)$/;
const RE_FOOTER_GREAT_IDEAS = /^\d{3} THE GREAT IDEAS(?: \S+ to \S+)?$/;
const RE_FOOTER_CHAPTER = /^(?:\S+ to \S+ )?CHAPTER 42: JUSTICE \d+$/;
const RE_PAGE_NUMBER = /^\d{3}$/;
const RE_COLUMN_PAGE = /^(?:PAGE \d{3}|PAGE)$/;

function isArtifact(line: string): boolean {
  return (
    RE_PAGE_SEP.test(line) ||
    RE_RUNNING_HEAD_PAREN.test(line) ||
    RE_FOOTER_GREAT_IDEAS.test(line) ||
    RE_FOOTER_CHAPTER.test(line) ||
    RE_PAGE_NUMBER.test(line) ||
    RE_COLUMN_PAGE.test(line)
  );
}

/** "8c(1)" → "8c-1" (convenção de slug do protótipo) */
export function codeToSlug(code: string): string {
  return code.replace(/\((\d)\)/, "-$1");
}

export function parseJustice1952(md: string): Justice1952Parse {
  const begin = md.indexOf("--- BEGIN RAW");
  const end = md.indexOf("--- END RAW");
  if (begin === -1 || end === -1) throw new Error("Marcadores BEGIN/END do RAW não encontrados");
  const raw = md.slice(begin, end);

  const outlineStart = raw.indexOf("*OUTLINE OF TOPICS*");
  const refsStart = raw.indexOf("*REFERENCES*");
  const crossStart = raw.indexOf("CROSS-REFERENCES");
  const readingsStart = raw.indexOf("ADDITIONAL READINGS");
  if (outlineStart === -1 || refsStart === -1 || crossStart === -1 || readingsStart === -1) {
    throw new Error("Seções do capítulo não encontradas (outline/refs/cross/readings)");
  }

  const artifacts: string[] = [];
  const warnings: string[] = [];

  // ------------------------------------------------------------------
  // 1) OUTLINE → 41 nós com códigos, títulos EN e âncoras de página
  // ------------------------------------------------------------------
  const outline = raw.slice(outlineStart + "*OUTLINE OF TOPICS*".length, refsStart);
  const topics: ParsedTopic[] = [];
  let order = 0;
  let lastL1: ParsedTopic | null = null;
  let lastL2: ParsedTopic | null = null;

  for (const rawLine of outline.split("\n")) {
    const line = rawLine.trim();
    if (line.length === 0) continue;
    if (isArtifact(line)) {
      artifacts.push(line);
      continue;
    }

    // L1: "3. The duties of justice compared ... — 861"
    let m = /^(\d+)\.\s+(.+?)(?:\s+—\s+(\d{3}))?$/.exec(line);
    if (m) {
      const topic: ParsedTopic = {
        code: m[1],
        slug: m[1],
        titleEn: m[2],
        level: 1,
        parentCode: null,
        printedPageAnchor: m[3] ? Number(m[3]) : null,
        orderIndex: ++order,
      };
      topics.push(topic);
      lastL1 = topic;
      lastL2 = null;
      continue;
    }

    // L2: "8b. Fair wages and prices: ... — 867"
    m = /^(\d{1,2}[a-z])\.\s+(.+?)(?:\s+—\s+(\d{3}))?$/.exec(line);
    if (m) {
      const topic: ParsedTopic = {
        code: m[1],
        slug: codeToSlug(m[1]),
        titleEn: m[2],
        level: 2,
        parentCode: lastL1 ? lastL1.code : null,
        printedPageAnchor: m[3] ? Number(m[3]) : null,
        orderIndex: ++order,
      };
      topics.push(topic);
      lastL2 = topic;
      continue;
    }

    // L3 (injeção): "(1) Economic exploitation: chattel slavery and wage slavery"
    m = /^\((\d)\)\s+(.+)$/.exec(line);
    if (m && lastL2) {
      const topic: ParsedTopic = {
        code: `${lastL2.code}(${m[1]})`,
        slug: codeToSlug(`${lastL2.code}(${m[1]})`),
        titleEn: m[2],
        level: 3,
        parentCode: lastL2.code,
        printedPageAnchor: null,
        orderIndex: ++order,
      };
      topics.push(topic);
      continue;
    }

    warnings.push(`outline: linha não classificada: "${line}"`);
  }

  // ------------------------------------------------------------------
  // 2) REFERENCES → linhas de referência por tópico (locatorRaw intocado)
  // ------------------------------------------------------------------
  const refsSliceFull = raw.slice(refsStart, crossStart);
  // começa no primeiro heading de tópico (exclui o texto de explicação do estilo)
  const firstHeading = refsSliceFull.search(/^1\. Diverse conceptions of justice$/m);
  if (firstHeading === -1) throw new Error("Primeiro tópico da seção References não encontrado");
  const refsSlice = refsSliceFull.slice(firstHeading);

  const references: ParsedReferenceRow[] = [];
  let current: ParsedReferenceRow | null = null;
  const perTopicSeq = new Map<string, number>();
  /** código do último heading visto na seção References (L3 > L2 > L1) */
  let refsTopicCode: string | null = null;

  for (const rawLine of refsSlice.split("\n")) {
    const line = rawLine.trim();
    if (line.length === 0) continue;
    if (isArtifact(line)) {
      artifacts.push(line);
      continue;
    }

    // heading L1
    let m = /^(\d+)\.\s+(.+)$/.exec(line);
    if (m) {
      refsTopicCode = m[1];
      perTopicSeq.set(refsTopicCode, 0);
      current = null; // heading sem bloco próprio (bloco pertence ao próximo sub)
      continue;
    }

    // heading L2
    m = /^(\d{1,2}[a-z])\.\s+(.+)$/.exec(line);
    if (m) {
      refsTopicCode = m[1];
      perTopicSeq.set(refsTopicCode, 0);
      current = null;
      continue;
    }

    // heading L3 (injeção): "8c(1) Economic exploitation: ..."
    m = /^(\d{1,2}[a-z])\((\d)\)\s+(.+)$/.exec(line);
    if (m) {
      refsTopicCode = `${m[1]}(${m[2]})`;
      perTopicSeq.set(refsTopicCode, 0);
      current = null;
      continue;
    }

    // linha de autor com volume: "9 ARISTOTLE: *Ethics*, BK V, ..."
    m = /^(\d{1,2})\s+([^:]+):\s*(.*)$/.exec(line);
    if (m) {
      if (!refsTopicCode) {
        warnings.push(`refs: linha de autor sem tópico corrente: "${line}"`);
        continue;
      }
      const seq = (perTopicSeq.get(refsTopicCode) ?? 0) + 1;
      perTopicSeq.set(refsTopicCode, seq);
      const tail = m[3];
      const row: ParsedReferenceRow = {
        id: `jr1952:${codeToSlug(refsTopicCode)}:${String(seq).padStart(2, "0")}`,
        topicCode: refsTopicCode,
        entryKind: "author",
        volume: Number(m[1]),
        authorRaw: m[2].trim(),
        firstLineTail: tail,
        continuation: null,
        locatorRaw: line,
        workSegments: splitWorkSegments(tail),
      };
      references.push(row);
      current = row;
      continue;
    }

    // linha bíblica sem volume: "OLD TESTAMENT: ..." / "NEW TESTAMENT: ..." / "APOCRYPHA: ..."
    m = /^((?:OLD|NEW) TESTAMENT|APOCRYPHA):\s*(.*)$/.exec(line);
    if (m) {
      if (!refsTopicCode) {
        warnings.push(`refs: linha bíblica sem tópico corrente: "${line}"`);
        continue;
      }
      const seq = (perTopicSeq.get(refsTopicCode) ?? 0) + 1;
      perTopicSeq.set(refsTopicCode, seq);
      const tail = m[2];
      const row: ParsedReferenceRow = {
        id: `jr1952:${codeToSlug(refsTopicCode)}:${String(seq).padStart(2, "0")}`,
        topicCode: refsTopicCode,
        entryKind: "bible",
        volume: null,
        authorRaw: m[1],
        firstLineTail: tail,
        continuation: null,
        locatorRaw: line,
        workSegments: splitWorkSegments(tail),
      };
      references.push(row);
      current = row;
      continue;
    }

    // continuação da linha anterior (quebra de página/impressão no original)
    if (current) {
      current.continuation = current.continuation === null ? line : `${current.continuation}\n${line}`;
      current.locatorRaw = `${current.locatorRaw}\n${line}`;
      continue;
    }

    warnings.push(`refs: linha órfã sem linha de referência anterior: "${line}"`);
  }

  // ------------------------------------------------------------------
  // 3) CROSS-REFERENCES → 10 remissões (texto bruto)
  // ------------------------------------------------------------------
  const crossSlice = raw.slice(crossStart, readingsStart);
  const crossRefs: ParsedCrossRef[] = [];
  let cur: { n: number; parts: string[] } | null = null;
  for (const rawLine of crossSlice.split("\n").slice(1)) {
    const line = rawLine.trim();
    if (line.length === 0) continue;
    const m = /^(\d+)\.\s+(.*)$/.exec(line);
    if (m) {
      if (cur) crossRefs.push({ n: cur.n, textRaw: cur.parts.join(" ") });
      cur = { n: Number(m[1]), parts: [m[2]] };
      continue;
    }
    if (cur) cur.parts.push(line);
  }
  if (cur) crossRefs.push({ n: cur.n, textRaw: cur.parts.join(" ") });

  return { topics, references, crossRefs, artifacts, warnings };
}

/** separa a cauda da linha em segmentos de obra pelo separador " / " (nível de obra) */
export function splitWorkSegments(tail: string): ParsedWorkSegment[] {
  return tail
    .split(" / ")
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0)
    .map((segment) => {
      const title = /\*([^*]+)\*/.exec(segment);
      return { workTitle: title ? title[1] : null, raw: segment };
    });
}
