// shared.js — blocos compartilhados entre views (linha de referência, etc.).
import { el, emText, kindChip } from "../ui.js";
import { PASSAGE_ABSENT_LABEL, refAuthorKind, worksForReference } from "../domain.js";
import { compareTray } from "../main.js";

// Linha de referência canônica — a unidade elementar da leitura sintópica.
export function referenceRow(ctx, ref, { compact = false } = {}) {
  const kind = refAuthorKind(ref);
  const li = el("li", { class: `ref-item kind-${kind}` });

  const head = el("p", { class: "ref-head" });
  if (kind === "flow-artifact") {
    head.append(el("span", { class: "ref-author" }, ref.authorRaw));
    head.append(kindChip("flow-artifact"));
  } else {
    head.append(el("a", { class: "ref-author", href: `#/autor/${ref.authorRaw.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}` }, ref.authorRaw));
    if (kind !== "person") head.append(kindChip(kind));
  }
  if (ref.entryKind === "bible") head.append(el("span", { class: "chip chip-kind" }, "OBRA BÍBLICA"));
  li.append(head);

  const loc = el("p", { class: "ref-loc" }, el("code", { class: "locator" }, emText(ref.locatorRaw)));
  if (ref.volume != null) loc.append(el("span", { class: "ref-vol" }, `GBWW v. ${ref.volume}`));
  li.append(loc);

  if (!compact) {
    const works = worksForReference(ctx.works, ref);
    if (works.length) {
      li.append(el("p", { class: "ref-works" }, "Obras (segmentação derivada): ",
        works.map((w, i) => [i > 0 ? " · " : "", el("a", { href: `#/obra/${w.key}` }, w.titleEn)]).flat()));
    }
    const actions = el("div", { class: "ref-actions" });
    actions.append(el("a", { class: "link-quiet", href: `#/referencia/${encodeURIComponent(ref.id)}` }, "Abrir referência →"));
    if (kind !== "flow-artifact") {
      actions.append(compareToggleButton(ref.id));
    }
    li.append(actions);
    if (kind === "flow-artifact") {
      li.append(el("p", { class: "ref-artifact-note" },
        "Linha de fluxo de página da digitalização (cabeçalho corrido capturado pelo parser da fonte). Exibida como veio impressa; não gera entidade de autor nem de obra."));
    }
  }
  return li;
}

export function compareToggleButton(refId) {
  const button = el("button", {
    class: "button button-small button-compare",
    type: "button",
    "aria-pressed": compareTray.has(refId) ? "true" : "false",
    onclick: () => {
      compareTray.toggle(refId);
      const inTray = compareTray.has(refId);
      button.setAttribute("aria-pressed", inTray ? "true" : "false");
      button.textContent = inTray ? "Na bandeja de comparação ✓" : "Comparar";
    },
  }, compareTray.has(refId) ? "Na bandeja de comparação ✓" : "Comparar");
  return button;
}

export function passageStateLine() {
  return el("p", { class: "passage-state" }, PASSAGE_ABSENT_LABEL);
}
