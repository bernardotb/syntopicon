# A Grande Conversa — Syntopicon

Uma aplicação pessoal para explorar o pensamento ocidental através da arquitetura do *Syntopicon*. A primeira fundação torna as 102 Grandes Ideias navegáveis sem inventar tópicos, autores, obras ou passagens.

## Estrutura

`data/` contém o dataset canônico e o registro de fontes. `lib/syntopicon/` define entidades, IDs e proveniência; `lib/knowledge-graph/` concentra relações; `lib/retrieval/` permite evolução da busca; `app/` contém as rotas App Router; `scripts/` é reservado a ingestão reprodutível do corpus.

O percurso alvo é: ideias → tópicos → referências → obras → autores. Nesta versão, somente a camada de ideias está estruturada e validada.

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
