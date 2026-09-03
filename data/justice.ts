import type { Provenance } from "@/lib/syntopicon";

/**
 * GOLDEN CASE — Great Idea 42, Justice / Justiça.
 *
 * Disciplina de dados:
 * - Títulos EN do outline e presença autor↔tópico: capturados do benchmark (2026-09-02),
 *   NUNCA usados como canon sem confirmação no Justice.pdf.
 * - Código impresso 8c(1) e seu título: sessão anterior com Justice.pdf (fonte primária;
 *   reconfirmar na ingestão). O subtree impresso do Topic 8 foi reconstruído a partir do
 *   casamento exato do título de 8c(1) com /subtopics/1067 do benchmark.
 * - Grupos de nível 1 SEM código impresso confirmado recebem slug provisório "tema-N";
 *   jamais um código canônico inventado.
 * - Passagens: texto real (domínio público); o vínculo passagem↔tópico é seleção
 *   editorial do protótipo, marcada como DEMONSTRAÇÃO.
 */

const P_BENCHMARK: Provenance = { sourceId: "source:mortimer-benchmark", layer: "derived-structure" };
const P_PRINTED: Provenance = { sourceId: "source:justice-outline-printed", layer: "original-corpus" };
const P_DEMO: Provenance = { sourceId: "source:prototype-demo-passages", layer: "interpretive-content" };

export const JUSTICE = {
  ideaNumber: 42,
  ideaSlugEn: "justice",
  nameEn: "Justice",
  namePt: "Justiça",
} as const;

/** Estrutura canônica do outline de Justice (Justice.pdf — reconfirmar na ingestão). */
export const JUSTICE_CANON = {
  totalNodes: 41,
  level1: 11,
  level2: 28,
  level3: 2,
  referencesStartPagePrinted: 859,
  topic8cRegionPagePrinted: 868,
} as const;

export type JusticeTopicNode = {
  /** segmento de URL relativo a /ideias/42-justice/ */
  slug: string;
  /** código impresso (só quando confirmado); null = pendente */
  code: string | null;
  /** slug provisório quando o código impresso é desconhecido ("tema-N") */
  provisional: boolean;
  titleEn: string;
  /** tradução de apresentação (derivada) */
  titlePt: string | null;
  level: 1 | 2 | 3;
  parentSlug: string | null;
  /** identificador observado no benchmark, quando visível */
  mirrorId: number | null;
  /** contagem de passagens exibida pelo benchmark para o nó */
  mirrorPassages: number | null;
  provenance: Provenance;
};

const t = (
  slug: string,
  code: string | null,
  provisional: boolean,
  titleEn: string,
  titlePt: string | null,
  level: 1 | 2 | 3,
  parentSlug: string | null,
  mirrorId: number | null,
  mirrorPassages: number | null,
  provenance: Provenance = P_BENCHMARK,
): JusticeTopicNode => ({ slug, code, provisional, titleEn, titlePt, level, parentSlug, mirrorId, mirrorPassages, provenance });

/**
 * 16 nós com dados incorporados (de 41 da estrutura canônica).
 * Ordem de nível 1 = ordem de exibição do benchmark (não é a ordem impressa).
 */
