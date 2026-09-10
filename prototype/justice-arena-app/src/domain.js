// domain.js — camada de domínio PURA (sem DOM, sem fetch).
// Todas as funções recebem os datasets como argumentos explícitos.
// Regras epistêmicas (invioláveis):
//   1. locatorRaw é literal — nunca transformado, nunca "normalizado".
//   2. Reference ≠ Passage. Passagem inexistente é um estado explícito.
//   3. Author/Work derivados das linhas de referência são camada DERIVED —
//      a forma impressa (authorRaw) é a identidade; nada é deduplicado por
//      semelhança textual.
//   4. Contagens são sempre derivadas — nunca hardcoded.
//   5. Falha de parsing/classificação é um estado válido e visível.

// ─── Utilidades ───────────────────────────────────────────────────────────

export function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ─── Classificações derivadas de linhas de referência ─────────────────────
// O Syntopicon imprime, na posição de "autor", três espécies de cabeçalho:
// pessoas (PLATO), documentos americanos (FEDERALIST) e partes da Bíblia
// (OLD TESTAMENT). A classificação abaixo é DERIVADA e rotulada como tal;
// a linha impressa permanece intacta.

const DOCUMENT_AUTHORS = new Set([
  "DECLARATION OF INDEPENDENCE",
  "ARTICLES OF CONFEDERATION",
  "CONSTITUTION OF THE U.S.",
  "FEDERALIST",
]);

const SCRIPTURE_AUTHORS = new Set(["OLD TESTAMENT", "NEW TESTAMENT", "APOCRYPHA"]);

// Cabeçalho corrido de página que o parser da fonte capturou como linha de
// referência (ex.: "7 CHAPTER 42: JUSTICE 865"). RAW preservado; a entidade
// derivada de autor NÃO é criada; a exclusão é declarada e contada.
export function refFlowArtifact(ref) {
  return /^CHAPTER \d+$/i.test(ref.authorRaw ?? "");
}

export function refAuthorKind(ref) {
  if (refFlowArtifact(ref)) return "flow-artifact";
  if (ref.entryKind === "bible" || SCRIPTURE_AUTHORS.has(ref.authorRaw)) return "scripture";
  if (DOCUMENT_AUTHORS.has(ref.authorRaw)) return "document";
  return "person";
}

// ─── Tópicos (outline canônico) ───────────────────────────────────────────

export function topicBySlug(topics, slug) {
  return topics.find((t) => t.slug === slug);
}

export function topicChildren(topics, slug) {
  return topics.filter((t) => t.parentSlug === slug);
}

export function topicRoots(topics) {
  return topics.filter((t) => t.level === 1);
}

export function topicPath(topics, slug) {
  const path = [];
  let cursor = topicBySlug(topics, slug);
  while (cursor) {
    path.unshift(cursor);
    cursor = cursor.parentSlug ? topicBySlug(topics, cursor.parentSlug) : undefined;
  }
  return path;
}

export function referencesForTopic(references, topicSlug) {
  return references.filter((r) => r.topicSlug === topicSlug);
}

// ─── Autores derivados ────────────────────────────────────────────────────

export function buildAuthors(references) {
  const byKey = new Map();
  for (const ref of references) {
    const kind = refAuthorKind(ref);
    if (kind === "flow-artifact") continue; // artefato de fluxo: sem entidade
    const key = slugify(ref.authorRaw);
    const entry =
      byKey.get(key) ??
      {
        id: `author:${key}`,
        key,
        nameRaw: ref.authorRaw, // forma impressa — identidade
        kind,
        volumes: new Set(),
        refIds: [],
        topics: new Set(),
      };
    if (ref.volume != null) entry.volumes.add(ref.volume);
    entry.refIds.push(ref.id);
    entry.topics.add(ref.topicSlug);
    byKey.set(key, entry);
  }
  const authors = [...byKey.values()].map((a) => ({
    id: a.id,
    key: a.key,
    nameRaw: a.nameRaw,
    kind: a.kind,
    volumes: [...a.volumes].sort((x, y) => x - y),
    refCount: a.refIds.length,
    refIds: a.refIds,
    topicSlugs: [...a.topics],
  }));
  authors.sort((a, b) => a.nameRaw.localeCompare(b.nameRaw, "en"));
  return authors;
}

