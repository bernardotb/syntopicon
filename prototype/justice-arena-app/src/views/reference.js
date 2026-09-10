// reference.js — a entrada de referência: a unidade que indica ONDE ler.
import { el, breadcrumb, editionChip, emText, kindChip, layerChip, provenanceLine } from "../ui.js";
import { PASSAGE_ABSENT_LABEL, demoPassageForReference, refAuthorKind, topicBySlug, topicPath, worksForReference } from "../domain.js";
import { compareToggleButton } from "./shared.js";
import { compareTray } from "../main.js";

export default function reference({ id }, ctx) {
  const ref = ctx.justice1952.references.find((r) => r.id === id);
  if (!ref) {
    const shell = el("div", { class: "page-shell" });
    shell.append(breadcrumb([{ label: "Início", href: "#/" }, { label: "Referência não encontrada" }]));
    shell.append(el("h1", {}, "Referência não encontrada"));
    shell.append(el("p", { class: "section-lede" }, `Nenhuma referência do corpus corresponde a “${id}”. O corpus incorpora ${ctx.counts.references} linhas do capítulo Justiça (edição 1952).`));
    return { title: "Referência não encontrada — Syntopicon", element: shell };
  }

  const topic = topicBySlug(ctx.justice1952.topics, ref.topicSlug);
  const path = topic ? topicPath(ctx.justice1952.topics, topic.slug) : [];
  const kind = refAuthorKind(ref);
  const works = worksForReference(ctx.works, ref);

  const shell = el("div", { class: "page-shell" });
  shell.append(breadcrumb([
    { label: "Início", href: "#/" },
    { label: "Justiça", href: "#/ideia/justica" },
    ...path.slice(0, -1).map((t) => ({ label: t.code, href: `#/topico/${t.slug}` })),
    { label: topic ? topic.code : ref.topicSlug, href: `#/topico/${ref.topicSlug}` },
    { label: "Referência" },
  ]));

  shell.append(el("header", { class: "page-header" },
    el("p", { class: "eyebrow" }, `Reference · linha impressa do tópico ${topic?.code ?? ref.topicSlug}`),
    el("h1", {}, kind === "flow-artifact" ? ref.authorRaw : ref.authorRaw),
    el("p", { class: "subtitle" }, kind === "flow-artifact"
      ? "Artefato de fluxo de página da digitalização"
      : kind === "scripture" ? "Parte da Bíblia, citada na posição de autor como no original"
      : kind === "document" ? "Documento americano citado na posição de autor como no original"
      : "Cabeçalho de autor na lista de referências do capítulo Justiça"),
    el("div", { class: "chip-row" },
      editionChip(`edição ${ctx.justice1952.meta.edition}`),
      kind !== "person" ? kindChip(kind) : null,
      ref.volume != null ? editionChip(`GBWW v. ${ref.volume}`) : null,
    ),
    provenanceLine(ctx.sources, ref.provenance),
  ));

  // A linha literal
  shell.append(el("section", { class: "section", "aria-labelledby": "loc-title" },
    el("h2", { id: "loc-title" }, "Linha impressa (locatorRaw)"),
    el("p", { class: "section-lede" },
      "O texto abaixo é literal da fonte — a linha exatamente como impressa no Syntopicon 1952. ",
      "Nenhum parsing substitui o original; interpretações vivem em camadas separadas."),
    el("blockquote", { class: "locator-block" }, el("code", {}, emText(ref.locatorRaw))),
    ref.continuation ? el("p", { class: "section-lede" },
      el("strong", {}, "Continuação na coluna seguinte: "), el("code", {}, emText(ref.continuation))) : null,
  ));

  // Relações
  const relations = el("section", { class: "section", "aria-labelledby": "rel-title" },
    el("h2", { id: "rel-title" }, "Relações"));

  if (kind === "flow-artifact") {
    relations.append(el("p", { class: "section-lede" },
      "Esta linha é um cabeçalho corrido de página (ex.: “CHAPTER 42: JUSTICE 865”) capturado como referência pelo parser da fonte. ",
      "O registro bruto é preservado — RAW FIRST —, mas ele não gera entidades de autor ou obra, e nada é inferido a partir dele."));
  } else {
    const relList = el("ul", { class: "relation-list" });
    relList.append(el("li", {},
      el("span", { class: "rel-label" }, "Autor (cabeçalho impresso): "),
      el("a", { href: `#/autor/${slugKey(ref.authorRaw)}` }, ref.authorRaw),
      " ",
      layerChip("derived-structure", "A página de autor é derivada das linhas de referência; a forma impressa é a identidade")));
    if (works.length) {
      relList.append(el("li", {},
        el("span", { class: "rel-label" }, "Obras citadas na linha (segmentação derivada): "),
        works.map((w, i) => [i > 0 ? " · " : "", el("a", { href: `#/obra/${w.key}` }, w.titleEn)]).flat()));
    }
    relList.append(el("li", {},
      el("span", { class: "rel-label" }, "Tópico de origem: "),
      el("a", { href: `#/topico/${ref.topicSlug}` }, `${topic?.code} — ${topic?.titlePt}`)));
    if (ref.volume != null) {
      relList.append(el("li", {},
        el("span", { class: "rel-label" }, "Volume GBWW: "),
        el("a", { href: `#/volumes?v=${ref.volume}` }, `v. ${ref.volume}`)));
    }
    relations.append(relList);
  }
  shell.append(relations);

  // Reference ≠ Passage — o estado explícito
  shell.append(el("section", { class: "section section-passage", "aria-labelledby": "pass-title" },
    el("h2", { id: "pass-title" }, "Passagem"),
    el("p", { class: "passage-state passage-state-strong" }, PASSAGE_ABSENT_LABEL),
    el("p", { class: "section-lede" },
      "Uma ", el("strong", {}, "Reference"), " indica ONDE ler; uma ", el("strong", {}, "Passage"),
      " conteria o texto efetivamente recuperado. Nenhuma passagem do corpus canônico foi incorporada ao acervo digital — ",
      "nenhuma referência deste protótipo exibe texto como se fosse canônico. As únicas passagens existentes são quatro ",
      el("em", {}, "demonstrações interpretativas"), " (texto real de domínio público, seleção editorial), visíveis nos tópicos 8 e 8c(1)."),
  ));

  // Ações
  if (kind !== "flow-artifact") {
    const actions = el("section", { class: "section" },
      el("h2", {}, "Ações"));
    const row = el("div", { class: "action-row" });
    row.append(compareToggleButton(ref.id));
    if (compareTray.current().length >= 2) {
      row.append(el("a", { class: "button", href: "#/comparar" }, "Abrir comparação"));
    }
    row.append(el("a", { class: "button button-quiet", href: `#/topico/${ref.topicSlug}` }, "← Voltar ao tópico"));
    actions.append(row);
    shell.append(actions);
  }

  return { title: `${ref.authorRaw} — referência ${ref.id} · Syntopicon`, element: shell };
}

function slugKey(raw) {
  return raw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