export const justiceTopics: readonly JusticeTopicNode[] = [
  t("tema-1", null, true, "Diverse conceptions of justice", "Concepções diversas de justiça", 1, null, null, null),
  t("tema-2", null, true, "Justice and law", "Justiça e lei", 1, null, 1078, 24),
  t("tema-3", null, true, "Divine justice: the relation of God or the gods to man", "Justiça divina: a relação de Deus ou dos deuses com o homem", 1, null, 1083, 6),
  t("tema-4", null, true, "The precepts of justice: doing good, harming no one, rendering to each his own, treating equals equally", "Os preceitos da justiça: fazer o bem, não prejudicar ninguém, dar a cada um o que é seu, tratar iguais de modo igual", 1, null, 1052, 51),
  t("tema-5", null, true, "The duties of justice compared with the generosity of love and friendship", "Os deveres da justiça comparados à generosidade do amor e da amizade", 1, null, 1053, 32),
  t("tema-6", null, true, "The comparison of justice and expediency: the choice between doing and suffering injustice; the relation of justice to happiness", "A comparação entre justiça e conveniência: a escolha entre cometer e sofrer injustiça; a relação da justiça com a felicidade", 1, null, 1054, 41),
  t("tema-7", null, true, "Justice and equality: the kinds of justice in relation to the measure and modes of equality and inequality", "Justiça e igualdade: os tipos de justiça em relação à medida e aos modos de igualdade e desigualdade", 1, null, 1055, 60),
  t("tema-8", null, true, "Justice and liberty: the theory of human rights", "Justiça e liberdade: a teoria dos direitos humanos", 1, null, 1056, 24),
  // filhos de tema-8 — nível inferido: o benchmark achata a hierarquia
  t("natural-law-foundation", null, true, "The relation between natural law and natural justice", "A relação entre lei natural e justiça natural", 2, "tema-8", 1057, 25),
  t("rights-and-duties", null, true, "The relation between natural and positive rights, innate and acquired rights, private and public rights: their correlative duties", "A relação entre direitos naturais e positivos, inatos e adquiridos, privados e públicos: seus deveres correlatos", 2, "tema-8", 1058, 32),
  t("inalienable-rights", null, true, "The inalienability of natural rights: their violation by tyranny and despotism", "A inalienabilidade dos direitos naturais: sua violação pela tirania e pelo despotismo", 2, "tema-8", 1059, 25),
  t("liberty-vs-license", null, true, "Justice as the basis for the distinction between liberty and license", "A justiça como base da distinção entre liberdade e licença", 2, "tema-8", 1060, 16),
  t("civil-liberty-source", null, true, "Justice and natural rights as the source of civil liberty", "Justiça e direitos naturais como fonte da liberdade civil", 2, "tema-8", 1061, 14),
  t("tema-9", null, true, "Domestic justice: the problems of right and duty in the family", "Justiça doméstica: os problemas de direito e dever na família", 1, null, 1062, 83),
  // subtree impresso do Topic 8 (código confirmado via 8c(1) + casamento /subtopics/1067)
  t("8", "8", false, "Economic justice: justice in production, distribution, and exchange", "Justiça econômica: justiça na produção, na distribuição e na troca", 1, null, 1063, 43, P_PRINTED),
  t("8a", "8a", false, "Private and public property: the just distribution of economic goods", "Propriedade privada e pública: a justa distribuição dos bens econômicos", 2, "8", 1064, 73, P_PRINTED),
  t("8b", "8b", false, "Fair wages and prices: the just exchange of goods and services", "Salários e preços justos: a justa troca de bens e serviços", 2, "8", 1065, 51, P_PRINTED),
  t("8c", "8c", false, "Justice in the organization of production", "Justiça na organização da produção", 2, "8", 1066, 7, P_PRINTED),
  t("8c-1", "8c(1)", false, "Economic exploitation: chattel slavery and wage slavery", "Exploração econômica: escravidão de propriedade e escravidão assalariada", 3, "8c", 1067, 30, P_PRINTED),
  t("8c-2", "8c(2)", false, "Profit and unearned increment", "Lucro e incremento imerecido", 3, "8c", 1068, 12, P_PRINTED),
  t("tema-11", null, true, "Political justice: justice in government", "Justiça política: justiça no governo", 1, null, 1070, 22),
];

export function justiceTopicBySlug(slug: string): JusticeTopicNode | undefined {
  return justiceTopics.find((node) => node.slug === slug);
}

export function justiceChildren(slug: string): readonly JusticeTopicNode[] {
  return justiceTopics.filter((node) => node.parentSlug === slug);
}

export function justiceRootTopics(): readonly JusticeTopicNode[] {
  return justiceTopics.filter((node) => node.level === 1);
}

/** caminho de breadcrumb da raiz até o nó (inclusive) */
export function justiceTopicPath(slug: string): readonly JusticeTopicNode[] {
  const path: JusticeTopicNode[] = [];
  let cursor = justiceTopicBySlug(slug);
  while (cursor) {
    path.unshift(cursor);
    cursor = cursor.parentSlug ? justiceTopicBySlug(cursor.parentSlug) : undefined;
  }
  return path;
}

