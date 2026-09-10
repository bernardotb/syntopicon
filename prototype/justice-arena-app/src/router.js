// router.js — roteador por hash. Rotas são declarativas; cada rota recebe
// (params, ctx) e devolve { title, render(container) }. Links internos usam
// sempre "#/caminho" — fragmentos reais, jamais placeholders.

export function createRouter({ routes, ctx, onNavigate }) {
  const registry = routes.map((route) => ({
    ...route,
    regex: new RegExp("^" + route.pattern.replace(/:[^/]+/g, "([^/]+)") + "$"),
  }));

  function parse() {
    const raw = location.hash.slice(1) || "/";
    const [path, queryString] = raw.split("?");
    const params = new URLSearchParams(queryString ?? "");
    return { path: path.startsWith("/") ? path : `/${path}`, params };
  }

  function currentNavKey() {
    const { path } = parse();
    if (path.startsWith("/topico") || path.startsWith("/ideia") || path === "/") return path === "/" ? "/" : "/ideia/justica";
    if (path.startsWith("/referencia")) return "/ideia/justica";
    if (path.startsWith("/autor") || path.startsWith("/obra") || path.startsWith("/volumes")) return "/autores";
    return path;
  }

  function render() {
    const { path, params } = parse();
    const match = registry
      .map((route) => ({ route, m: path.match(route.regex) }))
      .find(({ m }) => m);
    const main = document.getElementById("view");
    if (!match) {
      document.title = "Não encontrada — Justiça · Syntopicon";
      main.replaceChildren();
      main.append(notFound(path));
      syncNav();
      return;
    }
    const named = {};
    match.route.keys?.forEach((k, i) => {
      named[k] = decodeURIComponent(match.m[i + 1]);
    });
    const result = match.route.view({ ...named, ...Object.fromEntries(params) }, ctx);
    document.title = result.title;
    main.replaceChildren();
    main.append(result.element);
    syncNav();
    main.setAttribute("tabindex", "-1");
    main.focus({ preventScroll: false });
    window.scrollTo(0, 0);
    onNavigate?.(path);
  }

  function syncNav() {
    const key = currentNavKey();
    document.querySelectorAll("[data-nav]").forEach((a) => {
      const isCurrent = a.getAttribute("data-nav") === key;
      a.classList.toggle("active", isCurrent);
      if (isCurrent) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  window.addEventListener("hashchange", render);
  return { render, parse };
}

export function routeKeys(pattern) {
  return [...pattern.matchAll(/:([^/]+)/g)].map((m) => m[1]);
}

function notFound(path) {
    const div = document.createElement("div");
    div.className = "page-shell";
    const h = document.createElement("h1");
    h.textContent = "Página não encontrada";
    const p = document.createElement("p");
    p.textContent = `Nenhuma rota corresponde a ${path}. O corpus incorporado é o capítulo Justiça (Great Idea 42); as demais ideias seguem sem estrutura incorporada.`;
    const a = document.createElement("a");
    a.href = "#/";
    a.textContent = "Voltar ao início";
    div.append(h, p, a);
    return div;
}
