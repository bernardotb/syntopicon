# AUDIT — Análise comparativa e criação do Justice Arena App

Sessão Arena: 2026-09-09 · Repositório: `bernardotb/syntopicon` · Branch de trabalho: `arena/01a087d4-syntopicon`

---

## 1. Busca dos candidatos (método e evidência)

O manifesto pedia três apps históricos (`syntopicon-justice-app`, `syntopicon---grande-ideia-42`,
`justice-syntopicon-final.html`). Busca executada por progressão (§11 do manifesto):

1. `main` (22 arquivos) — fundação: schema `lib/syntopicon`, 102 ideias, 4 testes. **Sem Justice.**
2. Todas as branches remotas: `arena/01a05420` (corpus Vol. 1, docs), `arena/01a06414` (golden case),
   `arena/01a07cdd` (ecossistema), `corpus` (só README).
3. Histórico completo dos 23 commits do repositório (`git rev-list --all --objects`): **nenhum**
   arquivo `justice-syntopicon-final.html`, `data/justice.json`+`src/domain.ts`+`tests/invariants.mjs`,
   nem app React/Vite `syntopicon---grande-ideia-42`.
4. PRs do GitHub: 1 PR aberto (arena/01a07cdd).
5. Outros repositórios do dono: `a-grande-conversa` (master + `claude/atlas-seis-ideias-online`),
   `antologia`, `renda-comparada` — histórico completo varrido nos dois primeiros.
6. `docs/STATUS.md` da branch `arena/01a06414` registra que o protótipo da sessão ChatGPT
   (rotas `/prototype`) **nunca foi commitado — possivelmente perdido**.

**Declaração formal:** os três apps nomeados no manifesto estão **CANDIDATO NÃO LOCALIZADO**
em todo o GitHub do projeto (repositoriais + histórico + PRs). Nada foi inventado em seu lugar.
Em vez de parar, adotaram-se como candidatos A, B e C as três implementações reais e
suficientemente distintas encontradas (mapeadas pela forma aos perfis A/B/C do manifesto).

## 2. Candidatos analisados

### App A — aplicação autocontida + atlas documental
- **branch:** `claude/atlas-seis-ideias-online` · **commit:** `3335802bc29e1c4fd5366984098e1533e0683466`
- **path:** `bernardotb/a-grande-conversa` — `index.html` (arquivo único, 808 linhas, D3 via CDN) + app Next.js (`/mapa/sgi`)
- **Modelo:** grafo radial "eixos e anéis" de 5 camadas (Ideia → Tópico → Posição → Referência → Passagem) com 6 nós-conceito (eixo "Bem e Mal"); atlas documental com 3.575 nós/11.372 arestas; Justice = 1.128 nós (11 tópicos, 30 subtópicos, 707 referências, 34 cross-refs, 67 autores, 215 obras, 47 volumes, 6 tensões).
- **Execução:** dev server OK (`/mapa/sgi` 200, modos Adler/Syntopicon/Fundida, inspetor, trilha de rastreabilidade). `index.html` validado estaticamente (SVG com `tabindex`, `role="button"`, handlers de teclado — o mais acessível dos três em interação gráfica).
- **Fortes:** estados honestos de evidência (`evidence_status`, "LACUNA DOCUMENTAL"); trilha de rastreabilidade ideia→…→volume; zoom/pan/inspetor; mobile drawer.
- **Defeitos:** grafo global como página principal (anti-pattern do manifesto); dados derivados de arquivos locais ausentes do repositório (`Six Great Ideas.pdf` com caminho Windows, `volume-2-texto.md` sem versionamento) — proveniência inverificável; sem testes; dependência de rede no build (Google Fonts); nó interpretativo (tensões/questões) misturado ao canônico no mesmo grafo.

