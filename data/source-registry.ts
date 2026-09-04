import type { Source } from "@/lib/syntopicon";

export const sources = {
  "syntopicon-canonical-ideas-list": {
    id: "source:syntopicon-canonical-ideas-list",
    title: "102 Grandes Ideias do Syntopicon",
    kind: "original-corpus",
    status: "verified-local",
    note: "Lista editorial local das 102 ideias, em português.",
  },
  "syntopicon-canonical-order": {
    id: "source:syntopicon-canonical-order",
    title: "Numeração canônica das 102 Grandes Ideias (ordem alfabética EN)",
    kind: "editorial-source",
    status: "verified-secondary",
    note: "Ordem 1–102 e nomes EN do Syntopicon (GBWW Vols. 2–3). Âncoras confirmadas contra o benchmark em 2026-09-02: 1=Angel, 17=Desire, 41=Judgment, 42=Justice, 102=World. Reconfirmar contra o Vol. 2 na ingestão.",
  },
  "justice-outline-printed": {
    id: "source:justice-outline-printed",
    title: "Justice.pdf — outline impresso (sessão de auditoria anterior)",
    kind: "original-corpus",
    status: "verified-secondary",
    note: "Estrutura 41 nós (11+28+2); código impresso 8c(1) com título 'Economic exploitation: chattel slavery and wage slavery'; References desde a p. impressa 859; 8c → região da p. 868. Justice.pdf ausente neste checkout: reconfirmar na ingestão.",
  },
  "mortimer-benchmark": {
    id: "source:mortimer-benchmark",
    title: "Mortimer — benchmark de experiência (captura 2026-09-02)",
    kind: "benchmark-observation",
    status: "unverified",
    note: "Títulos EN do outline de Justice e presença autor↔tópico capturados de www.mortimer.app / mortimer.vercel.app. Nunca usar como fonte canônica sem confirmação no Justice.pdf. Renderização instável entre www e mirror (provável SSR).",
  },
  "prototype-demo-passages": {
    id: "source:prototype-demo-passages",
    title: "Passagens de demonstração do protótipo (texto real, domínio público)",
    kind: "interpretive-content",
    status: "unverified",
    note: "Texto das obras é real (traduções de domínio público: Jebb, Jowett, edição Molesworth de Leviatã, 1ª ed. de Wealth of Nations). A SELEÇÃO da passagem e o vínculo passagem↔tópico são decisão editorial do protótipo; substituir pela passagem canônica na ingestão.",
  },
  "syntopicon-1952": {
    id: "source:syntopicon-1952",
    title: "Syntopicon, GBWW 1st ed. (1952) — Vol. cap. 42 JUSTICE, pp. impressas 850–879",
    kind: "original-corpus",
    status: "verified-local",
    note: "Texto integral colado pelo Dono (2026-09-03) a partir de sua cópia da edição 1952; vale como extração independente (auditada: 41 nós, 826 linhas de referência, 10 remissões). Selo canônico definitivo aguarda o upload do PDF para /corpus (fingerprints já registrados no ledger). Confirmação do volume impresso (Vol I vs Vol II) pendente.",
  },
  "justice-pt-chatgpt-translation": {
    id: "source:justice-pt-chatgpt-translation",
    title: "Tradução PT-BR do cap. Justice 1952 (ChatGPT, auditada)",
    kind: "interpretive-content",
    status: "unverified",
    note: "Tradução em português do texto 1952, produzida pelo ChatGPT e auditada 1:1 contra o outline (41 nós). Camada displayPtBr: NUNCA substitui a fonte inglesa; locatorRaw e títulos EN permanecem intactos. docs/corpus/justice-1952-traducao-pt-chatgpt.md.",
  },
} as const satisfies Record<string, Source>;
