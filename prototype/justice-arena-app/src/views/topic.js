// topic.js — a página central: um Tópico canônico com suas referências.
import { el, breadcrumb, editionChip, emText, kindChip, layerChip, openModal, provenanceLine, statusChip } from "../ui.js";
import {
  PASSAGE_ABSENT_LABEL,
  demoPassageForReference,
  demoReferencesForTopic,
  refAuthorKind,
  referencesForTopic,
  topicBySlug,
  topicChildren,
  topicPath,
  worksForReference,
} from "../domain.js";
import { compareTray } from "../main.js";
import { divergenceNote } from "./divergence.js";
import { referenceRow } from "./shared.js";

export default function topic({ slug }, ctx) {
  const topic = topicBySlug(ctx.justice1952.topics, slug);
  if (!topic) {
    const shell = el("div", { class: "page-shell" });
    shell.append(breadcrumb([{ label: "Início", href: "#/" }, { label: "Justiça", href: "#/ideia/justica" }, { label: "Tópico inexistente" }]));
    shell.append(el("h1", {}, "Tópico não encontrado"));
    shell.append(el("p", { class: "section-lede" }, `Nenhum tópico do outline corresponde a “${slug}”. O outline incorporado tem ${ctx.counts.topics} tópicos — todos listados na página da ideia.`));
    return { title: "Tópico não encontrado — Syntopicon", element: shell };
  }

  const path = topicPath(ctx.justice1952.topics, topic.slug);
  const refs = referencesForTopic(ctx.justice1952.references, topic.slug);
  const children = topicChildren(ctx.justice1952.topics, topic.slug);
  const demoRefs = demoReferencesForTopic(ctx.demoLayer, topic.slug);
  const ideaBase = { label: "Justiça", href: "#/ideia/justica" };

  const shell = el("div", { class: "page-shell" });
  shell.append(breadcrumb([
    { label: "Início", href: "#/" },
    ideaBase,
    ...path.slice(0, -1).map((t) => ({ label: t.code, href: `#/topico/${t.slug}` })),
    { label: topic.code },
  ]));

  const levelLabels = { 1: "Tópico de nível 1", 2: "Tópico de nível 2", 3: "Tópico de nível 3" };
  shell.append(el("header", { class: "page-header topic-header" },
    el("p", { class: "eyebrow" }, `Outline of Topics · nível ${topic.level}`),
    el("h1", {},
      el("span", { class: "code-badge" }, topic.code),
      " ",
      topic.titlePt),
    el("p", { class: "subtitle" }, emText(topic.titleEn)),
    topic.titlePtNote
      ? el("p", { class: "note-line" }, el("strong", {}, "Nota da tradução: "), topic.titlePtNote)
      : null,
    el("div", { class: "chip-row" },
      editionChip(`edição ${ctx.justice1952.meta.edition}`),
      topic.printedPageAnchor ? editionChip(`p. impressa ${topic.printedPageAnchor}`) : null,
      el("span", { class: "chip chip-status" }, levelLabels[topic.level]),
    ),
    provenanceLine(ctx.sources, topic.provenance),
  ));

  // Subtópicos
  if (children.length) {
    const sub = el("section", { class: "section", "aria-labelledby": "sub-title" },
      el("h2", { id: "sub-title" }, `Subtópicos (${children.length})`),
      el("ul", { class: "child-list" },
        children.map((c) =>
          el("li", {},
            el("a", { class: "child-link", href: `#/topico/${c.slug}` },
              el("span", { class: "outline-code" }, c.code),
              el("span", {}, c.titlePt),
              el("em", { class: "child-en" }, c.titleEn))))));
    shell.append(sub);
  }

  // Nota de divergência (apenas 8c(1))
  const divNote = divergenceNote(ctx, topic.slug);
  if (divNote) shell.append(divNote);

  // Referências canônicas
  const refsSection = el("section", { class: "section", "aria-labelledby": "refs-title" },
    el("h2", { id: "refs-title" }, `References (${refs.length})`),
    refs.length === 0
      ? el("p", { class: "section-lede" },
          "Este tópico imprime apenas o título no capítulo — a fonte não lhe dedica bloco próprio de referências. ",
          "Ausência aqui é ausência na fonte, não no corpus.")
      : el("p", { class: "section-lede" },
          `${refs.length} ${refs.length === 1 ? "linha impressa" : "linhas impressas"} na forma da fonte: `,
          el("strong", {}, "locatorRaw literal"),
          " (sobrescritos de Bekker, “esp”, “passim” e abreviações preservados). Autores em inglês, como no original. ",
          el("strong", {}, "Uma referência indica ONDE ler. "), PASSAGE_ABSENT_LABEL),
    el("ul", { class: "ref-list" },
      refs.map((r) => referenceRow(ctx, r))),
  );
  shell.append(refsSection);

  // Camada de demonstração (interpretativa)
  if (demoRefs.length) {
    const demoSection = el("section", { class: "section section-interpretive", "aria-labelledby": "demo-title" },
      el("h2", { id: "demo-title" }, "Demonstrações de leitura (camada interpretativa)"),
      el("p", { class: "section-lede" },
        "Referências de demonstração criadas pelo protótipo: o texto é real (domínio público), mas a seleção e o vínculo ",
        "com o tópico são decisão editorial — jamais conteúdo canônico. Não se confundem com as referências impressas acima."),
      el("ul", { class: "demo-list" },
        demoRefs.map((dr) => {
          const work = ctx.demoLayer.works.find((w) => w.slug === dr.workSlug);
          const author = ctx.demoLayer.authorDisplay.find((a) => a.slug === dr.authorSlug);
          const passage = demoPassageForReference(ctx.demoLayer, dr.id);
          const li = el("li", { class: "demo-item" },
            el("p", { class: "demo-head" },
              el("strong", {}, author?.nameEn ?? dr.authorSlug), " — ", emText(work ? `*${work.titleEn}*` : dr.workSlug),
              " ", layerChip("interpretive-content")));
          li.append(el("p", { class: "demo-loc" },
            el("code", {}, dr.locatorRaw),
            dr.syntopiconLocator === null ? el("span", { class: "chip chip-status" }, "locator do Syntopicon pendente") : null));
          if (passage) {
            li.append(el("button", {
              class: "button button-small",
              type: "button",
              onclick: (event) => openDemoPassage(passage, author, work, event.currentTarget),
            }, "Ler passagem de demonstração"));
          }
          return li;
        })));
    shell.append(demoSection);
  }

  shell.append(el("p", { class: "back-top" },
    el("a", { href: "#/ideia/justica" }, "← Outline completo de Justiça")));
  return { title: `${topic.code} ${topic.titlePt} — Justiça · Syntopicon`, element: shell };
}

function openDemoPassage(passage, author, work, trigger) {
  const content = el("div", {});
  content.append(el("p", { class: "panel-note" },
    `Tradução: ${passage.translator}. ${passage.editionNote}`));
  for (const p of passage.textEn) content.append(el("p", { class: "reading reading-en" }, p));
  content.append(el("p", { class: "panel-note" },
    "Texto real de domínio público, selecionado editorialmente para demonstrar a leitura — a passagem canônica deste tópico permanece por ingerir."));
  openModal({ title: `${author?.nameEn ?? ""} — ${work?.titleEn ?? ""} (demonstração)`, content, trigger });
}

export { topicChildren };
