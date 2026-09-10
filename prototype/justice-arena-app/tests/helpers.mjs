// helpers.mjs — utilidades de teste: datasets reais + boot do app em JSDOM.
//
// Abordagem: os módulos do app são ES modules puros que acessam DOM via
// globais (document, window, location, sessionStorage, fetch). Injetamos uma
// JSDOM nessas globais ANTES de importar o app — assim o Node executa o app
// real, sem bundler e sem servidor, e os testes exercitam DOM, teclado e rotas.
import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
export const ROOT = join(here, "..");

export function readJSON(path) {
  return JSON.parse(readFileSync(join(ROOT, path), "utf8"));
}

export function loadDatasets() {
  return {
    justice1952: readJSON("data/justice-1952.json"),
    introductionEn: readJSON("data/introduction-en.json"),
    additionalReadings: readJSON("data/additional-readings.json"),
    demoLayer: readJSON("data/demo-layer.json"),
    ideas102: readJSON("data/ideas-102.json"),
    sources: readJSON("data/sources.json"),
    terms: readJSON("data/terms.json"),
  };
}

let booted = null;

// Boota o app UMA vez por processo de teste; navegação posterior via hash.
export async function bootApp({ url = "http://localhost:8080/#/" } = {}) {
  if (booted) return booted;
  const { JSDOM } = await import("jsdom");
  const html = readFileSync(join(ROOT, "index.html"), "utf8");
  const dom = new JSDOM(html, { url, runScripts: "outside-only", pretendToBeVisual: true });
  const { window } = dom;

  const errors = [];
  const origError = window.console.error.bind(window.console);
  window.console.error = (...args) => { errors.push(args.map(String).join(" ")); origError(...args); };
  window.scrollTo = () => {};

  window.fetch = async (urlStr) => {
    const rel = new URL(urlStr, window.location.href).pathname.replace(/^\//, "");
    try {
      const body = readFileSync(join(ROOT, rel));
      return { ok: true, status: 200, json: async () => JSON.parse(body.toString("utf8")) };
    } catch {
      return { ok: false, status: 404, json: async () => { throw new Error(`404 ${rel}`); } };
    }
  };

  // Injeta as globais que os módulos do app esperam (antes do import).
  globalThis.window = window;
  globalThis.document = window.document;
  globalThis.location = window.location;
  globalThis.sessionStorage = window.sessionStorage;
  globalThis.CustomEvent = window.CustomEvent;
  globalThis.Event = window.Event;
  globalThis.KeyboardEvent = window.KeyboardEvent;
  globalThis.fetch = window.fetch;

  const main = await import(pathToFileURL(join(ROOT, "src", "main.js")).href);
  await new Promise((resolve) => setTimeout(resolve, 150));
  booted = { dom, window, document: window.document, errors, main };
  return booted;
}

export async function navigate(hash) {
  const app = await bootApp();
  app.window.location.hash = hash;
  await new Promise((resolve) => setTimeout(resolve, 60));
  return app;
}

export function pressKey(target, key, opts = {}) {
  if (!booted) throw new Error("chame bootApp() antes de pressKey()");
  const ev = new booted.window.KeyboardEvent("keydown", { key, bubbles: true, cancelable: true, ...opts });
  target.dispatchEvent(ev);
}

export function $(sel) {
  return booted?.document.querySelector(sel);
}

export function $$(sel) {
  return [...booted.document.querySelectorAll(sel)];
}
