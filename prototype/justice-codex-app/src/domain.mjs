export const PASSAGE_ABSENT = "Passagem não incorporada ao corpus digital.";

export function slug(value) {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function createDomain(data) {
  const topicsByCode = new Map(data.topics.map((topic) => [topic.code, topic]));
  const refsById = new Map(data.references.map((reference) => [reference.id, reference]));
  const authors = new Map();
  const works = new Map();

  for (const reference of data.references) {
    const authorId = `author:${slug(reference.authorRaw)}`;
    if (!authors.has(authorId)) authors.set(authorId, { id: authorId, canonicalName: reference.authorRaw, displayNamePtBr: reference.authorPt, referenceIds: [] });
    authors.get(authorId).referenceIds.push(reference.id);
    for (const segment of reference.workSegments) {
      const workId = `work:${slug(reference.authorRaw)}:${slug(segment.workTitle)}`;
      if (!works.has(workId)) works.set(workId, { id: workId, title: segment.workTitle, authorId, referenceIds: [], locators: [] });
      works.get(workId).referenceIds.push(reference.id);
      works.get(workId).locators.push(...segment.locators);
    }
  }

  const roots = data.topics.filter((topic) => topic.parentCode === null);
  const children = (code) => data.topics.filter((topic) => topic.parentCode === code);
  const topicPath = (code) => {
    const path = [];
    let current = topicsByCode.get(code);
    while (current) { path.unshift(current); current = current.parentCode ? topicsByCode.get(current.parentCode) : null; }
    return path;
  };
  const refsForTopic = (code) => data.references.filter((reference) => reference.topicCode === code);
  const refsForAuthor = (authorId) => (authors.get(authorId)?.referenceIds || []).map((id) => refsById.get(id));
  const refsForWork = (workId) => (works.get(workId)?.referenceIds || []).map((id) => refsById.get(id));
  const readings = [...data.greatIdea.additionalReadings.gbwwAuthors, ...data.greatIdea.additionalReadings.otherAuthors];
  const counts = Object.freeze({
    topics: data.topics.length,
    references: data.references.length,
    authors: authors.size,
    works: works.size,
    terms: data.inventoryTerms.length,
    crossReferences: data.crossReferences.length,
    passages: data.passages.length,
    additionalReadings: readings.length
  });

  const search = (query) => {
    const q = query.trim().toLocaleLowerCase("pt-BR");
    if (!q) return [];
    const results = [];
    for (const topic of data.topics) if (`${topic.code} ${topic.titleOriginal} ${topic.displayTextPtBr}`.toLocaleLowerCase("pt-BR").includes(q)) results.push({ kind: "topic", id: topic.code, title: `${topic.code} · ${topic.displayTextPtBr}`, meta: topic.titleOriginal });
    for (const reference of data.references) if (`${reference.authorRaw} ${reference.authorPt} ${reference.rawText} ${reference.workSegments.map((w) => w.workTitle).join(" ")}`.toLocaleLowerCase("pt-BR").includes(q)) results.push({ kind: "reference", id: reference.id, title: `${reference.authorPt} · ${reference.workSegments.map((w) => w.workTitle).join(" / ")}`, meta: "Reference Entry · Justice 8c(1)" });
    for (const term of data.inventoryTerms) if (`${term.termRaw} ${term.rawText}`.toLocaleLowerCase("pt-BR").includes(q)) results.push({ kind: "term", id: term.id, title: term.termRaw, meta: `Inventory of Terms · ${term.edition}` });
    return results.slice(0, 40);
  };

  return { data, topicsByCode, refsById, authors, works, roots, children, topicPath, refsForTopic, refsForAuthor, refsForWork, readings, counts, search };
}

export function validateDomain(domain) {
  const { data, topicsByCode } = domain;
  const ids = [
    ...data.editions.map((item) => item.id), data.greatIdea.id,
    ...data.topics.map((item) => item.id), ...data.references.map((item) => item.id),
    ...data.crossReferences.map((item) => item.id), ...data.inventoryTerms.map((item) => item.id),
    ...domain.readings.map((item) => item.id), ...domain.authors.keys(), ...domain.works.keys()
  ];
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  const brokenParents = data.topics.filter((topic) => topic.parentCode && !topicsByCode.has(topic.parentCode));
  const brokenReferences = data.references.filter((reference) => !topicsByCode.has(reference.topicCode));
  const alteredLocators = data.references.filter((reference) => reference.workSegments.some((segment) => segment.locators.some((locator) => !reference.rawText.includes(locator))));
  const nonGlobalCrossReferences = data.crossReferences.filter((reference) => reference.sourceTopicId !== null);
  const inventedPassages = data.passages.length !== 0;
  const chattel = data.inventoryTerms.find((term) => term.normalizedLabel === "chattel slavery");
  const chattelValid = Boolean(chattel?.entries.some((entry) => entry.rawTargetText === "Justice 8c(1)" && entry.corresponding1952TopicCode === "8c(1)" && entry.provenance.edition === "1990"));
  return { valid: !duplicates.length && !brokenParents.length && !brokenReferences.length && !alteredLocators.length && !nonGlobalCrossReferences.length && !inventedPassages && chattelValid, duplicates, brokenParents, brokenReferences, alteredLocators, nonGlobalCrossReferences, inventedPassages, chattelValid };
}
