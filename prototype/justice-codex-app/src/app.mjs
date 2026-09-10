import { createDomain, PASSAGE_ABSENT } from "./domain.mjs";

const response = await fetch("./data/justice.json");
if (!response.ok) throw new Error(`Falha ao carregar dados: ${response.status}`);
const domain = createDomain(await response.json());
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHtml = (value) => String(value ?? "").replace(/[&<>\"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);
const routeFor = (kind, id) => `#/${kind}/${encodeURIComponent(id)}`;
const state = { mode: "syntopic", language: "pt", compare: [], lastDialogTrigger: null, tourIndex: 0 };

function route() {
  const [kind = "home", encoded = ""] = location.hash.replace(/^#\//, "").split("/");
  return { kind, id: decodeURIComponent(encoded) };
}

function bilingual(item) {
  return state.language === "pt" ? { main: item.displayTextPtBr, source: item.titleOriginal } : { main: item.titleOriginal, source: item.displayTextPtBr };
}

function badge(text, type = "canonical") { return `<span class="badge ${type}">${escapeHtml(text)}</span>`; }
function sourceNote(page, layer = "original-corpus", edition = "1952") { return `<p class="source-note"><span>${escapeHtml(layer)}</span> Justice.pdf · ed. ${edition}${page ? ` · p. ${page}` : ""}</p>`; }

function renderOutline() {
  const active = route().kind === "topic" ? route().id : null;
  $("#outline").innerHTML = domain.roots.map((root) => {
    const descendants = domain.children(root.code);
    return `<section class="outline-group"><a class="outline-root ${active === root.code ? "active" : ""}" href="${routeFor("topic", root.code)}"><span>${root.code}</span>${escapeHtml(bilingual(root).main)}</a>${descendants.map((child) => `<a class="outline-child ${active === child.code ? "active" : ""}" href="${routeFor("topic", child.code)}"><span>${child.code}</span>${escapeHtml(bilingual(child).main)}</a>${domain.children(child.code).map((leaf) => `<a class="outline-leaf ${active === leaf.code ? "active" : ""}" href="${routeFor("topic", leaf.code)}"><span>${leaf.code}</span>${escapeHtml(bilingual(leaf).main)}</a>`).join("")}`).join("")}</section>`;
  }).join("");
}

function stats() {
  const c = domain.counts;
  return `<div class="stats"><div><b>${c.topics}</b><span>Topics no outline</span></div><div><b>${c.references}</b><span>References em 8c(1)</span></div><div><b>${c.crossReferences}</b><span>Cross-References</span></div><div><b>${c.additionalReadings}</b><span>Additional Readings</span></div><div><b>${c.passages}</b><span>Passages</span></div></div>`;
}

function renderHome() {
  const term = domain.data.inventoryTerms[0];
  return `<article class="page home-page"><div class="folio">42</div><div class="hero-copy"><p class="eyebrow">The Great Ideas · Volume 2</p><h1>Justiça <i>Justice</i></h1><p class="deck">Um instrumento de leitura, não um oráculo: percorra o mapa editorial de Adler, preserve o endereço de cada referência e veja claramente onde o corpus digital termina.</p><div class="hero-actions"><a class="ink-button" href="${routeFor("topic", "8c(1)")}">Ir direto a 8c(1)</a><button class="paper-button" type="button" data-tour-action>Iniciar percurso guiado</button></div></div>${stats()}<section class="callout"><div><p class="eyebrow">Golden case</p><h2>Economic exploitation: chattel slavery and wage slavery</h2><p>O ramo 8c(1) reúne dezoito Reference Entries verificadas contra a página impressa 868. Cada registro conduz à obra e ao autor, sem simular a passagem ausente.</p></div><a class="arrow-link" href="${routeFor("topic", "8c(1)")}">Abrir o dossiê <span>→</span></a></section><section class="two-column"><div><p class="eyebrow">Entrada lexical · 1990</p><h2>${escapeHtml(term.termRaw)}</h2><p class="raw-entry">${escapeHtml(term.rawText)}</p><a class="text-button" href="${routeFor("term", term.id)}">Examinar correspondência de edição →</a></div><div><p class="eyebrow">Regra de leitura</p><blockquote>Uma referência identifica um lugar de leitura. Enquanto a passagem não for incorporada e verificada, a ausência deve permanecer visível.</blockquote></div></section></article>`;
}

function topicCard(topic) {
  const copy = bilingual(topic);
  return `<a class="topic-card" href="${routeFor("topic", topic.code)}"><span class="topic-number">${topic.code}</span><div><h3>${escapeHtml(copy.main)}</h3><p>${escapeHtml(copy.source)}</p></div><span aria-hidden="true">↗</span></a>`;
}

function referenceCard(reference) {
  const checked = state.compare.includes(reference.id);
  return `<article class="reference-card"><div class="reference-index">${String(reference.order).padStart(2, "0")}</div><div><p class="reference-author">${escapeHtml(reference.authorPt)} <small>${escapeHtml(reference.authorRaw)}</small></p><h3>${escapeHtml(reference.workSegments.map((work) => work.workTitle).join(" / "))}</h3><p class="raw-entry">${escapeHtml(reference.rawText)}</p><div class="card-actions"><a href="${routeFor("reference", reference.id)}">Abrir Reference Entry</a><label><input type="checkbox" data-compare="${escapeHtml(reference.id)}" ${checked ? "checked" : ""}> Comparar</label></div></div><div class="reference-meta"><span>Vol. ${reference.volume}</span><span>p. 868</span></div></article>`;
}

function renderTopic(code) {
  const topic = domain.topicsByCode.get(code);
  if (!topic) return notFound();
  const copy = bilingual(topic), children = domain.children(code), references = domain.refsForTopic(code);
  const path = domain.topicPath(code).map((item) => `<a href="${routeFor("topic", item.code)}">${item.code}</a>`).join(" <span>›</span> ");
  return `<article class="page"><nav class="breadcrumbs" aria-label="Trilha"><a href="#/home">42 · Justiça</a><span>›</span>${path}</nav><header class="page-header"><div><p class="eyebrow">Topic · ${badge("canônico")}</p><h1><span>${topic.code}</span>${escapeHtml(copy.main)}</h1><p class="source-title">${escapeHtml(copy.source)}</p></div><div class="page-number">${topic.printedPageAnchor || "—"}<small>página impressa</small></div></header>${sourceNote(topic.provenance.page)}${children.length ? `<section><h2 class="section-title">Subestrutura</h2><div class="topic-grid">${children.map(topicCard).join("")}</div></section>` : ""}${references.length ? `<section><div class="section-title-row"><h2 class="section-title">Reference Entries</h2><span>${references.length} registros · ordem impressa</span></div><div class="reference-list">${references.map(referenceCard).join("")}</div></section>` : `<section class="empty-state"><p class="eyebrow">Cobertura delimitada</p><h2>Referências não incorporadas neste recorte.</h2><p>Isso não significa que o tópico não tenha referências no Syntopicon. Significa apenas que este app autocontido estruturou integralmente o golden case 8c(1).</p></section>`}</article>`;
}

function workLinks(reference) {
  const authorId = `author:${slugFor(reference.authorRaw)}`;
  return reference.workSegments.map((segment) => { const id = `work:${slugFor(reference.authorRaw)}:${slugFor(segment.workTitle)}`; return `<li><a href="${routeFor("work", id)}"><b>${escapeHtml(segment.workTitle)}</b></a><span>${segment.locators.map(escapeHtml).join(" · ")}</span></li>`; }).join("") + `<li><a href="${routeFor("author", authorId)}"><b>${escapeHtml(reference.authorPt)}</b></a><span>Author record</span></li>`;
}
const slugFor = (value) => String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function renderReference(id) {
  const reference = domain.refsById.get(id);
  if (!reference) return notFound();
  return `<article class="page"><nav class="breadcrumbs" aria-label="Trilha"><a href="#/home">42 · Justiça</a><span>›</span><a href="${routeFor("topic", "8c(1)")}">8c(1)</a><span>›</span><span>Reference ${reference.order}</span></nav><header class="page-header"><div><p class="eyebrow">Reference Entry · ${badge("original-corpus")}</p><h1>${escapeHtml(reference.authorPt)}</h1><p class="source-title">${escapeHtml(reference.authorRaw)}</p></div><div class="page-number">${String(reference.order).padStart(2, "0")}<small>ordem no tópico</small></div></header>${sourceNote(868)}<section class="record-block"><p class="eyebrow">Transcrição normalizada do registro</p><p class="record-raw">${escapeHtml(reference.rawText)}</p></section><section><h2 class="section-title">Entidades resolvidas</h2><ul class="entity-list">${workLinks(reference)}</ul></section><section class="passage-state" role="status"><span aria-hidden="true">∅</span><div><p class="eyebrow">Passage · unresolved</p><h2>${PASSAGE_ABSENT}</h2><p>A referência acima permanece navegável; nenhum texto da obra foi inferido ou fabricado.</p></div></section><a class="arrow-link" href="${routeFor("topic", "8c(1)")}">← Retornar ao tópico 8c(1)</a></article>`;
}

function renderWork(id) {
  const work = domain.works.get(id);
  if (!work) return notFound();
  const author = domain.authors.get(work.authorId), references = domain.refsForWork(id);
  return `<article class="page"><nav class="breadcrumbs" aria-label="Trilha"><a href="#/home">42 · Justiça</a><span>›</span><a href="${routeFor("topic", "8c(1)")}">8c(1)</a><span>›</span><span>Work</span></nav><header class="page-header"><div><p class="eyebrow">Work · vista derivada</p><h1>${escapeHtml(work.title)}</h1><p class="source-title"><a href="${routeFor("author", author.id)}">${escapeHtml(author.displayNamePtBr)} · ${escapeHtml(author.canonicalName)}</a></p></div><div class="page-number">${references.length}<small>Reference Entries</small></div></header>${badge("derived-structure", "derived")}<section><h2 class="section-title">Localizadores preservados</h2><ul class="locator-list">${work.locators.map((locator) => `<li>${escapeHtml(locator)}</li>`).join("")}</ul></section><section><h2 class="section-title">Ocorrências em Justice 8c(1)</h2>${references.map(referenceCard).join("")}</section><a class="arrow-link" href="${routeFor("author", author.id)}">Seguir para o autor →</a></article>`;
}

function renderAuthor(id) {
  const author = domain.authors.get(id);
  if (!author) return notFound();
  const references = domain.refsForAuthor(id);
  const works = [...domain.works.values()].filter((work) => work.authorId === id);
  return `<article class="page"><nav class="breadcrumbs" aria-label="Trilha"><a href="#/home">42 · Justiça</a><span>›</span><a href="${routeFor("topic", "8c(1)")}">8c(1)</a><span>›</span><span>Author</span></nav><header class="page-header"><div><p class="eyebrow">Author · vista derivada</p><h1>${escapeHtml(author.displayNamePtBr)}</h1><p class="source-title">${escapeHtml(author.canonicalName)}</p></div><div class="page-number">${works.length}<small>works no recorte</small></div></header>${badge("derived-structure", "derived")}<section><h2 class="section-title">Obras citadas</h2><ul class="entity-list">${works.map((work) => `<li><a href="${routeFor("work", work.id)}"><b>${escapeHtml(work.title)}</b></a><span>${work.locators.length} locator(s)</span></li>`).join("")}</ul></section><section><h2 class="section-title">Reference Entries</h2>${references.map(referenceCard).join("")}</section><a class="arrow-link" href="${routeFor("topic", "8c(1)")}">← Retornar ao tópico 8c(1)</a></article>`;
}

function renderBibliographic() {
  return `<article class="page"><header class="page-header"><div><p class="eyebrow">Modo bibliográfico</p><h1>Autores e obras</h1><p class="source-title">Uma inversão derivada do mesmo conjunto de referências.</p></div><div class="page-number">${domain.authors.size}<small>authors</small></div></header><div class="bibliography">${[...domain.authors.values()].map((author) => { const works = [...domain.works.values()].filter((work) => work.authorId === author.id); return `<section><p class="eyebrow">${author.referenceIds.length} reference(s)</p><h2><a href="${routeFor("author", author.id)}">${escapeHtml(author.displayNamePtBr)}</a></h2><p>${escapeHtml(author.canonicalName)}</p><ul>${works.map((work) => `<li><a href="${routeFor("work", work.id)}">${escapeHtml(work.title)}</a></li>`).join("")}</ul></section>`; }).join("")}</div></article>`;
}

function renderLexical(termId = domain.data.inventoryTerms[0].id) {
  const term = domain.data.inventoryTerms.find((item) => item.id === termId) || domain.data.inventoryTerms[0], entry = term.entries[0];
  return `<article class="page"><header class="page-header"><div><p class="eyebrow">Inventory of Terms · ${term.edition}</p><h1>${escapeHtml(term.termRaw)}</h1><p class="source-title">Autoridade lexical expandida, explicitamente separada da edição de 1952.</p></div><div class="page-number">1990<small>second edition</small></div></header>${sourceNote(null, "original-corpus", "1990")}<section class="record-block"><p class="eyebrow">Raw entry</p><p class="record-raw">${escapeHtml(term.rawText)}</p></section><section class="edition-bridge"><div><p class="eyebrow">Alvo impresso</p><h2>${escapeHtml(entry.rawTargetText)}</h2><p>O alvo na edição de 1990 não foi resolvido como entidade autônoma neste app.</p></div><div aria-hidden="true">⇢</div><div><p class="eyebrow">Correspondência explícita</p><h2><a href="${routeFor("topic", entry.corresponding1952TopicCode)}">Justice ${entry.corresponding1952TopicCode}</a></h2><p>${badge(entry.correspondenceLayer, "derived")} · edição 1952</p></div></section><p class="caution">A correspondência entre edições é exibida como estrutura derivada; não é reclassificada silenciosamente como relação canônica de 1952.</p></article>`;
}

function notFound() { return `<article class="page empty-state"><p class="eyebrow">404</p><h1>Registro não encontrado.</h1><a href="#/home">Retornar ao início</a></article>`; }

function renderContext() {
  const current = route();
  $("#route-context").innerHTML = `<p class="eyebrow">Você está em</p><p><b>${escapeHtml(current.kind)}</b>${current.id ? `<br><span class="mono">${escapeHtml(current.id)}</span>` : ""}</p>`;
  $("#coverage").innerHTML = `<dl><div><dt>Topics</dt><dd>${domain.counts.topics}</dd></div><div><dt>References</dt><dd>${domain.counts.references}</dd></div><div><dt>Passages</dt><dd>${domain.counts.passages}</dd></div></dl>`;
}

function bindDynamic() {
  $$('[data-compare]').forEach((input) => input.addEventListener("change", () => toggleCompare(input.dataset.compare, input.checked)));
  $$('[data-tour-action]').forEach((button) => button.addEventListener("click", () => startTour(button)));
}

function render() {
  renderOutline(); renderContext();
  const current = route();
  let html;
  if (state.mode === "bibliographic") html = renderBibliographic();
  else if (state.mode === "lexical") html = renderLexical(current.kind === "term" ? current.id : undefined);
  else if (current.kind === "topic") html = renderTopic(current.id);
  else if (current.kind === "reference") html = renderReference(current.id);
  else if (current.kind === "work") html = renderWork(current.id);
  else if (current.kind === "author") html = renderAuthor(current.id);
  else if (current.kind === "term") { state.mode = "lexical"; html = renderLexical(current.id); }
  else html = renderHome();
  $("#content").innerHTML = html;
  $$('[data-mode]').forEach((button) => {
    const selected = button.dataset.mode === state.mode;
    button.setAttribute("aria-pressed", String(selected));
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  bindDynamic();
  document.title = `${current.id ? current.id + " · " : ""}Syntopicon · Justiça`;
}

function toggleCompare(id, checked) {
  if (checked && !state.compare.includes(id)) {
    if (state.compare.length === 2) { openModal("Comparação limitada", "<p>Remova uma das duas referências selecionadas antes de adicionar outra.</p>"); render(); return; }
    state.compare.push(id);
  } else state.compare = state.compare.filter((item) => item !== id);
  updateCompareTray();
}

function updateCompareTray() {
  $("#compare-tray").hidden = state.compare.length === 0;
  $("#compare-count").textContent = `${state.compare.length} referência${state.compare.length === 1 ? "" : "s"}`;
  $("#compare-open").disabled = state.compare.length !== 2;
}

function compareSelected(trigger) {
  state.lastDialogTrigger = trigger;
  const refs = state.compare.map((id) => domain.refsById.get(id));
  openModal("Comparação de Reference Entries", `<div class="comparison">${refs.map((reference) => `<article><p class="eyebrow">Reference ${reference.order} · Vol. ${reference.volume}</p><h3>${escapeHtml(reference.authorPt)}</h3><p>${escapeHtml(reference.workSegments.map((work) => work.workTitle).join(" / "))}</p><p class="raw-entry">${escapeHtml(reference.rawText)}</p><div class="passage-mini">${PASSAGE_ABSENT}</div></article>`).join("")}</div>`);
}

function openModal(title, body, trigger = document.activeElement) {
  state.lastDialogTrigger = trigger;
  $("#modal-title").textContent = title;
  $("#modal-body").innerHTML = body;
  $("#modal").showModal();
  $("#modal-close").focus();
}

const tourSteps = [
  { route: "#/home", title: "Home → Justiça", body: "Comece pelo estatuto do artefato: capítulo 42, edição de 1952 e contagens derivadas." },
  { route: routeFor("topic", "8c(1)"), title: "Tópico 8c(1)", body: "O outline preserva o inglês da fonte e leva às 18 Reference Entries na ordem impressa." },
  { route: routeFor("reference", "ref:justice:8c1:001"), title: "Reference Entry", body: "A referência de Aristóteles preserva obras e localizadores, mas declara a passagem ausente." },
  { route: routeFor("work", "work:aristotle:ethics"), title: "Work", body: "A obra reúne apenas relações derivadas de referências efetivamente incorporadas." },
  { route: routeFor("author", "author:aristotle"), title: "Author", body: "O autor oferece o caminho inverso para suas obras e referências neste recorte." },
  { route: routeFor("topic", "8c(1)"), title: "Retorno ao tópico", body: "O ciclo termina onde começou, sem beco sem saída: Topic → Reference → Work → Author → Topic." }
];

function startTour(trigger = document.activeElement) { state.lastDialogTrigger = trigger; state.tourIndex = 0; showTourStep(); $("#tour").showModal(); $("#tour-next").focus(); }
function showTourStep() { const step = tourSteps[state.tourIndex]; location.hash = step.route; $("#tour-step").textContent = `Etapa ${state.tourIndex + 1} de ${tourSteps.length}`; $("#tour-title").textContent = step.title; $("#tour-body").innerHTML = `<p>${escapeHtml(step.body)}</p>`; $("#tour-prev").disabled = state.tourIndex === 0; $("#tour-next").textContent = state.tourIndex === tourSteps.length - 1 ? "Concluir" : "Próximo →"; }
function closeTour() { $("#tour").close(); state.lastDialogTrigger?.focus(); }

$("#language").addEventListener("click", () => { state.language = state.language === "pt" ? "en" : "pt"; $("#language").textContent = state.language === "pt" ? "PT / EN" : "EN / PT"; document.documentElement.lang = state.language === "pt" ? "pt-BR" : "en"; render(); });
$$('[data-mode]').forEach((button) => {
  button.addEventListener("click", () => { state.mode = button.dataset.mode; render(); $("#content").focus(); });
  button.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const tabs = $$('[data-mode]');
    const current = tabs.indexOf(event.currentTarget);
    const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (current + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    state.mode = tabs[next].dataset.mode;
    render();
    $$('[data-mode]')[next].focus();
  });
});
$("#search").addEventListener("input", (event) => { const results = domain.search(event.target.value); const panel = $("#search-results"); panel.innerHTML = results.length ? results.map((result) => `<a href="${routeFor(result.kind, result.id)}"><b>${escapeHtml(result.title)}</b><span>${escapeHtml(result.meta)}</span></a>`).join("") : `<p>Nenhum resultado no recorte incorporado.</p>`; panel.hidden = !event.target.value; });
$("#search-results").addEventListener("click", () => { $("#search-results").hidden = true; $("#search").value = ""; });
$("#tour-start").addEventListener("click", (event) => startTour(event.currentTarget));
$("#modal-close").addEventListener("click", () => $("#modal").close());
$("#modal").addEventListener("close", () => state.lastDialogTrigger?.focus());
$("#tour-close").addEventListener("click", closeTour);
$("#tour").addEventListener("close", () => state.lastDialogTrigger?.focus());
$("#tour-prev").addEventListener("click", () => { state.tourIndex -= 1; showTourStep(); });
$("#tour-next").addEventListener("click", () => { if (state.tourIndex === tourSteps.length - 1) closeTour(); else { state.tourIndex += 1; showTourStep(); } });
$("#compare-open").addEventListener("click", (event) => compareSelected(event.currentTarget));
$("#compare-clear").addEventListener("click", () => { state.compare = []; updateCompareTray(); render(); });
$$('[data-dialog]').forEach((button) => button.addEventListener("click", () => {
  if (button.dataset.dialog === "sources") openModal("Fontes e camadas", `<dl class="audit-list"><div><dt>Outline, References, Cross-References, Additional Readings</dt><dd>Justice.pdf · Chapter 42 · Vol. 2 · edição 1952 · pp. 850–879</dd></div><div><dt>Inventory Term</dt><dd>Inventory of Terms · Second Edition 1990 · Volume 3</dd></div><div><dt>Apresentação em português</dt><dd>${badge("interpretive-content", "interpretive")} · o inglês permanece visível</dd></div><div><dt>Passages</dt><dd>${badge("0 incorporadas", "unresolved")}</dd></div></dl>`, button);
  if (button.dataset.dialog === "crossrefs") openModal("Cross-References · p. 878", `<p class="caution">Todos os registros são globais da Grande Ideia; <code>sourceTopicId = null</code>.</p>${domain.data.crossReferences.map((item) => `<article class="reading"><p>${escapeHtml(item.rawText)}</p>${sourceNote(item.provenance.page)}</article>`).join("")}`, button);
  if (button.dataset.dialog === "readings") openModal("Additional Readings · p. 879", `<div class="reading-columns"><section><h3>I · Authors represented in Great Books</h3>${domain.data.greatIdea.additionalReadings.gbwwAuthors.map((item) => `<p>${escapeHtml(item.rawText)}</p>`).join("")}</section><section><h3>II · Authors not represented</h3>${domain.data.greatIdea.additionalReadings.otherAuthors.map((item) => `<p>${escapeHtml(item.rawText)}</p>`).join("")}</section></div>`, button);
}));
document.addEventListener("keydown", (event) => { if (event.key === "/" && document.activeElement !== $("#search")) { event.preventDefault(); $("#search").focus(); } if (event.key === "Escape") $("#search-results").hidden = true; });
window.addEventListener("hashchange", render);
if (!location.hash) history.replaceState(null, "", "#/home");
render(); updateCompareTray();
