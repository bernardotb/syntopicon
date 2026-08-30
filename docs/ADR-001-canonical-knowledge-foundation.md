# ADR-001: Fundação canônica do conhecimento

**Status:** Accepted
**Date:** 29/08/2026

## Contexto

O checkout oficial foi inicializado sem código. Há uma lista local verificável das 102 Grandes Ideias, mas não há neste repositório um dataset estruturado de tópicos, referências, obras, autores ou passagens.

## Decisão

Usar um dataset local, pequeno e tipado de ideias canônicas, com IDs estáveis `idea:<slug>` e proveniência por registro. O knowledge graph reutiliza essas entidades e rejeita relações cujas pontas não estejam resolvidas. Não será introduzido banco externo nem serão inferidas relações.

## Consequências

As 102 ideias podem ser geradas estaticamente agora. Tópicos, referências e demais nós só entram quando extraídos e validados contra fontes identificadas.
