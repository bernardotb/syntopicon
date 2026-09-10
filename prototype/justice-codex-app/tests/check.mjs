import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const files = await Promise.all(["index.html", "styles.css", "src/app.mjs", "src/domain.mjs"].map((file) => readFile(new URL(file, root), "utf8")));
const [html, css, app, domain] = files;
assert.ok(!/href=["']#["']/.test(html + app), "href vazio encontrado");
assert.ok(!/href=["']["']/.test(html + app), "href sem destino encontrado");
assert.ok(!html.includes("onclick="), "handler inline encontrado");
assert.ok(html.includes('<html lang="pt-BR">'), "idioma inicial ausente");
assert.ok(app.includes("PT / EN") && app.includes("EN / PT"), "troca de idioma ausente");
assert.ok(app.includes("showModal") && app.includes("addEventListener(\"close\""), "diálogo ou retorno de foco ausente");
assert.ok(app.includes("data-compare") && app.includes("tourSteps"), "comparação ou percurso ausente");
assert.ok(html.includes('role="tablist"') && html.includes('role="tab"') && app.includes("ArrowRight"), "tabs por teclado ausentes");
assert.ok(domain.includes("PASSAGE_ABSENT"), "estado de passagem ausente");
assert.ok(css.includes(":focus-visible") && css.includes("@media(max-width:760px)"), "foco ou responsividade ausente");
for (const id of ["language", "tour-start", "compare-open", "compare-clear", "modal-close", "tour-close", "tour-prev", "tour-next"]) {
  assert.ok(html.includes(`id="${id}"`), `controle estático ausente: ${id}`);
  assert.ok(app.includes(`$("#${id}").addEventListener`), `handler ausente: ${id}`);
}
for (const hook of ["data-mode", "data-dialog", "data-compare", "data-tour-action"]) {
  assert.ok(app.includes(hook), `handler delegado ausente: ${hook}`);
}
console.log("Static checks: PASS");
