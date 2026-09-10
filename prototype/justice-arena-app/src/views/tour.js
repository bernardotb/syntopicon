// tour.js — o percurso guiado do golden case: EXPLORE → READ → COMPARE → RETURN.
import { el, breadcrumb, editionChip, layerChip } from "../ui.js";

export default function tour(_params, ctx) {
  const shell = el("div", { class: "page-shell" });
  shell.append(breadcrumb([{ label: "Início", href: "#/" }, { label: "Percurso guiado" }]));
  shell.append(el("header", { class: "page-header" },
    el("p", { class: "eyebrow" }, "Golden case · Justice 8c(1)"),
    el("h1", {}, "Percurso guiado"),
    el("p", { class: "subtitle" },
      "Do mapa ao texto e de volta — o caminho inteiro que este protótipo existe para provar. ",
      "Navegue com o teclado: Tab percorre os passos; Enter abre cada página."),
  ));

  const steps = ctx.goldenPath;
  const ol = el("ol", { class: "tour-list" });
  steps.forEach((step, i) => {
    ol.append(el("li", { class: `tour-step verb-${step.verb.toLowerCase()}` },
      el("p", { class: "tour-meta" },
        el("span", { class: "tour-n" }, `Passo ${step.step}`),
        el("span", { class: `verb verb-${step.verb.toLowerCase()}` }, step.verb)),
      el("a", { class: "tour-link", href: step.href }, step.label),
      el("p", { class: "tour-note" }, step.note)));
  });
  shell.append(el("section", { class: "section", "aria-labelledby": "tour-title" },
    el("h2", { id: "tour-title" }, "A trilha principal (9 passos)"),
    el("p", { class: "section-lede" },
      "Home → Justiça → Justiça econômica (8) → organização da produção (8c) → 8c(1) → Referência → Obra → Autor → retorno ao Tópico."),
    ol));

  // Ramo lexical
  shell.append(el("section", { class: "section", "aria-labelledby": "tour-lex" },
    el("h2", { id: "tour-lex" }, "O ramo lexical (atalho do inventário)"),
    el("p", { class: "section-lede" },
      "A mesma chegada por outra porta: o termo de interesse do leitor."),
    el("ol", { class: "tour-list" },
      lexStep(1, "Inventário", "#/inventario", "O Inventory of Terms mapeia interesses para tópicos."),
      lexStep(2, "Termo “Chattel slavery”", "#/inventario?termo=term:chattel-slavery", "Verbete integral do Inventory 1990 (verificado via artefato local); ponte derivada até o 8c(1) da edição 1952 incorporada."),
      lexStep(3, "Tópico 8c(1)", "#/topico/8c-1", "A mesma página do fim da trilha principal — três portas, um mapa."))));

  shell.append(el("section", { class: "section", "aria-labelledby": "tour-compare" },
    el("h2", { id: "tour-compare" }, "O ramo de comparação"),
    el("p", { class: "section-lede" },
      "No tópico 8c(1), adicione duas referências à bandeja (botão “Comparar”) e abra a comparação lado a lado."),
    el("p", {}, el("a", { class: "button", href: "#/comparar" }, "Abrir modo comparação"))));

  return { title: "Percurso guiado — Justiça · Syntopicon", element: shell };
}

function lexStep(n, label, href, note) {
  return el("li", { class: "tour-step verb-explore" },
    el("p", { class: "tour-meta" }, el("span", { class: "tour-n" }, `Passo ${n}`), el("span", { class: "verb verb-explore" }, "EXPLORE")),
    el("a", { class: "tour-link", href }, label),
    el("p", { class: "tour-note" }, note));
}