### App B — biblioteca digital editorial
- **branch:** `master` · **commit:** `2a5fabaa5e129dcc48bd5088801284995c9593b0`
- **path:** `bernardotb/a-grande-conversa` — Next.js 15 + Tailwind + framer-motion + xyflow
- **Modelo:** 102 ideias (`data/syntopicon.json`: cada ideia com `question` + `thinkers`), Justiça com 11 "tópicos" (na verdade questões com resumo), 17 referências, 6 debates, volumes, percursos; `evidenceStatus` por referência.
- **Execução:** dev server OK (`/ideias/justica` 200); **build falha offline** (`next/font` baixa Cormorant Garamond e Source Sans 3 do Google Fonts — dependência de rede em tempo de build).
- **Fortes:** UX editorial madura (busca global, breadcrumbs, skip-link, tema claro/escuro, responsivo); honestidade de curadoria nas referências ("em verificação"); navegação física por volumes; PT principal.
- **Defeitos:** **transforma Topic em Question** (viola o cânone §5: os "tópicos" são questões curadas, não o outline impresso); dataset minúsculo para Justiça (17 refs) frente ao canônico (826); interpretação embutida na entidade Reference (`role`, `relevance`); `technicalReference` com "localização em verificação" — locators não vieram da fonte; sem testes; build quebrado offline.

### App C — protótipo do golden case (vencedor)
- **branch:** `arena/01a06414-syntopicon` · **commit:** `21d60ce065c5dd8a795e2fc8f6fe761b35ad6a35`
- **path:** `bernardotb/syntopicon` — Next.js 16 App Router (`app/ideias/42-justice/[topico]` etc.)
- **Modelo:** dataset canônico `data/justice-1952-full.ts` (41 tópicos, 826 refs, 10 cross-refs, intro PT) gerado por parser RAW FIRST com travas, a partir da colagem integral do Dono (auditoria: 41/41 nós, 18/18 refs de 8c(1), dupla extração independente concordante); `data/justice.ts` (camada demo); registry de fontes com 7 entradas.
- **Execução:** **31/31 testes PASS** (npm ci + `tsx --test`), **typecheck PASS**, **build PASS** (307 páginas estáticas), dev server OK — todas as rotas 200.
- **Fortes:** o único com corpus canônico completo e auditado; RAW FIRST de verdade (locatorRaw com Bekker ᵃ/ᵇ, `esp`, `passim`); proveniência por registro; Reference ≠ Passage; estados honestos; bilinguismo (EN canônico + PT display); zero links mortos; build offline.
- **Defeitos:** UX esparso (sem comparação, sem percurso guiado, sem vista física); Introduction EN não exposta (só PT); autores/obras sem páginas próprias completas (obras só na camada demo); visual funcional mas sem hierarquia tipográfica calorosa.

### Anexos (analisados, não-promovidos a candidatos)
- `syntopicon@arena/01a07cdd` (0c28e23): mapa radial interpretativo do "ecossistema de Justiça" (6 clusters, laços CONTRIBUTES_TO/CROSS_REFERENCES/OPPOSES, badge INTERPRETIVE honesto). Lição aproveitada: camada interpretativa pode existir sem contaminar o cânone — e a visualizei como *painel*, não como página inicial.
- `syntopicon@main` (60bafdc): fundação canônica (EntityId, Provenance, 102 ideias). O novo app herda seus contratos de tipos em `domain.js`.

## 3. Júri — seis perspectivas

| Perspectiva | Melhor | Síntese |
|---|---|---|
| **1. Rigor epistemológico** | **App C** | Único com ingestão canônica auditada, RAW FIRST, proveniência por registro e estados honestos. App A tem boas intenções (`evidence_status`) mas fontes inverificáveis no repositório. App B interpreta e apresenta como estrutura. |
| **2. Arquitetura da informação** | **App C** | Outline canônico de 41 nós, Reference ≠ Passage, edição como identidade, três vistas parciais. App B tem boa navegação bibliográfica/física (aproveitada). App A tem trilha de rastreabilidade (aproveitada) sobre um grafo global (rejeitado). |
| **3. UX e acessibilidade** | **App B** | Busca global, breadcrumbs, skip-link, responsivo maduro. App A: melhor teclado em SVG + inspetor + drawer. App C: mínimo. O novo app adota: skip-link, busca sempre visível, breadcrumbs, modal acessível, tabs com setas (padrões de B e A sobre dados de C). |
| **4. Design visual/editorial** | **App B/A** (empate técnico) | B: editorial caloroso, tipografia forte, calmo. A: dark academia "instrumento". Benchmark Mortimer: luz, serenidade, progressão geral→específico. Decisão: luz marfim/tinta/oxblood/verde do próprio projeto (App C já usava a paleta), tipografia serifada, chips de proveniência integrados ao conteúdo — nunca dashboard, nunca grafo global. |
| **5. Frontend/código** | **App C** | Tipos, testes, build offline, dependências mínimas. A e B dependem de rede no build (fontes) e não têm testes. |
| **6. Testabilidade/robustez** | **App C** | 31 testes incluindo invariantes de dataset. A e B: zero. O novo app adiciona 36 testes (domínio + app real em JSDOM + gates estáticos). |

