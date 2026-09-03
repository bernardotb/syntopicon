# Memorando de Convivência — Agentes do Projeto "A Grande Conversa"

**Repositório:** bernardotb/syntopicon · **Versão:** v3 **FECHADO** (ratificado pelo ChatGPT em 03/09/2026) · **Data:** 03/09/2026
**Status:** RATIFICADO. Única emenda da ratificação incorporada (§9.c + guarda do Pacote 001). Segue ciência do Codex; Pacote 001 emitido (BASE_SHA `14a374c`). Próximo do coração do projeto: Justice.pdf → ingestão canônica (fonte primária, nunca memória de conversa).

## Changelog v3 (emendas aceitas)

1. **Papéis/ChatGPT:** pode commitar livremente em `chatgpt/*`; proibido apenas mergear `main`, tocar branch alheia ou integrar sem validação do líder.
2. **§2.1:** "quem responde pela decisão decide" — decisão de arquitetura é do líder; executor decide só detalhes locais dentro do escopo.
3. **§2.2:** disagree & commit vale para trade-offs técnicos/design; **NÃO** vale para erro comprovado de fonte/provenance/canon — isso é defeito a corrigir, não opinião.
4. **§2.3:** silêncio do Dono após 7 dias habilita apenas default técnico **reversível**; nunca decisão definitiva de produto/estética.
5. **§2.5:** Adler decide estrutura/conteúdo; **Dono decide produto E estética**; Arena decide implementação; ChatGPT propõe/audita design.
6. **§3:** pacotes relevantes declaram **BASE_SHA + escopo de escrita**; `corpus` com guarda (protocolo conceitual pode migrar de transporte se o Git pesar — hash sempre).
7. **§4.2 atualizado pela decisão do Dono:** benchmark = fonte secundária de descoberta + **checklist de cobertura/ingestão**; Adler vence qualquer divergência. Provenance registra o que REALMENTE sustentou cada dado (descoberto no benchmark → `mortimer-benchmark` secundário; confirmado no PDF → fonte primária; tradução → derivada). Manifesto de cobertura pode cobrir as 102; **promoção ao dataset canônico espera Justiça fechar**.
8. **§5:** imagem de conceito rejeitada pode permanecer se documenta decisão aprovada e estiver marcada como rejeitada (caso `assets/concept/`).
9. **§7 (risco novo):** colisão semântica por bases diferentes → regra BASE_SHA; um único agente escreve por área crítica por vez (schema, `data/justice`, registry de fontes, specs LOCKED); líder atualiza contra `main` corrente e roda suíte completa antes de qualquer merge.
10. **§8:** "trabalho **durável** que possa afetar o projeto e não esteja versionado não existe para a equipe" (experimento descartável pode morrer).
11. **Frente A (estética, com ChatGPT como direção editorial/crítica visual):** 5 superfícies de referência provam tudo (Home → Índice 102 → Justiça → Topic/References → Passage); sistema tipográfico rígido; ritmo/spacing como sistema; imagem só em hero/vinheta — nunca competindo com Topics/References/locators/passagens.
12. **Frente B (ingestão):** manifesto de cobertura versionado com o ciclo *benchmark localizado → raw preservado → fonte canônica conferida → tradução → estruturação → testes → publicado*. Justiça pula direto para a fonte primária (reextrair as 18 refs do Justice.pdf — **nunca reconstruir da memória de conversa**). Inventory só depois dos IDs de Topic sólidos. Vol. 1 = concepção editorial; não substitui Vols. 2–3.

---

## 1. Papéis

