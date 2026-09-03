# PROTOTYPE_ARCHITECTURE — Protótipo "A Grande Conversa"

Isolado e reversível sobre o repositório existente. Estende o modelo canônico (§19 do prompt) sem criar schema paralelo: os tipos de `lib/syntopicon` foram estendidos, não substituídos; nenhuma rota ou dado antigo foi removido.

## Mapa de páginas

| Rota | Página | Dados |
|---|---|---|
| `/` | Home editorial + demo real do golden path | 102 ideias + Justice |
| `/ideias` | Índice das 102 (filtro local + A–Z) | `data/ideas.ts` estendido |
| `/ideias/{n}-{slugEn}` | Grande Ideia — Justice completa; demais: estado honesto "estrutura ainda não incorporada" | Justice outline |
| `/ideias/42-justice/{topic}` | PÁGINA CENTRAL: Topic com referências, autores, subtopics | `data/justice.ts` |
| `/autores/{slug}` | Página de autor (navegação inversa derivada) | índice reverso |
| `/obras/{slug}` | Página de obra (navegação bibliográfica) | índice reverso |
| `/passagem/{id}` | Leitor de passagem + contexto + anterior/próxima | `passages` |
| `/inventario` | Busca rápida agrupada por tipo (proto-inventário) | índice de busca derivado |
| `/sobre` | O que é, método, estados honestos | — |

Rotas antigas (`/ideas`…) permanecem intactas e inalcançáveis pela UI nova.

## Fluxos provados (casos de aceitação)

- **CASO A (sintópica):** Home → Grandes Ideias → Justiça → Topic 8 → Hobbes → Leviatã → Passagem; e Justiça → 8 → 8c → 8c(1) → Aristóteles/Smith → Política/A Riqueza das Nações → Passagem.
- **CASO B (bibliográfica):** Autor Hobbes → Leviatã → Topics em que aparece → Justiça.
- **CASO C (inventário):** busca "escravidão" → Topic 8c(1) → referência → obra.

## Entidades utilizadas

- `SOURCE`: Author, Work, Passage (Edition como campo do Work; SourceArtifact = GBWW).
- `SYNTOPICON_CANONICAL`: GreatIdea, Topic (hierárquico, código impresso), Reference, (Introduction/CrossReference/AdditionalReading como estados honestos não-ingeridos).
- `DERIVED`: topicAuthors (presença autor↔tópico do benchmark), índice de busca, navegação inversa, contagens, slugs, tradução de apresentação.
- `INTERPRETIVE`: passagens de demonstração (texto real de domínio público; o VÍNCULO passagem↔tópico é seleção editorial, sempre marcado "DEMONSTRAÇÃO").
- `PERSONAL`: fora do protótipo.

## Fontes de dados (provenance por registro)

1. `syntopicon-canonical-ideas-list` — 102 nomes PT (preexistente, verificado).
2. `syntopicon-canonical-order` — numeração 1–102 e nomes EN (ordem alfabética EN do Syntopicon; âncoras cruzadas com o benchmark: 1 Angel, 17 Desire, 42 Justice, 41 Judgment, 102 World).
3. `justice-outline-printed` — sessão anterior com Justice.pdf: 41 nós (11+28+2), código 8c(1) e título, References desde p. 859, 8c → p. 868 (reconfirmar na ingestão).
4. `mortimer-benchmark` — títulos EN do outline e presença autor↔tópico, capturados 2026-09-02 (não verificado contra fonte primária).
5. `prototype-demo-passages` — passagens de demonstração (texto real, domínio público; seleção editorial marcada).

## Decisões estruturais

- URL canônica `/ideias/42-justice/8c-1` (número + slugEn; código do tópico com hífen). Grupos nível-1 sem código impresso confirmado recebem slugs provisórios `tema-N` — jamais um código canônico inventado.
- Contagens: só números reais do dataset (o canon 41 = 11+28+2 é declarado como estrutura; o subconjunto incorporado é exibido à parte: 16 nós).
- Reference ≠ Passage preservado: 4 References "recuperadas-pendentes-de-fonte" + presença de autores sem locator exibida como camada DERIVED, nunca como Reference completa.
- Eras, categorias e claims do benchmark: não ingeridos.
