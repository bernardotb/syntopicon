# ADR-002: Edições do Syntopicon como entidade real (edition-aware)

**Status:** PROPOSED (ratificação do Dono dispensada para o modelo — decisão técnica do líder; a escolha de EDIÇÃO PRINCIPAL do app é produto e está em STATUS → Decisões pendentes)
**Date:** 03/09/2026 · **Autor:** Arena Agent · **Origem:** achado do confronto rodada 1 + correção do ChatGPT

## Contexto

O projeto possui fontes de **duas edições** do Syntopicon: o Justice.pdf é da edição de **1952** (© confirmado na página editorial do volume) e o Inventory of Terms declarado no projeto é da **Second Edition, 1990**. O confronto de Justice 8c(1) mostrou que o benchmark diverge materialmente da edição de 1952, e a hipótese prioritária é edition-delta (o benchmark possivelmente reflete 1990). Estado: UNRESOLVED até extração de 8c(1) na 1990 (fila P0).

## Decisão

1. **Edition é entidade real** do modelo canônico (já prevista no invariante `Author ≠ Work ≠ Edition ≠ Passage`), com campos mínimos: `editionId` (ex. `syntopicon-1952`, `syntopicon-1990`), `year`, `publisher`, `scopeNote`.
2. **Toda Reference/Topic/Introduction carrega a edição de origem** na provenance. Nenhuma edição sobrescreve outra: `1952` e `1990` coexistem como dados.
3. **1952 = baseline histórico preservado** (é o arquivo físico auditado do golden case); **1990 = candidata a edição principal do app** (produto — Dono decide após P0).
4. "Edição principal" é **rótulo de apresentação** (qual edição a UI exibe por padrão), nunca apagamento da outra.
5. O benchmark (checklist) deve ser confrontado contra a edição que ele representa — determinada pelo P0.

## Consequências

- Ingestão do golden case prossegue com o arquivo 1952, edition-tagged — reversível em relação à decisão de produto.
- A fila de conferência ganhou o item P0 (extração de 8c(1) na 1990, via acervo do ChatGPT).
- Futuras ingestões das 101 ideias seguem o mesmo padrão edition-aware desde o início (evita migração).
- Quando P0 resolver, um delta `1952×1990` para Justice pode virar funcionalidade de auditoria (não é escopo V1 — registro apenas).
