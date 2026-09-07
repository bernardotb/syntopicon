import type { Source } from "@/lib/syntopicon";

export const sources = {
  "syntopicon-canonical-ideas-list": {
    id: "source:syntopicon-canonical-ideas-list",
    title: "102 Grandes Ideias do Syntopicon",
    kind: "original-corpus",
    status: "verified-local",
    note: "Lista editorial local das 102 ideias, em português.",
  },
  "justice-ecosystem-reading": {
    id: "source:justice-ecosystem-reading",
    title: "Leitura curada do ecossistema de Justiça",
    kind: "interpretive-content",
    status: "unverified",
    note: "Laços ideia-ideia curados manualmente entre ideias já canônicas, para a estrutura visual do ecossistema de Justiça. Não são referências extraídas do corpus; revalidar quando a extração canônica existir.",
  },
} as const satisfies Record<string, Source>;
