# Memorando de Convivência — Agentes do Projeto "A Grande Conversa"

**Repositório:** bernardotb/syntopicon · **Versão:** v2 (após revisão do Dono) · **Data:** 03/09/2026
**Status:** v2 incorpora: liderança definida, regras de decisão sem travamento, protocolo de transporte de fontes via branch `corpus`, ritual de `docs/STATUS.md`. Aguarda ciência do ChatGPT (crítica pontual) e do Codex.

> **Contexto do Dono:** leigo em programação, participação não-intensiva. Os três agentes se autorregulam;
> o Dono decide **produto** (escopo, prioridade, estética), nunca details técnicos — para isso existe o líder.

---

## 1. Papéis — com liderança

| Parte | Papel | Autoridade |
|---|---|---|
| **Dono (bernardotb)** | Contratante. Decide **o quê e para quê** (escopo, prioridades, aprovação estética, fornecer fontes). Lê `docs/STATUS.md` e responde perguntas simples | Veto final em produto; nunca arbitra detalhe técnico |
| **Arena Agent — LÍDER DE ENGENHARIA** | Integra e entrega: decide arquitetura/implementação, executa o dia a dia (código, dados, ingestão, specs), valida tudo que sobe, mantém `STATUS.md` | Decide tecnicamente sozinho; registra decisão; responde por ela |
| **ChatGPT — DESIGN & CRÍTICA** | Estratégia, design conceitual, revisão adversarial em **lotes** (não trava cada passo); acesso ao Drive do Dono (fontes, contexto) | Propõe e argumenta; não bloqueia entrega; não commita sem validação do líder |
| **Codex — EXECUTOR SUBCONTRATADO** | Pacotes fechados (objetivo + arquivos + critério de pronto + não-fazer), contexto curto, tokens limitados | Faz exatamente o pacote; escopo novo volta ao Dono/líder |

**Por que o líder é o Arena:** é quem tem o checkout completo, roda testes/build e publica no Git — quem entrega e integra precisa arbitrar o técnico. ChatGPT e Codex continuam essenciais: um pensa, o outro executa sob demanda.

## 2. Como se decidem as coisas (sem travar o processo)

1. **Quem faz, decide** — a decisão técnica pertence a quem executa, e é registrada (no código, em ADR ou no STATUS). Revisão vem **depois, em lotes**, não como pedágio antes de cada passo.
2. **Disagree & commit** — se o ChatGPT discorda do líder: registra a discordância em ≤1 parágrafo (issue ou doc) e a entrega segue. O Dono lê as discordâncias pendentes quando quiser e decide só as que considerar produto.
3. **Perguntas ao Dono são raras e simples** — em português leigo, com ≤3 opções e recomendação explícita ("recomendo A porque…"). Máximo ~3 por marcos. Se a resposta não vier em 7 dias, o líder segue a recomendação (anotando).
4. **Nada de re-revisão circular** — um doc aprovado só é reaberto com fato novo (fonte nova, erro comprovado, mudança de escopo pelo Dono). Crítica vencida é crítica encerrada.
5. **Canônico decide conteúdo, líder decide forma** — discussões sobre "o que é Syntopicon" terminam na fonte (Adler); discussões de implementação terminam no líder.

## 3. Branches e transporte de fontes (resolve o problema do Drive)

- `main` — versão boa. Merge só com testes verdes + OK do líder (e do Dono em releases).
- `arena/*`, `chatgpt/*`, `codex/*` — trabalho de cada agente. Proibido: force-push, branch alheia, merge sem validação.
- **`corpus` (branch nova, nunca mergeada)** — a "prateleira de fontes": PDFs e OCRs brutos (Justice.pdf, Vols. 1–3, Inventory). **Sobe para cá, e apenas para cá.** Motivo: o Arena não acessa o Drive do Dono, e o Dono não baixa arquivos do workspace do Arena; o Git é o canal que todos os três lêem. Fluxo: Dono/ChatGPT sobem o arquivo na `corpus` → líder puxa, ingere, valida pelo ledger (md5). Raw nunca mergeia em `main` nem entra em `data/` sem estruturação.
- **`docs/STATUS.md`** — o painel do projeto, mantido pelo líder (e atualizado por quem pousa trabalho grande): o que está pronto, em andamento, bloqueado, próximo passo, e as discordâncias pendentes (§2.2). É o jeito do Dono saber o estado em 1 minuto, sem entender código.

