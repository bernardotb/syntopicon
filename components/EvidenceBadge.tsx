import type { Provenance } from "@/lib/syntopicon";

export function EvidenceBadge({ provenance }: { provenance: Provenance }) {
  return (
    <span className="evidence-badge" title={`Camada: ${provenance.layer}`}>
      Fonte: {provenance.layer === "derived-structure" ? "estrutura derivada" : provenance.layer}
    </span>
  );
}
