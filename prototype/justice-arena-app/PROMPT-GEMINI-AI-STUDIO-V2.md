# PROMPT V2 PARA O DASHBOARD DO GOOGLE AI STUDIO — UPGRADE DO APP "SYNTOPICON · GRANDE IDEIA 42: JUSTIÇA"

> Versão de 10/09/2026, para uso direto no dashboard (Build) do AI Studio.
> Diferencial da V1: o AI Studio tem acesso de leitura ao repositório GitHub e às
> pastas do Drive — portanto o prompt aponta para as FONTES DE AUTORIDADE em vez
> de embutir os dados completos; mantém apenas âncoras de verificação (checksums).
> A V1 (`PROMPT-GEMINI-AI-STUDIO.md`), com todos os dados embutidos, permanece
> como fallback caso o acesso às fontes falhe.

---

# UPGRADE COMPLETO — APP "SYNTOPICON · GRANDE IDEIA 42: JUSTIÇA"

Você vai corrigir e preparar este app para o futuro. Trabalhe em fases: AUDITORIA → DADOS → CÓDIGO → ECOSISTEMA → VERIFICAÇÃO. Não pule fases.

## 0. FONTES DE AUTORIDADE (use-as; NÃO confie na memória)

Você tem acesso de leitura a duas fontes autorizadas. Hierarquia: o PDF impresso é a fonte final; os datasets do repositório são a ingestão canônica auditada; o código atual deste app é o OBJETO da correção, nunca autoridade.

**GitHub — bernardotb/syntopicon (SOMENTE LEITURA: não commit, não push, não abra PR):**

| O quê | Onde encontrar | Uso |
|---|---|---|
| Dataset completo limpo (JSON) | branch `codex-outputs/justice-codex-app` → arquivo `prototype/justice-codex-app/data/justice.json` | BASE para importar: 41 tópicos, 18 Reference Entries com `rawText` literal, 10 cross-references, 60 additional readings, verbete "Chattel slavery" (1990), modelo de edições 1952/1990 |
| Dataset canônico RAW FIRST (TypeScript) | branch `arena/01a06414-syntopicon` → `data/justice-1952-full.ts` | contraverificação |
| Colagem integral do capítulo impresso | mesma branch → `docs/corpus/justice-1952-texto-integral-colagem-dono.md` | texto completo pp. 850–879 |
| Ledger de proveniência e regras | mesma branch → `docs/corpus-ledger.md` | disciplina epistêmica do projeto |
| Registry das 102 ideias | branch `main` → `data/ideas.ts` | índice de cobertura (item 11) |
| Tipos canônicos (EntityId, Provenance) | branch `main` → `lib/syntopicon/` | contratos de dados |

(O protótipo `prototype/justice-arena-app` NÃO está no repositório — não o procure.)

**Google Drive:**

| Pasta | Uso |
|---|---|
| PDFs das 102 ideias | `Justice.pdf` = fonte impressa FINAL: verificar p. 857–858 (outline), p. 868 (18 referências), p. 878 (cross-references), p. 879 (additional readings). É também a fonte futura de expansão — mas NÃO ingira outros capítulos agora |
| 54 volumes GBWW (1ª ed., 1952) | Vol. 2 (Syntopicon I) = o próprio capítulo JUSTICE, pp. 850–879 (contraverificação se o Justice.pdf falhar); Vol. 3 (Syntopicon II) = Inventory of Terms da 1ª ed. (1952) |
| Materiais | procure o PDF `#Inventory of Terms - Syntopicon.pdf` (2ª ed., 1990) — é onde está o verbete "Chattel slavery" verificado; se encontrar, confira o texto exato |

**PROIBIDO:** usar benchmarks externos (ex.: mortimer.vercel.app) para "completar" dados. A diferença entre a lista de 8c(1) da edição 1952 e a de benchmarks externos é um delta de edição (1952×1990) com estado **UNRESOLVED** — preserve e exiba a divergência; nunca a resolva por conta própria.

**Log de fontes:** para cada grupo de dados importado, registre o arquivo (+ página, se PDF) de onde veio. Se alguma fonte não estiver acessível, declare a pendência e use a fonte hierarquicamente seguinte — nunca invente.

## 1. FASE AUDITORIA (entregue antes de tocar no código)

1. Leia `prototype/justice-codex-app/data/justice.json` (branch codex-outputs) e compare, campo a campo, com o dataset ATUAL deste app.
2. Verifique no `Justice.pdf` (Drive) as páginas 857–858, 868, 878 e 879. Qualquer divergência entre repo e PDF: **PARE e reporte** — não escolha silenciosamente.
3. Apresente a **TABELA DE DIVERGÊNCIA**: `campo | valor atual no app | valor canônico | fonte (arquivo/página)`.

