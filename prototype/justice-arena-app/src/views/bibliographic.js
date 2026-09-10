// bibliographic.js — perspectiva bibliográfica: autores → obras → referências → tópicos.
// TODAS as entidades Autor/Obra aqui são DERIVADAS das linhas de referência
// do capítulo Justiça (edição 1952). A forma impressa é a identidade.
import { el, breadcrumb, editionChip, emText, kindChip, layerChip, provenanceLine } from "../ui.js";
import { referencesForTopic, topicBySlug } from "../domain.js";
import { referenceRow } from "./shared.js";

const P_DERIVED_NOTE =
  "Entidade derivada das linhas de referência do capítulo Justiça (edição 1952). O Syntopicon imprime cabeçalhos e obras; " +
  "as páginas abaixo agregam essas linhas — não são entidades autorais independentes da fonte.";

export default function authorIndex(_params, ctx) {
  const { authors, works, counts } = ctx;
  const shell = el("div", { class: "page-shell" });
  shell.append(breadcrumb([{ label: "Início", href: "#/" }, { label: "Autores & Obras" }]));
  shell.append(el("header", { class: "page-header" },
    el("p", { class: "eyebrow" }, "Perspectiva bibliográfica · camada derivada"),
    el("h1", {}, "Autores & Obras"),
    el("p", { class: "subtitle" }, `${counts.authorPersons} autores · ${counts.authorDocuments} documentos · ${counts.authorScriptures} escrituras · ${counts.works} obras — todos derivados das ${counts.references} linhas de referência`),
    el("p", { class: "note-line" }, P_DERIVED_NOTE),
  ));

  const group = (title, list, note) => {
    const section = el("section", { class: "section", "aria-labelledby": `g-${slugDom(title)}` },
      el("h2", { id: `g-${slugDom(title)}` }, `${title} (${list.length})`),
      note ? el("p", { class: "section-lede" }, note) : null,
      el("ul", { class: "author-list" },
        list.map((a) =>
          el("li", {},
            el("a", { class: "author-link", href: `#/autor/${a.key}` },
              el("strong", {}, a.nameRaw),
              el("span", { class: "author-meta" }, `${a.refCount} ref. · ${a.volumes.map((v) => `v.${v}`).join(", ")}`))))));
    return section;
  };

  shell.append(group("Autores", authors.filter((a) => a.kind === "person"),
    "Cabeçalhos impressos na posição de autor. A grafia é a da fonte; cabeçalhos distintos (ex.: MARX e MARX-ENGELS) permanecem distintos, como impressos."));
  shell.append(group("Documentos americanos", authors.filter((a) => a.kind === "document"),
    "O Syntopicon cita documentos fundacionais dos EUA (Vol. 43) na posição de autor."));
  shell.append(group("Escrituras", authors.filter((a) => a.kind === "scripture"),
    "Partes da Bíblia (e Apócrifos), citadas na posição de autor. As linhas bíblicas usam referência própria (livro, capítulo, versículo)."));

  const worksSection = el("section", { class: "section", "aria-labelledby": "works-title" },
    el("h2", { id: "works-title" }, `Todas as obras (${works.length})`),
    el("p", { class: "section-lede" },
      "Uma obra derivada = par (cabeçalho impresso, título de obra segmentado). O mesmo título sob cabeçalhos distintos são entradas distintas — como na fonte. A segmentação de obras é camada derivada do parser canônico."),
    el("details", { class: "progressive" },
      el("summary", {}, `Expandir a lista completa de ${works.length} obras`),
      el("ul", { class: "work-list" },
        works.map((w) =>
          el("li", {},
            el("a", { href: `#/obra/${w.key}` }, w.titleEn),
            el("span", { class: "work-meta" }, ` — ${w.authorRaw} (${w.refCount} ref.)`))))));
  shell.append(worksSection);
  return { title: "Autores & Obras — Justiça · Syntopicon", element: shell };
}

