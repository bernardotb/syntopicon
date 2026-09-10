// about.js — método, camadas epistêmicas, fontes, limitações e execução.
import { el, breadcrumb, layerChip } from "../ui.js";

export default function about(_params, ctx) {
  const shell = el("div", { class: "page-shell" });
  shell.append(breadcrumb([{ label: "Início", href: "#/" }, { label: "Sobre" }]));
  shell.append(el("header", { class: "page-header" },
    el("p", { class: "eyebrow" }, "Método e proveniência"),
    el("h1", {}, "Sobre este protótipo"),
    el("p", { class: "subtitle" },
      "Um experimento isolado do golden case Justiça — Great Idea 42 — construído sobre a arquitetura intelectual do Syntopicon."),
  ));

  shell.append(el("section", { class: "section", "aria-labelledby": "about-map" },
    el("h2", { id: "about-map" }, "O mapa e o território"),
    el("p", { class: "reading" },
      "O Syntopicon é o mapa. Os Great Books são o território. A leitura sintópica é a viagem entre os dois. "),
    el("p", { class: "reading" },
      "A função deste aplicativo é reduzir o custo de encontrar relações e passagens — sem eliminar o trabalho intelectual do leitor. ",
      "Adler decide a estrutura; a interface decide como remover a fricção."),
  ));

  shell.append(el("section", { class: "section", "aria-labelledby": "about-layers" },
    el("h2", { id: "about-layers" }, "Camadas epistêmicas"),
    el("p", { class: "section-lede" },
      "Tudo o que aparece na tela pertence a uma camada declarada — e as camadas nunca se disfarçam umas às outras."),
    el("div", { class: "lex-grid" },
      layerCard("SOURCE", "source", "Artefatos, autores, obras, edições e passagens (aqui: nenhuma passagem canônica incorporada)."),
      layerCard("SYNTOPICON_CANONICAL", "canonical", "Great Idea, Introduction, Topic, Reference, CrossReference, Inventory Term, Additional Reading — conforme a edição 1952."),
      layerCard("DERIVED", "derived", "locatorParsed, autores/obras agregados, volumes, contagens, alvos de cross-reference."),
      layerCard("INTERPRETIVE", "interpretive", "Tradução de apresentação, 4 passagens de demonstração, notas do protótipo."),
      layerCard("PERSONAL", "personal", "Notas, favoritos e trilhas do leitor — deliberadamente fora do escopo deste protótipo."),
    ),
  ));

  shell.append(el("section", { class: "section", "aria-labelledby": "about-sources" },
    el("h2", { id: "about-sources" }, "Fontes e registro de proveniência"),
    el("ul", { class: "source-list" },
      Object.values(ctx.sources.registry).map((s) =>
        el("li", {},
          el("strong", {}, s.title), " ",
          el("span", { class: "chip chip-status" }, s.status),
          el("p", { class: "provenance-note" }, s.note ?? "")))),
    el("p", { class: "section-lede" },
      "Datasets deste protótipo: gerados de ", el("code", {}, "bernardotb/syntopicon@arena/01a06414-syntopicon (21d60ce)"),
      " pelo script ", el("code", {}, "scripts/build-dataset.mjs"), " — manifesto e hash em cada JSON."),
  ));

  shell.append(el("section", { class: "section", "aria-labelledby": "about-limits" },
    el("h2", { id: "about-limits" }, "Limitações (verificáveis)"),
    el("ul", { class: "honest-list" },
      el("li", {}, el("strong", {}, "Passagens: "), "nenhuma passagem canônica incorporada; todas as referências declaram a ausência. As 4 demonstrações são interpretativas."),
      el("li", {}, el("strong", {}, "Edições: "), "somente a edição 1952 está incorporada. A 2ª edição (1990) não foi localizada; a divergência de 8c(1) permanece UNRESOLVED."),
      el("li", {}, el("strong", {}, "Selo canônico: "), "a ingestão baseia-se na colagem integral do Dono (auditada, dupla extração concordante); o PDF original aguarda upload na branch corpus para o selo de fingerprint."),
      el("li", {}, el("strong", {}, "Escopo: "), "apenas o capítulo Justiça. As demais 101 ideias seguem sem estrutura incorporada."),
      el("li", {}, el("strong", {}, "Cross-references: "), "destinos resolvem no nível de IDEIA; os tópicos de outros capítulos não estão incorporados e permanecem texto bruto."),
      el("li", {}, el("strong", {}, "Introdução EN: "), "RAW de leitura (parágrafos extraídos automaticamente; artefatos de página removidos, nenhum texto de sentença alterado)."),
    ),
  ));

  shell.append(el("section", { class: "section", "aria-labelledby": "about-run" },
    el("h2", { id: "about-run" }, "Executar e auditar"),
    el("pre", { class: "code-block" },
      `# servir (qualquer servidor estático serve; incluímos um sem dependências)
node scripts/serve.mjs            # http://localhost:8080

# testes (integridade, golden path, teclado, ausência de invenção)
npm install                       # apenas a devDependency de testes (jsdom)
npm test

# regenerar os datasets a partir da fonte canônica
npx tsx scripts/build-dataset.mjs --source <checkout 21d60ce> --out data`),
    el("p", { class: "section-lede" },
      "Documentação de auditoria completa (candidatos, júri, decisões e gates): ", el("code", {}, "AUDIT.md"), "."),
  ));

  return { title: "Sobre — Justiça · Syntopicon", element: shell };
}

function layerCard(title, tone, text) {
  return el("div", { class: `lex-card lex-${tone}` }, el("h3", {}, title), el("p", {}, text));
}