export function authorByKey(authors, key) {
  return authors.find((a) => a.key === key);
}

// ─── Obras derivadas ──────────────────────────────────────────────────────
// Uma "obra derivada" = par (cabeçalho impresso, título de obra segmentado).
// A segmentação de obras vem da própria fonte (workSegments, camada derivada
// do parser canônico); o par com o cabeçalho é a identidade — o mesmo título
// sob cabeçalhos distintos são entradas distintas, como impresso.

export function workKeyOf(authorKey, workTitle) {
  return `${authorKey}__${slugify(workTitle)}`;
}

export function buildWorks(references) {
  const byKey = new Map();
  for (const ref of references) {
    if (refAuthorKind(ref) === "flow-artifact") continue;
    const authorKey = slugify(ref.authorRaw);
    for (const seg of ref.workSegments) {
      if (!seg.workTitle) continue;
      const key = workKeyOf(authorKey, seg.workTitle);
      const entry =
        byKey.get(key) ??
        {
          id: `work:${key}`,
          key,
          titleEn: seg.workTitle,
          authorKey,
          authorRaw: ref.authorRaw,
          volumes: new Set(),
          refIds: [],
          topicSlugs: new Set(),
        };
      if (ref.volume != null) entry.volumes.add(ref.volume);
      entry.refIds.push(ref.id);
      entry.topicSlugs.add(ref.topicSlug);
      byKey.set(key, entry);
    }
  }
  const works = [...byKey.values()].map((w) => ({
    id: w.id,
    key: w.key,
    titleEn: w.titleEn,
    authorKey: w.authorKey,
    authorRaw: w.authorRaw,
    volumes: [...w.volumes].sort((x, y) => x - y),
    refCount: w.refIds.length,
    refIds: w.refIds,
    topicSlugs: [...w.topicSlugs],
  }));
  works.sort((a, b) => a.titleEn.localeCompare(b.titleEn, "en"));
  return works;
}

export function workByKey(works, key) {
  return works.find((w) => w.key === key);
}

export function worksForAuthor(works, authorKey) {
  return works.filter((w) => w.authorKey === authorKey);
}

export function worksForReference(works, ref) {
  if (refAuthorKind(ref) === "flow-artifact") return [];
  const authorKey = slugify(ref.authorRaw);
  const keys = new Set(
    ref.workSegments.filter((s) => s.workTitle).map((s) => workKeyOf(authorKey, s.workTitle)),
  );
  return works.filter((w) => keys.has(w.key));
}

// ─── Volumes (perspectiva física) ─────────────────────────────────────────

export function buildVolumes(references, works) {
  const byVolume = new Map();
  const authorNameBykey = new Map(works.map((w) => [w.authorKey, w.authorRaw]));
  for (const ref of references) {
    if (ref.volume == null || refAuthorKind(ref) === "flow-artifact") continue;
    const entry = byVolume.get(ref.volume) ?? { volume: ref.volume, refIds: [] };
    entry.refIds.push(ref.id);
    byVolume.set(ref.volume, entry);
  }
  return [...byVolume.values()]
    .map((v) => ({ volume: v.volume, refCount: v.refIds.length, refIds: v.refIds }))
    .sort((a, b) => a.volume - b.volume);
}

// ─── Passagens: Reference ≠ Passage ───────────────────────────────────────
// O corpus canônico NÃO contém passagens. As 4 passagens de demonstração
// (camada interpretativa) pertencem a REFERÊNCIAS DE DEMONSTRAÇÃO — entidades
// próprias, jamais confundidas com as referências canônicas.

export const PASSAGE_ABSENT_LABEL = "Passagem não incorporada ao corpus digital.";

