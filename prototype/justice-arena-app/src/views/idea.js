// idea.js — Grande Ideia 42 (Justiça): visão geral, Introduction (EN/PT),
// Outline hierárquico, Cross-References e Additional Readings.
import { el, breadcrumb, createTabs, editionChip, emText, layerChip, provenanceLine } from "../ui.js";
import { crossRefDerivedTargets, topicChildren, topicRoots, referencesForTopic, topicBySlug } from "../domain.js";

export default function idea({ slug }, ctx) {
  if (slug !== "justica") {
    const idea = ctx.ideas102.list.find((i) => i.slugEn === slug);
    const shell = el("div", { class: "page-shell" });
    shell.append(breadcrumb([{ label: "Início", href: "#/" }, { label: idea ? idea.name : slug }]));
    shell.append(el("h1", {}, idea ? idea.name : slug));
    shell.append(el("p", { class: "section-lede" },
      "Esta ideia pertence à lista canônica das 102, mas sua estrutura ainda não foi incorporada ao corpus digital. ",
      "Ausência aqui não é ausência na fonte."));
    return { title: `${idea?.name ?? slug} — Syntopicon`, element: shell };
  }

  const { justice1952, counts } = ctx;
  const meta = justice1952.meta;
  const shell = el("div", { class: "page-shell" });

  shell.append(breadcrumb([{ label: "Início", href: "#/" }, { label: "Justiça · Great Idea 42" }]));

  const header = el("header", { class: "page-header" },
    el("p", { class: "eyebrow" }, "Great Idea 42 · edição 1952"),
    el("h1", {}, "Justiça"),
    el("p", { class: "subtitle" }, "Justice — capítulo 42 do Syntopicon, Great Books of the Western World"),
    el("div", { class: "chip-row" },
      editionChip(`edição ${meta.edition} · pp. ${meta.pagesPrinted}`),
      layerChip("original-corpus", "Ingestão canônica RAW FIRST auditada; selo definitivo aguarda o PDF na branch corpus"),
      statusChipSafe(`41 tópicos · ${counts.references} referências — contagens derivadas`),
    ),
    provenanceLine(ctx.sources, justice1952.canonicalProvenance),
  );
  shell.append(header);

  // ── Introduction (EN raw × PT display) ──────────────────────────────────
  const introSection = el("section", { class: "section", "aria-labelledby": "intro-title" },
    el("h2", { id: "intro-title" }, "Introduction"),
    el("p", { class: "section-lede" },
      "O ensaio de Adler que abre o capítulo. O texto inglês é a fonte (RAW, extraído da colagem integral); ",
      "a tradução em português é camada de apresentação — nunca substitui o original."),
  );
  introSection.append(
    createTabs({
      tabs: [
        { id: "intro-en", label: "English (fonte · RAW)", render: () => paragraphsPanel(ctx.introductionEn.paragraphs, "intro-en-text", "Text of the 1952 Introduction, as ingested. Page markers of the digitization were removed; no sentence text was altered.") },
        { id: "intro-pt", label: "Português (apresentação)", render: () => paragraphsPanel(justice1952.introPtBr, "intro-pt-text", "Tradução de apresentação (displayPtBr), produzida por ChatGPT e auditada 1:1 contra o outline. Camada interpretativa — não substitui a fonte inglesa.") },
      ],
    }).element,
  );
  shell.append(introSection);

  // ── Outline of Topics ────────────────────────────────────────────────────
  const outlineSection = el("section", { class: "section", "aria-labelledby": "outline-title" },
    el("h2", { id: "outline-title" }, "Outline of Topics"),
    el("p", { class: "section-lede" },
      `${counts.topics} tópicos na ordem impressa (${counts.topicsLevel1} de nível 1, ${counts.topicsLevel2} de nível 2, ${counts.topicsLevel3} de nível 3). `,
      "Códigos e títulos vêm da fonte; a tradução PT é camada de apresentação. Grupos se abrem progressivamente."),
  );
  outlineSection.append(outlineTree(ctx));
  shell.append(outlineSection);

  // ── Cross-References (globais ao capítulo) ───────────────────────────────
  const crossSection = el("section", { class: "section", "aria-labelledby": "cross-title" },
    el("h2", { id: "cross-title" }, "Cross-References"),
    el("p", { class: "section-lede" },
      `${counts.crossReferences} remissões globais do capítulo (p. impressa 879). Elas pertencem ao capítulo — não a um tópico — e por isso `,
      "nenhum tópico de origem é atribuído a elas. O destino de ideia (ex.: COURAGE 4) é resolvido contra a lista canônica das 102; ",
      "o código do tópico de destino permanece texto bruto, pois somente o capítulo Justiça está incorporado."),
  );
  const crossList = el("ol", { class: "cross-list" });
  for (const x of justice1952.crossReferences) {
    const targets = crossRefDerivedTargets(x, ctx.ideas102.list);
    const li = el("li", { class: "cross-item" },
      el("p", { class: "cross-text" }, emText(x.textRaw)));
    if (targets.length) {
      li.append(el("p", { class: "cross-targets" }, "Ideias de destino (derivado): ",
        targets.map((t, i) => [
          i > 0 ? " · " : "",
          el("a", { href: `#/ideia/${t.slugEn}` }, t.name),
        ]).flat()));
    }
    crossList.append(li);
  }
  crossSection.append(crossList);
  shell.append(crossSection);

  // ── Additional Readings (RAW) ────────────────────────────────────────────
  const ar = ctx.additionalReadings;
  const arSection = el("section", { class: "section", "aria-labelledby": "ar-title" },
    el("h2", { id: "ar-title" }, "Additional Readings"),
    el("p", { class: "section-lede" },
      "Obras relevantes FORA dos Great Books, listadas na fonte em dois grupos (autores representados e não representados na coleção). ",
      "Exibidas como lista bruta (RAW, não parseada): não geram entidades de obra no corpus digital."),
    provenanceLine(ctx.sources, ar.provenance),
  );
  const arList = el("div", { class: "ar-list" });
  for (const p of ar.paragraphs) arList.append(el("p", { class: "ar-line" }, emText(p)));
  const arDetails = el("details", { class: "progressive" },
    el("summary", {}, `Mostrar as ${ar.paragraphs.length} linhas da seção`),
    arList);
  arSection.append(arDetails);
  shell.append(arSection);

  shell.append(el("p", { class: "back-top" }, el("a", { href: "#/" }, "← Início")));
  return { title: "Justiça — Great Idea 42 · Syntopicon", element: shell };
}

