// ui.js — auxiliares de apresentação. Regras:
//   • Nenhum elemento <button> é criado sem handler de clique (invariante).
//   • Modal: foco preso, Escape fecha, foco retorna ao disparador.
//   • Tabs: setas esquerda/direita movem, Home/End, Tab sai do conjunto.
// O DOM é construído por el(); a lógica de foco é pura (focusTrap) e
// testável sem navegador.

// ─── el() — criação de elementos ──────────────────────────────────────────

export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [name, value] of Object.entries(attrs ?? {})) {
    if (value == null || value === false) continue;
    if (name === "class") node.className = value;
    else if (name === "html") node.innerHTML = value; // jamais com dados não confiáveis
    else if (name.startsWith("on") && typeof value === "function") {
      node.addEventListener(name.slice(2).toLowerCase(), value);
    } else if (name === "dataset" && typeof value === "object") {
      Object.assign(node.dataset, value);
    } else if (value === true) node.setAttribute(name, "");
    else node.setAttribute(name, String(value));
  }
  append(node, children);
  if (tag.toLowerCase() === "button") {
    const hasClick = Boolean(attrs && (attrs.onclick || attrs.onclickcapture));
    const isSubmitReset = node.getAttribute("type") === "submit" || node.getAttribute("type") === "reset";
    if (!hasClick && !isSubmitReset) {
      throw new Error("Invariante de UI: <button> criado sem handler de clique (botão morto).");
    }
  }
  return node;
}

function append(node, children) {
  for (const child of children.flat(Infinity)) {
    if (child == null || child === false) continue;
    node.append(child.nodeType ? child : document.createTextNode(String(child)));
  }
}

// ─── Texto com itálico editorial (*obra*) — usado em locators e títulos ───
// Converte *Trecho* em <em>, sem HTML bruto (seguro contra injeção).

export function emText(text) {
  const frag = document.createDocumentFragment();
  const parts = String(text).split(/(\*[^*]+\*)/);
  for (const part of parts) {
    if (/^\*[^*]+\*$/.test(part)) {
      frag.append(el("em", {}, part.slice(1, -1)));
    } else if (part) {
      frag.append(part);
    }
  }
  return frag;
}

// ─── Chips de proveniência (canônico × derivado × interpretativo) ─────────

const LAYER_LABELS = {
  "original-corpus": { label: "CANÔNICO", cls: "chip chip-canonical" },
  "derived-structure": { label: "DERIVADO", cls: "chip chip-derived" },
  "interpretive-content": { label: "INTERPRETATIVO", cls: "chip chip-interpretive" },
};

export function layerChip(layer, extraTitle = "") {
  const spec = LAYER_LABELS[layer] ?? { label: layer, cls: "chip chip-derived" };
  return el(
    "span",
    { class: spec.cls, title: extraTitle || undefined },
    spec.label,
  );
}

export function editionChip(text) {
  return el("span", { class: "chip chip-edition" }, text);
}

export function kindChip(kind) {
  const labels = {
    person: "AUTOR · derivado",
    document: "DOCUMENTO · derivado",
    scripture: "ESCRITURA · derivado",
    "flow-artifact": "ARTEFATO DE FLUXO",
  };
  return el("span", { class: "chip chip-kind" }, labels[kind] ?? kind);
}

export function statusChip(text, tone = "muted") {
  return el("span", { class: `chip chip-status chip-status-${tone}` }, text);
}

// ─── Trilha de proveniência completa (App A ensinou; Adler decide) ────────

export function provenanceLine(sourceRegistry, provenance, { compact = false } = {}) {
  const source = sourceRegistry.registry[provenance.sourceId.replace("source:", "")];
  const wrap = el("p", { class: "provenance-line" });
  wrap.append(layerChip(provenance.layer));
  wrap.append(" ");
  wrap.append(
    el(
      "span",
      { class: "provenance-source" },
      source ? source.title : provenance.sourceId,
    ),
  );
  if (!compact && source?.note) {
    wrap.append(el("span", { class: "provenance-note" }, ` — ${source.note}`));
  }
  return wrap;
}

// ─── Modal — foco preso, Escape, retorno de foco ─────────────────────────

export function focusTrapKeypress(order, event) {
  // Lógica pura (testável): devolve o índice que deve receber foco, ou null.
  const { key, shiftKey } = event;
  if (key === "Escape") return { action: "close" };
  if (key !== "Tab") return null;
  const activeIndex = order.indexOf(document.activeElement);
  if (activeIndex === -1) return { action: "focus", index: shiftKey ? order.length - 1 : 0 };
  if (shiftKey && activeIndex === 0) return { action: "focus", index: order.length - 1 };
  if (!shiftKey && activeIndex === order.length - 1) return { action: "focus", index: 0 };
  return null;
}

let activeModal = null;

