# Contexto de Sessão Arena — Syntopicon (arquivo único definitivo)

> **O que é este arquivo.** Prompt de bootstrap para sessões do Arena Agent Mode ancoradas em
> `bernardotb/syntopicon`. Duas partes: **PARTE A** (corpo enxuto — o que o agente lê primeiro) e
> **PARTE B** (apêndice — a Fase Fundacional operacional, condensada **já com as 3 correções
> aplicadas**: seção única de skills, regra de numeração canônica, diretriz de reuso de schema).
>
> **Como usar.** (1) Nova sessão ancorada neste repositório: o agente pode simplesmente ler este
> arquivo — não é preciso colar nada. (2) Alternativamente, cole o arquivo inteiro como mensagem
> inicial da sessão.
>
> **Nota de honestidade intelectual.** A PARTE A foi verificada contra o checkout real do
> repositório (commit `60bafdc`, branch `arena/01a05420-syntopicon`, em 30/08/2026): 4/4 testes
> passando, typecheck limpo. A PARTE B é uma **condensação reconstruída** do prompt original da
> Fase Fundacional (45 seções) a partir do resumo da conversa de 29–30/08/2026, com as correções
> já aplicadas — não é a transcrição verbatim do original. Se o prompt original existir em
> arquivo, reconciliar este apêndice contra ele antes de evoluir o documento.

---

## PARTE A — Contexto enxuto (ler primeiro)

### 1. Visão

**A Grande Conversa**: aplicação pessoal para explorar o pensamento ocidental através da
arquitetura do *Syntopicon*. Princípio absoluto: **nada de tópicos, autores, obras ou passagens
inventados**. Relações inexistentes no dataset são omitidas pela interface — nunca inferidas.

Percurso alvo: **ideias → tópicos → referências → obras → autores**. Hoje só a camada de ideias
existe, estruturada e validada.

### 2. Stack e repositório

- Next.js 16.2.11 (App Router, rotas estáticas `force-static`), React 19.2.0, TypeScript 5.9.3.
- Testes: `tsx --test` sobre `node:test`; checagem: `tsc --noEmit`; sem banco externo.
- Repositório: `bernardotb/syntopicon` (checkout oficial). Trabalhe sempre na branch da sessão
  Arena; faça commit e push nela — **a sessão atual tem permissão de escrita** (o erro 403 da
  sessão anterior não se aplica aqui).

### 3. Estado real (verificado em 30/08/2026)

- `data/ideas.ts`: **102 Grandes Ideias** em português, IDs estáveis `idea:<slug>`, proveniência
  por registro (`derived-structure` ← `source:syntopicon-canonical-ideas-list`, `verified-local`).
- `lib/syntopicon/`: tipos de entidade (`Idea`, `Topic`, `Author`, `Work`, `Reference`,
  `Passage`, `Term`, `Source`), `Provenance`, canonicalização de slug, `assertCanonicalIdeas`
  (trava de cardinalidade 102 + unicidade de IDs/slugs).
- `lib/knowledge-graph/`: grafo com relações tipadas (`HAS_TOPIC`, `HAS_REFERENCE`,
  `REFERENCES_WORK`, `HAS_PASSAGE`, `CROSS_REFERENCES`, `POINTS_TO`, `CONTRIBUTES_TO`) que
  **rejeita relações com ponta não resolvida**.
- `lib/retrieval/`: busca normalizada de ideias. `app/`: `/`, `/ideas`, `/ideas/[slug]`.
- Testes existentes (4): cardinalidade/unicidade, proveniência retida, estabilidade de slug/ID,
  rejeição de relação órfã no grafo.
- **Não existe ainda** dataset de tópicos, referências, referências cruzadas, obras, autores ou
  passagens. O schema `Idea` atual é `{ id, slug, name, provenance }` — **sem campo `number`**.
- `scripts/` está reservado à ingestão reprodutível do corpus (ainda vazio).

### 4. Achado crítico — numeração canônica

- O array `canonicalIdeaNames` está em **ordem alfabética em português**. Isso **não** é a
  numeração canônica dos capítulos do Syntopicon (que segue a ordem alfabética em **inglês**).
  Exemplo concreto: *Acaso* é a 1ª posição do array, mas seu capítulo canônico é o **nº 9
  (*Chance*)**; *Mudança* (*Change*) é o nº 10.
- **Regra:** o número canônico de cada ideia **vem do PDF** (cabeçalho/ordem dos capítulos),
  **nunca** de posição em array, nem de campo `number` de protótipos ou de qualquer artefato
  derivado. Toda numeração deve ser extraída e auditada contra o corpus.

### 5. Fontes e corpus — pré-condição dura

- Fonte já verificada no repo: lista editorial local das 102 ideias (português).
- Os PDFs/`.txt` dos **Volumes 1–3** do Syntopicon estão na máquina local do usuário
  (`C:\Users\...\syntopicon-codex\Volumes`) — **o sandbox do Arena não lê esse caminho**.
- **Pré-condição dura:** antes de qualquer extração, o corpus (PDFs ou suas extrações `.txt`)
  deve estar **disponível no workspace da sessão**, por convenção em `Volumes/` (gitignored —
  corpus não entra no Git). Se o corpus não estiver acessível: **PARE e peça o material**. Não
  extraia "de memória": auditar sem poder ler a fonte é proibido.

### 6. Tarefa (uma linha)

Extrair e validar do corpus autorizado os **tópicos**, depois **referências** e **referências
cruzadas** das 102 ideias, **estendendo o schema existente** em `lib/syntopicon/` (sem schema
paralelo), com proveniência por registro e auditorias automáticas — conforme a PARTE B.

### 7. Princípios