export function justiceTopicUrl(node: Pick<JusticeTopicNode, "slug">, ideaSlug = "42-justice"): string {
  return `/ideias/${ideaSlug}/${node.slug}`;
}

// ---------------------------------------------------------------------------
// Autores — presença capturada do benchmark (não confirma obra nem locator)
// ---------------------------------------------------------------------------

export type JusticeAuthor = {
  slug: string;
  nameEn: string;
  namePt: string;
  note?: string;
  provenance: Provenance;
};

const a = (slug: string, nameEn: string, namePt: string, note?: string): JusticeAuthor => ({
  slug,
  nameEn,
  namePt,
  note,
  provenance: P_BENCHMARK,
});

export const justiceAuthors: readonly JusticeAuthor[] = [
  a("aeschylus", "Aeschylus", "Ésquilo"),
  a("aquinas", "Thomas Aquinas", "Tomás de Aquino"),
  a("aristophanes", "Aristophanes", "Aristófanes"),
  a("aristotle", "Aristotle", "Aristóteles"),
  a("augustine", "Augustine", "Agostinho"),
  a("aurelius", "Marcus Aurelius", "Marco Aurélio"),
  a("bacon", "Francis Bacon", "Francis Bacon"),
  a("bible", "The Bible", "A Bíblia", "Listado como autor pelo benchmark; na ingestão, decidir a entidade correta (Work)."),
  a("boswell", "James Boswell", "James Boswell"),
  a("conrad", "Joseph Conrad", "Joseph Conrad"),
  a("euripides", "Euripides", "Eurípides"),
  a("freud", "Sigmund Freud", "Sigmund Freud"),
  a("george-eliot", "George Eliot", "George Eliot"),
  a("gibbon", "Edward Gibbon", "Edward Gibbon"),
  a("hamilton", "Alexander Hamilton", "Alexander Hamilton"),
  a("hegel", "G. W. F. Hegel", "G. W. F. Hegel"),
  a("herodotus", "Herodotus", "Heródoto"),
  a("hobbes", "Thomas Hobbes", "Thomas Hobbes"),
  a("huizinga", "Johan Huizinga", "Johan Huizinga"),
  a("jefferson", "Thomas Jefferson", "Thomas Jefferson"),
  a("joyce", "James Joyce", "James Joyce"),
  a("kant", "Immanuel Kant", "Immanuel Kant"),
  a("keynes", "John Maynard Keynes", "John Maynard Keynes"),
  a("locke", "John Locke", "John Locke"),
  a("madison", "James Madison", "James Madison"),
  a("marx", "Karl Marx", "Karl Marx"),
  a("mill", "John Stuart Mill", "John Stuart Mill"),
  a("milton", "John Milton", "John Milton"),
  a("montaigne", "Michel de Montaigne", "Michel de Montaigne"),
  a("montesquieu", "Montesquieu", "Montesquieu"),
  a("orwell", "George Orwell", "George Orwell"),
  a("pascal", "Blaise Pascal", "Blaise Pascal"),
  a("plato", "Plato", "Platão"),
  a("plutarch", "Plutarch", "Plutarco"),
  a("rousseau", "Jean-Jacques Rousseau", "Jean-Jacques Rousseau"),
  a("shakespeare", "William Shakespeare", "William Shakespeare"),
  a("smith", "Adam Smith", "Adam Smith"),
  a("sophocles", "Sophocles", "Sófocles"),
  a("spinoza", "Baruch Spinoza", "Baruch Espinoza"),
  a("swift", "Jonathan Swift", "Jonathan Swift"),
  a("tacitus", "Tacitus", "Tácito"),
  a("tawney", "R. H. Tawney", "R. H. Tawney"),
  a("thucydides", "Thucydides", "Tucídides"),
  a("tocqueville", "Alexis de Tocqueville", "Alexis de Tocqueville"),
  a("tolstoy", "Leo Tolstoy", "Liev Tolstói"),
  a("veblen", "Thorstein Veblen", "Thorstein Veblen"),
  a("weber", "Max Weber", "Max Weber"),
];