export function openModal({ title, content, onClose, trigger }) {
  if (activeModal) closeModal();
  const restoreFocusTo = trigger && trigger.focus ? trigger : document.activeElement;
  const dialog = el(
    "div",
    {
      class: "modal-backdrop",
      role: "presentation",
      onclick: (e) => {
        if (e.target === dialog) close();
      },
    },
  );
  const box = el("div", { class: "modal", role: "dialog", "aria-modal": "true", "aria-label": title });
  const heading = el("h2", { id: `modal-title-${Date.now()}` }, title);
  box.setAttribute("aria-labelledby", heading.id);
  const closeButton = el(
    "button",
    { class: "modal-close", type: "button", "aria-label": "Fechar", onclick: () => close() },
    "Fechar ✕",
  );
  const body = el("div", { class: "modal-body" });
  body.append(content);
  box.append(closeButton, heading, body);
  dialog.append(box);
  document.body.append(dialog);
  document.body.classList.add("modal-open");

  function focusables() {
    return [...box.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")].filter(
      (n) => !n.disabled && n.offsetParent !== null,
    );
  }
  function onKeydown(e) {
    const order = [closeButton, ...focusables().filter((n) => n !== closeButton)];
    const result = focusTrapKeypress(order, e);
    if (!result) return;
    e.preventDefault();
    if (result.action === "close") {
      close();
      return;
    }
    order[result.index]?.focus();
  }
  function close() {
    document.removeEventListener("keydown", onKeydown, true);
    dialog.remove();
    document.body.classList.remove("modal-open");
    activeModal = null;
    if (trigger && trigger.focus) trigger.focus();
    onClose?.();
  }
  document.addEventListener("keydown", onKeydown, true);
  activeModal = { close };
  closeButton.focus();
  return { close };
}

export function closeModal() {
  activeModal?.close();
}

// ─── Tabs acessíveis (setas, Home/End) ────────────────────────────────────

export function tablistKeypress(tabs, currentIndex, event) {
  // Lógica pura (testável): devolve o próximo índice, ou null.
  const last = tabs.length - 1;
  switch (event.key) {
    case "ArrowRight": return (currentIndex + 1) % tabs.length;
    case "ArrowLeft": return (currentIndex - 1 + tabs.length) % tabs.length;
    case "Home": return 0;
    case "End": return last;
    default: return null;
  }
}

export function createTabs({ tabs, onSelect, initial = 0 }) {
  // tabs: [{ id, label, render() }]
  const tabEls = tabs.map((t, i) =>
    el(
      "button",
      {
        class: "tab",
        type: "button",
        role: "tab",
        id: `tab-${t.id}`,
        "aria-selected": i === initial ? "true" : "false",
        "aria-controls": `panel-${t.id}`,
        tabindex: i === initial ? "0" : "-1",
        onclick: () => select(i),
        onkeydown: (e) => {
          const next = tablistKeypress(tabs, i, e);
          if (next == null) return;
          e.preventDefault();
          select(next);
          tabEls[next]?.focus();
        },
      },
      t.label,
    ),
  );
  const list = el("div", { class: "tablist", role: "tablist" }, tabEls);
  let current = initial;
  const panel = el("div", { class: "tabpanel", role: "tabpanel", id: `panel-${tabs[current].id}`, "aria-labelledby": `tab-${tabs[current].id}`, tabindex: "0" });
  panel.append(tabs[current].render());
  function select(i) {
    if (i === current) return;
    current = i;
    tabEls.forEach((tEl, j) => {
      tEl.setAttribute("aria-selected", j === i ? "true" : "false");
      tEl.setAttribute("tabindex", j === i ? "0" : "-1");
    });
    panel.replaceChildren();
    panel.setAttribute("id", `panel-${tabs[current].id}`);
    panel.setAttribute("aria-labelledby", `tab-${tabs[current].id}`);
    panel.append(tabs[current].render());
    onSelect?.(i);
  }
  return { element: el("div", {}, list, panel), select };
}

// ─── Diversos ─────────────────────────────────────────────────────────────

export function emptyState(message, hint) {
  const box = el("div", { class: "empty-state" }, el("p", {}, message));
  if (hint) box.append(el("p", { class: "empty-hint" }, hint));
  return box;
}

export function breadcrumb(items) {
  // items: [{ label, href? }] — o último é a página atual (sem link).
  const nav = el("nav", { class: "breadcrumb", "aria-label": "Trilha de navegação" });
  const ol = el("ol", {});
  items.forEach((item, i) => {
    const li = el("li", {});
    if (item.href && i < items.length - 1) {
      li.append(el("a", { href: item.href }, item.label));
    } else {
      li.append(el("span", { "aria-current": i === items.length - 1 ? "page" : undefined }, item.label));
    }
    ol.append(li);
  });
  nav.append(ol);
  return nav;
}

export function pageHeader({ eyebrow, title, subtitle, meta }) {
  const header = el("header", { class: "page-header" });
  if (eyebrow) header.append(el("p", { class: "eyebrow" }, eyebrow));
  header.append(el("h1", {}, title));
  if (subtitle) header.append(el("p", { class: "subtitle" }, subtitle));
  if (meta) header.append(meta);
  return header;
}
