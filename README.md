# A Grande Conversa — Syntopicon

Uma aplicação pessoal para explorar o pensamento ocidental através da arquitetura do *Syntopicon*. A primeira fundação torna as 102 Grandes Ideias navegáveis sem inventar tópicos, autores, obras ou passagens.

## Estrutura

`data/` contém o dataset canônico e o registro de fontes. `lib/syntopicon/` define entidades, IDs e proveniência; `lib/knowledge-graph/` concentra relações; `lib/retrieval/` permite evolução da busca; `app/` contém as rotas App Router; `scripts/` é reservado a ingestão reprodutível do corpus.

O percurso alvo é: ideias → tópicos → referências → obras → autores. Nesta versão, somente a camada de ideias está estruturada e validada.

## Especificação

A especificação V1 do produto (benchmark Mortimer, escopo fechado, golden path de Justice e handoff de implementação) está em [`docs/a-grande-conversa-especificacao.md`](docs/a-grande-conversa-especificacao.md). Status: **LOCKED** — a V1 ingere somente o golden case Justice; nenhuma outra ideia deve ser ingerida antes de Justice estar estável.

## Protótipo navegável

Experiência completa do golden path em rotas novas (`/ideias`, `/ideias/42-justice`, `/ideias/42-justice/8c-1`, `/autores/*`, `/obras/*`, `/passagem/*`, `/inventario`, `/sobre`), isolada e reversível: estende o modelo canônico sem criar schema paralelo e sem remover rotas ou dados antigos. Análise do benchmark e arquitetura em [`docs/prototipo/`](docs/prototipo/). Nenhum conteúdo é inventado: o que não foi ingerido aparece como pendência.

## Proveniência

Cada registro declara uma fonte e uma camada: `original-corpus`, `derived-structure` ou `interpretive-content`. A lista atual deriva estruturalmente de uma fonte editorial local verificada. Relações inexistentes no dataset são omitidas; não são inferidas pela interface.

## Executar

```bash
npm install
npm run dev
npm run test
npm run typecheck
npm run build
```
