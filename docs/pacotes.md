# Pacotes do Codex — fila oficial

*Emissor: Arena Agent (líder) · Ratificação: ChatGPT (03/09) · Dono cola no Codex quando quiser. Regras em `docs/colaboracao.md` §9.*

---

## PACOTE 001 — codex/locator-decoder (EMITIDO)

```text
PACOTE 001 — codex/locator-decoder
Executor: Codex · Emissor: Arena Agent (líder) · Ratificado pelo ChatGPT · 03/09/2026

OBJETIVO
Função pura que decodifica a SEÇÃO FÍSICA de página GBWW (letra minúscula a–d anexada
ao número de página) em linguagem humana. Camada DERIVADA de apresentação — NÃO é um
parser de locators GBWW.

GUARDA SEMÂNTICA (ratificada — não violar)
- NÃO interpretar BK, CH, SECT, linhas, esp, passim, Bíblia, Bekker nem nada além de página+quadrante.
- locatorRaw é soberano e intocado; esta função nunca o modifica.
- Falhar ao interpretar é estado VÁLIDO (retornar null + motivo curto — nunca lançar exceção).

CONVENÇÃO DE QUADRANTES (DERIVED; confirmar contra amostra real do Justice.pdf quando disponível)
a = col. esquerda, parte superior · b = col. esquerda, parte inferior
c = col. direita, parte superior  · d = col. direita, parte inferior
Exemplo: "446d" → "pág. 446, coluna direita, parte inferior".

ESCOPO DE ESCRITA (exclusivo; nada além disso)
- criar: lib/prototype/locator.ts  → export function decodeGbwwPageSection(input: string):
    { text: string | null; reason: string | null } — aceitar caixa alta ("446D"),
    espaço interno ("446 d"); rejeitar "446" (sem sufixo), "446e", "abc", "" com reason claro.
- criar: tests/locator.test.ts     → node:test, cobrir todos os casos acima.

BASE_SHA
arena/01a06414-syntopicon @ 14a374c — criar a branch codex/locator-decoder a partir dela.

CRITÉRIO DE PRONTO (validações que VOCÊ executa e cola o resultado na entrega)
1) npm run test → TODOS passam (14 existentes + os seus novos)
2) npm run typecheck → limpo
Não rodar build (desnecessário neste pacote).

ARTEFATO DE SAÍDA ESPERADO
Branch codex/locator-decoder + descrição com: o que foi feito, saída resumida dos 2
comandos, dúvidas (se houver).

NÃO FAZER
Não tocar em main, branch alheia, data/, app/, docs/, lib/syntopicon (schema).
Não instalar dependências. Não reabrir arquitetura. Escopo novo ou dúvida = PARAR e reportar.

LIMITE DE ESFORÇO
~1h humana equivalente. Se precisar de mais, é escopo novo → reportar.
```

## PACOTE 002 — codex/benchmark-sweep (EMITIDO — aguarda 001)

```text
PACOTE 002 — codex/benchmark-sweep
Executor: Codex · Emissor: Arena Agent (líder) · 03/09/2026 · Anexo B do memorando (v3.1)

OBJETIVO
Script que varre as 102 páginas de ideia do benchmark e gera o COVERAGE MANIFEST —
inventário editorial das 102 ideias (checklist de ingestão), com estados do Anexo B.
NÃO toca no dataset canônico; o benchmark não vira autoridade primária.

SAÍDA (artefato esperado)
- criar: scripts/benchmark-sweep.ts (executável via tsx, com flag --sample para rodar
  em N=3 ideias como amostra)
- gerar: docs/coverage-manifest.md — tabela por ideia:
  number · slugEn · nomePT · benchmarkUrl · topicosDetectados (contagem) · estado
  (DISCOVERED | SOURCE_FOUND | SOURCE_VERIFIED | TRANSLATED | STRUCTURED | VALIDATED |
  PUBLISHED | EDITION_UNRESOLVED) · provenance (sempre "mortimer-benchmark" nesta fase)
- regras de estados nesta primeira rodada: tudo DISCOVERED; Justice=42 marcada
  SOURCE_FOUND (arquivo pendente de upload na corpus); EDITION_UNRESOLVED como coluna
  apartada até P0 resolver.

ESCOPO DE ESCRITA (exclusivo)
- criar: scripts/benchmark-sweep.ts
- criar: docs/coverage-manifest.md (gerado pela rodada --sample; a varredura INTEGRAL
  das 102 é executada pelo Arena/máquina, não por você — "Codex escreve e testa em
  amostra; trabalho volumoso é do líder")

BASE_SHA
arena/01a06414-syntopicon @ <SHA vigente quando o pacote for enviado — conferir com o líder>

CRITÉRIO DE PRONTO (você executa e cola o resultado)
1) npm run test → TODOS passam
2) npm run typecheck → limpo
3) tsx scripts/benchmark-sweep.ts --sample 3 → gera manifest de amostra válido

NÃO FAZER
Não ingerir dataset; não tocar em data/justice, lib/syntopicon, app/, docs/ existentes
(só criar os arquivos do escopo). Não instalar dependências. Sem scraping pesado: as
102 URLs seguem o padrão https://mortimer.vercel.app/topic/{1..102} — o script apenas
prepara a lista e a estrutura do manifest; a captura integral roda na máquina do líder.
Escopo novo ou dúvida = PARAR e reportar.

LIMITE DE ESFORÇO
~2h humana equivalente.
```

## Fila

| # | Pacote | Estado |
|---|---|---|
| 001 | locator-decoder | EMITIDO — aguardando Dono colar no Codex |
| 002 | benchmark-sweep | EMITIDO — depois do 001 |

## Anexo — Disciplina de execução (avaliação de repositórios de skills, 03/09)

Avaliados a pedido do Dono: VoltAgent/awesome-agent-skills, Orchestra-Research/
AI-Research-SKILLs, obra/superpowers, varakumar-divami/agent-skills. Veredito:
nada é instalado (nossa cadeia não usa plugins); adotamos TRÊS disciplinas
escritas do superpowers como checklist padrão — entram no texto dos próximos
pacotes (001 segue como emitido):

1. **Prova antes de alegação** (verification-before-completion): nenhum
   "pronto/passou" sem rodar o comando de verificação NA MESMA sessão e ler a
   saída. Quem afirma, cola a prova (nossa regra do grep pós-escrita, formalizada).
2. **Tarefas minúsculas** (writing-plans): cada passo = 1 ação com verificação
   própria (escrever teste quebrado → rodar para ver falhar → implementar o
   mínimo → rodar para ver passar). Passo > 5 min vira dois passos.
3. **Vermelho→verde** (test-driven-development): em função pura com teste, o
   teste vem PRIMEIRO e deve falhar antes da implementação; teste que passa de
   primeira está suspeito.

Descartados: varakumar-divami/agent-skills (fork DESATUALIZADO do catálogo
VoltAgent — mesmo conteúdo, versão mais velha); Orchestra-Research/AI-Research-
SKILLs (domínio errado para nós: treinar/avaliar modelos de IA e escrever papers
de ML). O catálogo VoltAgent fica como **menu de consulta** (1.497 skills,
só links — achado útil: skills oficiais de PDF da Anthropic/OpenAI, com scripts
de extração e de converter página em imagem; referência externa para a
conferência visual da p. 858 e para a ingestão dos PDFs; NÃO vendamos/copiemos
o material — licença proprietária —, usamos como técnica).

Nos próximos pacotes, este anexo viaja resumido como bloco "DISCIPLINA" de 3 linhas.
