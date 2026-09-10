// inventory.js — perspectiva lexical: Inventory Term → Tópico → Grande Ideia.
// Também concentra a busca global do corpus.
import { el, breadcrumb, editionChip, layerChip, statusChip } from "../ui.js";
import { searchAll } from "../domain.js";

export default function inventory(params, ctx) {
  const shell = el("div", { class: "page-shell" });
  const query = typeof params.q === "string" ? params.q : "";
  const termFocus = typeof params.termo === "string" ? params.termo : null;

  shell.append(breadcrumb([{ label: "Início", href: "#/" }, { label: "Inventário" }]));
  shell.append(el("header", { class: "page-header" },
    el("p", { class: "eyebrow" }, "Perspectiva lexical · Inventory of Terms"),
    el("h1", {}, "Inventário & Busca"),
    el("p", { class: "subtitle" }, "O termo de interesse do leitor como porta de entrada — e a busca de todo o corpus incorporado."),
  ));

  // Pedagogia: o que é o quê
  shell.append(el("section", { class: "section", "aria-labelledby": "lex-title" },
    el("h2", { id: "lex-title" }, "Quatro entidades, uma trilha"),
    el("div", { class: "lex-grid" },
      lexCard("Inventory Term", "lexical", "O interesse do leitor, listado no Inventory of Terms do Syntopicon (ex.: “Chattel slavery”). Aponta para onde a ideia é tratada."),
      lexCard("Topic", "canonical", "A divisão do outline dentro de uma Great Idea (ex.: 8c(1)). A unidade elementar do Syntopicon."),
      lexCard("Reference", "canonical", "A linha impressa que indica ONDE ler: autor, obra, volume e página (locator). Não contém texto."),
      lexCard("Passage", "passage", "O texto efetivamente recuperado. Nenhuma passagem canônica está incorporada — o estado é sempre explícito."),
    ),
  ));

  // Termos
  const termsSection = el("section", { class: "section", "aria-labelledby": "terms-title" },
    el("h2", { id: "terms-title" }, `Termos do inventário (${ctx.terms.length})`),
    el("p", { class: "section-lede" },
      "Só entram aqui vínculos sustentados por evidência verificável no repositório. Termo de índice não é título de tópico — os dois não se fundem. ",
      "Quando o verbete do Inventory não pôde ser conferido, o estado permanece explícito."));
  for (const term of ctx.terms) {
    const item = el("article", {
      class: `term-card${termFocus === term.id ? " focus" : ""}`,
      id: termFocus === term.id ? "term-focus" : undefined,
    });
    if (termFocus === term.id) item.setAttribute("tabindex", "-1");
    item.append(el("h3", {}, term.label, " ", el("span", { class: "term-lang" }, term.labelLang === "en" ? "(EN)" : "")));
    item.append(el("div", { class: "chip-row" },
      editionChip(`edição: ${term.evidence.edition}`),
      statusChipFor(term.evidence.status),
    ));
    if (term.rawText) {
      item.append(el("blockquote", { class: "locator-block term-verbete" },
        el("code", {}, term.rawText),
      ));
    }
    item.append(el("p", { class: "term-evidence" }, term.evidence.note));
    item.append(el("p", { class: "term-targets" }, "Aponta para: ",
      term.targets.map((t, i) => [
        i > 0 ? " · " : "",
        el("a", { class: "tag-link", href: `#/topico/${t.topicSlug}` }, `${t.ideaNameEn} ${t.topicCode}`),
        t.editionBridge
          ? el("span", { class: "term-bridge" }, ` (verbete ${t.editionBridge.verbeteEdition} → tópico ${t.editionBridge.correspondingIncorporatedEdition} · ponte derivada)`)
          : null,
      ]).flat()));
    if (term.otherTargetsRaw?.length) {
      item.append(el("p", { class: "term-other-targets" },
        "Alvos do verbete em outros capítulos (não incorporados — texto bruto, sem vínculo inferido): ",
        el("code", {}, term.otherTargetsRaw.join(" · "))));
    }
    item.append(el("p", { class: "provenance-note-line" }, layerChip(term.provenance.layer), " ", el("code", {}, term.provenance.sourceId)));
    termsSection.append(item);
  }
  shell.append(termsSection);

  // Busca
  const searchSection = el("section", { class: "section", "aria-labelledby": "search-title" },
    el("h2", { id: "search-title" }, "Busca no corpus"),
    el("form", { class: "inventory-search", role: "search", onsubmit: (e) => { e.preventDefault(); } },
      el("label", { class: "visually-hidden", for: "inv-q" }, "Buscar"),
      el("input", { id: "inv-q", type: "search", value: query, placeholder: "ex.: escravidão, aristotle, wages, 8c(1)…", autocomplete: "off" })),
  );

  const resultsBox = el("div", { id: "inv-results" });
  searchSection.append(resultsBox);
  shell.append(searchSection);

  const input = searchSection.querySelector("#inv-q");
  const runSearch = () => {
    const q = input.value.trim();
    resultsBox.replaceChildren();
    if (q.length < 2) {
      resultsBox.append(el("p", { class: "section-lede" }, "Digite ao menos dois caracteres. A busca cobre tópicos, termos, autores, obras e locatorRaw das referências."));
      return;
    }
    const results = searchAll(ctx, q);
    if (!results.length) {
      resultsBox.append(el("p", { class: "section-lede" },
        `Nada incorporado corresponde a “${q}”. Ausência aqui não é ausência na fonte — o corpus digital cobre o capítulo Justiça (edição 1952).`));
      return;
    }
    const groups = new Map();
    for (const r of results) {
      const list = groups.get(r.type) ?? [];
      list.push(r);
      groups.set(r.type, list);
    }
    const labels = { term: "Termos do inventário", topic: "Tópicos", author: "Autores", work: "Obras", reference: "Referências (locatorRaw)" };
    for (const [type, list] of groups) {
      resultsBox.append(el("h3", { class: "result-group-title" }, `${labels[type]} (${list.length})`));
      resultsBox.append(el("ul", { class: "result-list" },
        list.slice(0, 25).map((r) =>
          el("li", {},
            el("a", { href: r.href }, el("strong", {}, r.title)),
            r.subtitle ? el("span", { class: "result-sub" }, ` — ${r.subtitle}`) : null))));
      if (list.length > 25) resultsBox.append(el("p", { class: "section-lede" }, `+ ${list.length - 25} resultados deste tipo`));
    }
  };
  input.addEventListener("input", runSearch);
  if (query) {
    runSearch();
  } else {
    resultsBox.append(el("p", { class: "section-lede" }, "Digite ao menos dois caracteres. A busca cobre tópicos, termos, autores, obras e locatorRaw das referências."));
  }
  if (termFocus) {
    const focusEl = shell.querySelector("#term-focus");
    focusEl?.focus();
  }

  return { title: "Inventário & Busca — Justiça · Syntopicon", element: shell };
}

function statusChipFor(status) {
  if (status === "VERIFIED_VIA_LEDGER") return statusChip("VERIFICADO VIA LEDGER", "ok");
  if (status === "VERIFIED_VIA_LOCAL_ARTIFACT__FINGERPRINT_PENDING") {
    return statusChip("VERIFICADO · ARTEFATO LOCAL · FINGERPRINT PENDENTE", "warn");
  }
  return statusChip(status, "warn");
}

function lexCard(title, tone, text) {
  return el("div", { class: `lex-card lex-${tone}` },
    el("h3", {}, title),
    el("p", {}, text));
}