| Parte | Papel | Autoridade / limites |
|---|---|---|
| **Dono (bernardotb)** | Contratante. Decide **o quê, para quê e a estética final**; fornece fontes; ratifica regime | Veto final em produto/estética; nunca arbitra detalhe técnico |
| **Arena Agent — LÍDER DE ENGENHARIA** | Integra e entrega: arquitetura, implementação, dados, ingestão, specs, testes; valida tudo que sobe; mantém STATUS | Decide tecnicamente e responde por ela; atualiza contra `main` + suíte completa antes de merge |
| **ChatGPT — DIREÇÃO CONCEITUAL/VISUAL + CRÍTICA** | Estratégia, design, revisão adversarial em lotes; **direção editorial e crítica visual** (Frente A); acesso ao Drive | **Commita livremente em `chatgpt/*`**; não mergea `main`, não toca branch alheia, não integra sem validação do líder |
| **Codex — EXECUTOR SUBCONTRATADO** | Pacotes fechados com BASE_SHA + escopo + critério de pronto (ver §9) | Decide microimplementação dentro do pacote; nunca arquitetura — **não é o quarto arquiteto** |

## 2. Decisões

1. **Quem responde pela decisão decide.** Arquitetura = líder; detalhes locais = executor dentro do escopo.
2. **Disagree & commit** para trade-offs técnicos/design; erro comprovado de fonte/provenance/canon é **defeito** — correção imediata, não opinião.
3. **Perguntas ao Dono:** raras, leigas, ≤3 opções + recomendação. Silêncio de 7 dias = default técnico reversível, nunca decisão definitiva de produto/estética.
4. **Aprovado só reabre com fato novo** (fonte nova, regressão em teste, mudança de escopo do Dono).
5. **Canônico:** Adler → estrutura/conteúdo · Dono → produto/estética · Arena → implementação · ChatGPT → proposta/auditoria de design.

## 3. Branches e transporte

- `main` — versão boa. Merge: testes verdes + líder (Dono em release/decisão de produto).
- `arena/*`, `chatgpt/*`, `codex/*` — trabalho individual. Proibido: force-push, branch alheia, merge sem validação.
- **`corpus`** — prateleira de fontes (Justice.pdf, Vols. 1–3, Inventory). Nunca mergeia. Guarda: se o Git pesar, mesmo protocolo em outro transporte, sempre com hash de conferência.
- **BASE_SHA + escopo de escrita** declarados em todo pacote/trabalho relevante (§7).
- **`docs/STATUS.md`** — painel único do Dono.

## 4. Dados (invioláveis)

1. Nada inventado: sem fonte identificada, não entra; memória de modelo nunca é fonte.
2. Adler/fontes primárias vencem tudo; benchmark = descoberta + checklist de cobertura (§ changelog 7).
3. Provenance registra o sustento real de cada dado; RAW FIRST; Reference ≠ Passage; ausência honesta.
4. **Justiça (42) primeiro**; promoção das demais 102 espera o golden case fechado.
5. Raw só na `corpus`; `data/` só estruturado com fonte citada.

## 5. Triagem de docs

Entra: specs, ADRs, memorando, STATUS, ledger, guias, análises definitivas. Não entra: transcrição de chat, logs, rascunhos, arquivos >1 MB fora da `corpus`. Exceção de imagem: conceito rejeitado que documenta decisão aprovada fica, **marcado como rejeitado**. Um assunto = um doc. *Não muda decisão nem ensina o produto → não sobe.*

## 6. Fluxo padrão

Tarefa → líder implementa em `arena/*` (ou monta pacote Codex) → crítica ChatGPT em lote no marco → líder atualiza contra `main`, roda suíte, mergeia → STATUS atualizado. Fontes entram sempre pela `corpus`.

## 7. Risco de colisão semântica (emenda ChatGPT)

Todo trabalho relevante declara **BASE_SHA + escopo de escrita**. Um único agente escreve por vez em área crítica (schema, `data/justice`, registry de fontes, specs LOCKED). Antes do merge, líder atualiza contra `main` corrente e roda a suíte completa.

## 8. Trabalho durável

> Trabalho durável que possa afetar o projeto e não esteja versionado não existe para a equipe.

Commit pequeno e frequente na branch do agente. Experimento descartável pode morrer.

## 9. Papel do Codex — proposta do líder v1

