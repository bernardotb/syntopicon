// home.js — início editorial: o mapa e a viagem. Sem dashboard, sem grafo.
import { el, editionChip, layerChip } from "../ui.js";

export default function home(_params, ctx) {
  const { counts } = ctx;
  const shell = el("div", { class: "page-shell" });

  const hero = el("section", { class: "hero" },
    el("p", { class: "eyebrow" }, "Grande Conversa · Syntopicon"),
    el("h1", {}, "O mapa das grandes ideias,"),
    el("h1", { class: "hero-second" }, "lido pelo caminho da Justiça."),
    el("p", { class: "hero-lede" },
      "O Syntopicon é o mapa. Os Great Books são o território. A leitura sintópica é a viagem entre os dois. ",
      "Este protótipo incorpora um único capítulo completo — a Grande Ideia 42, ",
      el("strong", {}, "Justice / Justiça"),
      " — para provar o percurso inteiro: ideia → tópico → referência → obra → autor, e de volta.",
    ),
    el("div", { class: "hero-actions" },
      el("a", { class: "button button-primary", href: "#/ideia/justica" }, "Explorar Justiça"),
      el("a", { class: "button", href: "#/percurso" }, "Seguir o percurso guiado"),
    ),
  );

  const stats = el("ul", { class: "stat-strip", "aria-label": "Estado incorporado do corpus (contagens derivadas do dataset)" },
    stat(counts.topics, "tópicos no outline"),
    stat(counts.references, "linhas de referência"),
    stat(counts.authors, "cabeçalhos de autor"),
    stat(counts.works, "obras citadas"),
    stat(counts.volumes, "volumes GBWW"),
    stat(counts.crossReferences, "cross-references"),
  );
  const statsNote = el("p", { class: "stat-note" },
    "Todas as contagens acima são derivadas do dataset carregado — nenhuma é fixada no código. ",
    "O corpus digital contém ", el("strong", {}, "referências, não passagens"), ": cada referência indica ONDE ler.",
  );

  const modes = el("section", { class: "section", "aria-labelledby": "modes-title" },
    el("h2", { id: "modes-title" }, "Quatro verbos, três perspectivas"),
    el("p", { class: "section-lede" },
      "EXPLORE o mapa. READ com contexto. COMPARE autores e referências. RETURN para reler. ",
      "A mesma base é navegada por três perspectivas — sintópica, bibliográfica e física — mais o inventário lexical.",
    ),
    el("div", { class: "mode-grid" },
      modeCard("Sintópica", "Termo ou interesse → Grande Ideia → Tópico → Referência", "#/ideia/justica", "Do geral ao específico, pelo outline de Adler."),
      modeCard("Bibliográfica", "Autor → Obra → Referências → Tópicos", "#/autores", "Entrar pela obra e ver onde ela ecoa no capítulo."),
      modeCard("Física", "Coleção → Volume GBWW → Obras → Referências", "#/volumes", "A estante real: 54 volumes, papel e página."),
      modeCard("Lexical", "Inventory Term → Tópico → Grande Ideia", "#/inventario", "O termo de interesse do leitor como porta de entrada."),
    ),
  );

  const golden = el("section", { class: "section section-golden", "aria-labelledby": "golden-title" },
    el("h2", { id: "golden-title" }, "O caso dourado: Justice 8c(1)"),
    el("p", { class: "section-lede" },
      "O tópico ", el("strong", {}, "8c(1) — Economic exploitation: chattel slavery and wage slavery"),
      " é o teste privilegiado do sistema: tópico, referências, autores, obras, localizadores, edições e proveniência, ",
      "tudo verificado em um único lugar.",
    ),
    el("ul", { class: "golden-facts" },
      el("li", {}, editionChip("edição 1952 · pp. 850–879"), " Capítulo 42 do Syntopicon (GBWW Vol. 2), ingestão RAW FIRST auditada."),
      el("li", {}, el("strong", {}, "18 referências impressas"), " no tópico 8c(1), na ordem do original, locatorRaw literal."),
      el("li", {}, layerChip("original-corpus"), " Inventory Terms verificados: ", el("em", {}, "“Chattel slavery”"), " e ", el("em", {}, "“Exploitation / Economic slavery”"),
        " → Justice 8c(1) (Inventory of Terms, 2ª ed. 1990; ponte até a edição 1952 sempre derivada)."),
      el("li", {}, layerChip("interpretive-content"), " Divergência de lista entre a edição 1952 impressa e o benchmark externo: estado ",
        el("strong", {}, "UNRESOLVED"), " — a dúvida é preservada e exibida."),
    ),
    el("p", {},
      el("a", { class: "button", href: "#/topico/8c-1" }, "Ir direto a 8c(1)"),
      " ",
      el("a", { class: "button button-quiet", href: "#/inventario" }, "Entrar pelo termo “Chattel slavery”"),
    ),
  );

  const honest = el("section", { class: "section", "aria-labelledby": "honest-title" },
    el("h2", { id: "honest-title" }, "Estados honestos"),
    el("ul", { class: "honest-list" },
      el("li", {}, el("strong", {}, "Passagens: "), "não incorporadas ao corpus digital. Uma referência indica ONDE ler; a passagem contém o TEXTO. Nada aqui finge ter o texto."),
      el("li", {}, el("strong", {}, "Introduction: "), "texto integral da edição 1952 (EN) e tradução de apresentação (PT) — nenhuma substitui a outra."),
      el("li", {}, el("strong", {}, "Demais 101 ideias: "), "somente a lista canônica; estrutura não incorporada. Ausência aqui não é ausência na fonte."),
    ),
  );

  shell.append(hero, stats, statsNote, modes, golden, honest);
  return { title: "Justiça · Syntopicon — Protótipo do Golden Case", element: shell };
}

function stat(n, label) {
  return el("li", { class: "stat" }, el("span", { class: "stat-n" }, String(n)), el("span", { class: "stat-label" }, label));
}

function modeCard(title, path, href, note) {
  return el("a", { class: "mode-card", href },
    el("h3", {}, title),
    el("p", { class: "mode-path" }, path),
    el("p", { class: "mode-note" }, note),
  );
}