## 4. Regras de dados (invioláveis)

1. Nada inventado: sem fonte identificada, não entra; memória de modelo nunca é fonte.
2. Canon: Adler/fontes primárias vencem tudo; benchmark (Mortimer) só ensina navegação.
3. Provenance por registro; RAW FIRST; Reference ≠ Passage; ausência honesta, nunca placeholder.
4. Ordem: **Justiça (42) completa primeiro**; escala depois.
5. Raw vai só na `corpus`; `data/` recebe só estruturado com fonte citada.

## 5. Triagem de docs no Git

**Entra:** especificações, decisões/ADRs, memorando de convivência, STATUS, ledger do corpus, análises definitivas, guias de produto. **Não entra:** transcrição de chat, logs, rascunhos, imagens de conceito não aprovadas, arquivos >1 MB fora da `corpus`. Um assunto = um doc. Regra: *não muda decisão nem ensina o produto → não sobe.*

## 6. Fluxo padrão

1. Tarefa nasce do Dono ou de doc aprovado.
2. Líder implementa em `arena/*` (ou monta pacote para o Codex em `codex/*` quando for bem delimitado e valer a pena em tokens).
3. ChatGPT revisa em lote (no marco da tarefa); ajustes; líder mergea em `main`; STATUS atualizado.
4. Fontes novas: entram sempre pela branch `corpus` (§3).

## 7. Comunicação entre agentes

Por arquivos no repo (STATUS, ADRs, issues do GitHub) — não por "lembro que você disse". Crítica curta, por pontos, citando arquivo/seção. Discordância técnica: §2.2. Conflito de conteúdo: canon vence, sempre.

## 8. NotebookLM

Sala de estudo do Dono. Uploads: fontes + docs aprovados. Outputs (áudio, mapas, resumos) são apoio pessoal — só entram no repo pela triagem (§5). Nunca fonte canônica.

---

# PROMPT — para o ChatGPT

```text
Você é o parceiro de estratégia/design do projeto "A Grande Conversa" (Syntopicon digital
em português). O Dono é leigo em programação e delegou a autorregulação aos agentes.
LEIA no repo bernardotb/syntopicon → docs/: colaboracao.md (v2), STATUS.md, e se quiser
contexto: a-grande-conversa-especificacao.md, guia-do-produto.md, identidade-visual.md.
RESPONDA CURTO, POR PONTOS:
1. Papéis v2 (Arena = líder de engenharia com decisão técnica; você = design/crítica em
   lotes; Codex = pacotes; Dono decide só produto): CONCEDO ou EMENDO: …
2. Regras de decisão (§2: quem faz decide, disagree&commit, perguntas raras ao Dono):
   CONCEDO ou EMENDO: …
3. Protocolo da branch `corpus` (fontes sobem lá, porque você tem Drive e o Arena não):
   CONCEDO ou EMENDO: …
4. 1 risco real de 3 agentes no mesmo repo que ficou de fora + a regra que o cobre.
Restrições: sem réplica integral; canon = Adler > benchmark; nada inventado; Dono decide divergências de produto.
```

# PROMPT — para o Codex

```text
Você é executor de pacotes fechados no repo bernardotb/syntopicon. LEIA docs/colaboracao.md (v2).
RESPONDA: 1) "CIÊNCIA E CONFORMIDADE" com: branch própria codex/*; nunca commitar em main ou
branch alheia; commits pequenos com autor no corpo; testes verdes antes de entregar.
2) Confirme o formato PACOTE (objetivo, arquivos-alvo, critério de pronto, não-fazer) e que
dúvida de escopo volta ao Dono/líder sem reabrir arquitetura. 3) Aguarde o primeiro pacote.
```
