import type { Source } from "@/lib/syntopicon";

export const sources = {
  "syntopicon-canonical-ideas-list": {
    id: "source:syntopicon-canonical-ideas-list",
    title: "102 Grandes Ideias do Syntopicon",
    kind: "original-corpus",
    status: "verified-local",
    note: "Lista editorial local das 102 ideias, em português.",
  },
} as const satisfies Record<string, Source>;
