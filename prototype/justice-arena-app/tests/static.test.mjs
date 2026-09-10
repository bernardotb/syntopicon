// static.test.mjs — gates estáticos: código-fonte não contém padrões proibidos
// (links placeholder, credenciais, recursos externos, contagens hardcoded).
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { ROOT } from "./helpers.mjs";

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name === "node_modules" || name === ".git") continue;
      walk(full, acc);
    } else {
      acc.push(full);
    }
  }
  return acc;
}

const srcFiles = [
  ...walk(join(ROOT, "src")),
  join(ROOT, "index.html"),
];
const srcText = srcFiles.map((f) => readFileSync(f, "utf8")).join("\n");

test("GATE: nenhum href=\"#\" (placeholder) no código do app", () => {
  assert.equal(/href\s*=\s*["']#["']/.test(srcText), false);
});

test("GATE: nenhuma credencial externa, chave de API ou URL externa no código", () => {
  assert.equal(/sk-[A-Za-z0-9]{10,}/.test(srcText), false, "sem chaves estilo OpenAI");
  assert.equal(/AIza[A-Za-z0-9_-]{10,}/.test(srcText), false, "sem chaves estilo Google");
  assert.equal(/api[_-]?key/i.test(srcText), false, "sem menção a api key");
  assert.equal(/https?:\/\//i.test(srcText.replace(/http:\/\/localhost:8080/g, "").replace(/https:\/\/localhost/g, "")), false, "nenhuma URL externa");
  const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
  assert.deepEqual(Object.keys(pkg.dependencies ?? {}), [], "zero dependências de runtime");
});

test("GATE: contagens críticas não estão hardcoded nas views", () => {
  const views = srcText;
  for (const forbidden of [">41<", '"41"', ">826<", '"826"']) {
    assert.equal(views.includes(forbidden), false, `contagem hardcoded encontrada: ${forbidden}`);
  }
});

test("GATE: botões são sempre criados pelo helper com handler (invariante do el())", () => {
  assert.match(srcText, /tag\.toLowerCase\(\) === "button"/, "invariante presente no ui.js");
  assert.equal(/createElement\(["']button["']\)/.test(srcText.replace(/createElement\(tag\)/, "")), false, "nenhum button criado fora do helper");
});

test("datasets: todos os JSON carregam e declaram manifesto", () => {
  const dataDir = join(ROOT, "data");
  const files = readdirSync(dataDir).filter((f) => f.endsWith(".json"));
  assert.ok(files.length >= 7);
  for (const f of files) {
    const data = JSON.parse(readFileSync(join(dataDir, f), "utf8"));
    if (f !== "terms.json") assert.ok(data.manifest, `manifesto ausente em ${f}`);
  }
});
