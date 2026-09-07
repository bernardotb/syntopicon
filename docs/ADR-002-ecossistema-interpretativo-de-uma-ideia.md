# ADR-002: Ecossistema interpretativo de uma ideia

**Status:** Accepted
**Date:** 07/09/2026

## Contexto

A fundação canônica (ADR-001) contém apenas as 102 Grandes Ideias; tópicos, referências, obras, autores e passagens ainda não foram extraídos. Pede-se uma estrutura visual de uma parte do ecossistema da ideia Justiça, e a interface não pode inferir relações nem inventar entidades fora do dataset.

## Decisão

Permitir um segundo tipo de registro: relações **ideia-ideia curadas manualmente**, declaradas com camada `interpretive-content` e fonte própria registrada como `unverified`. O ecossistema de Justiça (`data/justice-ecosystem.ts`) é o primeiro caso: laços explícitos (contribui / cruza-se / opõe-se) entre `idea:justica` e um subconjunto de ideias canônicas, validados pelo construtor do grafo e por testes. A visualização deriva integralmente do dataset — nada é calculado ou inferido em tela — e a página declara proveniência, status e limites do recorte.

## Consequências

Novos ecossistemas entram como dados (um registro no mapa `ecosystemByIdeaSlug`), não como código de interface. A camada interpretativa nunca substitui a canônica: quando tópicos e referências do corpus forem extraídos, cada laço deve ser revalidado laço a laço ou removido. Páginas de ideias sem ecossistema permanecem inalteradas.