export function justiceAuthorBySlug(slug: string): JusticeAuthor | undefined {
  return justiceAuthors.find((author) => author.slug === slug);
}

/** autor → tópicos em que aparece (navegação inversa derivada) */
export function justiceTopicsForAuthor(authorSlug: string): readonly JusticeTopicNode[] {
  const slugs = Object.entries(justiceTopicAuthors)
    .filter(([, entries]) => entries.some(([id]) => id === authorSlug))
    .map(([slug]) => slug);
  return justiceTopics.filter((node) => slugs.includes(node.slug));
}

// ---------------------------------------------------------------------------
// Presença autor ↔ tópico (benchmark): contagem de passagens por autor no nó
// ---------------------------------------------------------------------------

export const justiceTopicAuthors: Readonly<Record<string, readonly (readonly [string, number])[]>> = {
  "tema-8": [
    ["sophocles", 1], ["euripides", 1], ["plato", 1], ["aristotle", 3], ["augustine", 1],
    ["hobbes", 1], ["spinoza", 1], ["rousseau", 5], ["kant", 2], ["jefferson", 1],
    ["madison", 2], ["hamilton", 1], ["hegel", 3], ["freud", 1],
  ],
  "natural-law-foundation": [
    ["sophocles", 1], ["aristotle", 1], ["aurelius", 2], ["augustine", 1], ["aquinas", 5],
    ["hobbes", 1], ["spinoza", 1], ["locke", 1], ["montesquieu", 1], ["rousseau", 1],
    ["smith", 1], ["gibbon", 1], ["kant", 6], ["jefferson", 1], ["hegel", 1],
  ],
  "rights-and-duties": [
    ["aeschylus", 1], ["euripides", 3], ["plato", 1], ["aristotle", 1], ["augustine", 2],
    ["aquinas", 1], ["hobbes", 3], ["montaigne", 1], ["shakespeare", 1], ["bacon", 1],
    ["locke", 5], ["montesquieu", 3], ["rousseau", 2], ["gibbon", 1], ["boswell", 1],
    ["hegel", 4], ["tawney", 1],
  ],
  "inalienable-rights": [
    ["tacitus", 1], ["aquinas", 2], ["hobbes", 4], ["locke", 5], ["montesquieu", 1],
    ["rousseau", 2], ["gibbon", 1], ["kant", 2], ["jefferson", 1], ["mill", 1],
    ["boswell", 1], ["hegel", 2], ["tawney", 1], ["orwell", 1],
  ],
  "liberty-vs-license": [
    ["thucydides", 1], ["plato", 1], ["aristotle", 1], ["tacitus", 1], ["aquinas", 1],
    ["hobbes", 1], ["shakespeare", 1], ["milton", 1], ["locke", 1], ["montesquieu", 2],
    ["rousseau", 1], ["gibbon", 1], ["mill", 2], ["hegel", 1],
  ],
  "civil-liberty-source": [
    ["hobbes", 1], ["locke", 3], ["rousseau", 1], ["gibbon", 1], ["kant", 4],
    ["jefferson", 1], ["hegel", 1], ["tocqueville", 2],
  ],
  "8a": [
    ["bible", 9], ["euripides", 1], ["aristophanes", 1], ["plato", 3], ["aristotle", 5],
    ["plutarch", 3], ["tacitus", 2], ["aquinas", 3], ["hobbes", 1], ["spinoza", 1],
    ["pascal", 1], ["locke", 1], ["montesquieu", 3], ["rousseau", 4], ["smith", 3],
    ["gibbon", 5], ["kant", 5], ["hamilton", 1], ["hegel", 8], ["marx", 6],
    ["tolstoy", 1], ["freud", 1], ["tawney", 2], ["huizinga", 1], ["joyce", 1], ["orwell", 1],
  ],
  "8b": [
    ["bible", 13], ["herodotus", 1], ["plato", 2], ["aristotle", 3], ["montaigne", 1],
    ["montesquieu", 1], ["smith", 6], ["kant", 1], ["mill", 4], ["hegel", 2],
    ["tocqueville", 1], ["george-eliot", 1], ["marx", 9], ["tolstoy", 1], ["tawney", 3],
    ["keynes", 1], ["weber", 1],
  ],
  "8c": [["marx", 6], ["tawney", 1]],
  "8c-1": [
    ["aristotle", 2], ["plutarch", 1], ["aquinas", 1], ["swift", 1], ["rousseau", 3],
    ["smith", 5], ["kant", 1], ["madison", 2], ["mill", 1], ["boswell", 1],
    ["hegel", 1], ["tocqueville", 2], ["marx", 3], ["tolstoy", 1], ["veblen", 1],
    ["tawney", 3], ["conrad", 1],
  ],
  "8c-2": [["plutarch", 1], ["smith", 3], ["hegel", 1], ["tocqueville", 1], ["marx", 4], ["tawney", 2]],
};