**Definição em uma frase:** executor subcontratado de pacotes fechados — **nunca o quarto arquiteto** (exigência do ChatGPT, aceita).

- **Formato do PACOTE (obrigatório, do líder):** objetivo · contexto (links) · **BASE_SHA** · **escopo de escrita** (arquivos) · critério de pronto (comandos/testes exatos) · não-fazer · limite de esforço.
- **Ciclo:** pacote → Codex cria `codex/<slug>` a partir da BASE_SHA → entrega branch + descrição + resultado dos testes → **líder valida e integra** (ChatGPT crítica se for visual/UX, no lote).
- **Limites:** não reabre arquitetura; não toca schema/`data/justice`/registry/specs LOCKED salvo instrução explícita do pacote; escopo novo ou dúvida = **parar e reportar**, não improvisar.
- **Tipos de pacote ideais:** funções puras + testes; parsers/extração com golden files; **scripts que a máquina roda** (Codex escreve, o líder executa — protege o token); migrações pequenas; passes de a11y/performance.
- **Emenda da ratificação (§9.c):** "Codex escreve, a máquina roda" **não é absoluto** — Codex escreve E executa validações locais/baratas (testes unitários, amostras pequenas); trabalho volumoso/repetitivo sobre corpus (varreduras integrais, ingestão) é executado pelo líder/máquina. Código nunca é entregue sem ter sido exercitado.
- **Pacote 001 (emitido):** `codex/locator-decoder` — com a **guarda semântica** ratificada: é decodificador de **seção física de página** (`446d` → "pág. 446, coluna direita, parte inferior"), NÃO parser de locators GBWW (não interpreta BK/CH/SECT/linhas/esp/passim/Bíblia/Bekker); `locatorRaw` permanece soberano e intocado; falhar ao interpretar é estado válido. BASE_SHA: `14a374c`. Arquivos: `lib/prototype/locator.ts` + `tests/locator.test.ts`.
- **Pacote 001 (proposto):** `codex/locator-decoder` — decodificador de quadrantes GBWW (entrada `446d` → saída "pág. 446, coluna direita, parte de baixo"), função pura + tabela de casos + testes; BASE_SHA = commit vigente de `main`; arquivos: `lib/prototype/locator.ts` + `tests/locator.test.ts`.
- **Pacote 002 (proposto):** `codex/benchmark-sweep` — script de varredura das 102 páginas do benchmark que gera `docs/coverage-manifest.md` (lista A VERIFICAR com provenance secundária; **não** ingere dataset).

---

# PROMPT — Ciência do Codex (enviar quando ratificado)

```text
Você é executor de pacotes fechados no repo bernardotb/syntopicon. LEIA docs/colaboracao.md (v3, §9).
RESPONDA EM 3 LINHAS: 1) "CIÊNCIA E CONFORMIDADE" com: branch própria codex/*, BASE_SHA do pacote,
nunca commitar em main ou branch alheia, commits pequenos com autor no corpo, testes verdes na entrega.
2) Confirme o formato PACOTE e que escopo novo/dúvida = parar e reportar (não improvisar; não reabrir
arquitetura; você não é o quarto arquiteto). 3) Aguarde o Pacote 001 (locator-decoder).
Regras de dados invioláveis: nada inventado; provenance real; canon = Adler > benchmark.
```

# PROMPT — ChatGPT ratifica papel do Codex (curto)

```text
Do Arena Agent: conforme sua exigência, a proposta do papel do Codex está em docs/colaboracao.md (v3, §9):
executor subcontratado de pacotes fechados, nunca quarto arquiteto; BASE_SHA + escopo obrigatórios;
padrão "Codex escreve, a máquina roda" (protege tokens); Pacotes 001 (locator-decoder) e 002
(benchmark-sweep → coverage-manifest, sem ingerir dataset) propostos.
RESPONDA CURTO: CONCEDO ou EMENDO (por ponto): a) definição e limites; b) formato do pacote;
c) padrão "escreve, não roda"; d) escolha e ordem dos Pacotes 001/002.
```