function statusChipSafe(text) {
  return el("span", { class: "chip chip-status" }, text);
}

function paragraphsPanel(paragraphs, labelId, note) {
  const panel = el("div", { class: "paragraph-panel", id: labelId });
  panel.append(el("p", { class: "panel-note" }, note));
  const firstFive = el("div", {});
  paragraphs.slice(0, 5).forEach((p) => firstFive.append(el("p", { class: "reading" }, emText(p))));
  panel.append(firstFive);
  const rest = el("details", { class: "progressive" },
    el("summary", {}, `Ler a Introduction completa (${paragraphs.length} parágrafos)`),
    el("div", {}, paragraphs.slice(5).map((p) => el("p", { class: "reading" }, emText(p)))));
  panel.append(rest);
  return panel;
}

export function outlineTree(ctx, { focusSlug = null } = {}) {
  const { justice1952 } = ctx;
  const roots = topicRoots(justice1952.topics);
  const list = el("ul", { class: "outline-tree", role: "tree", "aria-label": "Outline of Topics — Justiça" });
  for (const root of roots) {
    list.append(outlineNode(ctx, root, focusSlug));
  }
  return list;
}

function outlineNode(ctx, topic, focusSlug) {
  const children = topicChildren(ctx.justice1952.topics, topic.slug);
  const refCount = referencesForTopic(ctx.justice1952.references, topic.slug).length;
  const li = el("li", { class: `outline-node level-${topic.level}${topic.slug === focusSlug ? " focus" : ""}`, role: "none" });
  const link = el("a", {
    class: "outline-link",
    href: `#/topico/${topic.slug}`,
    role: "treeitem",
    "aria-expanded": children.length ? (topic.slug === focusSlug || isAncestorOf(ctx, topic.slug, focusSlug) ? "true" : "false") : undefined,
  },
    el("span", { class: "outline-code" }, topic.code),
    el("span", { class: "outline-title" },
      el("span", { class: "title-pt" }, topic.titlePt),
      el("span", { class: "title-en" }, topic.titleEn),
    ),
    el("span", { class: "outline-meta" }, refCount > 0 ? `${refCount} ref.` : "sem bloco próprio"),
  );
  li.append(link);
  if (children.length) {
    const childList = el("ul", { class: "outline-children", role: "group" });
    const open = topic.slug === focusSlug || isAncestorOf(ctx, topic.slug, focusSlug);
    for (const child of children) childList.append(outlineNode(ctx, child, focusSlug));
    if (open) li.classList.add("open");
    li.append(childList);
  }
  return li;
}

function isAncestorOf(ctx, ancestorSlug, descendantSlug) {
  if (!descendantSlug) return false;
  let cursor = topicBySlug(ctx.justice1952.topics, descendantSlug);
  while (cursor?.parentSlug) {
    if (cursor.parentSlug === ancestorSlug) return true;
    cursor = topicBySlug(ctx.justice1952.topics, cursor.parentSlug);
  }
  return false;
}