**Conflito aparência × fidelidade:** resolvido pela regra do manifesto — fidelidade vence.
O vencedor estético (B) não fornece corpus confiável; o vencedor epistêmico (C) fornece.

## 4. Decisão

**VENCEDOR GERAL: App C** (protótipo do golden case, `arena/01a06414@21d60ce`) — pelo corpus
canônico auditado e pelos contratos epistêmicos, que são a fundação de tudo.

**ABORDAGEM: HYBRID** — o modelo de dados e os contratos de C, envolvidos por uma experiência
que aprende de B (editorial calmo, busca, navegação física/bibliográfica) e de A (estados honestos,
trilha de rastreabilidade, interação por teclado), sobre a direção visual do benchmark Mortimer.
Tecnologia: **app autocontido em HTML/CSS/JS (ES modules) sem dependências de runtime** —
zero installs para rodar, zero rede, legível por outra LLM, testável com Node puro + jsdom (devDep).

### Decisões de projeto (10)

1. Corpus = dataset canônico Justice 1952 de App C, vendored como JSON com manifesto (repositório/branch/commit/arquivo/método) e script de regeneração.
2. `locatorRaw` literal em toda a cadeia; segmentação de obras e agregações ficam em camada DERIVED separada (como na fonte).
3. Autor/Obra são entidades DERIVED das linhas impressas; a forma impressa é a identidade; sem deduplicação por semelhança; espécies rotuladas (pessoa/documento/escritura); artefato de fluxo de página exibido como veio impresso, sem entidade.
4. Quatro vistas sobre UMA base: sintópica, bibliográfica, física (volumes) e lexical (inventário) — indexes derivados, nenhum banco duplicado.
5. Reference ≠ Passage com frase exata de ausência em toda referência; 4 passagens apenas como camada interpretativa (modal de leitura), visual e semanticamente distintas.
6. Bilinguismo: PT principal de apresentação; EN da fonte sempre a um clique (títulos em todo tópico; Introduction com painéis EN/PT em tabs).
7. Termos do inventário somente com evidência: verbete VERIFICADO do Inventory 1990 (via ledger) + termo “Chattel slavery” sustentado pelo título impresso 1952 com verbete PENDENTE — a dúvida é preservada em tela.
8. Divergência 1952×benchmark (provável delta para 1990) permanece UNRESOLVED e visível no tópico 8c(1).
9. UI: luz editorial marfim/tinta/oxblood/verde; progressão geral→específico; progressive disclosure (`details`); chips CANÔNICO/DERIVADO/INTERPRETATIVO; sem grafo global, sem dashboard, sem gamificação.
10. Zero dependência externa: sem CDN/fontes/APIs/credenciais; `el()` com invariante anti-botão-morto; modal com foco preso + Escape + retorno de foco; tabs com setas; rotas por fragmento real (`#/…`).

### Soluções rejeitadas (10)

1. Grafo global como página inicial (padrão do App A).
2. Transformar Topic em Question com resumo curado (padrão do App B).
3. Fundir silenciosamente edições 1952×1990 ou "completar" a lista de 8c(1) com o benchmark.
4. Ingerir as 707 referências do atlas (App A): fonte não versionada no repositório.
5. Next.js/React/Vite para o protótipo isolado: build com rede, node_modules, fricção de leitura.
6. Fontes ou assets de CDN (quebra offline; quebrou o build de A e B no sandbox).
7. Presença autor↔tópico capturada do benchmark como se fosse da fonte (excluída; presença é derivada das próprias referências canônicas).
8. Localizadores "em verificação" escritos à mão (padrão `technicalReference` do App B).
9. Promover o verbete “Exploitation / Economic slavery” a título de tópico (verbete de índice ≠ título).
10. Deduplicar MARX/MARX-ENGELS ou unificar obras homônimas entre cabeçalhos.

## 5. Contratos epistêmicos que não podem ser quebrados

Raw first (`locatorRaw` literal) · Author ≠ Work ≠ Edition ≠ Passage · Reference ≠ Passage ·
edição como identidade · proveniência por registro · contagens derivadas · camada interpretativa
sempre rotulada · relação ausente permanece ausente · parsing incerto permanece incerto.

