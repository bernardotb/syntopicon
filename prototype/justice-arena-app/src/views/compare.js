// compare.js — modo sintópico de comparação: referências lado a lado.
// Compara-se o que existe (referências, localizadores, presença); as
// passagens ausentes são declaradas — nada é inventado para preencher.
import { el, breadcrumb, editionChip, emText, layerChip } from "../ui.js";
import { PASSAGE_ABSENT_LABEL, refAuthorKind, topicBySlug, worksForReference } from "../domain.js";
import { compareTray } from "../main.js";

export default function compare(_params, ctx) {
  const shell = el("div", { class: "page-shell" });
  shell.append(breadcrumb([{ label: "Início", href: "#/" }, { label: "Comparar" }]));
  shell.append(el("header", { class: "page-header" },
    el("p", { class: "eyebrow" }, "COMPARE · modo sintópico"),
    el("h1", {}, "Comparação de referências"),
    el("p", { class: "subtitle" }, "Colocar autores e referências em diálogo — com a honestidade do que está (e do que não está) no corpus."),
  ));

  const ids = compareTray.current();
  const refs = ids
    .map((id) => ctx.justice1952.references.find((r) => r.id === id))
    .filter(Boolean);

  if (refs.length === 0) {
    shell.append(el("section", { class: "section" },
      el("h2", {}, "A bandeja está vazia"),
      el("p", { class: "section-lede" },
        "Abra referências (nos tópicos ou pelas buscas) e use o botão “Comparar” para colocá-las aqui — até três por vez. ",
        "Ou comece com o par clássico do tópico 8c(1):"),
      el("div", { class: "action-row" },
        suggestButton(ctx, "jr1952:8c-1:01", "Aristotle — escravidão natural"),
        suggestButton(ctx, "jr1952:8c-1:07", "Smith — salários e “wage slavery”"))));
    return { title: "Comparar — Justiça · Syntopicon", element: shell };
  }

  shell.append(el("section", { class: "section", "aria-labelledby": "cmp-title" },
    el("h2", { id: "cmp-title" }, `${refs.length} referência(s) em comparação`),
    el("p", { class: "section-lede" },
      "Colunas são referências do mesmo capítulo (edição 1952). O que se compara aqui é a estrutura impressa — autor, obra, volume, localizador. ",
      el("strong", {}, "As passagens não estão incorporadas"), ": para ler, cada coluna indica onde ir."),
    el("div", { class: "compare-grid" }, refs.map((r) => compareColumn(ctx, r))),
    el("div", { class: "action-row" },
      el("button", {
        class: "button",
        type: "button",
        onclick: () => {
          for (const id of [...compareTray.current()]) compareTray.toggle(id);
          window.dispatchEvent(new Event("hashchange"));
        },
      }, "Esvaziar bandeja"),
      el("a", { class: "button button-quiet", href: "#/topico/8c-1" }, "Voltar ao tópico 8c(1)"))));
  return { title: `Comparar (${refs.length}) — Justiça · Syntopicon`, element: shell };
}

function suggestButton(ctx, refId, label) {
  return el("button", {
    class: "button button-suggest",
    type: "button",
    onclick: () => {
      if (!compareTray.has(refId)) compareTray.toggle(refId);
      if (location.hash !== "#/comparar") {
        location.hash = "#/comparar";
      } else {
        window.dispatchEvent(new Event("hashchange"));
      }
    },
  }, `+ ${label}`);
}

function compareColumn(ctx, ref) {
  const topic = topicBySlug(ctx.justice1952.topics, ref.topicSlug);
  const works = worksForReference(ctx.works, ref);
  const col = el("article", { class: "compare-col" });
  col.append(el("h3", {}, ref.authorRaw));
  col.append(el("p", { class: "cmp-row" }, el("span", { class: "cmp-label" }, "Tópico"), " ",
    el("a", { href: `#/topico/${ref.topicSlug}` }, topic ? `${topic.code} — ${topic.titlePt}` : ref.topicSlug)));
  col.append(el("p", { class: "cmp-row" }, el("span", { class: "cmp-label" }, "Obras"), " ",
    works.length ? works.map((w, i) => [i > 0 ? " · " : "", el("a", { href: `#/obra/${w.key}` }, w.titleEn)]).flat() : "—"));
  col.append(el("p", { class: "cmp-row" }, el("span", { class: "cmp-label" }, "Volume"), " ",
    ref.volume != null ? `GBWW v. ${ref.volume}` : "—"));
  col.append(el("p", { class: "cmp-locator" }, el("span", { class: "cmp-label" }, "Locator (literal)"),
    el("code", {}, emText(ref.locatorRaw))));
  col.append(el("p", { class: "cmp-row cmp-passage" }, el("span", { class: "cmp-label" }, "Passagem"), " ", PASSAGE_ABSENT_LABEL));
  col.append(el("div", { class: "cmp-actions" },
    el("a", { class: "link-quiet", href: `#/referencia/${encodeURIComponent(ref.id)}` }, "Abrir referência →"),
    " ",
    el("button", {
      class: "link-quiet",
      type: "button",
      onclick: () => {
        compareTray.toggle(ref.id);
        window.dispatchEvent(new Event("hashchange"));
      },
    }, "Remover da bandeja")));
  return col;
}
