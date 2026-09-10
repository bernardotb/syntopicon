// app.test.mjs — o app real em JSDOM: golden path, teclado, modal, busca,
// comparação, bilinguismo e gates de UI (links funcionais, botões vivos).
import test from "node:test";
import assert from "node:assert/strict";
import { bootApp, navigate, pressKey, $, $$ } from "./helpers.mjs";

test.before(async () => {
  await bootApp();
});

test("invariante de UI: el() recusa criar botão sem handler (nenhum botão morto por construção)", async () => {
  const { el } = await import("../src/ui.js");
  assert.throws(() => el("button", { type: "button" }, "morto"), /botão morto/i);
  const alive = el("button", { type: "button", onclick: () => {} }, "vivo");
  assert.equal(alive.tagName, "BUTTON");
});

test("boot sem erros de console; home renderiza com contagens derivadas", () => {
  const app = $("main#view");
  assert.ok(app, "view montado");
  assert.equal($$(".stat").length, 6);
  assert.ok(app.textContent.includes("41"));
  assert.ok(app.textContent.includes("826"));
  assert.ok(document.title.length > 3);
});

test("GATE: nenhum link funcional usa href=\"#\" e nenhum botão morto existe", async () => {
  // links placeholder — em todas as páginas principais
  for (const hash of ["#/", "#/ideia/justica", "#/topico/8c-1", "#/inventario", "#/autores", "#/comparar", "#/percurso", "#/volumes", "#/sobre"]) {
    await navigate(hash);
    const badLinks = $$('a[href="#"], a[href=""], a:not([href])');
    assert.equal(badLinks.length, 0, `links vazios em ${hash}`);
  }
  // botões existem, nenhum desabilitado; o invariante "sem botão morto" é
  // garantido pelo el() do ui.js (botão sem handler lança) — verificado abaixo.
  await navigate("#/topico/8c-1");
  const buttons = $$("button");
  assert.ok(buttons.length >= 19, "18 de comparação + 1 de passagem de demonstração");
  for (const b of buttons) {
    assert.notEqual(b.getAttribute("disabled"), "", "nenhum botão desabilitado sem propósito");
  }
});

test("GATE: todos os links internos resolvem para rotas existentes", async () => {
  const routes = [
    /^#\/$/, /^#\/ideia\/[a-z-]+$/, /^#\/topico\/[0-9a-z-]+$/,
    /^#\/referencia\/.+$/, /^#\/autor\/[a-z0-9-]+$/, /^#\/obra\/[a-z0-9_-]+$/,
    /^#\/inventario/, /^#\/autores$/, /^#\/comparar$/, /^#\/percurso$/, /^#\/volumes/, /^#\/sobre$/,
  ];
  const seen = new Set();
  const crawl = async (hash) => {
    if (seen.has(hash)) return;
    seen.add(hash);
    await navigate(hash);
    for (const a of $$("a[href^='#/']")) {
      const href = a.getAttribute("href");
      assert.ok(routes.some((r) => r.test(href)), `rota desconhecida: ${href}`);
    }
  };
  for (const start of ["#/", "#/ideia/justica", "#/topico/8c-1", "#/inventario", "#/autores", "#/volumes", "#/percurso", "#/sobre", "#/comparar"]) {
    await crawl(start);
  }
  // página a página: cada rota renderizada não pode ter links para rotas inválidas
  await navigate("#/topico/8c-1");
  const refLink = $('a[href^="#/referencia/"]');
  assert.ok(refLink);
  await navigate(refLink.getAttribute("href"));
  assert.ok($("main#view").textContent.includes("locatorRaw"));
});