**Âncoras de verificação (checksums — todas derivadas, nenhum número fixado na interface):**
- 41 tópicos: 11 nível-1 + 28 nível-2 + 2 nível-3;
- 18 Reference Entries em 8c(1), na ordem impressa, cabeçalhos exatamente:
  ARISTOTLE [9] · PLUTARCH [14] · AQUINAS [20] · MILTON [32] · SWIFT [36] · ROUSSEAU [38] · SMITH [39] · GIBBON [40] · GIBBON [41] · KANT [42] · CONSTITUTION OF THE U.S. [43] · MILL [43] · BOSWELL [44] · HEGEL [46] · MARX [50] · MARX-ENGELS [50] · TOLSTOY [51] · DOSTOEVSKY [52]
  (GIBBON aparece DUAS vezes; MARX e MARX-ENGELS são cabeçalhos distintos — nunca deduplicize; CONSTITUTION OF THE U.S. é documento, não pessoa);
- derivados das 18: **17 autores distintos · 20 pares autor/obra**;
- 10 cross-references, todas globais ao capítulo (`sourceTopicId = null`);
- 60 additional readings (grupo I: 13 · grupo II: 47; "——." significa "mesmo autor da entrada anterior" — preserve a forma impressa);
- 0 passagens: toda referência exibe literalmente "Passagem não incorporada ao corpus digital.";
- verbete (2ª ed. 1990): "Chattel slavery: see Family 3a; Justice 8c(1); Labor 1f, 5a; Slavery 2b, 4a, 5a; Wealth 7b(1)".

**Caso especial do Inventory:** o verbete verificado é da 2ª ed. (1990). Se ao examinar o Vol. 3 dos 54 volumes (Inventory da 1ª ed., 1952) você encontrar o termo "Chattel slavery" lá também, REPORTE como evidência nova — não altere silenciosamente o status ou a edição declarada.

## 2. CORREÇÕES DE DADOS (substitua o que divergir)

1. **18 referências de 8c(1)**: `rawText` literal, byte a byte, do dataset canônico — incluindo sobrescritos de Bekker (ᵃ/ᵇ), "esp", "passim", travessões e abreviações. Nunca normalize. Obra em itálico no impresso pode usar `<em>`, mas o texto base permanece idêntico.
2. **10 cross-references**: texto completo; ideia-alvo em CAIXA ALTA estruturada como dado (`targetIdea`, `targetTopicRaw`); alvo não incorporado = texto bruto, honesto.
3. **60 additional readings**: lista bruta nos dois grupos; sem criar entidades Author/Work a partir dela (são obras FORA dos Great Books).
4. **Termo "Chattel slavery"**: verbete integral + ponte de edição como camada DERIVADA (`targetEditionId: 1990`, `resolvedTargetTopicId: null`, `corresponding1952TopicCode: "8c(1)"`) — jamais promovida a canônica. Demais alvos do verbete (Family 3a; Labor 1f, 5a; Slavery 2b, 4a, 5a; Wealth 7b(1)) = texto bruto, não incorporados. Exibir também "Exploitation / Economic slavery" → Justice 8c(1) (Inventory 1990, verificado via ledger).
5. **Proveniência por registro**: `sourceArtifact: "Justice.pdf"`, `page`, `edition: "1952"`, `layer` (canonical/derived/interpretive). Páginas: outline 857–858 · referências 868 · cross-refs 878 · readings 879.
6. **Estado de resolução por referência**: `{ author: "resolved", work: "resolved", locators: "resolved", passage: "unresolved" }`.
7. **Aviso permanente no 8c(1)**: a lista impressa 1952 diverge de benchmarks externos; hipótese = delta de edição; estado UNRESOLVED.

## 3. CORREÇÕES DE CÓDIGO/UX