export function justiceAuthorsForTopic(slug: string): readonly (readonly [JusticeAuthor, number])[] {
  const entries = justiceTopicAuthors[slug] ?? [];
  return entries
    .map(([authorSlug, count]) => {
      const author = justiceAuthorBySlug(authorSlug);
      return author ? ([author, count] as const) : null;
    })
    .filter((entry): entry is readonly [JusticeAuthor, number] => entry !== null);
}

// ---------------------------------------------------------------------------
// Obras — GBWW volume só quando ancorado; "pendente" caso contrário
// ---------------------------------------------------------------------------

export type JusticeWork = {
  slug: string;
  titleEn: string;
  titlePt: string;
  authorSlug: string;
  /** volume GBWW apenas quando ancorado em fonte; null = pendente de confirmação */
  gbwwVolume: number | null;
  provenance: Provenance;
};

export const justiceWorks: readonly JusticeWork[] = [
  { slug: "antigone", titleEn: "Antigone", titlePt: "Antígona", authorSlug: "sophocles", gbwwVolume: null, provenance: P_DEMO },
  { slug: "leviathan", titleEn: "Leviathan", titlePt: "Leviatã", authorSlug: "hobbes", gbwwVolume: 23, provenance: P_DEMO },
  { slug: "politics", titleEn: "Politics", titlePt: "Política", authorSlug: "aristotle", gbwwVolume: null, provenance: P_DEMO },
  { slug: "wealth-of-nations", titleEn: "The Wealth of Nations", titlePt: "A Riqueza das Nações", authorSlug: "smith", gbwwVolume: null, provenance: P_DEMO },
];

export function justiceWorkBySlug(slug: string): JusticeWork | undefined {
  return justiceWorks.find((work) => work.slug === slug);
}

// ---------------------------------------------------------------------------
// References (Reference ≠ Passage): recuperadas-pendentes-de-fonte.
// O locator do Syntopicon (GBWW/página) permanece pendente; locatorRaw guarda a
// citação interna da obra usada no protótipo — RAW FIRST.
// ---------------------------------------------------------------------------

export type JusticeReference = {
  id: string;
  topicSlug: string;
  authorSlug: string;
  workSlug: string;
  locatorRaw: string;
  /** locator do Syntopicon (volume/página impressa) — pendente de ingestão */
  syntopiconLocator: null;
  gbwwVolume: number | null;
  provenance: Provenance;
};

export const justiceReferences: readonly JusticeReference[] = [
  {
    id: "antigona-justica-8",
    topicSlug: "8",
    authorSlug: "sophocles",
    workSlug: "antigone",
    locatorRaw: "Antigone, vv. 450–470",
    syntopiconLocator: null,
    gbwwVolume: null,
    provenance: P_DEMO,
  },
  {
    id: "leviata-justica-8",
    topicSlug: "8",
    authorSlug: "hobbes",
    workSlug: "leviathan",
    locatorRaw: "PART II · CHAPTER XXI",
    syntopiconLocator: null,
    gbwwVolume: 23,
    provenance: P_DEMO,
  },
  {
    id: "politica-justica-8c1",
    topicSlug: "8c-1",
    authorSlug: "aristotle",
    workSlug: "politics",
    locatorRaw: "BOOK I · CHAPTERS IV–VI (Bekker 1253b–1255a)",
    syntopiconLocator: null,
    gbwwVolume: null,
    provenance: P_DEMO,
  },
  {
    id: "riqueza-justica-8c1",
    topicSlug: "8c-1",
    authorSlug: "smith",
    workSlug: "wealth-of-nations",
    locatorRaw: "BOOK I · CHAPTER VIII",
    syntopiconLocator: null,
    gbwwVolume: null,
    provenance: P_DEMO,
  },
];