1. **Anti-alucinação acima de tudo.** Se não está na fonte identificada, não entra.
2. **Hierarquia de confiança:** corpus em `Volumes/` > fontes `verified-local` do repo >
   artefatos derivados (protótipos, listas). Memória do modelo **nunca** é fonte.
3. **Raw vs canonical separados:** o texto bruto extraído é preservado; a forma canonizada
   (nomes PT, slugs, IDs) é derivada e rastreável ao raw.
4. **Proveniência por registro**, com camada: `original-corpus`, `derived-structure` ou
   `interpretive-content`.
5. **Volume 1 como camada superior** (ver PARTE B, §6).
6. Omite-se o que não existe no dataset; não se infere na interface nem no grafo.

### 8. Validação obrigatória (antes de concluir qualquer fase)

```bash
npm run test && npm run typecheck && npm run build
```

Mais as **auditorias automáticas** da PARTE B (§5). Critério de sucesso: tudo verde **e**
auditorias sem divergência contra o corpus; commit local feito na branch da sessão.

### 9. Skills da sessão (lista única)

Extração e parsing de PDF/`.txt` do corpus · modelagem canônica e migração de schema em
TypeScript · auditoria e validação de dados (contagens, resolução de referências) ·
implementação Next.js/React · testes automatizados · git (commit/push na branch da sessão).

*(Esta é a seção única de skills — o prompt original a continha duplicada; qualquer skill nova é
adicionada aqui e somente aqui.)*

### 10. Saída obrigatória ao final da sessão

1. Dataset(s) versionado(s) em `data/` com proveniência por registro.
2. Auditorias (§5 da PARTE B) executadas e relatório de divergências (mesmo que zero).
3. Testes mínimos novos cobrindo o que entrou.
4. Commit local na branch da sessão com mensagem descritiva; push.
5. Resumo: o que entrou, de onde veio (fonte/página), o que ficou de foro e por quê.

---

## PARTE B — Apêndice: Fase Fundacional operacional (condensada e corrigida)

> Condensação do prompt original da Fase Fundacional com **as 3 correções aplicadas**:
> **(a)** skills em seção única (PARTE A, §9); **(b)** regra explícita de numeração canônica
> (§2 abaixo); **(c)** diretriz de reuso de schema (§3 abaixo). Mantidos: anti-alucinação,
> hierarquia de confiança, auditorias automáticas, raw vs canonical, proveniência, Volume 1 como
> camada superior, testes mínimos, commit local.

### 1. Escopo e ordem de trabalho

Evoluir o percurso na ordem: **tópicos → referências → referências cruzadas**. Obras e autores
só entram como nós quando houver identificadores e fontes verificadas — sem resolução por
memória ou heurística de nome.

### 2. Numeração canônica (correção b)

- Capítulo canônico e número de cada ideia são **extraídos do PDF** (`Volumes/`), nunca de
  campo `number` de protótipo/artefato derivado, nem de posição em array.
- Ao introduzir numeração, fazê-lo como campo novo e auditado (ex.: `canonicalChapter`), citando
  a fonte (volume e página/cabeçalho do capítulo). Divergência com qualquer artefato derivado é
  **achado a reportar**, não erro a corrigir no corpus.

### 3. Reuso de schema (correção c)

- **Estender** os tipos existentes em `lib/syntopicon/` (ex.: preencher `Topic`, `Reference`;
  evoluir `Idea` com campos opcionais auditados).
- **Proibido** criar schema paralelo (`ideaV2`, `data/ideas-v2.ts`, segunda árvore de tipos).
  Migração faz-se no tipo único, com testes garantindo compatibilidade.

### 4. Anti-alucinação e hierarquia de confiança

- Toda entidade nova exige: ID estável, proveniência (`sourceId` + camada) e vínculo com raw.
- Hierarquia: corpus `Volumes/` > `verified-local` no repo > artefatos derivados. Fora disso,
  é `unverified` e **não entra** no dataset canônico.
- Proibido completar lacunas com "conhecimento geral" sobre o Syntopicon.

### 5. Auditorias automáticas (rodar e reportar em toda entrega)

1. **102**: cardinalidade de ideias permanece exatamente 102 após qualquer mudança.
2. **Tópicos**: contagem de tópicos por capítulo confere com o outline do PDF; total geral
   reportado.
3. **Cross-refs**: toda referência cruzada resolve para uma ideia existente no dataset (o grafo
   já rejeita ponta não resolvida — manter essa trava e exercitá-la em teste).
4. **Proveniência**: 100% dos registros novos com `sourceId` resolvível no `source-registry`.

### 6. Raw vs canonical; Volume 1 como camada superior

- Preservar o **raw** (texto como extraído do corpus, com localização volume/página) separado da
  forma **canônica** (PT, IDs, slugs). O canônico é derivado do raw — nunca editado à mão sem
  lastro no raw.
- **Volume 1** (*The Great Conversation* / camada ensaística) é **camada superior e
  interpretativa**: pode contextualizar e introduzir, mas **jamais** é fonte de estrutura
  (tópicos, referências, numeração). Estrutura vem dos capítulos do Syntopicon. Conteúdo do
  Volume 1 entra como `interpretive-content` com proveniência própria.

### 7. Testes mínimos por fase

- Manter os 4 testes atuais verdes.
- Acrescentar, no mínimo: cardinalidade de tópicos vs PDF (auditoria 2), resolução de
  cross-refs (auditoria 3), integridade de proveniência dos registros novos (auditoria 4).

### 8. Commit local

- Commit na branch da sessão ao final de cada fase, mensagem descritiva; push na mesma branch.
- Não comitar corpus (`Volumes/` está no `.gitignore`); datasets derivados e testados entram no
  Git normalmente.