## 6. Hard gates — evidência da verificação final

| # | Gate | Estado | Evidência |
|---|---|---|---|
| 1 | IDs únicos | PASS | `dataset.test.mjs` “invariantes de domínio” (checkInvariants sem erros) |
| 2 | Sem `href="#"` | PASS | teste estático + varredura DOM em 9 páginas (`app.test.mjs`) |
| 3 | Sem botões mortos | PASS | invariante do `el()` (botão sem handler lança) + teste unitário + varredura |
| 4 | Relações internas resolvem | PASS | checkInvariants + crawler de rotas + golden path |
| 5 | `locatorRaw` literal | PASS | asserção byte a byte da linha de 8c(1) #1 + `esp`/`passim`/Bekker |
| 6 | Contagens derivadas | PASS | teste anti-hardcode + contagens conferidas (41/826/795+31/10/18) |
| 7 | Inglês da fonte disponível | PASS | títulos EN em todo tópico; Introduction EN (60 parágrafos) em painel próprio |
| 8 | Reference ≠ Passage | PASS | tipos separados; teste “nenhuma passagem canônica; 4 demonstrações” |
| 9 | Passagem ausente explícita | PASS | frase exata testada no tópico e em 3 referências amostradas |
| 10 | Canônico × interpretativo distintos | PASS | chips/classes distintos (`.chip-canonical` × `.chip-interpretive` tracejado âmbar) |
| 11 | Chattel slavery → 8c(1) c/ edição+proveniência | PASS | `terms.json` + teste + tela do inventário (edição 1952; verbete PENDENTE explícito) |
| 12 | Cross-refs globais sem tópico artificial | PASS | teste: chaves dos registros = {n, textRaw}; destinos resolvem só no nível de ideia |
| 13 | Busca e navegação por teclado | PASS | links reais, `:focus-visible`, busca testada; skip-link |
| 14 | Tabs por teclado | PASS | setas/Home/End testadas (Introduction EN↔PT) |
| 15 | Modal por teclado | PASS | foco preso; Tab circula (focusTrap puro testável) |
| 16 | Escape fecha modal | PASS | teste E2E em JSDOM |
| 17 | Foco retorna ao disparador | PASS | trigger explícito; teste E2E |
| 18 | Comparação por teclado | PASS | botões reais com `aria-pressed`; teste adiciona/abre/esvazia |
| 19 | Percurso guiado por teclado | PASS | 9 passos + ramos; links focáveis; teste navega |
| 20 | Sem credenciais externas | PASS | teste estático (sem URLs externas/chaves; `dependencies: {}`) |
| 21 | Sem erros de console no golden path | PASS | teste final: `errors === []` após navegar o app inteiro em JSDOM |

## 7. Testes — comando e resultado

```
cd prototype/justice-arena-app
npm install        # só jsdom (devDependency de testes)
npm test           # node --test tests/*.test.mjs
```

Resultado final: **36/36 PASS** (dataset 16 · app 15 · estático 5), incluindo golden path completo
(Home → Justiça → 8 → 8c → 8c(1) → Referência → Obra → Autor → Tópico), ramo lexical
(Inventário → Chattel slavery → 8c(1)), bilinguismo, comparação, modal, busca e gates.

Servidor: `node scripts/serve.mjs` → http://localhost:8080 (smoke HTTP: todos os assets 200;
travessura de caminho bloqueada).

## 8. Testes visuais

Sem navegador disponível no ambiente (Playwright CDN e apt bloqueados pela rede do sandbox):
- 1440×900 — **UNVERIFIED_MANUAL_REQUIRED**
- 1024×768 — **UNVERIFIED_MANUAL_REQUIRED**
- 390×844 — **UNVERIFIED_MANUAL_REQUIRED**
- zoom 200% — **UNVERIFIED_MANUAL_REQUIRED**

Mitigações verificáveis por código/teste: layout fluido com `max-width` em unidades relativas,
`clamp()` na tipografia, grids `auto-fit/minmax`, breakpoints 860px/480px/320px, `reflow` sem
barras horizontais (word-break em locators), `prefers-reduced-motion` respeitado, alvos de foco
visíveis. A verificação pixel a pixel permanece pendente de execução manual.

## 9. Limitações reais e pendências verificáveis