export function demoReferencesForTopic(demoLayer, topicSlug) {
  return (demoLayer?.demoReferences ?? []).filter((r) => r.topicSlug === topicSlug);
}

export function demoPassageForReference(demoLayer, demoReferenceId) {
  return (demoLayer?.demoPassages ?? []).find((p) => p.referenceId === demoReferenceId);
}

// Estado de passagem de uma referência CANÔNICA: sempre ausente no corpus
// (a única exceção possível seria uma ingestão futura — hoje inexistente).
export function passageStateForCanonicalReference() {
  return { status: "NOT_IN_CORPUS", label: PASSAGE_ABSENT_LABEL };
}

// ─── Cross-references (globais ao capítulo) ───────────────────────────────
// As Cross-References do Syntopicon pertencem ao CAPÍTULO, não a um tópico.
// Elas nunca recebem um tópico de origem artificial. Os destinos de ideia
// (ex.: "COURAGE 4") são DERIVADOS por parsing leve do texto bruto — apenas
// o nome da ideia em MAIÚSCULAS é resolvido contra a lista canônica de 102;
// o código do tópico de destino permanece texto bruto (não ingerido).

export function crossRefDerivedTargets(crossRef, canonicalIdeas) {
  const byNameEn = new Map(canonicalIdeas.map((i) => [i.nameEn.toUpperCase(), i]));
  const targets = [];
  const re = /\b([A-Z][A-Z &'-]{2,}?[A-Z])\b/g;
  let m;
  while ((m = re.exec(crossRef.textRaw))) {
    const idea = byNameEn.get(m[1].replace(/\s+/g, " ").trim());
    if (idea && !targets.some((t) => t.ideaNumber === idea.number)) targets.push(idea);
  }
  return targets;
}

// ─── Termos do inventário ─────────────────────────────────────────────────

export function termTargetsResolve(terms, topics, canonicalIdeas) {
  const results = [];
  for (const term of terms) {
    for (const target of term.targets) {
      const topic = topicBySlug(topics, target.topicSlug);
      const idea = canonicalIdeas.find((i) => i.number === target.ideaNumber);
      results.push({ termId: term.id, topicOk: Boolean(topic), ideaOk: Boolean(idea) });
    }
  }
  return results;
}

// ─── Contagens derivadas (nunca hardcoded) ────────────────────────────────

export function deriveCounts(ctx) {
  const { justice1952, authors, works, volumes, terms, demoLayer } = ctx;
  const references = justice1952.references;
  const topics = justice1952.topics;
  const flowArtifacts = references.filter(refFlowArtifact).length;
  return {
    topics: topics.length,
    topicsLevel1: topics.filter((t) => t.level === 1).length,
    topicsLevel2: topics.filter((t) => t.level === 2).length,
    topicsLevel3: topics.filter((t) => t.level === 3).length,
    topicsWithReferences: new Set(references.map((r) => r.topicSlug)).size,
    topicsWithoutReferences: topics.filter(
      (t) => referencesForTopic(references, t.slug).length === 0,
    ).map((t) => t.slug),
    references: references.length,
    authorReferences: references.filter((r) => r.entryKind === "author").length,
    bibleReferences: references.filter((r) => r.entryKind === "bible").length,
    flowArtifacts,
    crossReferences: justice1952.crossReferences.length,
    authors: authors.length,
    authorPersons: authors.filter((a) => a.kind === "person").length,
    authorDocuments: authors.filter((a) => a.kind === "document").length,
    authorScriptures: authors.filter((a) => a.kind === "scripture").length,
    works: works.length,
    volumes: volumes.length,
    inventoryTerms: terms.length,
    demoReferences: demoLayer.demoReferences.length,
    demoPassages: demoLayer.demoPassages.length,
    introductionEnParagraphs: ctx.introductionEn.paragraphs.length,
    introductionPtParagraphs: justice1952.introPtBr.length,
    ideas: ctx.ideas102.list.length,
    additionalReadingsLines: ctx.additionalReadings.paragraphs.filter((p) =>
      /^[A-Z][A-Z .''—-]*\./.test(p) || /^[—.]/.test(p),
    ).length,
  };
}

// ─── Busca ────────────────────────────────────────────────────────────────

function normalizeSearch(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function searchAll(ctx, query) {
  const q = normalizeSearch(query);
  if (q.length < 2) return [];
  const out = [];
  const { justice1952, authors, works, terms, demoLayer } = ctx;
  const topics = justice1952.topics;

  for (const t of topics) {
    const hay = normalizeSearch(`${t.code} ${t.titleEn} ${t.titlePt}`);
    if (hay.includes(q)) {
      out.push({ type: "topic", score: 3, title: `${t.code} — ${t.titlePt}`, subtitle: t.titleEn, href: `#/topico/${t.slug}` });
    }
  }
  for (const term of terms) {
    if (normalizeSearch(term.label).includes(q)) {
      out.push({ type: "term", score: 4, title: term.label, subtitle: "Inventory Term", href: `#/inventario?termo=${encodeURIComponent(term.id)}` });
    }
  }
  for (const a of authors) {
    const displayPt = demoLayer.authorDisplay.find((d) => d.slug === a.key)?.namePt;
    const hay = normalizeSearch(`${a.nameRaw} ${displayPt ?? ""}`);
    if (hay.includes(q)) {
      out.push({
        type: "author",
        score: 2,
        title: a.nameRaw,
        subtitle: `${a.refCount} referência(s) · ${a.kind === "person" ? "autor" : a.kind === "document" ? "documento" : "escritura"}${displayPt && displayPt !== a.nameRaw ? ` · ${displayPt}` : ""}`,
        href: `#/autor/${a.key}`,
      });
    }
  }
  for (const w of works) {
    if (normalizeSearch(`${w.titleEn} ${w.authorRaw}`).includes(q)) {
      out.push({ type: "work", score: 2, title: w.titleEn, subtitle: `${w.authorRaw} · ${w.refCount} referência(s)`, href: `#/obra/${w.key}` });
    }
  }
  for (const r of justice1952.references) {
    if (normalizeSearch(r.locatorRaw).includes(q)) {
      const topic = topicBySlug(topics, r.topicSlug);
      out.push({
        type: "reference",
        score: 1,
        title: r.locatorRaw.slice(0, 90) + (r.locatorRaw.length > 90 ? "…" : ""),
        subtitle: `Referência · tópico ${topic?.code ?? r.topicSlug}`,
        href: `#/referencia/${encodeURIComponent(r.id)}`,
      });
    }
  }
  const order = { term: 0, topic: 1, author: 2, work: 3, reference: 4 };
  out.sort((a, b) => order[a.type] - order[b.type] || b.score - a.score || a.title.localeCompare(b.title));
  return out;
}

// ─── Percurso guiado (golden path) — passos declarativos ──────────────────

export function goldenPathSteps(ctx) {
  const { justice1952 } = ctx;
  const t8 = topicBySlug(justice1952.topics, "8");
  const t8c = topicBySlug(justice1952.topics, "8c");
  const t8c1 = topicBySlug(justice1952.topics, "8c-1");
  const aristotleRef = justice1952.references.find((r) => r.id === "jr1952:8c-1:01");
  const politicsWork = ctx.works.find((w) => w.key === "aristotle__politics");
  return [
    { step: 1, verb: "EXPLORE", label: "Início", href: "#/", note: "O Syntopicon é o mapa; os Great Books são o território." },
    { step: 2, verb: "EXPLORE", label: "Justiça — Grande Ideia 42", href: "#/ideia/justica", note: "Introduction, Outline of Topics e as seções do capítulo." },
    { step: 3, verb: "EXPLORE", label: "8 — Justiça econômica", href: `#/topico/${t8.slug}`, note: "Tópico de nível 1 (produção, distribuição e troca)." },
    { step: 4, verb: "EXPLORE", label: "8c — Justiça na organização da produção", href: `#/topico/${t8c.slug}`, note: "Descida progressiva: do geral ao específico." },
    { step: 5, verb: "READ", label: "8c(1) — Exploração econômica", href: `#/topico/${t8c1.slug}`, note: "O caso dourado: chattel slavery e wage slavery." },
    { step: 6, verb: "READ", label: "Referência — Aristotle", href: `#/referencia/${encodeURIComponent(aristotleRef.id)}`, note: "Uma linha impressa da lista canônica (locatorRaw literal)." },
    { step: 7, verb: "READ", label: "Obra — Politics", href: `#/obra/${politicsWork.key}`, note: "Entidade DERIVADA das linhas de referência." },
    { step: 8, verb: "READ", label: "Autor — Aristotle", href: "#/autor/aristotle", note: "Presença derivada: tópicos e obras no capítulo Justiça." },
    { step: 9, verb: "RETURN", label: "Retorno ao tópico 8c(1)", href: `#/topico/${t8c1.slug}`, note: "Voltar, reler e reconsiderar — com o contexto adquirido." },
  ];
}

// ─── Contexto completo (montado uma vez na inicialização) ────────────────

export function buildContext(datasets) {
  const {
    justice1952,
    introductionEn,
    additionalReadings,
    demoLayer,
    ideas102,
    sources,
    terms,
  } = datasets;
  const authors = buildAuthors(justice1952.references);
  const works = buildWorks(justice1952.references);
  const volumes = buildVolumes(justice1952.references, works);
  const ctx = {
    justice1952,
    introductionEn,
    additionalReadings,
    demoLayer,
    ideas102,
    sources,
    terms: datasets.terms.terms,
    termFile: datasets.terms,
    authors,
    works,
    volumes,
  };
  ctx.counts = deriveCounts(ctx);
  ctx.goldenPath = goldenPathSteps(ctx);
  return ctx;
}

// ─── Invariantes (usadas pelos testes e pela validação de execução) ──────

export function checkInvariants(ctx) {
  const errors = [];
  const { justice1952, authors, works, terms } = ctx;

  const topicSlugs = new Set(justice1952.topics.map((t) => t.slug));
  if (topicSlugs.size !== justice1952.topics.length) errors.push("slugs de tópico duplicados");

  const refIds = new Set(justice1952.references.map((r) => r.id));
  if (refIds.size !== justice1952.references.length) errors.push("ids de referência duplicados");

  for (const t of justice1952.topics) {
    if (t.parentSlug && !topicSlugs.has(t.parentSlug)) errors.push(`pai não resolve: ${t.slug} → ${t.parentSlug}`);
  }
  for (const r of justice1952.references) {
    if (!topicSlugs.has(r.topicSlug)) errors.push(`referência com tópico desconhecido: ${r.id}`);
    if (!r.locatorRaw || !r.locatorRaw.trim()) errors.push(`locatorRaw vazio: ${r.id}`);
  }

  const authorKeys = new Set(authors.map((a) => a.key));
  const workKeys = new Set(works.map((w) => w.key));
  if (authorKeys.size !== authors.length) errors.push("chaves de autor duplicadas");
  if (workKeys.size !== works.length) errors.push("chaves de obra duplicadas");

  for (const w of works) {
    if (!authorKeys.has(w.authorKey)) errors.push(`obra com autor desconhecido: ${w.key}`);
  }

  for (const term of terms) {
    for (const target of term.targets) {
      if (!topicSlugs.has(target.topicSlug)) errors.push(`termo ${term.id} aponta para tópico inexistente`);
      if (!ctx.ideas102.list.some((i) => i.number === target.ideaNumber)) {
        errors.push(`termo ${term.id} aponta para ideia inexistente`);
      }
    }
  }

  for (const p of ctx.demoLayer.demoPassages) {
    if (!ctx.demoLayer.demoReferences.some((r) => r.id === p.referenceId)) {
      errors.push(`passagem de demonstração órfã: ${p.id}`);
    }
  }

  return { ok: errors.length === 0, errors };
}
