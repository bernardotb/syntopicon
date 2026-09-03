# A Grande Conversa — Especificação V1 (Syntopicon digital)

**Status:** SPEC_STATUS = LOCKED (ver §25)
**Data de lock:** 2026-09-02
**Escopo deste documento:** especificação de produto/experiência da V1. NÃO é documento de implementação, NÃO autoriza ingestão das 101 ideias restantes e NÃO altera código nesta etapa.
**Benchmark:** Mortimer (https://www.mortimer.app/, mirror https://mortimer.vercel.app/) — auditoria da conversa anterior + re-check pontual de confirmação em 2026-09-02 (3 fetches: `/`, `/topic/41`, `/topic/42`).
**Repositório:** https://github.com/bernardotb/syntopicon

---

## Registro de retomada (proveniência desta spec)

Este workspace foi recriado a partir do commit `60bafdc` e **não contém as edições da rodada anterior** (a spec de ~1.200–1.300 linhas e o diff de +1.300 linhas não persistiram neste checkout; `git status` limpo, sem stash/reflog adicional). Esta versão foi consolidada a partir do estado convergido da conversa anterior — inclusive suas correções (ex.: References de Justice começam na p. 859, **não** 862) — e de uma verificação pontual do mirror em 02/09/2026. A auditoria do Mortimer **não foi refeita**; apenas os pontos contestados foram reconfirmados (ver Apêndice B, marcados `[re-check 2026-09-02]`).

## Como ler

1. **§1–§4** — veredito e o que o Mortimer demonstrou (benchmark).
2. **§5–§19** — a experiência V1: IA canônica, spec por página, mobile, visual, golden path, escopo.
3. **§20–§22 (apêndices)** — confronto com o repositório, evidências com grau epistêmico, conteúdo canônico de Justice.
4. **§23** — CONSOLIDAÇÃO FINAL — V1 LOCKED (cortes, números, page-by-page lock, URLs).
5. **§24** — CODEX HANDOFF (bloco pronto para colar em prompt de implementação).
6. **§25** — bloco final de status.

## Hierarquia de autoridade (para qualquer conflito)

1. Fontes primárias do Syntopicon / Great Books (Vols. 1–3, Justice.pdf, Inventory of Terms)
2. Adler / Hutchins
3. Documentação editorial
4. Modelo canônico validado
5. Inferência fundamentada
6. Mortimer como benchmark
7. Implementação atual

> Se Mortimer contradiz Adler: **Adler vence**.
> Se o código contradiz a fonte: **o código muda futuramente**.
> Nesta etapa: nenhuma alteração de código.

---

# PARTE I — BENCHMARK

## 1. Executive Verdict

O Mortimer provou que a arquitetura do Syntopicon cabe numa experiência web **simples**: uma home editorial, uma Grande Ideia como hero + outline imediatamente navegável, e poucos cliques do geral ao específico. Ele também demonstrou o que **não** fazer: terminologia invertida, hierarquia achatada, números não verificáveis, demo desatualizada e categorizações históricas duvidosas.

**Veredito:**

> Não estamos fazendo "um Mortimer em português". Estamos fazendo o Syntopicon digital que Adler desenharia hoje: a mesma progressão do geral ao específico, a hierarquia intacta, honestidade de dados acima de claim.

- **PRESERVAR** a camada de dados do repositório (entidades, provenance, ADR, testes, 102 ideias).
- **RECONSTRUIR** a experiência usando o Mortimer como régua de simplicidade.
- **DIFERENCIAR** onde Adler nos obriga e nos permite ser melhores: terminologia, hierarquia completa, Reference ≠ Passage, honestidade numérica.

Definição do produto:

> A Grande Conversa é um Syntopicon digital navegável: preserva a arquitetura de Adler, remove a fricção do papel e conduz o leitor das ideias aos próprios livros.

> O Syntopicon é o mapa. Os Great Books são o território. A leitura sintópica é a viagem entre os dois.

**Regra de composição:** Mortimer para a experiência. Adler para a estrutura. A Grande Conversa para unir os dois sem tornar o produto mais complicado.

**Não virar:** Wikipédia de filosofia; chatbot genérico; curso linear; catálogo simples; dashboard SaaS; grafo decorativo; rede social; gamificação.

Produto inicial: **pessoal, de estudo**.

## 2. Mortimer Product Map — o que foi observado

### 2.1 Home

| Bloco | Observação | Tipo |
|---|---|---|
| Hero | "Discover the Great Ideas", tom editorial, memorial a Adler | [FATO] |
| Stats | `102 Topics · 3000+ Subtopics · 100k+ Passages` | [FATO] `[re-check 2026-09-02]` |
| CTA "Start Exploring" | Auditoria: → `/topic/17` (Desire). Re-check 02/09/2026: → `/topic/26` (Family) — **alvo mudou**; sugere rotação/aleatoriedade | [FATO] / [INFERÊNCIA] |
| Demo "Your Journey Awaits" | Card com "Topic: Justice — **12 subtopics**", enquanto a página de Justice exibe **41** — demo dessincronizada dos dados | [FATO] |
| Featured Thinkers | Aristotle, Plato, Kant, Mill, Rawls, Nietzsche | [FATO] |
| Browse by Category | 9 categorias editoriais (Metaphysics 7, Branches of Knowledge 17, Religion 6, Art 5, Human Society 20, Human Life 28, Life on Earth 3, The Earth 3, Matter and Energy 13 = 102) | [FATO] `[re-check 2026-09-02]` |
| All Topics | Grade de cards + vista "Index" + botão "Shuffle" | [FATO] |

### 2.2 Página de Grande Ideia (`/topic/42` = Justice)

- Hero com imagem ilustrativa, título, "Explore the great ideas related to Justice" e **"41 subtopics"** [FATO] `[re-check 2026-09-02]`.
- Lista **achatada** de itens internos; sem página hierárquica de primeira classe para itens como 8c(1) [FATO].
- Itens internos exibem contagem de passagens e link "Read passages" → `/subtopics/{id}` (IDs numéricos opacos, ex. `/subtopics/1021`) [FATO] `[re-check 2026-09-02]`.
- Alguns itens internos aparecem **sem** contagem de passagens (vazio não explicado) [FATO] `[re-check 2026-09-02]`.
- Terminologia interna: as 102 entradas são chamadas "Topics" e os itens internos "Subtopics" — **invertido** em relação ao canon (102 Great Ideas → Topics) [FATO].

### 2.3 Outras superfícies

- Rotas públicas `/search`, `/authors` etc.: sem páginas equivalentes na auditoria [FATO]; pode existir busca client-side — não afirmar ausência absoluta de busca [INFERÊNCIA].
- Classificações históricas questionáveis: Hobbes/Shakespeare rotulados "Medieval" [FATO].
- `www.mortimer.app/topic/42` retornou menos conteúdo que `mortimer.vercel.app/topic/42` na auditoria [FATO]; causa provável SSR/renderização/deploy [HIPÓTESE].
- Claim "100k+ passages" sem método público de verificação [UNRESOLVED].
- Versão antiga (Wayback) tinha rota pública `/excerpt/[id]`; equivalente atual não verificada [FATO/UNRESOLVED].
- Qualidade de dados: typo "Theorietical" em um item interno de Judgment [FATO] `[re-check 2026-09-02]`.

## 3. Feature Inventory e veredito

| # | Feature Mortimer | Veredito | Destino |
|---|---|---|---|
| 1 | Home editorial com hero + 1 CTA | COPY | V1 |
| 2 | Stats na home (102 / 3000+ / 100k+) | ADAPT | V1 só com números nossos verificados |
| 3 | Demo "Your Journey Awaits" | ADAPT | V1, sincronizada com dados reais (Justice) |
| 4 | Grade "All Topics" das 102 | COPY (lista) | V1 em `/ideias` |
| 5 | Vista Cards vs Index + Shuffle | ADAPT | Index na V1; alternância/shuffle V1.1 |
| 6 | Browse by Category (9 categorias) | REJECT | Fora da V1 (adição editorial não-Adler; reavaliar no FUTURE) |
| 7 | Hero da ideia + contagem | COPY/ADAPT | V1 com contagem explicada |
| 8 | Lista achatada de itens internos | REJECT | V1 usa árvore hierárquica (exigência de Adler) |
| 9 | Contagem de passagens por item interno | COPY | V1, apenas com dados reais |
| 10 | Link para passagens (`/excerpt/[id]`, `/subtopics/{id}`) | ADAPT | V1 com URL canônica `/passagem/{id}` |
| 11 | Descoberta por pensadores | COPY | V1 (autores na Topic) |
| 12 | Busca global | — | V1.1 (só filtro local em `/ideias` na V1) |
| 13 | CTA rotativo ("Start Exploring" muda de alvo) | REJECT | CTA fixo na V1 |
| 14 | Imagens ilustrativas por ideia | — | V1.1 (jamais como dado) |
| 15 | Terminologia "Topics/Subtopics" | REJECT | Canon: Grande Ideia → Topic |
| 16 | Eras históricas ("Medieval" p/ Hobbes) | REJECT | Sem classificação histórica na V1 |
| 17 | Claim "100k+ passages" | REJECT | Proibido reproduzir |

## 4. Page-by-page — benchmark observado (resumo)

| Tela Mortimer | O que observamos | Nós (V1) |
|---|---|---|
| Home | Editorial, 1 CTA, stats, demo, categorias, grade | Editorial, 1 CTA fixo, demo real, sem categorias |
| Topic (Grande Ideia) | Hero + lista achatada + contagens | Hero + outline em árvore + contagens explicadas |
| Subtopic/Passages | Achatado, IDs opacos, alguns vazios | Topic hierárquico canônico + Reference Card honesta |
| Excerpt (antigo) | `/excerpt/[id]` no Wayback | `/passagem/{id}` |
| Author/Work | Sem página pública equivalente observada | Author/Work mínimos (derivados do corpus) |
| Search | Sem página pública observada | Fora da V1 |

---

# PARTE II — EXPERIÊNCIA V1

## 5. Information Architecture canônica

### 5.1 Modelo da Grande Ideia (NÃO ALTERAR)

```
GREAT IDEA
├── Introduction
├── Outline of Topics
│   └── Topic
│       └── Topic (níveis aninhados)
├── References
├── Cross-References
└── Additional Readings
```

### 5.2 Camada transversal (V1.1)

```
Inventory Term → Topic → Great Idea
```

Nunca `InventoryTerm → relação inventada por semelhança semântica`. O Inventory só aponta onde o Inventory oficial sustenta. **Fora da V1.**

### 5.3 Entidades e invariantes

- `Author ≠ Work ≠ Edition ≠ Passage` — sempre entidades separadas.
- `Reference ≠ Passage`:
  - **Reference** = `Topic → Author → Work → Locator` (citação apontando para o texto).
  - **Passage** = texto efetivamente recuperado.
- **Reference ≠ linha impressa**: uma linha impressa do Syntopicon pode conter um autor, várias obras e vários locators. Portanto **NÃO exibir contagens de References normalizadas** enquanto a regra de ingestão não estiver estabilizada.
- **RAW FIRST, PARSE SECOND**: preservar sempre texto/locator original antes de normalizar.
- Nenhuma relação interpretativa (ex.: afinidade temática, "autores relacionados") pode parecer canônica. Relação sem fonte no corpus não existe na UI.

### 5.4 Modelo de dados mínimo para a V1

Campos exigidos pela V1 (a implementação ajusta, os nomes são indicativos):

- `Idea`: `number` (1–102), `namePt`, `slugEn`, `nameEn`.
- `Topic`: `code` canônico (`8`, `8c`, `8c(1)`), `titleEn`, `titlePt` (apresentação), `level`, `parentId`.
- `Reference`: raw (linha impressa preservada) + parse `author/work/locator`.
- `Author`, `Work`, `Passage` mínimos.
- `Provenance` em todo registro (camadas já existentes no repo).

## 6. Home Spec (`/`)

**Papel:** porta editorial. Aproximadamente tão simples quanto a home do Mortimer.

| Ordem | Bloco | Conteúdo |
|---|---|---|
| 1 | Marca + proposta de valor | Título editorial + 1 parágrafo |
| 2 | CTA primário (fixo) | "Explorar as 102 Grandes Ideias" → `/ideias` |
| 3 | Demonstração do golden path | Card real de Justice → `/ideias/42-justice` (dados sincronizados com o dataset; nada de demo decorativa) |
| 4 | Entrada secundária | Link para `/sobre` |

- Números exibidos: **102 Grandes Ideias** (canônico) e, quando Justice já estiver ingerida, contagens reais de Justice. Nenhum outro número.
- "Como ler" **não** fica na Home → `/sobre`.
- Sem busca global, sem categorias, sem grafo, sem IA, sem tutorial extenso.

## 7. Grandes Ideias Spec (`/ideias`)

- Lista das **102** ideias: número canônico + nome PT + nome EN.
- **Filtro local por texto** (client-side, sem rede): única função de busca da V1.
- Contagem real de Topics **apenas quando existir** (na V1, só Justice: 41). Ideias sem dados não exibem "0" nem placeholder — exibem nada.
- Sem A–Z toggle, sem "Ideia ao acaso", sem filtros interpretativos, sem categorias.

## 8. Grande Ideia Spec (`/ideias/42-justice`)

**Ordem vertical:**

1. **Header/capa:** número canônico (`42`), nome PT (`Justiça`), nome EN (`Justice`).
2. **Introduction** (ensaio canônico da fonte, com provenance).
3. **Outline of Topics** — imediatamente após o hero, como no Mortimer, mas em **árvore**:
   - 11 Topics de nível 1 visíveis; filhos expansíveis (accordion inline; progressive disclosure).
   - **Todos os 41 nós** de Justice existem na estrutura; nada é achatado.
   - Códigos canônicos visíveis (`8`, `8c`, `8c(1)`).
   - Sem mecanismo sofisticado de truncation "ver todos" — 11 visíveis resolvem.
4. **References / Cross-References / Additional Readings** (seções canônicas da fonte, on demand).
5. Provenance detalhada: escondida/on demand (V1: badge discreto; popover V1.1).

**Contagem no hero — regra explícita:** "41 tópicos em 3 níveis (11 de nível 1)". Nunca "41 subtopics" solto (problema visual do Mortimer: apresenta 41, parece mostrar 11 sem explicação).

## 9. Topic Spec (`/ideias/42-justice/8c-1`)

**Ordem vertical:**

1. **Breadcrumb:** Grandes Ideias → Justiça → 8 → 8c → 8c(1) (ancestrais clicáveis).
2. **Cabeçalho:** código canônico (`8c(1)`) + título canônico EN ("Economic exploitation: chattel slavery and wage slavery") + título PT de apresentação.
3. **Referências do topic:** linhas de referência reais (raw primeiro), agrupadas por autor → obra.
4. Por referência: **CTA "Ler"** quando houver Passage; senão **Reference Card honesta** (autor, obra, locator, edição) — nunca beco sem saída.
5. Contexto: link para a Grande Ideia e para os Topics irmãos.

**NOT IN V1:** resumo de IA; "posição do autor" gerada; related sem fonte.

**Desktop e mobile usam o MESMO mecanismo** (accordion inline). Sem bottom sheet na V1.

## 10. Passage Spec (`/passagem/{id}`)

- Existe **somente** quando há texto efetivamente recuperado. Referência sem texto **nunca** gera página vazia.
- Conteúdo: texto + contexto (Grande Ideia → Topic) + locator/edição + retorno ao Topic + links para autor/obra.
- "Compartilhar" na V1 = o próprio link da página. Sem feature separada.
- "Copiar localização" e print CSS: **V1.1**.
- Sem texto disponível para uma Reference: a ficha bibliográfica honesta vive na página do Topic.

## 11. Author Spec mínima (`/autores/{slugEn}`)

- Header (nome).
- Obras relevantes **no corpus real**.
- Grandes Ideias relacionadas **via corpus real** (na V1: via Justice).
- V1.1: retrato, biografia, timeline, seção extensa de Topics. **Não antecipar.**

## 12. Work Spec mínima (`/obras/{slugEn}`)

- Header (título) + autor.
- Referências/passagens que apontam para a obra (na V1: de Justice).
- Topic e Grande Ideia correspondentes.
- Extras (fontes externas adicionais etc.): **V1.1**.

## 13. Sobre Spec (`/sobre`)

- O que é o Syntopicon (Adler/Hutchins, 102 ideias, estrutura canônica).
- O que é A Grande Conversa e por que existe (mapa vs território).
- **Como ler** (conteúdo movido da Home).
- Método: fontes primárias, provenance, Reference ≠ Passage, honestidade numérica, RAW FIRST.
- Escopo atual: Justice como golden case; as demais ideias chegam depois de Justice estar estável.

## 14. Search

- **V1: nenhuma busca global.** Somente o filtro local da página `/ideias`.
- `/busca` não existe na V1. Busca global: **V1.1**.
- Ao implementar a V1.1, decidir aí entre busca client-side simples vs página dedicada — fora do escopo atual.

## 15. Mobile

- Uma coluna; uma ação primária por bloco.
- **Mesmo mecanismo** de árvore do desktop: accordion inline. Não criar dois mecanismos concorrentes.
- Passagem longa no mobile pode oferecer `Abrir página` → `/passagem/{id}`.
- Bottom sheet: **V1.1**.

## 16. Visual

- Paleta editorial já existente no repositório (adequada — manter).
- Tipografia: serifa para conteúdo canônico; sans para UI.
- Baixa densidade; pouco ornamento; foco no texto.
- Sem imagens ilustrativas por ideia na V1 (retratos/imagens editoriais: V1.1, jamais como dado).
- Provenance na V1: badge discreto; popover detalhado: V1.1.

## 17. Justice Golden Path — caminho canônico

```
HOME
→ GRANDES IDEIAS (/ideias)
→ JUSTIÇA (/ideias/42-justice)
→ 8 (/ideias/42-justice/8)
→ 8c (/ideias/42-justice/8c)
→ 8c(1) (/ideias/42-justice/8c-1)
→ AUTOR / OBRA / REFERENCE
→ PASSAGE (/passagem/{id}) ou FICHA BIBLIOGRÁFICA HONESTA
```

- Great Idea **42 — Justice / Justiça** é o **golden case**: a V1 ingere **somente Justice** (Introduction, Outline com 41 nós, References, Cross-References, Additional Readings, Authors, Works, Passages recuperáveis).
- O caminho precisa funcionar **inclusive com Passage ausente** (ficha honesta).
- Detalhe da jornada de um usuário real: §23.8.

## 18. O que copiar (princípios Mortimer) / o que podemos fazer melhor

### 18.1 Princípios a preservar deliberadamente

1. Progressão muito simples do geral ao específico.
2. Home editorial, não dashboard.
3. Grande Ideia como hero + conteúdo imediatamente explorável.
4. Entrada rápida nas 102 ideias.
5. Baixa densidade visual.
6. Poucos níveis visíveis por vez.
7. Descoberta por autores/pensadores.
8. Contagens como orientação (só com números reais).
9. Listas fáceis de escanear.
10. Experiência que conduz rápido ao conteúdo.
11. Mobile simples.
12. Pouca ornamentação.
13. Múltiplas portas de descoberta sem virar sistema acadêmico visível.
14. Foco no texto/conteúdo.
15. Progressive disclosure.

### 18.2 Não copiar

- Código, CSS, assets, marca, textos editoriais, identidade visual proprietária.
- Erros de terminologia ("Topics/Subtopics" invertidos).
- Categorias históricas duvidosas (Hobbes/Shakespeare "Medieval").
- Achatamento que destrói a hierarquia de Adler.
- Números não verificáveis ("100k+").
- Demo dessincronizada dos dados.
- CTA de alvo rotativo.

### 18.3 Onde somos deliberadamente melhores

1. Terminologia canônica (Grande Ideia → Topic).
2. Hierarquia completa e visível (41 nós, 3 níveis, códigos canônicos).
3. Entidades separadas e provenance por registro.
4. Honestidade numérica (contagens só quando extraídas e estáveis).
5. Número canônico + código canônico presentes na URL e na UI.
6. Reference Card honesta em vez de beco sem saída.

## 19. Escopo: V1 / V1.1 / Future (resumo)

O lock bruto está em **§23.4**. Resumo:

- **V1 (MUST):** provar o eixo central HOME → GRANDES IDEIAS → JUSTIÇA → TOPIC → AUTOR/OBRA/REFERENCE → PASSAGE ou ficha honesta. Inclui ingestão **somente do golden case Justice**.
- **V1.1 (NICE):** busca global, A–Z, "Ideia ao acaso", Inventory of Terms (`/termos`), retratos, imagens editoriais, bottom sheet, copiar localização, print CSS, provenance popover, Author/Work estendidos.
- **FUTURE (DEFERRED):** IA, Compare completo, Study Mode, notas, favoritos, colaboração, grafo global, recomendações, gamificação, recursos sociais, modo físico completo, categorias editoriais, ingestão das outras 101 ideias.

Regra de corte:

> Se a complexidade não é exigida por Adler nem gera benefício forte, sai da V1.

---

# APÊNDICES

## 20. Apêndice A — Confronto com o repositório (estado em 2026-09-02, commit `60bafdc`)

### 20.1 O que existe e PRESERVAMOS

- Dataset canônico com as **102 Grandes Ideias** em PT (`data/ideas.ts`), com teste de cardinalidade e unicidade (`tests/syntopicon.test.ts`).
- Lista PT coerente com o canon confirmado em 02/09/2026: inclui `Governo` (Government) e `Hábito` (Habit); não inclui "Graça" — consistente com a lista canônica (ver Apêndice B).
- Provenance por registro com camadas `original-corpus` / `derived-structure` / `interpretive-content` e registro de fontes (`data/source-registry.ts`).
- Knowledge graph que **rejeita relação com ponta não resolvida** (`lib/knowledge-graph/index.ts`) — nenhuma relação inventada.
- ADR-001 e ROADMAP (disciplina de decisão).
- Normalização estável de slug/ID (`canonicalizeIdeaSlug`).
- Rotas estáticas `/` e `/ideas` (Next.js App Router, `force-static`).

### 20.2 Onde está CLARAMENTE pior que o Mortimer

- Experiência rasa: Home com um CTA e nada além; página de ideia sem Introduction/Outline.
- `EvidenceBadge` + seção "Proveniência" aparecem **cedo demais** para o leitor (provenance é camada de auditoria, não conteúdo de abertura).
- Sem navegação profunda Topic → Author/Work → Passage; sem References/Cross-References/Additional Readings.
- Página de ideia é um beco sem saída ("Nenhum tópico... é exibido") — honesto, mas sem riqueza.
- Numeração canônica ausente do dataset e da UI/URL.

### 20.3 Divergências código ↔ spec (o código muda futuramente)

| Item | Hoje | Spec V1 |
|---|---|---|
| Rota do índice | `/ideas` | `/ideias` |
| Slug da ideia | derivado do nome PT (`justica`) | `slugEn` (`justice`) em URL; nome PT é apresentação |
| `Idea` | sem `number`/`nameEn` | `number` 1–102, `nameEn`, `slugEn` |
| Páginas de Topic/Reference/Passage/Author/Work | não existem | especificadas em §9–§12 |
| Ingestão | nada além da lista de ideias | golden case Justice (único conteúdo da V1) |

## 21. Apêndice B — Evidências da auditoria (FATO / INFERÊNCIA / HIPÓTESE)

Regras: ausência de evidência não é evidência de ausência; observação do benchmark não vira dado canônico nosso; `[re-check 2026-09-02]` = confirmado ao vivo nesta data.

### Terminologia e estrutura

- [FATO] As 102 entradas do Mortimer são chamadas "Topics" e os itens internos "Subtopics" — conflita com o canon (102 GREAT IDEAS → TOPICS).
- [FATO] Justice é `/topic/42`; Judgment é `/topic/41`; Knowledge `/topic/43`; Labor `/topic/44` `[re-check 2026-09-02]`.
- [FATO] O hero de Justice exibe "41 subtopics" `[re-check 2026-09-02]`.
- [INFERÊNCIA FORTE] 41 = 11 (nível 1) + 28 (nível 2) + 2 (nível 3) — exatamente a estrutura do Outline de Justice em Justice.pdf. O modelo interno do Mortimer não é público; não afirmar como fato sobre o banco deles.
- [FATO] A experiência observada aplana a estrutura; não há página hierárquica de primeira classe para 8c(1) [re-check 2026-09-02: itens internos linkam para `/subtopics/{id}` plano].
- [FATO] Itens internos têm contagem de passagens ("27 passages") e alguns aparecem sem contagem [re-check 2026-09-02].
- [FATO] Typo "Theorietical" em item interno de Judgment [re-check 2026-09-02] — controle de qualidade de dados falho no benchmark.

### Numeração canônica (resolvida nesta consolidação)

- [FATO] A lista canônica dos 102 inclui **Government (#31)** e **Habit (#32)** e **não inclui "Grace"** — fontes editoriais independentes (sumário do Syntopicon Vol. I; resumo editorial dos 102; matéria sobre o Syntopicon citando "#1: Angel a #102: World") + ordenação do mirror batem em: Desire=17, Judgment=41, **Justice=42**, Knowledge=43, Labor=44 `[re-check 2026-09-02]`.
- [FATO] Isso valida o dataset PT do repositório (Governo/Hábito presentes) e o número 42 do golden path.
- [PENDENTE] Confirmar a lista contra o Volume 2 físico na ingestão (fontes secundárias hoje; fonte primária preferida).

### Home e descoberta

- [FATO] CTA "Start Exploring" → `/topic/17` (Desire) na auditoria; → `/topic/26` (Family) no re-check `[re-check 2026-09-02]`.
- [INFERÊNCIA] O alvo do CTA é dinâmico/rotativo. Não copiar: nosso CTA é fixo.
- [FATO] Stats: "102 Topics / 3000+ Subtopics / 100k+ Passages" `[re-check 2026-09-02]`.
- [FATO] Demo "Your Journey Awaits" mostra "Justice — 12 subtopics" vs 41 na página — inconsistência interna [re-check 2026-09-02].
- [FATO] Browse by Category: 9 categorias (7+17+6+5+20+28+3+3+13 = 102) [re-check 2026-09-02].
- [FATO] Classificações históricas questionáveis (Hobbes/Shakespeare "Medieval") — auditoria.

### Superfícies ausentes e infra

- [FATO] Rotas públicas testadas (`/search`, `/authors`, equivalentes) sem páginas equivalentes na auditoria.
- [INFERÊNCIA] Sugere ausência dessas páginas públicas; **não** afirmar "Mortimer não tem busca" — pode haver busca client-side.
- [FATO] `www.mortimer.app/topic/42` retornou só parte do conteúdo; o mirror completo.
- [HIPÓTESE] Causa: SSR/client rendering/deployment — não apresentar como comprovada.
- [FATO] Claim "100k+ passages".
- [UNRESOLVED] Sem método público para verificar. Claim observado ≠ número canônico comprovado. Proibido citar como nosso.
- [FATO] Versão antiga (Wayback) com rota `/excerpt/[id]`; equivalente atual não verificada [UNRESOLVED].
- [FATO] `mortimer.vercel.app` usava imagens ilustrativas por ideia (Supabase storage) [re-check 2026-09-02].

## 22. Apêndice C — Conteúdo canônico de Justice (golden case)

- **Great Idea 42 — Justice / Justiça.**
- **Outline de Justice:** 11 Topics de nível 1; 28 de nível 2; 2 de nível 3 → **total estrutural = 41 nós** (11 + 28 + 2 = 41). [FATO — Justice.pdf, consultado na auditoria anterior]
- **Topic canônico do golden path:** `8c(1)` — título original: **"Economic exploitation: chattel slavery and wage slavery"**.
- **REFERENCES de Justice começam na página impressa 859** (Justice.pdf). Correção oficial desta spec: **não** perpetuar "862" — 862 é localização de referências de Topics posteriores, não o início global da seção. [FATO — Justice.pdf, auditoria anterior]
- **Topic 8c aponta para a região da página impressa 868.** [FATO — Justice.pdf, auditoria anterior; reconfirmar na ingestão]
- **Cross-References e Additional Readings:** declarar páginas exatas SOMENTE após confirmação direta na fonte.
- **RAW FIRST:** texto/locator original preservado antes de qualquer normalização; uma linha impressa pode conter 1 autor, várias obras, vários locators.
- **Estado da fonte neste workspace:** Justice.pdf NÃO está presente no checkout atual. Os números acima herdam a confiança da sessão anterior (consulta direta registrada) e têm **re-confirmação obrigatória** no passo de ingestão, antes de exibir qualquer página impressa na UI.

---

# 23. CONSOLIDAÇÃO FINAL — V1 LOCKED

## 23.1 Revisão adversarial — cortes efetuados e por quê

Pergunta-guia: *estamos fazendo um Mortimer em português, melhor precisamente onde Adler nos permite ser melhor — ou criamos novamente um produto mais complicado?*

| # | Corte / correção | Motivo |
|---|---|---|
| 1 | "Como ler" removido da Home | Pertence a `/sobre`; Home fica tão simples quanto a do Mortimer |
| 2 | Busca global fora da V1 | Custo alto, valor duplicado do filtro local; V1.1 |
| 3 | A–Z como modo extra → V1.1; "Ideia ao acaso" → V1.1 | Antecipação de feature; a lista de 102 não precisa disso para provar o eixo |
| 4 | Inventory of Terms / `/termos` fora da V1 | Diferencial real, mas exige camada transversal própria; não criar `/termos` vazio |
| 5 | Bottom sheet mobile fora da V1 | Um mecanismo só (accordion); dois mecanismos = complexidade concorrente |
| 6 | "Copiar localização" e print CSS → V1.1 | Fricção baixa na V1; o link da passagem já compartilha |
| 7 | "Compartilhar" como feature removida | O link É o compartilhamento |
| 8 | Provenance popover → V1.1; badge discreto | Provenance cedo demais espanta o leitor (erro observado no nosso app atual) |
| 9 | Retratos, biografia, timeline, imagens editoriais → V1.1 | Enriquecem depois que o eixo está provado; nunca como dado |
| 10 | Truncation sofisticada "ver todos" removida | Justice tem 11 tópicos de nível 1; progressive disclosure resolve |
| 11 | Author/Work reduzidos ao mínimo | Derivar do corpus real de Justice; extenso é V1.1 |
| 12 | Categorias editoriais (estilo Mortimer) fora do escopo | Adição interpretativa não-Adler; reavaliar no FUTURE |
| 13 | CTA rotativo não copiado | CTA fixo; observação de alvo dinâmico no benchmark |
| 14 | Contagens de References normalizadas proibidas até estabilizar ingestão | Reference ≠ linha impressa (§23.9) |
| 15 | Exemplos fictícios (Marx, O Capital, locators inventados) removidos | Nenhum exemplo não-fonte pode parecer corpus; mocks marcados [EXEMPLO ILUSTRATIVO] e nunca usados para seed |
| 16 | URL da ideia: `42-justica` (PT) → `42-justice` (slugEn) | Identificador persistente não pode depender de tradução |
| 17 | Demo da Home só com dados reais sincronizados | O benchmark mostra demo dessincronizada (12 vs 41) — não reproduzir |
| 18 | Números frágeis removidos da Home | Só 102 (canônico) e contagens reais de Justice pós-ingestão |

## 23.2 FATO / INFERÊNCIA / HIPÓTESE — conclusões sobre o Mortimer

| Conclusão | Tipo | Base |
|---|---|---|
| Terminologia "Topics/Subtopics" invertida | FATO | Observação direta |
| Justice = `/topic/42`, hero "41 subtopics" | FATO | Observação direta `[re-check 2026-09-02]` |
| 41 = 11+28+2 do Outline de Justice | INFERÊNCIA FORTE | Compatibilidade exata; modelo interno deles não é público |
| Estrutura achatada; 8c(1) não é página de 1ª classe | FATO | Observação direta |
| CTA "Start Exploring" com alvo dinâmico (17→26) | FATO + INFERÊNCIA | Auditoria vs re-check `[re-check 2026-09-02]` |
| Busca global pública | NÃO OBSERVADA (INFERÊNCIA de ausência) | `/search` 404 na auditoria; busca client-side possível |
| Author pages públicas | NÃO OBSERVADAS | Sem rotas equivalentes na auditoria |
| Work pages públicas | NÃO OBSERVADAS | Sem rotas equivalentes na auditoria |
| Breadcrumb hierárquico | NÃO OBSERVADO | Navegação observada é plana |
| Passage page pública | PARCIAL | `/excerpt/[id]` (Wayback, antigo); `/subtopics/{id}` agrupa hoje |
| Diferença www vs mirror (SSR/deploy) | HIPÓTESE | www retornou conteúdo parcial; causa não comprovada |
| Eras históricas (Hobbes "Medieval") | FATO | Observação direta |
| "100k+ passages" | FATO (claim) + UNRESOLVED (verificação) | Claim exibido; sem método público de verificação |
| Demo "Justice — 12 subtopics" dessincronizada | FATO | Home (12) vs página (41) `[re-check 2026-09-02]` |
| Versão v1/2024 vs atual | FATO (mudanças existem) | Wayback vs hoje (CTA, rotas) |

## 23.3 Números — provenance e confiança

| Métrica | Valor | Fonte/edição | Confiança |
|---|---:|---|---|
| Grandes Ideias | 102 | Syntopicon (GBWW Vols. 2–3); consistente com mirror `[re-check 2026-09-02]` | Alta |
| Posição canônica de Justice | 42 (Desire=17, Government=31, Habit=32, Judgment=41, Knowledge=43) | Ordem alfabética EN do Syntopicon; fontes editoriais + mirror | Alta (confirmar contra Vol. 2 na ingestão) |
| Outline de Justice | 11 + 28 + 2 = 41 nós | Justice.pdf (auditoria anterior) | Alta — reconfirmar na ingestão |
| Início das References de Justice | p. impressa 859 (corrige o antigo "862") | Justice.pdf (auditoria anterior) | Alta — reconfirmar na ingestão |
| Referências do Topic 8c | região da p. impressa 868 | Justice.pdf (auditoria anterior) | Média-alta — reconfirmar |
| Topics+subtopics do Syntopicon | ~2.987 | Material editorial secundário (mirror arredonda p/ "3000+") | Média — não é contagem do nosso modelo; definir a nossa pós-ingestão |
| Corpus GBWW 1ª ed. | 74 autores · 443 obras · 54 vols | Editorial GBWW (1952) | Média-alta — vale só para essa edição |
| Passagens | **não declarar** | Nossa extração futura | — (proibido: "100k+" é claim do Mortimer, não nosso dado) |

Regras: contagens de autores/obras/passagens/References normalizadas só aparecem como dados reais após extração estável. Números do Mortimer não são autoridade.

## 23.4 V1 LOCK — MUST / NICE / FUTURE

### MUST HAVE (V1)

Provar apenas o eixo central: HOME → GRANDES IDEIAS → JUSTIÇA → TOPIC → AUTOR/OBRA/REFERENCE → PASSAGE ou estado bibliográfico honesto.

- Home (simples, 1 CTA fixo, demo real de Justice)
- Grandes Ideias (`/ideias`, 102, filtro local)
- Grande Ideia Justice (`/ideias/42-justice`, Introduction + Outline em árvore com 41 nós)
- Topic hierárquico (`/ideias/42-justice/{código}`, ex. `8c-1`)
- References (raw-first, agrupadas por autor→obra)
- Passage (`/passagem/{id}`) ou Reference Card honesta
- Author mínimo · Work mínimo
- Sobre (`/sobre`)
- Breadcrumbs/contexto + navegação de retorno
- Responsive essencial (mesmo mecanismo de árvore)
- Ingestão **exclusiva do golden case Justice** (RAW FIRST)

### NICE TO HAVE (V1.1)

- Busca global · A–Z como modo adicional · "Ideia ao acaso"
- Inventory of Terms + `/termos`
- Retratos · imagens editoriais
- Bottom sheet · copiar localização · print CSS
- Provenance popover detalhado
- Author com Topics/timeline/biografia · Work com fontes externas adicionais

### FUTURE (DEFERRED)

- IA · Compare completo · Study Mode · notas · favoritos
- Colaboração · grafo global · recomendações · gamificação · recursos sociais
- Modo físico completo · categorias editoriais
- **Ingestão das outras 101 ideias (só depois de Justice estável)**

## 23.5 COPY STRONGLY / ADAPT / DO NOT COPY

### COPY STRONGLY (operacional)

1. Home editorial: hero de marca + proposta de valor + **um** CTA; zero dashboard.
2. **Hero da Grande Ideia seguido imediatamente pelo Outline de Topics** navegável.
3. Progressão geral → específico em ≤ 3 cliques do hero ao item interno.
4. Contagens reais como orientação ("41 tópicos", "N referências") junto ao item.
5. Listas escaneáveis: título forte + descrição de uma linha.
6. Descoberta por pensadores: autores visíveis já na página de Topic.
7. Entrada imediata nas 102 ideias, sem cadastro nem configuração.
8. Baixa densidade visual; poucos níveis visíveis por vez.
9. Mobile de uma coluna, uma ação primária por bloco.
10. URL estável e legível por item de conteúdo.

### ADAPT

1. Contagem do hero: "41 subtopics" → **"41 tópicos em 3 níveis (11 de nível 1)"**.
2. Lista achatada → **árvore com accordion** (exigência de Adler).
3. CTA rotativo → CTA fixo para o golden path.
4. Stats da home (102/3000+/100k+) → só números nossos verificados.
5. Demo "Your Journey Awaits" → demo real, sincronizada com o dataset (se Justice ingerida, mostrar 8c(1) de verdade).
6. Vista Cards/Index + Shuffle → só Index na V1; alternância V1.1.
7. Imagens ilustrativas por ideia → V1.1 opcional, jamais como dado.
8. IDs opacos (`/subtopics/1021`) → código canônico na URL (`8c-1`).

### DO NOT COPY

1. Terminologia "Topics/Subtopics" (invertida vs canon).
2. Eras históricas questionáveis (Hobbes/Shakespeare "Medieval").
3. Claim "100k+ passages" ou qualquer número não verificável.
4. Demo dessincronizada dos dados.
5. Achatamento destrutivo da hierarquia.
6. Categorias editoriais como navegação primária.
7. Código, CSS, assets, marca, textos editoriais, identidade visual.
8. Qualidade de dados com typos em títulos canônicos.

## 23.6 PAGE-BY-PAGE LOCK

### HOME
- **PRIMARY:** marca; proposta de valor; CTA explorar (fixo); demonstração do corpus/golden path (Justice real); entrada em Grandes Ideias.
- **SECONDARY:** números honestos (102; contagens reais de Justice); pensadores reais extraídos do corpus, se houver dados suficientes.
- **HIDDEN/ON DEMAND:** provenance (badge discreto).
- **NOT IN V1:** busca global; tutorial extenso; categorias; grafo; IA.

### GRANDES IDEIAS (`/ideias`)
- **PRIMARY:** 102 ideias; número canônico; nome PT; nome EN; filtro local por texto.
- **SECONDARY:** contagem real de Topics, quando disponível (na V1, só Justice).
- **NOT IN V1:** A–Z toggle; random; filtros interpretativos; categorias.

### JUSTIÇA (`/ideias/42-justice`)
- **PRIMARY:** 42; Justiça/Justice; Introduction; Outline; Topics hierárquicos (41 nós, accordion); caminho até 8c(1).
- **SECONDARY:** autores/obras derivados das referências; Cross-References; Additional Readings.
- **HIDDEN/ON DEMAND:** metadata/provenance detalhada.
- **NOT IN V1:** qualquer coisa que aplane os 41 nós.

### TOPIC 8c(1) (`/ideias/42-justice/8c-1`)
- **PRIMARY:** breadcrumb (Grandes Ideias → Justiça → 8 → 8c → 8c(1)); código; título canônico; autores; obras; linhas de referência reais (raw); CTA "Ler" quando houver Passage; ficha honesta quando não.
- **SECONDARY:** locator; edition; source.
- **NOT IN V1:** resumo de IA; "posição do autor" gerada; related sem fonte.

### AUTHOR (`/autores/{slugEn}`) — mínimo
- **PRIMARY:** header; obras no corpus; Grandes Ideias relacionadas via corpus real (V1: via Justice).
- **NOT IN V1:** retrato, biografia, timeline, seção extensa de Topics (V1.1).

### WORK (`/obras/{slugEn}`) — mínimo
- **PRIMARY:** header; autor; referências/passagens; Topic e Grande Ideia correspondentes.
- **NOT IN V1:** fontes externas adicionais (V1.1).

### PASSAGE (`/passagem/{id}`) / REFERENCE STATE
- **PRIMARY:** texto + contexto + retorno ao Topic.
- **REFERENCE STATE:** sem texto → Reference Card útil na página do Topic. **Nenhum beco sem saída.**
- **NOT IN V1:** página de passagem vazia; compartilhar como feature (o link basta); copiar localização/print (V1.1).

## 23.7 Teste contra Mortimer (por tela)

| Tela | Tão simples? | Tão rica? | Complexidade extra | Exigida por Adler? |
|---|---|---|---|---|
| Home | Sim (menos blocos que eles) | Sim (demo real) | Demo sincronizada | Sim — é a proposta do produto |
| Grandes Ideias | Sim | Sim | Filtro local | Não, mas reduz fricção mecânica (mantido) |
| Grande Ideia | Sim (11 visíveis) | Mais (árvore 41 nós) | Hierarquia + códigos | **Sim** (núcleo do produto) |
| Topic | Sim | Mais (raw + ficha honesta) | Reference Card | Sim — honestidade sem beco sem saída |
| Author | Sim (mais simples que deles — não existe) | Suficiente | — | Mínimo derivado do corpus |
| Work | Sim | Suficiente | — | Mínimo derivado do corpus |
| Passage | Sim | Sim | Contexto + retorno | Sim — destino real do leitor |

Conclusão: nenhuma tela V1 é mais pesada que o Mortimer; as complexidades extras remanescentes são exigidas por Adler ou removem fricção mecânica.

## 23.8 Justice Golden Path — usuário real

Desejo: **"Quero entender exploração econômica."**

1. **O que vê:** Home editorial com um CTA e um card real do golden path (Justiça).
2. **Onde clica:** "Explorar as 102 Grandes Ideias" (ou o card de Justiça).
3. **Decisão intelectual 1:** entre as 102 ideias, reconhece que exploração econômica cruza escravidão/trabalho/riqueza e escolhe **42 · Justiça**. (Na V1, só Justiça tem dados — a interface honesta mostra isso.)
4. **O que vê:** capa da ideia (42, Justiça/Justice), Introduction, e logo abaixo o **Outline** com "41 tópicos em 3 níveis (11 de nível 1)".
5. **Onde encontra 8:** varre os 11 tópicos de nível 1, abre o tópico 8 (accordion) — injustiças/exploração.
6. **Onde encontra 8c:** expande 8 → escolhe **8c** ("Economic exploitation…").
7. **Quando escolhe 8c(1):** expande 8c → clica **8c(1) — "Economic exploitation: chattel slavery and wage slavery"** — é exatamente o interesse dele.
8. **Quando encontra autores:** a página de 8c(1) lista as referências reais agrupadas por autor → obra (descoberta por pensadores).
9. **Quando chega ao texto:** clica "Ler" numa referência com Passage recuperada → `/passagem/{id}` com texto, locator e contexto; para as sem texto, vê a ficha bibliográfica honesta (autor, obra, locator, edição) — nunca um beco sem saída.
10. **Como retorna e continua:** breadcrumb/voltar o trazem de volta a 8c(1) e à árvore para escolher a próxima referência ou um tópico irmão — as escolhas intelectuais ficam com ele; a logística custa poucos cliques.

## 23.9 Reference ≠ linha impressa — lock epistemológico

- Uma **linha impressa** do Syntopicon pode conter: um autor, várias obras, vários locators → NÃO é necessariamente uma Reference normalizada.
- Contar/apresentar "References normalizadas" só depois de: extração raw estável → regra de parse definida → validação por amostra contra a fonte.
- Nenhuma UI da V1 exibe contagem de References normalizadas.
- RAW FIRST: o raw é preservado no dado e consultável (V1: visível na Reference Card; popover detalhado V1.1).

## 23.10 URLs — LOCK

**Lock: `/ideias/42-justice/8c-1`** (reavaliado nesta rodada; sem solução claramente superior).

- Rejeitado: `/ideias/42-justica/8c-1` — a tradução PT não pode ser identificador persistente (pode mudar).
- Racional: `42` = identidade canônica; `justice` = derivado do nome canônico EN (`slugEn`); `8c-1` = derivado do código canônico `8c(1)`; suporta Topics aninhados (`8`, `8c`, `8c-1`); legível; estável.
- No modelo: **`slugEn` é o slug de URL**; nome PT é dado de apresentação.
- Mapa completo de rotas V1:

| Rota | Página |
|---|---|
| `/` | Home |
| `/ideias` | 102 Grandes Ideias (filtro local) |
| `/ideias/{n}-{slugEn}` | Grande Ideia (V1: só `42-justice` com conteúdo) |
| `/ideias/42-justice/{codigo}` | Topic (ex.: `8`, `8c`, `8c-1`) |
| `/autores/{slugEn}` | Author mínimo |
| `/obras/{slugEn}` | Work mínimo |
| `/passagem/{id}` | Passage |
| `/sobre` | Sobre |

- Código canônico na URL: parênteses/pontos viram hífen (`8c(1)` → `8c-1`); regex do código definida na ingestão; colisão de slug → resolver na ingestão, nunca na mão.
- Sem aliases PT, sem `/42-justica`, sem `/ideas` (migrar a rota atual), sem páginas V1 para ideias sem dados (a entrada de ideias sem ingestão acontece em `/ideias` como lista, não como página vazia).

---

# 24. CODEX HANDOFF — V1

```text
# CODEX HANDOFF — A GRANDE CONVERSA / SPEC V1 (LOCKED 2026-09-02)

OBJETIVO
Provar o eixo: HOME → GRANDES IDEIAS → JUSTIÇA → TOPIC → AUTOR/OBRA/REFERENCE
→ PASSAGE (ou ficha bibliográfica honesta). Simples como o Mortimer, hierárquico
como Adler. Produto pessoal de estudo, em português.

ROTAS V1 (lock §23.10)
/  ·  /ideias  ·  /ideias/42-justice  ·  /ideias/42-justice/{8,8c,8c-1,...}
/autores/{slugEn}  ·  /obras/{slugEn}  ·  /passagem/{id}  ·  /sobre
Migrar /ideas → /ideias. slugEn na URL; nome PT é apresentação. Sem /busca, /termos, /42-justica.

ARQUITETURA CANÔNICA (não alterar)
GREAT IDEA (Introduction · Outline of Topics · References · Cross-References ·
Additional Readings) → Topic (hierárquico, código canônico: 8 → 8c → 8c(1)).
Author ≠ Work ≠ Edition ≠ Passage. Reference (Topic→Author→Work→Locator) ≠
Passage (texto recuperado). Reference ≠ linha impressa (1 linha impressa pode ter
1 autor, várias obras, vários locators). RAW FIRST. Provenance por registro.
Sem relação interpretativa sem fonte no corpus.

ESCOPO DE DADOS
Ingerir SOMENTE o golden case Justice (Great Idea 42):
Introduction, Outline (11 nível-1 + 28 nível-2 + 2 nível-3 = 41 nós),
References (começam na p. impressa 859 — reconfirmar no Justice.pdf),
Cross-References, Additional Readings, Authors, Works, Passages recuperáveis.
NÃO ingerir as outras 101 ideias. NÃO seedar o banco com exemplos da spec.
Não exibir contagem de References normalizadas até a regra de parse estar validada.

COMPORTAMENTO DAS PÁGINAS
- Home: marca + proposta + 1 CTA fixo ("Explorar as 102 Grandes Ideias") + card real
  do golden path (Justice) + link /sobre. Números: só 102 e contagens reais de Justice.
- /ideias: 102 itens (número canônico, nome PT, nome EN) + filtro local client-side.
  Contagem de Topics só onde há dados (na V1, só Justice: 41). Sem "0"/placeholder.
- Grande Ideia: capa (42, Justiça/Justice) → Introduction → Outline em árvore,
  accordion inline, 11 nível-1 visíveis, códigos canônicos visíveis, hero diz
  "41 tópicos em 3 níveis (11 de nível 1)". References/Cross-Refs/Additional
  Readings on demand.
- Topic: breadcrumb clicável (Grandes Ideias → Justiça → 8 → 8c → 8c(1)); código +
  título canônico EN + título PT; referências raw agrupadas por autor→obra; "Ler"
  quando há Passage; Reference Card honesta (autor, obra, locator, edição) quando não.
  Desktop e mobile: MESMO accordion. Passagem longa no mobile → "Abrir página".
- Passage: só existe com texto recuperado (nunca página vazia). Texto + contexto +
  locator + retorno ao Topic + links autor/obra. Compartilhar = o link.
- Author/Work: mínimos (header; obras/ideias via corpus real de Justice).
- /sobre: o que é o Syntopicon, como ler, método (fontes, provenance, RAW FIRST),
  escopo atual.

PRINCÍPIOS COPIADOS DO MORTIMER (simplicidade)
Home editorial sem dashboard; hero da ideia seguido IMEDIATAMENTE do outline;
geral→específico em ≤3 cliques; contagens reais como orientação; listas escaneáveis
(título + 1 linha); autores visíveis cedo; baixa densidade; mobile 1 coluna;
URL estável por item; entrar no conteúdo sem cadastro.

DIFERENÇAS EXIGIDAS POR ADLER
Terminologia Grande Ideia → Topic (nunca "topic/subtopic" invertido); hierarquia
intacta (nada achatado); códigos canônicos na URL e UI; Reference ≠ Passage;
ficha honesta em vez de beco sem saída; números só quando extraídos (nunca claims
tipo "100k+"); provenance discreta (badge), não na cara do leitor; sem eras
históricas; sem categorias editoriais; CTA fixo.

CRITÉRIOS DE ACEITAÇÃO
1. Golden path navegável ponta a ponta, inclusive com Passage ausente (ficha honesta).
2. Os 41 nós de Justice presentes na árvore; hero "41 tópicos em 3 níveis (11 de nível 1)".
3. URLs exatamente as do lock; rotas antigas redirecionadas; nada de /42-justica.
4. Nenhuma contagem exibida sem dado real extraído; nenhum exemplo fictício no banco.
5. Nenhuma página vazia prevista para a V1; nenhum beco sem saída.
6. Provenance em todo registro; raw preservado antes de normalizar.
7. Mobile usa o mesmo mecanismo do desktop (accordion).
8. Testes de regressão existentes (102 ideias, grafo) continuam passando.
9. Performance/static-first preservado (rotas estáticas quando possível).

NÃO IMPLEMENTAR
Busca global (/busca) · A–Z toggle · "Ideia ao acaso" · Inventory of Terms (/termos)
· bottom sheet · copiar localização · print CSS · provenance popover · retratos/
biografia/timeline · imagens editoriais · categorias · eras · IA/resumos · grafo
decorativo · favoritos/notas · gamificação · ingestão das outras 101 ideias.
```

---

# 25. RESULTADO FINAL

Bloco final e vinculante. READY_FOR_CODEX = YES → **não implementar nesta etapa; PARE.**

```text
SPEC_STATUS = LOCKED

TOP_10_COPY_FROM_MORTIMER =
1. Home editorial: hero + proposta de valor + um CTA, zero dashboard.
2. Hero da Grande Ideia seguido imediatamente pelo Outline de Topics navegável.
3. Progressão geral → específico em ≤ 3 cliques.
4. Contagens reais como orientação junto a cada item ("41 tópicos", "N referências").
5. Listas escaneáveis: título forte + descrição de uma linha.
6. Descoberta por pensadores (autores visíveis já na página de Topic).
7. Entrada imediata nas 102 ideias, sem cadastro nem configuração.
8. Baixa densidade visual; poucos níveis visíveis por vez; progressive disclosure.
9. Mobile de uma coluna, uma ação primária por bloco.
10. URL estável e legível por item de conteúdo.

TOP_5_ADLER_ADVANTAGES =
1. Terminologia canônica: Grande Ideia → Topic (nunca "Topics/Subtopics" invertidos).
2. Hierarquia completa preservada e navegável (Justice: 41 nós, 3 níveis, códigos canônicos).
3. Entidades separadas com provenance: Author ≠ Work ≠ Edition ≠ Passage; Reference ≠ Passage.
4. Honestidade numérica: contagens só de dados extraídos e estáveis; zero claims.
5. Identidade canônica na URL e na UI: número da ideia (42) + código do topic (8c(1)).

V1_PAGES =
/ · /ideias · /ideias/42-justice · /ideias/42-justice/{8, 8c, 8c-1, ...códigos} ·
/autores/{slugEn} · /obras/{slugEn} · /passagem/{id} · /sobre

V1_MUST_HAVE =
Home editorial com CTA fixo e demo real de Justice · /ideias com 102 + filtro local ·
Grande Ideia Justice com Introduction + Outline em árvore (41 nós) · Topic hierárquico
com breadcrumb · References raw-first agrupadas por autor→obra · Passage ou Reference
Card honesta · Author mínimo · Work mínimo · /sobre · contexto/retorno em tudo ·
responsive essencial com um único mecanismo · ingestão exclusiva do golden case Justice.

V1_1 =
Busca global · A–Z como modo adicional · "Ideia ao acaso" · Inventory of Terms (/termos)
· retratos · imagens editoriais · bottom sheet · copiar localização · print CSS ·
provenance popover detalhado · Author com Topics/timeline/biografia · Work com fontes
externas · vista Cards além do Index.

DEFERRED =
IA · Compare completo · Study Mode · notas · favoritos · colaboração · grafo global ·
recomendações · gamificação · recursos sociais · modo físico completo · categorias
editoriais · ingestão das outras 101 ideias (só depois de Justice estável).

UNRESOLVED_FACTS =
1. "100k+ passages" do Mortimer: sem método público de verificação (nunca usar como nosso dado).
2. Causa da diferença www vs mirror: SSR/deploy é hipótese, não fato.
3. Páginas impressas exatas de Cross-References e Additional Readings de Justice: confirmar no Justice.pdf na ingestão.
4. 859/868 herdam confiança da sessão anterior (Justice.pdf ausente neste workspace): reconfirmar antes de exibir página impressa na UI.
5. Composição interna dos "41 subtopics" do hero do Mortimer: modelo não público (inferência forte apenas).
6. Mecanismo do CTA rotativo do Mortimer: desconhecido (observado 17→26 entre auditoria e re-check).

GOLDEN_PATH =
HOME → /ideias → /ideias/42-justice → /ideias/42-justice/8 → /ideias/42-justice/8c
→ /ideias/42-justice/8c-1 → autor/obra/reference → /passagem/{id} ou ficha bibliográfica honesta
→ retorno por breadcrumb à árvore.

READY_FOR_CODEX = YES
```