1. Testes visuais pixel a pixel pendentes (sem navegador no sandbox).
2. Selo canônico definitivo do Justice.pdf aguarda upload na branch `corpus` (fingerprint no ledger) — a ingestão baseia-se na colagem integral do Dono, auditada por dupla extração concordante.
3. Edição 1990 não localizada; divergência de 8c(1) UNRESOLVED (proibido reconstruir).
4. Nenhuma passagem canônica incorporada (por desenho).
5. Cross-references resolvem apenas ao nível de ideia (os demais capítulos não estão incorporados).
6. `window.__JUSTICE_CTX__` exposto para depuração/testes de fumaça (sem segredos; documentado).

---

## 10. Adendo (10/09/2026) — apps irmãos e upgrade do termo Chattel slavery

### 10.1 Revisão do `codex-outputs/justice-codex-app` (commit 0f6196e)

Branch isolada publicada pelo Codex, baseada em `main`, com 11 arquivos em
`prototype/justice-codex-app/` (sem merge/PR/deploy — verificado contra o GitHub).
Validações reproduzidas nesta sessão: `npm test` 7/7 PASS · `npm run check` PASS ·
servidor + smoke HTTP PASS. Confronto linha a linha do `data/justice.json` deles
contra o corpus canônico 1952 deste protótipo: **18/18 `rawText` de 8c(1) idênticos**
(módulo marcadores de itálico), outline 41/41 com mesma hierarquia, 10/10
cross-references (número do bloco embutido no rawText), 60 additional readings
estruturadas, 0 passages, cross-refs globais com `sourceTopicId: null`.
Divergências triviais registradas: apóstrofo tipográfico em 11b e ausência dos
marcadores `*…*` de itálico no rawText (representação do PDF vs da colagem).

**Achado incorporado aqui:** o dataset deles traz o verbete INTEGRAL do
Inventory of Terms 1990 — *"Chattel slavery: see Family 3a; Justice 8c(1); Labor
1f, 5a; Slavery 2b, 4a, 5a; Wealth 7b(1)"* — com modelagem de ponte de edições
exemplar (`resolvedTargetTopicId: null`, `corresponding1952TopicCode: "8c(1)"`,
camada derivada). Isso **resolve a pendência PENDING** do termo Chattel slavery
deste protótipo (§6 gate 11 / terms.json), ver §10.3.

Ressalva de proveniência: a fonte é o artefato local do Dono
`#Inventory of Terms - Syntopicon.pdf`, não versionado no repositório e sem
fingerprint no ledger. **Pendência recomendada:** registrar o artefato no
corpus-ledger (branch `corpus`/`arena/01a06414`) na próxima passagem.

### 10.2 Análise do app do Google AI Studio (Gemini) — App B do manifesto

URL: `https://syntopicon-grande-ideia-42-justi-a.ai.studio` (deploy público,
renderizado e inspecionado em 10/09/2026). Este é o antigo
"App B — React/Vite do AI Studio" (`syntopicon---grande-ideia-42`), até então
CANDIDATO NÃO LOCALIZADO no GitHub: o app está publicado fora do repositório,
no infra do AI Studio; o código-fonte (24 arquivos) existe localmente com o Dono
(foi o que o Codex auditou como "App B").

**Verificável de fora (tudo conferiu contra o corpus canônico):**
- Estatísticas exibidas: edição 1952 (54 volumes) · 41 tópicos · 18 Reference
  Entries (8c(1) 18/18) · 0 passagens (Reference ≠ Passage) — todas corretas;
- Os 11 ramos estruturais: títulos PT e EN idênticos aos canônicos (os 11 EN
  verbatim), contagens de subtópicos por ramo (6,–,–,–,–,5,–,4,7,4,2) = 11+28+2;