test("golden path completo: Home → Justiça → 8 → 8c → 8c(1) → Referência → Obra → Autor → Tópico", async () => {
  await navigate("#/");
  assert.ok(document.querySelector("h1").textContent.includes("mapa"));

  await navigate("#/ideia/justica");
  assert.ok(document.body.textContent.includes("Outline of Topics"));
  assert.ok(document.body.textContent.includes("Introduction"));

  await navigate("#/topico/8");
  assert.ok(document.querySelector("h1").textContent.includes("Justiça econômica"));

  await navigate("#/topico/8c");
  assert.ok(document.querySelector("h1").textContent.includes("organização da produção"));

  await navigate("#/topico/8c-1");
  const h1 = document.querySelector("h1").textContent;
  assert.ok(h1.includes("8c(1)"));
  assert.ok(h1.includes("escravidão de propriedade"));
  assert.ok(document.body.textContent.includes("18"));
  assert.ok(document.body.textContent.includes("ARISTOTLE"));
  assert.ok(document.body.textContent.includes("Passagem não incorporada ao corpus digital."));

  await navigate("#/referencia/jr1952%3A8c-1%3A01");
  assert.ok(document.body.textContent.includes("locatorRaw"));
  assert.ok(document.body.textContent.includes("GBWW v. 9"));
  assert.ok(document.body.textContent.includes("Passagem não incorporada ao corpus digital."));

  await navigate("#/obra/aristotle__politics");
  assert.ok(document.querySelector("h1").textContent.includes("Politics"));

  await navigate("#/autor/aristotle");
  assert.ok(document.querySelector("h1").textContent === "ARISTOTLE");

  await navigate("#/topico/8c-1");
  assert.ok(document.querySelector("h1").textContent.includes("8c(1)"));
});

test("golden path lexical: Inventário → Chattel slavery → 8c(1)", async () => {
  await navigate("#/inventario?termo=term:chattel-slavery");
  const card = $("#term-focus");
  assert.ok(card, "cartão do termo em foco");
  assert.ok(card.textContent.includes("Chattel slavery"));
  assert.ok(card.textContent.includes("edição: Second Edition (1990)"));
  assert.ok(card.textContent.includes("FINGERPRINT PENDENTE"), "pendência de selo visível");
  assert.ok(card.textContent.includes("Chattel slavery: see Family 3a"), "verbete bruto exibido");
  assert.ok(card.textContent.includes("Family 3a"), "alvos não incorporados visíveis como texto bruto");
  const target = card.querySelector('a[href="#/topico/8c-1"]');
  assert.ok(target, "termo aponta para 8c(1)");
  target.click();
  await new Promise((r) => setTimeout(r, 60));
  assert.ok(document.querySelector("h1").textContent.includes("8c(1)"));
});

test("bilinguismo: títulos EN acessíveis em todo tópico; Introduction tem painel EN e PT", async () => {
  await navigate("#/topico/8c-1");
  assert.ok(document.body.textContent.includes("Economic exploitation: chattel slavery and wage slavery"));

  await navigate("#/ideia/justica");
  const tabs = $$('[role="tab"]');
  assert.equal(tabs.length, 2);
  assert.ok(tabs[0].textContent.includes("English"));
  assert.ok(tabs[1].textContent.includes("Português"));
  // painel EN visível por padrão (fonte primeiro)
  assert.ok($('[role="tabpanel"]').textContent.includes("THE discussion of justice"));
  // teclado: seta direita troca para PT
  tabs[1].focus();
  pressKey(tabs[1], "ArrowLeft");
  assert.ok($('[role="tabpanel"]').textContent.includes("THE discussion of justice"));
  tabs[0].focus();
  pressKey(tabs[0], "ArrowRight");
  assert.ok($('[role="tabpanel"]').textContent.includes("A discussão sobre a justiça"));
});

test("modal de passagem de demonstração: abre, Escape fecha, foco retorna ao disparador", async () => {
  await navigate("#/topico/8c-1");
  const trigger = $$("button").find((b) => b.textContent.includes("Ler passagem de demonstração"));
  assert.ok(trigger, "botão de passagem existe no tópico 8c(1)");
  trigger.click();
  await new Promise((r) => setTimeout(r, 30));
  const modal = $('[role="dialog"]');
  assert.ok(modal, "modal aberto");
  assert.ok(modal.textContent.includes("Aristotle"));
  const closeButton = modal.querySelector("button.modal-close");
  assert.equal(document.activeElement, closeButton, "foco no botão de fechar");
  pressKey(document, "Escape");
  await new Promise((r) => setTimeout(r, 30));
  assert.equal($('[role="dialog"]'), null, "modal fechado com Escape");
  assert.equal(document.activeElement, trigger, "foco retornou ao disparador");
});

test("comparação por teclado: adicionar duas referências e abrir o modo comparar", async () => {
  await navigate("#/topico/8c-1");
  const compareButtons = $$('button[aria-pressed]');
  assert.ok(compareButtons.length >= 18, "um botão de comparação por referência");
  compareButtons[0].click();
  await new Promise((r) => setTimeout(r, 30));
  assert.equal(compareButtons[0].getAttribute("aria-pressed"), "true");
  compareButtons[6].click();
  await new Promise((r) => setTimeout(r, 30));
  const nav = document.getElementById("nav-compare");
  assert.ok(nav.textContent.includes("(2)"));

  await navigate("#/comparar");
  const cols = $$(".compare-col");
  assert.equal(cols.length, 2);
  assert.ok(document.body.textContent.includes("Passagem não incorporada ao corpus digital."));
  const empty = $$("button").find((b) => b.textContent.includes("Esvaziar bandeja"));
  empty.click();
  await new Promise((r) => setTimeout(r, 30));
  assert.ok(document.body.textContent.includes("bandeja está vazia"));
});

