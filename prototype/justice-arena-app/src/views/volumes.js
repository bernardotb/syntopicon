// volumes.js — perspectiva FÍSICA: Coleção → Volume → Obras → Referências.
import { el, breadcrumb, editionChip, layerChip } from "../ui.js";

export default function volumes(params, ctx) {
  const shell = el("div", { class: "page-shell" });
  const selected = params.v ? Number(params.v) : null;

  shell.append(breadcrumb([{ label: "Início", href: "#/" }, { label: "Volumes GBWW" }]));
  shell.append(el("header", { class: "page-header" },
    el("p", { class: "eyebrow" }, "Perspectiva física · camada derivada"),
    el("h1", {}, selected ? `Volume GBWW ${selected}` : "Volumes dos Great Books"),
    el("p", { class: "subtitle" }, selected
      ? `Obras e referências do capítulo Justiça (edição 1952) que citam o volume ${selected}.`
      : `${ctx.counts.volumes} volumes da coleção com presença no capítulo Justiça — derivado das linhas de referência.`),
    layerChip("derived-structure", "A associação referência→volume vem da fonte (número em corpo pesado); a agregação por volume é derivada."),
  ));

  if (!selected) {
    const grid = el("ul", { class: "volume-grid" });
    for (const v of ctx.volumes) {
      grid.append(el("li", {},
        el("a", { class: "volume-card", href: `#/volumes?v=${v.volume}` },
          el("span", { class: "volume-n" }, String(v.volume)),
          el("span", { class: "volume-meta" }, `${v.refCount} ref.`))));
    }
    shell.append(grid);
    return { title: "Volumes GBWW — Justiça · Syntopicon", element: shell };
  }

  const vol = ctx.volumes.find((v) => v.volume === selected);
  if (!vol) {
    shell.append(el("p", { class: "section-lede" },
      `O volume ${selected} não tem presença no capítulo Justiça. Volumes com presença: ${ctx.volumes.map((v) => v.volume).join(", ")}.`));
    return { title: `Volume ${selected} — Syntopicon`, element: shell };
  }

  const refs = ctx.justice1952.references.filter((r) => vol.refIds.includes(r.id));
  const worksInVolume = ctx.works.filter((w) => w.volumes.includes(selected));

  shell.append(el("p", {}, el("a", { class: "link-quiet", href: "#/volumes" }, "← Todos os volumes")));

  shell.append(el("section", { class: "section", "aria-labelledby": "vol-works" },
    el("h2", { id: "vol-works" }, `Obras citadas neste volume (${worksInVolume.length})`),
    el("ul", { class: "work-list" },
      worksInVolume.map((w) =>
        el("li", {},
          el("a", { href: `#/obra/${w.key}` }, w.titleEn),
          el("span", { class: "work-meta" }, ` — ${w.authorRaw}`))))));

  shell.append(el("section", { class: "section", "aria-labelledby": "vol-refs" },
    el("h2", { id: "vol-refs" }, `Referências (${refs.length})`),
    el("ul", { class: "ref-list" }, refs.map((r) => compactRefRow(r)))));

  return { title: `Volume GBWW ${selected} — Justiça · Syntopicon`, element: shell };
}

function compactRefRow(ref) {
  return el("li", { class: "ref-item" },
    el("p", { class: "ref-head" },
      el("a", { class: "ref-author", href: `#/autor/${ref.authorRaw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}` }, ref.authorRaw),
      " ",
      el("a", { class: "link-quiet", href: `#/topico/${ref.topicSlug}` }, `tópico →`)),
    el("p", { class: "ref-loc" }, el("code", { class: "locator" }, ref.locatorRaw)));
}
