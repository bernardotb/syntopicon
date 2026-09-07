import type { Provenance } from "@/lib/syntopicon";

const layerLabels = {
  "original-corpus": "corpus original",
  "derived-structure": "estrutura derivada",
  "interpretive-content": "leitura interpretativa",
} as const;

export function EvidenceBadge({ provenance }: { provenance: Provenance }) {
  return (
    <span className="evidence-badge" title={`Camada: ${provenance.layer}`}>
      Fonte: {layerLabels[provenance.layer]}
    </span>
  );
}