- Citação de Adler (Introduction, p. 850): tradução fiel da sentença real da fonte;
- Outline atribuído às pp. impressas 857–858 — confere com os marcadores do RAW;
- Tradução corrigida usada ("Escravidão de Propriedade", não "por dívida");
- Disciplina epistêmica visível: camada interpretativa rotulada ("Seleção
  Curatorial — Interpretativa"), lexical 1990 distinta do canônico 1952,
  ego-graph LOCAL da ideia (não grafo global) com filtros por tipo e camada.

**Não verificável de fora (limites honestos):** as 18 referências na view interna
do 8c(1) — a auditoria local do Codex sobre o código-fonte tinha encontrado
localizadores divergindo da p. 868; o deploy atual afirma "coordenadas impressas
auditadas". Como o app não possui rotas endereçáveis (todo path serve a mesma
página; navegação por estado interno), não foi possível abrir a view do tópico
para conferência. **Ação recomendada:** abrir o 8c(1) no navegador e conferir
contra a p. 868 (os 18 cabeçalhos na ordem: Aristotle, Plutarch, Aquinas, Milton,
Swift, Rousseau, Smith, Gibbon ×2, Kant, Constitution of the U.S., Mill, Boswell,
Hegel, Marx, Marx-Engels, Tolstoy, Dostoevsky) — ou versionar o código-fonte no
repositório para auditoria. Também não puderam ser verificados de fora: percurso
guiado, prova de fonte, interações do grafo, teclado, console e responsividade.

**Achado de UX:** por não ter URLs endereçáveis, o app não permite deep-link para
tópicos/referências — desvantagem estrutural frente aos dois protótipos do
repositório (ambos com rotas por hash reais) para compartilhar, voltar/avançar e
indexação.

### 10.3 Upgrade do termo Chattel slavery (terms.json)

O termo `Chattel slavery` passou de
`SUPPORTED_BY_PRINTED_TOPIC_TITLE__INVENTORY_VERBETE_PENDING` para
`VERIFIED_VIA_LOCAL_ARTIFACT__FINGERPRINT_PENDING`, incorporando o verbete
integral de 1990 (transcrito no justice-codex-app @ 0f6196e). Modelagem:

- verbete bruto exibido (`rawText`) — RAW FIRST;
- alvo `Justice 8c(1)` resolve no corpus com **ponte de edição derivada**
  explícita (verbete 1990 → tópico correspondente da edição 1952 incorporada);
  nunca promovida a relação canônica;
- demais alvos do verbete (Family 3a; Labor 1f, 5a; Slavery 2b, 4a, 5a;
  Wealth 7b(1)) permanecem texto bruto — capítulos não incorporados, nenhum
  vínculo inferido;
- pendência visível em tela: fingerprint do PDF e versionamento do artefato.

Testes atualizados (36/36 mantidos): verbete bruto, ponte derivada, alvos não
incorporados e pendência de selo são agora verificados em `dataset.test.mjs` e
`app.test.mjs`.

### 10.4 Preparação para o ecossistema futuro (análise de 10/09/2026)

O ecossistema de ideias interconectadas já existe **latentemente nos dados**: as
10 cross-references apontam para ~27 outras ideias; o verbete Chattel slavery
aponta para 5 ideias; autores/obras atravessam todos os capítulos. O que fazer
AGORA (barato) versus depois (caro) — critério: convenções de forma, nunca
antecipação de conteúdo:

**Feito agora:** seção 11 adicionada ao `PROMPT-GEMINI-AI-STUDIO.md` (URLs com
escopo de ideia; dataset um-arquivo-por-ideia + índice de cobertura 102;
autores/obras globais; cross-references como arestas com ideia-alvo estruturada;
camada/edição por registro; componentes genéricos; anti-overengineering).

**Migrações registradas para este protótipo (justice-arena-app), a executar
quando a segunda ideia for incorporada (trabalho contido, ~meio dia):**
1. rotas de tópico/referência sem escopo de ideia (`#/topico/8c-1` colide entre
   capítulos — "1a" existe em quase todas as ideias) → `#/ideia/justica/topico/8c-1`;
   rotas de autor/obra/volume já são globais por construção;
2. `buildContext` recebe chaves fixas de capítulo único (`justice1952`,
   `introductionEn`…) → agregador `chapters[]` (o gerador `build-dataset.mjs`
   já produz um arquivo por ideia com manifesto; falta o agregador).

**Já pronto por construção:** autores/obras derivados globalmente (agregam
referências de qualquer capítulo futuro), cross-references resolvidas ao nível
de ideia com registry das 102, contagens 100% derivadas, camadas/edições por
registro, manifests por dataset, estados honestos de ausência.

**Recomendação de projeto:** documentar o contrato de dados compartilhado
(schema dos registros + manifesto + níveis de cobertura) no repositório, para
que os três apps (arena, codex, AI Studio) consumam o mesmo export JSON — a
fonte canônica dos dados deve ser o repositório, não nenhum app.
