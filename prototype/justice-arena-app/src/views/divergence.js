// divergence.js — a divergência 1952 × benchmark no tópico 8c(1),
// documentada no confronto do corpus (estado UNRESOLVED). Preservar a dúvida.
import { el, layerChip, statusChip } from "../ui.js";

// [FATO] Registrado em docs/corpus/confronto-justice-rodada-1.md (adendo 3),
// branch arena/01a06414-syntopicon @ 21d60ce: a lista impressa de 8c(1) na
// edição 1952 difere da lista exibida pelo benchmark externo (mortimer).
// Hipótese prioritária: edition-delta 1952×1990. UNRESOLVED até o capítulo
// da 2ª ed. (1990) ser localizado — proibido fundir edições.
export function divergenceNote(ctx, topicSlug) {
  if (topicSlug !== "8c-1") return null;
  return el("section", { class: "section section-divergence", "aria-labelledby": "div-title" },
    el("h2", { id: "div-title" }, "Divergência de edições — estado UNRESOLVED"),
    el("p", { class: "section-lede" },
      "A lista impressa deste tópico na edição 1952 difere da lista exibida pelo benchmark externo (mortimer.vercel.app). ",
      "A hipótese prioritária é edition-delta 1952×1990 (o benchmark espelharia a 2ª edição). ",
      "As edições NÃO são fundidas: a divergência permanece explícita até o capítulo de 1990 ser localizado."),
    el("div", { class: "divergence-grid" },
      el("div", { class: "divergence-col" },
        el("h3", {}, "Presentes na 1952 impressa, ausentes no benchmark"),
        el("ul", {}, ["Milton", "Gibbon (×2)", "Constitution of the U.S.", "Marx-Engels", "Dostoevsky"].map((n) => el("li", {}, n)))),
      el("div", { class: "divergence-col" },
        el("h3", {}, "Ausentes na 1952 impressa, presentes no benchmark"),
        el("ul", {}, ["Federalist / Madison", "Tocqueville", "Veblen", "Tawney", "Conrad"].map((n) => el("li", {}, n)))),
    ),
    el("p", { class: "provenance-note-line" },
      layerChip("derived-structure"), " ",
      "Fonte do registro: ", el("code", {}, "docs/corpus/confronto-justice-rodada-1.md"),
      " (adendo 3) — confronto entre a colagem integral 1952 do Dono e a captura do benchmark (2026-09-02/03)."),
  );
}
