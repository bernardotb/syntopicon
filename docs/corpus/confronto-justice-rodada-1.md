# CONFRONTO rodada 1 — extração ChatGPT × protótipo × benchmark

**Data:** 03/09/2026 · **Autor:** Arena Agent · **Insumo:** docs/corpus/extracao-independente-justice-chatgpt.md (CONFRONTO, não canônico) · `data/justice.ts` (protótipo) · capturas do benchmark (02/09/2026)

## 1. Estrutura — CONFERE

| Cheque | Extração PDF (ChatGPT) | Nosso canon (spec/protótipo) | Resultado |
|---|---|---|---|
| Aritmética do outline | 41 = 11 + 28 + 2 | 41 = 11 + 28 + 2 | ✅ |
| 8c(1) título | "Economic exploitation: chattel slavery and wage slavery" | idem | ✅ |
| 8c → p. 868 / References desde p. 859 | confirmado | hipótese de trabalho | ✅ promovido a conferido (pending arquivo) |
| Subtree do 8 | 8a, 8b, 8c, 8c(1), 8c(2), **8d** | protótipo tinha até 8c(2) — **8d ausente** | ⚠️ incluir 8d na ingestão |
| Ordem dos 11 nível-1 | ordem impressa agora conhecida | protótipo usava ordem de EXIBIÇÃO do benchmark | ⚠️ reordenar na ingestão |

**Mapeamento ordem impressa × ordem de exibição do benchmark:** 1=Diverse(tema-1), 2=Precepts(tema-4), 3=Duties(tema-5), 4=Expediency(tema-6), 5=Equality(tema-7), 6=Liberty(tema-8), 7=Domestic(tema-9), 8=Economic("8"), 9=Political(tema-11), 10=Law(tema-2), 11=Divine(tema-3).

## 2. ACHADO PRINCIPAL — CORRIGIDO (revisão 2, 03/09)

> **CORREÇÃO (fato novo, regra "aprovado reabre com fato novo"):** a interpretação causal inicial ("o benchmark alterou/substituiu conteúdo da fonte") está RETIRADA — era forte demais. O Justice.pdf do projeto é a edição **© 1952** (confirmado na página editorial do volume), e o Inventory of Terms do projeto declara **Second Edition, Encyclopædia Britannica, 1990**. Duas edições do Syntopicon convivem nas nossas fontes.

**Formulação vigente:** o benchmark diverge materialmente da edição de 1952 em Justice 8c(1). **Não atribuir ainda** a divergência a erro ou alteração editorial do benchmark. O projeto possui evidência de uma Second Edition (1990); **edition-delta é a hipótese prioritária** (Tocqueville, Veblen, Tawney, Conrad etc. são exatamente o tipo de ampliação que uma revisão de corpus introduziria — inferência, não confirmação). **Estado: UNRESOLVED** até confrontarmos Justice 8c(1) na edição de 1990.

Fatos preservados (não mudam):
- Autores das 18 referências de 1952: Aristotle, Plutarch, Aquinas, Milton, Swift, Rousseau, Smith, Gibbon ×2, Kant, Constitution of the U.S., Mill, Boswell, Hegel, Marx, Marx-Engels, Tolstoy, Dostoevsky.
- Benchmark `/subtopics/1067` (17 autores): Aristotle, Plutarch, Aquinas, Swift, Rousseau, Smith, Kant, Madison, Mill, Boswell, Hegel, Tocqueville, Marx, Tolstoy, Veblen, Tawney, Conrad.
- Na 1952 e ausentes no benchmark: Milton, Gibbon ×2, Constituição EUA, Marx-Engels, Dostoevsky. No benchmark e ausentes na 1952: Madison, Tocqueville, Veblen, Tawney, Conrad.

**Consequência arquitetônica (registrada em ADR-002, PROPOSED):** Edition é entidade real do modelo — nunca sobrescrever uma edição com outra; 1952 = baseline histórico preservado; 1990 = candidata a edição principal do app (decisão de produto do Dono, pendente P0). A ingestão do golden case segue agora com o arquivo 1952, edition-tagged — a decisão de produto permanece reversível para sempre.

**Corolário de método:** a transcrição de 8c(1) que constava no "Design Conceitual" (sessão ChatGPT anterior) coincide com esta extração — forte indício de que veio do PDF real; de qualquer forma, a regra se mantém: a cópia canônica sairá do arquivo com fingerprint.

## 3. Fila de conferência na fonte (quando o arquivo chegar à `corpus`)

0. **P0 — Justice 8c(1) na Second Edition (1990):** localizar e extrair ANTES de fechar a ingestão do golden case (solicitado ao ChatGPT, que mantém os PDFs das 102 ideias/volumes — verificar se o acervo dele inclui a ed. 1990).
1. **[SCAN?] p. 858** — verificar numeração impressa de "10. Justice and law" e "11. Divine justice" (extrator viu "0." e "1."; filhos 10a–10d/11a–11b normais). Não promover esses códigos antes.
2. **Números de volume GBWW impressos nas linhas** (9, 14, 20, 32, 36, 38, 39, 40, 41, 42, 43, 44, 46, 50, 51, 52) — confirmar e usar como âncora de `gbwwVolume` por obra.
3. **8d** — ✅ título obtido via tradução: "Justiça e o uso do dinheiro: usura e taxas de juros" (EN a confirmar no arquivo; provável "Justice and the use of money: usury and interest").
4. Títulos PT de TODOS os 41 nós — ✅ DISPONÍVEIS na tradução integral (docs/corpus/justice-1952-traducao-pt-chatgpt.md, seção ESQUEMA DE TÓPICOS, com páginas impressas por tópico: 1→859, 1c→860, 3→861, 4/5→862, 6→863, 6c→864, 7→865, 8→866, 8b→867, 8c→868, 9→869, 9c→870, 9e→871, 9f→872, 9g→873, 10b→874, 10d→875, 11→876, 11b→877). Confirmação EN contra o arquivo na ingestão.
5. Conferir sobrescritos aristotélicos (ᵃ/ᵇ) na transcrição dos locators.
6. **Revisão da tradução na ingestão:** "chattel slavery" foi traduzido como "escravidão por dívida" — INCORRETO (*chattel* = propriedade/bem móvel); usar "escravidão de propriedade". Registrado também no header do arquivo de tradução.

## 4. Estado e próximos passos

- Dataset canônico: **intocado** (regra — promoção só com o arquivo na `corpus` + ingestão do Arena).
- Protótipo: segue como demonstração; atualizações estruturais (8d, ordem impressa, 18 refs reais) entram na ingestão.
- Pendências ativas: (a) upload do Justice.pdf pelo Dono (md5+sha256 no ledger); (b) Pacote 001 no Codex (independente, pronto).