export function justiceReferencesForTopic(slug: string): readonly JusticeReference[] {
  return justiceReferences.filter((reference) => reference.topicSlug === slug);
}

export function justiceReferenceById(id: string): JusticeReference | undefined {
  return justiceReferences.find((reference) => reference.id === id);
}

// ---------------------------------------------------------------------------
// Passages — texto real (domínio público); vínculo com o tópico é DEMONSTRAÇÃO
// ---------------------------------------------------------------------------

export type JusticePassage = {
  id: string;
  referenceId: string;
  textEn: readonly string[];
  translator: string;
  editionNote: string;
  provenance: Provenance;
};

export const justicePassages: readonly JusticePassage[] = [
  {
    id: "antigona-justica-8",
    referenceId: "antigona-justica-8",
    textEn: [
      "For it was not Zeus that published me that edict; not such are the laws set among men by the justice who dwells with the gods below; nor deemed I that thy decrees were of such force, that a mortal could override the unwritten and unfailing statutes of heaven.",
      "For their life is not of to-day or yesterday, but from all time, and no man knows when they were first put forth.",
    ],
    translator: "Richard C. Jebb (domínio público)",
    editionNote: "Tradicionalmente associada a este tópico: o conflito entre as leis não escritas e o decreto do Estado.",
    provenance: P_DEMO,
  },
  {
    id: "leviata-justica-8",
    referenceId: "leviata-justica-8",
    textEn: [
      "A free-man, is he, that in those things, which by his own strength and wit he is able to do, is not hindred to do what he has a will to.",
      "The liberty of a subject, lyeth therefore in the silence of the Law.",
    ],
    translator: "Edição Molesworth (domínio público), ortografia original",
    editionNote: "Definição canônica de liberdade civil de Hobbes, associada ao tópico 8 (justiça e liberdade).",
    provenance: P_DEMO,
  },
  {
    id: "politica-justica-8c1",
    referenceId: "politica-justica-8c1",
    textEn: [
      "He then is by nature a slave who is capable of belonging to another — and that is why he does so belong — and who participates in reason so far as to apprehend it, but not to possess it.",
      "The slave is a living tool and the tool a lifeless slave.",
    ],
    translator: "Benjamin Jowett (domínio público)",
    editionNote: "Trecho clássico da defesa aristotélica da escravidão natural — contraponto direto ao tema do tópico 8c(1).",
    provenance: P_DEMO,
  },
  {
    id: "riqueza-justica-8c1",
    referenceId: "riqueza-justica-8c1",
    textEn: [
      "The produce of labour constitutes the natural recompence or wages of labour.",
      "In that original state of things, which precedes both the appropriation of land and the accumulation of stock, the whole produce of labour belongs to the labourer.",
    ],
    translator: "1ª edição (1776), domínio público, ortografia original",
    editionNote: "Ponto de partida de Smith para a discussão de salários — base histórica do debate sobre 'escravidão assalariada'.",
    provenance: P_DEMO,
  },
];

export function justicePassageByReference(referenceId: string): JusticePassage | undefined {
  return justicePassages.find((passage) => passage.referenceId === referenceId);
}

// ---------------------------------------------------------------------------
// Seções canônicas ainda NÃO incorporadas (estados honestos)
// ---------------------------------------------------------------------------

export const JUSTICE_NOT_INGESTED = {
  introduction: "O ensaio de Introduction do Justice.pdf ainda não foi incorporado ao acervo digital.",
  references: `As referências completas do capítulo (a partir da p. impressa ${JUSTICE_CANON.referencesStartPagePrinted}) ainda não foram ingeridas; neste protótipo, cada topic mostra as referências recuperadas de forma independente.`,
  crossReferences: "As Cross-References do capítulo ainda não foram incorporadas.",
  additionalReadings: "As Additional Readings do capítulo ainda não foram incorporadas.",
} as const;