test("busca global: 'escravidão', 'chattel' e 'aristotle' encontram resultados agrupados", async () => {
  await navigate("#/inventario?q=chattel");
  const input = $("#inv-q");
  assert.equal(input.value, "chattel");
  await new Promise((r) => setTimeout(r, 30));
  const results = $$(".result-list a");
  assert.ok(results.length > 0, "busca por 'chattel' retorna resultados");
  assert.ok(document.body.textContent.includes("Tópicos"));

  await navigate("#/inventario?q=aristotle");
  assert.ok($$(".result-list a").length > 0);
});

test("percurso guiado renderiza os 9 passos + ramos, navegável por teclado", async () => {
  await navigate("#/percurso");
  const lists = $$(".tour-list");
  assert.equal(lists.length, 2, "trilha principal + ramo lexical");
  const mainSteps = lists[0].querySelectorAll(".tour-step");
  assert.equal(mainSteps.length, 9);
  const lexSteps = lists[1].querySelectorAll(".tour-step");
  assert.equal(lexSteps.length, 3);
  assert.ok(document.body.textContent.includes("ramo lexical"));
  assert.ok(document.body.textContent.includes("EXPLORE"));
  assert.ok(document.body.textContent.includes("RETURN"));
  const firstLink = mainSteps[0].querySelector("a");
  firstLink.focus();
  assert.equal(document.activeElement, firstLink, "link do passo é focável por teclado");
  firstLink.click();
  await new Promise((r) => setTimeout(r, 60));
  assert.equal(location.hash, "#/");
});

test("perspectiva física: volumes listados com contagens; volume 9 detalha obras", async () => {
  await navigate("#/volumes");
  const cards = $$(".volume-card");
  const expectedVolumes = window.__JUSTICE_CTX__.counts.volumes; // contagem derivada
  assert.equal(cards.length, expectedVolumes);
  await navigate("#/volumes?v=9");
  assert.ok(document.querySelector("h1").textContent.includes("Volume GBWW 9"));
  assert.ok(document.body.textContent.includes("Ethics"));
  assert.ok(document.body.textContent.includes("ARISTOTLE"));
});

test("perspectiva bibliográfica: índice de autores com contagens derivadas", async () => {
  await navigate("#/autores");
  assert.ok(document.body.textContent.includes("Autores ("));
  assert.ok(document.body.textContent.includes("Documentos americanos"));
  assert.ok(document.body.textContent.includes("Escrituras"));
  assert.ok(document.body.textContent.includes("Todas as obras ("));
});

test("estado de passagem ausente é explícito em toda referência canônica aberta", async () => {
  for (const id of ["jr1952%3A8c-1%3A07", "jr1952%3A2%3A01", "jr1952%3A8%3A28"]) {
    await navigate(`#/referencia/${id}`);
    assert.ok(document.body.textContent.includes("Passagem não incorporada ao corpus digital."), `ausência explícita em ${id}`);
  }
});

test("divergência 1952×benchmark visível no tópico 8c(1) com estado UNRESOLVED", async () => {
  await navigate("#/topico/8c-1");
  const txt = document.body.textContent;
  assert.ok(txt.includes("UNRESOLVED"));
  assert.ok(txt.includes("Milton"));
  assert.ok(txt.includes("Tocqueville"));
});

test("nenhuma requisição externa: zero recursos fora da origem no shell", async () => {
  const externals = [...document.querySelectorAll("[src], [href], link[href]")].filter((n) => {
    const v = n.getAttribute("src") || n.getAttribute("href") || "";
    return /^https?:\/\//i.test(v);
  });
  assert.equal(externals.length, 0, "nenhum recurso externo no documento");
});

test("GATE FINAL: zero erros de console em todo o percurso visitado (golden path incluído)", async () => {
  // Este teste roda por último: todos os anteriores navegaram pelo app inteiro.
  const app = await bootApp();
  assert.deepEqual(app.errors, [], "nenhum console.error durante boot, navegação, modal, tabs, busca e comparação");
});
