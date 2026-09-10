// main.js — bootstrap: carrega datasets, monta o contexto de domínio e o router.
// Zero dependências externas; nenhum recurso fora deste diretório.

import { buildContext, checkInvariants } from "./domain.js";
import { createRouter, routeKeys } from "./router.js";
import { el } from "./ui.js";
import routes from "./views.js";

const DATA_FILES = [
  "data/justice-1952.json",
  "data/introduction-en.json",
  "data/additional-readings.json",
  "data/demo-layer.json",
  "data/ideas-102.json",
  "data/sources.json",
  "data/terms.json",
];

async function loadDatasets(base) {
  const [
    justice1952,
    introductionEn,
    additionalReadings,
    demoLayer,
    ideas102,
    sources,
    terms,
  ] = await Promise.all(DATA_FILES.map((f) => fetch(new URL(f, base)).then((r) => {
    if (!r.ok) throw new Error(`Falha ao carregar ${f} (${r.status})`);
    return r.json();
  })));
  return { justice1952, introductionEn, additionalReadings, demoLayer, ideas102, sources, terms };
}

// ─── Bandeja de comparação (estado da sessão) ─────────────────────────────

const TRAY_KEY = "justice-arena-compare-tray";
const TRAY_MAX = 3;

export const compareTray = {
  list() {
    try {
      const raw = sessionStorage.getItem(TRAY_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.slice(0, TRAY_MAX) : [];
    } catch {
      return [];
    }
  },
  has(id) {
    return this.list().includes(id);
  },
  toggle(id) {
    const list = this.list();
    const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id].slice(-TRAY_MAX);
    try {
      sessionStorage.setItem(TRAY_KEY, JSON.stringify(next));
    } catch {
      /* sessão indisponível: estado em memória apenas */
    }
    this._mem = next;
    document.dispatchEvent(new CustomEvent("compare-tray-change", { detail: next }));
  },
  _mem: null,
  current() {
    return this._mem ?? this.list();
  },
};

export function updateCompareBadge() {
  const link = document.getElementById("nav-compare");
  if (!link) return;
  const n = compareTray.current().length;
  link.textContent = n > 0 ? `Comparar (${n})` : "Comparar";
  if (n > 0) link.setAttribute("data-count", String(n));
  else link.removeAttribute("data-count");
}

document.addEventListener("compare-tray-change", updateCompareBadge);

// ─── Inicialização ────────────────────────────────────────────────────────

async function main() {
  const base = new URL(".", document.baseURI).href;
  const datasets = await loadDatasets(base);
  const ctx = buildContext(datasets);

  const invariants = checkInvariants(ctx);
  if (!invariants.ok) {
    console.error("Invariantes de domínio violadas:", invariants.errors);
    document.getElementById("view").append(
      el("div", { class: "page-shell" },
        el("h1", {}, "Dataset inválido"),
        el("p", {}, "As invariantes de integridade falhariam; nada é renderizado com dados inconsistentes."),
        el("ul", {}, invariants.errors.map((e) => el("li", {}, e))),
      ),
    );
    return;
  }
  window.__JUSTICE_CTX__ = ctx; // exposto para depuração e testes de fumaça (sem segredos)

  const router = createRouter({
    ctx,
    routes: routes.map((r) => ({ ...r, keys: routeKeys(r.pattern) })),
  });

  document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("search-input");
    const q = input.value.trim();
    if (q.length < 2) return;
    location.hash = `#/inventario?q=${encodeURIComponent(q)}`;
  });

  updateCompareBadge();
  router.render();
}

main().catch((err) => {
  console.error(err);
  document.getElementById("view").append(
    el("div", { class: "page-shell" },
      el("h1", {}, "Falha ao iniciar"),
      el("p", {}, "Este protótipo precisa ser servido por HTTP (qualquer servidor estático). Veja o README."),
      el("pre", { class: "error-pre" }, String(err?.message ?? err)),
    ),
  );
});