8. **Bug do CompareModal** (confirmado em auditoria): `isCompareModalOpen` é atualizado mas não controla a montagem do modal — com 2 referências selecionadas, fechar não remove o modal. O estado de abertura deve ser a única fonte de verdade da montagem.
9. **Rotas endereçáveis por hash, COM ESCOPO DE IDEIA desde o dia 1** (o app hoje não tem URL nenhuma): `#/ideia/42` · `#/ideia/42/topico/8c-1` · `#/ideia/42/referencia/:id` · `#/ideia/42/termo/:id` · autores e obras são GLOBAIS: `#/autor/:id` · `#/obra/:id`. Voltar/avançar funcionam; toda tela é compartilhável; seleção do ego-graph atualiza o hash; nenhum link aponta para `#` vazio.
10. **Teclado/acessibilidade**: foco preso no modal, Escape fecha, foco retorna ao disparador; tabs/modos com setas + Home/End + `aria-selected`; skip-link; `:focus-visible`; golden path inteiro navegável sem mouse; zero erros de console.
11. **Dependências**: remova as declaradas e não usadas (`express`, `dotenv`, `@google/genai`). Nenhuma chamada de rede, nenhuma chave, nada de IA generativa como funcionalidade. O app funciona 100% offline após o build.
12. **Testes de integridade** (hoje zero; crie com `node --test` ou vitest já presente): 41 tópicos com pais resolvendo e sem duplicados; 18 refs na ordem com os cabeçalhos da âncora; todo locator segmentado contido no rawText; 10 xrefs com sourceTopicId null; 60 readings (13+47); 0 passages com passage unresolved em todas; verbete chattel com ponte derivada; contagens derivadas (nada hardcoded); nenhum `href="#"`; IDs únicos.

## 4. PREPARAÇÃO PARA O ECOSISTEMA (barato hoje, caríssimo depois)

O ecossistema já está latente: as 10 cross-references apontam para ~27 outras ideias; o verbete aponta para 5; autores atravessam todos os capítulos. Prepare a FORMA, nunca antecipe o CONTEÚDO:

13. **Dataset: um arquivo por ideia + índice de cobertura** — `data/ideas/42-justice.json` (com manifesto: fonte, branch, commit, método) + `data/coverage.json` declarando quais das **102 ideias** (registry: `data/ideas.ts` do branch `main`) estão incorporadas e em que nível (`outline-only` | `outline+golden-refs` | `complete`). O app exibe "1 de 102 ideias incorporadas". Ideia ausente = estado explícito "não incorporada", nunca silêncio.
14. **IDs**: tópicos/referências com namespace da ideia (`topic:justice:8c-1`, `ref:justice:8c1:001`); AUTORES e OBRAS globais, sem namespace (`author:aristotle`, `work:aristotle:politics`), prontos para agregar "citado em: Justiça 8c(1), e nas ideias que vierem". Identidade = forma impressa do cabeçalho; nunca deduplicar por semelhança.
15. **Camada e edição por registro** permanecem obrigatórias — quando a 2ª ed. (1990) entrar algum dia, os registros coexistem sem se fundir.
16. **Componentes genéricos**: nada de "Justice" em nomes de componentes, funções de query ou chaves de dataset (`ChapterView`/`getChapter(42)`, não `JusticeChapter`/`getJusticeData()`).
17. **NÃO fazer agora (anti-overengineering)**: sem backend, sem banco, sem contas, sem motor de grafo global, e **sem ingerir capítulos dos PDFs das 102 ideias "para testar"** — cada capítulo futuro exigirá sua própria auditoria RAW FIRST (dupla extração concordante + ledger). O app só precisa estar pronto para RECEBÊ-LOS.

## 5. VERIFICAÇÃO FINAL E ENTREGA

Execute antes de entregar (não declare PASS sem executar):
- [ ] Golden path: Home → Justiça → 8 → 8c → 8c(1) → Referência → Obra → Autor → retorno;
- [ ] Ramo lexical: Termo "Chattel slavery" → 8c(1);
- [ ] 18 cabeçalhos na ordem da âncora; contagens derivadas = 17 autores, 20 pares autor/obra;
- [ ] "Passagem não incorporada ao corpus digital." visível em toda referência;
- [ ] Aviso de divergência UNRESOLVED no 8c(1);
- [ ] Deep-links colam e funcionam no navegador, com escopo de ideia;
- [ ] "1 de 102 ideias incorporadas" visível; cross-references mostram alvos não incorporados honestamente;
- [ ] Modal: Escape fecha, foco retorna; comparação fecha de fato;
- [ ] Build passa; zero erros de console no caminho dourado;
- [ ] Suite de testes do item 12 toda verde.

**Formato da resposta:** para cada item 1–17: estado **PASS | PARTIAL | FAIL** + o que mudou + evidência. Ao final: contagens derivadas finais (tópicos, referências, autores, obras, cross-refs, readings, termos, passagens, ideias incorporadas) + **LOG DAS FONTES ACESSADAS** (arquivo/branch/página de cada grupo de dados) + pendências declaradas como `UNVERIFIED_MANUAL_REQUIRED`. Não promova inspeção de código a teste executado.
