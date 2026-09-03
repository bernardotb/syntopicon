import { buildSearchIndex } from "@/lib/prototype/search";
import { InventorySearchClient } from "./InventorySearchClient";

export const dynamic = "force-static";

export const metadata = { title: "Inventário — A Grande Conversa" };

export default function InventoryPage() {
  const index = buildSearchIndex();

  return (
    <article className="page-shell inventory-page">
      <p className="eyebrow">Busca</p>
      <h1>Inventário</h1>
      <p className="lede">
        Busca rápida sobre tudo o que está incorporado: Grandes Ideias, tópicos de Justiça, autores e obras. Resultados
        agrupados por tipo — nunca misturados sem contexto.
      </p>
      <p className="inventory-note">
        Esboço da camada <strong>Inventory of Terms</strong>: o índice canônico de termos do Syntopicon (Termo →
        Topic → Grande Ideia) ainda não foi ingerido; as correspondências abaixo derivam dos títulos e nomes reais já
        incorporados (camada derivada, marcada em cada resultado).
      </p>
      <InventorySearchClient index={index} />
    </article>
  );
}