export function authorPage({ key }, ctx) {
  const author = ctx.authors.find((a) => a.key === key);
  const shell = el("div", { class: "page-shell" });
  if (!author) {
    shell.append(breadcrumb([{ label: "Início", href: "#/" }, { label: "Autores & Obras", href: "#/autores" }, { label: "Autor não encontrado" }]));
    shell.append(el("h1", {}, "Autor não encontrado"));
    shell.append(el("p", { class: "section-lede" }, `Nenhum cabeçalho impresso corresponde a “${key}”.`));
    return { title: "Autor não encontrado — Syntopicon", element: shell };
  }

  const display = ctx.demoLayer.authorDisplay.find((d) => d.slug === author.key);
  const authorWorks = ctx.works.filter((w) => w.authorKey === author.key);
  const refs = ctx.justice1952.references.filter((r) => r.id && author.refIds.includes(r.id));

  shell.append(breadcrumb([
    { label: "Início", href: "#/" },
    { label: "Autores & Obras", href: "#/autores" },
    { label: author.nameRaw },
  ]));
  shell.append(el("header", { class: "page-header" },
    el("p", { class: "eyebrow" }, "Autor (derivado das linhas de referência)"),
    el("h1", {}, author.nameRaw),
    display && display.namePt !== author.nameRaw
      ? el("p", { class: "subtitle" }, `${display.namePt} `, layerChip("derived-structure", "Nome PT de apresentação (captura do benchmark) — a forma impressa EN é a identidade"))
      : null,
    display?.note ? el("p", { class: "note-line" }, display.note) : null,
    el("div", { class: "chip-row" },
      kindChip(author.kind),
      editionChip(`edição ${ctx.justice1952.meta.edition}`),
      el("span", { class: "chip chip-status" }, `${author.refCount} referência(s) no capítulo`),
    ),
    el("p", { class: "note-line" }, P_DERIVED_NOTE),
  ));

  const topicsWhere = el("section", { class: "section", "aria-labelledby": "a-topics" },
    el("h2", { id: "a-topics" }, `Tópicos com presença (${author.topicSlugs.length})`),
    el("p", { class: "section-lede" }, "Presença derivada: tópicos cujas listas impressas citam este cabeçalho. Não é interpretação filosófica — é a estrutura da fonte."),
    el("ul", { class: "topic-tag-list" },
      author.topicSlugs.map((slug) => {
        const t = topicBySlug(ctx.justice1952.topics, slug);
        return el("li", {}, el("a", { class: "tag-link", href: `#/topico/${slug}` }, `${t?.code ?? slug}`));
      })));
  shell.append(topicsWhere);

  const worksSection = el("section", { class: "section", "aria-labelledby": "a-works" },
    el("h2", { id: "a-works" }, `Obras (${authorWorks.length})`),
    el("ul", { class: "work-list" },
      authorWorks.map((w) =>
        el("li", {},
          el("a", { href: `#/obra/${w.key}` }, w.titleEn),
          el("span", { class: "work-meta" }, ` — ${w.refCount} ref. · ${w.volumes.map((v) => `v.${v}`).join(", ")}`)))));
  shell.append(worksSection);

  shell.append(el("section", { class: "section", "aria-labelledby": "a-refs" },
    el("h2", { id: "a-refs" }, `Referências no capítulo (${refs.length})`),
    el("ul", { class: "ref-list" }, refs.map((r) => referenceRow(ctx, r, { compact: true })))));

  return { title: `${author.nameRaw} — Justiça · Syntopicon`, element: shell };
}

export function workPage({ key }, ctx) {
  const work = ctx.works.find((w) => w.key === key);
  const shell = el("div", { class: "page-shell" });
  if (!work) {
    shell.append(breadcrumb([{ label: "Início", href: "#/" }, { label: "Autores & Obras", href: "#/autores" }, { label: "Obra não encontrada" }]));
    shell.append(el("h1", {}, "Obra não encontrada"));
    shell.append(el("p", { class: "section-lede" }, `Nenhuma obra derivada corresponde a “${key}”.`));
    return { title: "Obra não encontrada — Syntopicon", element: shell };
  }

  const refs = ctx.justice1952.references.filter((r) => work.refIds.includes(r.id));
  const author = ctx.authors.find((a) => a.key === work.authorKey);

  shell.append(breadcrumb([
    { label: "Início", href: "#/" },
    { label: "Autores & Obras", href: "#/autores" },
    { label: work.authorRaw, href: `#/autor/${work.authorKey}` },
    { label: work.titleEn },
  ]));
  shell.append(el("header", { class: "page-header" },
    el("p", { class: "eyebrow" }, "Obra (derivada da segmentação das linhas)"),
    el("h1", {}, work.titleEn),
    el("p", { class: "subtitle" }, `citada sob o cabeçalho `, el("a", { href: `#/autor/${work.authorKey}` }, work.authorRaw)),
    el("div", { class: "chip-row" },
      layerChip("derived-structure", "A segmentação de obras é derivada; o locatorRaw da linha permanece a evidência"),
      editionChip(`edição ${ctx.justice1952.meta.edition}`),
      el("span", { class: "chip chip-status" }, `${work.refCount} referência(s)`),
      work.volumes.length ? editionChip(`GBWW ${work.volumes.map((v) => `v. ${v}`).join(" · ")}`) : null,
    ),
    el("p", { class: "note-line" },
      "Uma obra derivada agrega as linhas que a citam. Ela não é uma edição nem um texto incorporado: ",
      "para ler, siga as referências aos volumes e páginas impressas."),
  ));

  shell.append(el("section", { class: "section", "aria-labelledby": "w-topics" },
    el("h2", { id: "w-topics" }, `Tópicos onde é citada (${work.topicSlugs.length})`),
    el("ul", { class: "topic-tag-list" },
      work.topicSlugs.map((slug) => {
        const t = topicBySlug(ctx.justice1952.topics, slug);
        return el("li", {}, el("a", { class: "tag-link", href: `#/topico/${slug}` }, t?.code ?? slug));
      }))));

  shell.append(el("section", { class: "section", "aria-labelledby": "w-refs" },
    el("h2", { id: "w-refs" }, `Referências (${refs.length})`),
    el("ul", { class: "ref-list" }, refs.map((r) => referenceRow(ctx, r, { compact: true })))));

  return { title: `${work.titleEn} (${work.authorRaw}) — Justiça · Syntopicon`, element: shell };
}

function slugDom(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
