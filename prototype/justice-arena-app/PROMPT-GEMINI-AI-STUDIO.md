# PROMPT PARA O GEMINI (Google AI Studio) — UPGRADE DO APP "SYNTOPICON · GRANDE IDEIA 42: JUSTIÇA"

> Cole este prompt inteiro no chat do AI Studio (modo Build), no projeto
> `syntopicon-grande-ideia-42-justi-a`. Ele foi preparado a partir de duas
> auditorias independentes do seu app (uma sobre o código-fonte, outra sobre o
> deploy público) e dos dados canônicos auditados do projeto Syntopicon.
> Todos os dados citados abaixo foram verificados contra a fonte impressa
> (edição 1952) por duas extrações independentes que concordam 18/18.

---

## CONTEXTO

Este app é o protótipo React/Vite do **golden case Justice 8c(1)** do Syntopicon
(Grande Ideia 42, GBWW Vol. 2, cap. 42, pp. impressas 850–879, edição 1952).
Ele já acerta muita coisa — preserve isso:

**PRESERVAR (não mexer):**
- Estatísticas honestas da home (41 tópicos · 18 Reference Entries · 0 Passagens · Reference ≠ Passage);
- Os 11 ramos estruturais com títulos PT + EN e contagens de subtópicos (6,–,–,–,–,5,–,4,7,4,2);
- A citação de Adler (Introduction, p. 850) e a atribuição do outline às pp. 857–858;
- A tradução corrigida "Escravidão de Propriedade (Chattel Slavery)" — nunca "escravidão por dívida";
- O ego-graph LOCAL da ideia (não é grafo global — está correto assim), com filtros por tipo e camada;
- O rótulo "Seleção Curatorial — Interpretativa" separado da camada canônica;
- Bilinguismo: PT como apresentação, EN da fonte sempre visível.

**CORRIGIR:** os itens abaixo, em ordem de prioridade. Itens 1–4 são dados
(epistemologia — máxima prioridade); 5–8 são código/UX; 9–10 são qualidade.

---

## PRINCÍPIOS INVIOLÁVEIS (valem para toda alteração)

1. **Adler decide a estrutura; a interface remove fricção.** Não transforme Topic em Question, não deduplicize tópicos, não invente relações.
2. **RAW FIRST:** o texto da linha impressa (`rawText`/`locatorRaw`) é literal — copiado byte a byte, nunca normalizado. Sobrescritos de Bekker (ᵃ/ᵇ), "esp", "passim", travessões e abreviações permanecem.
3. **Reference ≠ Passage:** referência indica ONDE ler. Passagem contém o TEXTO. O corpus tem **0 passagens** e toda referência declara explicitamente "Passagem não incorporada ao corpus digital."
4. **Edição é identidade:** o corpus é da edição **1952**; o verbete lexical é da edição **1990**; a ponte entre elas é sempre camada DERIVADA, jamais canônica. Não funda edições.
5. **Canônico ≠ Derivado ≠ Interpretativo:** visual e semanticamente distintos em tela (badge/chip por camada em cada registro).
6. **Nada inventado:** sem biografias, resumos, relações ou interpretações apresentados como conteúdo da fonte. Conteúdo curado seu = rotulado INTERPRETATIVO.
7. **Contagens sempre derivadas do dataset** — nunca hardcoded na interface.
8. **Divergência 1952 × benchmark externo (ex.: mortimer.vercel.app) = UNRESOLVED.** É proibido "completar" a lista de 8c(1) com dados do benchmark. Se alguma referência sua veio de lá, ela está errada (ver item 1).

---

## CORREÇÕES DE DADOS (prioridade máxima)

### 1. As 18 Reference Entries de 8c(1) — conferir e substituir pelo texto impresso exato (p. 868, ed. 1952)

**Passo 1 — auditoria:** compare cada uma das 18 referências atuais do seu dataset com a lista abaixo. Imprima uma tabela de divergência (qual divergiu, o que tinha, o que passou a ter).

**Passo 2 — substituição:** use EXATAMENTE estes textos (linha impressa completa, incluindo o número do volume; títulos de obra eram itálicos no impresso — renderize com `<em>` se quiser, mas o texto base permanece idêntico):

```
1.  [9]  ARISTOTLE — 9 ARISTOTLE: Ethics, BK V, CH 6 [1134ᵇ7–17] 382b–c; BK VIII, CH 11 [1161ᵃ30–ᵇ10] 413c–d / Politics, BK I, CH 3–7 446d–449c; CH 11 [1259ᵃ18]–CH 13 [1260ᵇ7] 453c–455a; BK III, CH 6 [1278ᵇ32–37] 476a–b / Athenian Constitution, CH 2 553a–c
2.  [14] PLUTARCH — 14 PLUTARCH: Lycurgus, 46c–47a / Marcus Cato, 278d–279c
3.  [20] AQUINAS — 20 AQUINAS: Summa Theologica, PART I–II, Q 105, A 4, ANS and REP 1–4 318b–321a
4.  [32] MILTON — 32 MILTON: Samson Agonistes [1–51] 339b–340b
5.  [36] SWIFT — 36 SWIFT: Gulliver, PART IV, 154b–155a
6.  [38] ROUSSEAU — 38 ROUSSEAU: Inequality, 352a; 353c–355b; 365b–366a
7.  [39] SMITH — 39 SMITH: Wealth of Nations, BK I, 28a–d; 61c–d; 109d–110d; BK III, 165b–170c; BK IV, 253c–254a; 287c–d
8.  [40] GIBBON — 40 GIBBON: Decline and Fall, 144b
9.  [41] GIBBON — 41 GIBBON: Decline and Fall, 45b
10. [42] KANT — 42 KANT: Science of Right, 421c–422d; 445c–446a
11. [43] CONSTITUTION OF THE U.S. — 43 CONSTITUTION OF THE U.S.: ARTICLE I, SECT 9 [260–266] 13d; ARTICLE IV, SECT 2 [529–535] 16b; AMENDMENTS, XIII 18c
12. [43] MILL — 43 MILL: Representative Government, 339d–340c
13. [44] BOSWELL — 44 BOSWELL: Johnson, 363c–364a
14. [46] HEGEL — 46 HEGEL: Philosophy of History, PART IV, 335b–336c
15. [50] MARX — 50 MARX: Capital 1a–383d esp 102b–105c, 112c–115c, 127c–131a, 150a–c, 176a–178d, 193a–209a, 264a–275c, 282d–286a, 296c–301b, 354a–355d, 366a–368b, 376c–377a, 379a–383d
16. [50] MARX-ENGELS — 50 MARX-ENGELS: Communist Manifesto, 420c–d; 422c–423a; 424b–425a; 426b–428a
17. [51] TOLSTOY — 51 TOLSTOY: War and Peace, BK V, 211a–213a
18. [52] DOSTOEVSKY — 52 DOSTOEVSKY: Brothers Karamazov, BK VI, 165b–c
```

Regras:
- Ordem impressa exata acima (GIBBON aparece DUAS VEZES, linhas 8 e 9; MARX e MARX-ENGELS são cabeçalhos distintos — não deduplicize);
- `CONSTITUTION OF THE U.S.` é um **documento**, não pessoa — rotule a espécie (pessoa/documento/escritura) como camada derivada;
- Referências cujo locator atual divergir da lista acima estão ERRADAS e devem ser substituídas. Suspeita principal: dados vindos do benchmark externo (a lista do benchmark contém Federalist/Madison, Tocqueville, Veblen, Tawney e Conrad, e OMITE Milton, Gibbon ×2, Constitution of the U.S., Marx-Engels e Dostoevsky — é a lista de OUTRA edição; não misture);
- Adicione à página do 8c(1) um aviso permanente: a lista impressa 1952 diverge da lista exibida pelo benchmark externo; hipótese prioritária = delta de edição (1952×1990); estado **UNRESOLVED**.

**Verificação esperada após a correção (contagens derivadas, não fixadas):** 18 referências · **17 autores distintos** · **20 pares autor/obra**. Se der outro número, os dados ainda estão errados.

### 2. Cross-References — são 10, não 6 (p. 878, ed. 1952)

Todas são **globais ao capítulo** (`sourceTopicId = null` — nenhuma recebe tópico de origem artificial). Textos exatos:

```
1. Matters relevant to the conception of justice as a virtue and as it relates to the other virtues and to happiness, see COURAGE 4; GOOD AND EVIL 3e; HAPPINESS 5–5b; TEMPERANCE 1a; VIRTUE AND VICE 2a(1), 3b; WILL 8c; and for the theological doctrine of original justice, see SIN 3a.
2. The relation of justice and duty, see DUTY 7; WILL 8e.
3. The comparison of justice with love and friendship, see LOVE 3c, 4b.
4. Other considerations of natural rights and civil liberties, see LAW 4e, 7c; LIBERTY 1e–1g; SLAVERY 3d; TYRANNY 5a.
5. Problems of economic justice, see DEMOCRACY 4a(2); LABOR 7a–7b, 7c(2), 7d–7f; LIBERTY 2d; SLAVERY 4a–4c, 5a–5b; WEALTH 5e, 6d(2), 10d.
6. Problems of justice in government and law, see ARISTOCRACY 1a–1b; CONSTITUTION 5a; DEMOCRACY 4a–4a(1), 4b; HONOR 4b; LAW 5c, 6c; LIBERTY 1f; MONARCHY 1a(2), 4e(3), 5a–5b; OLIGARCHY 4, 5a; SLAVERY 5a–5b, 6d; STATE 3e; TYRANNY 1a–1b, 4b, 6; and for the special problem of the distinction between justice and equity, see LAW 5h; UNIVERSAL AND PARTICULAR 6c.
7. Justice in the relation of states to one another and in the issues of war and peace, see LAW 4g; STATE 9c; WAR AND PEACE 3a–3b, 11b.
8. The issue concerning the justice of punishment as a political instrument, see LAW 6e(3); PUNISHMENT 1b, 2, 4c–4d.
9. The justice of divine punishment and the relation of God's mercy to God's justice, see GOD 5i; PUNISHMENT 5e; SIN 6a–6b.
10. The justice involved in man's debt to God, see DUTY 11; GOD 3d; RELIGION 2.
```

Os nomes de ideias em MAIÚSCULAS podem ser resolvidos como link para a ideia correspondente (camada derivada); os códigos de tópico de destino (ex.: "4", "5–5b") permanecem **texto bruto** — os outros capítulos não estão incorporados.

### 3. Additional Readings — são 60, não 28 (p. 879, ed. 1952)

Lista bruta (RAW), dois grupos. **"——." significa "mesmo autor da entrada anterior"** — preserve a forma impressa; não expanda silenciosamente para o nome do autor (pode mostrar o nome resolvido como camada derivada). Não crie entidades Author/Work a partir desta lista (são obras FORA dos Great Books):

```
GRUPO I — Works by authors represented in this collection. (13)
PLUTARCH. "Delays in Divine Justice," in Moralia
AQUINAS. Summa Theologica, PART II–II, QQ 57–80, 108–113, 120–122
DANTE. On World-Government or De Monarchia, BK I, CH II; BK II, CH 6
F. BACON. "Of Usury," in Essays
SPINOZA. Tractatus Politicus (Political Treatise), CH 2
HUME. A Treatise of Human Nature, BK III, PART II, SECT I–VI
FIELDING. Amelia
A. SMITH. The Theory of Moral Sentiments, PART II
——. Lectures on Justice, Police, Revenue and Arms
KANT. Lectures on Ethics, pp 191–253
HEGEL. The Philosophy of Mind, SECT II, SUB-SECT C, (BB, b, c)
DOSTOEVSKY. The House of the Dead
TOLSTOY. Resurrection

GRUPO II — Works by authors not represented in this collection. (47)
CICERO. De Finibus (On the Supreme Good)
——. De Officiis (On Duties), II (IX)
SENECA. De Beneficiis (On Benefits)
SAADIA GAON. The Book of Beliefs and Opinions, TREATISE IV–V, IX
Njalssaga
LANGLAND. Piers Plowman
SOTO. Libri Decem de Justitia et Jure
SPENSER. The Faerie Queene, BK V
HOOKER. Of the Laws of Ecclesiastical Polity
GROTIUS. The Rights of War and Peace
H. MORE. An Account of Virtue (Encheridion Ethicum), BK II
LEIBNITZ. Philosophical Works, CH 8 (On the Notions of Right and Justice)
VOLTAIRE. Essay on Toleration
——. "Equality," "Justice," "Rights," "Toleration," in A Philosophical Dictionary
VOLTAIRE. The Ignorant Philosopher, CH 32
BENTHAM. Defence of Usury
PAINE. Rights of Man
GODWIN. An Enquiry Concerning Political Justice
LIEBER. Manual of Political Ethics
WHEWELL. The Elements of Morality, BK II, CH 21–22; BK IV
PROUDHON. De la justice dans la révolution et dans l'église
BAKUNIN. God and the State
H. SIDGWICK. The Methods of Ethics, BK III, CH 5
GEORGE. Progress and Poverty
T. H. HUXLEY. Methods and Results, VIII
T. H. GREEN. The Principles of Political Obligation, (H,I,O)
O. W. HOLMES JR. The Common Law
RITCHIE. Natural Rights
ZOLA. Letter to M. Félix Faure (J'accuse)
WILLOUGHBY. Social Justice
VECCHIO. The Formal Bases of Law
CROCE. The Philosophy of the Practical
G. DICKINSON. Justice and Liberty
STAMMLER. The Theory of Justice
KAFKA. The Trial
HOBHOUSE. The Elements of Social Justice
HOCKING. Present Status of the Philosophy of Law and of Rights
J. DICKINSON. Administrative Justice and the Supremacy of Law in the United States
BERDYAYEV. Christianity and the Class War
M. R. COHEN. Reason and Nature, BK III, CH 4
TAWNEY. The Acquisitive Society
——. Equality
MOUNIER. A Personalist Manifesto
MICHEL. Christian Social Reconstruction
MARITAIN. Ransoming the Time, CH 1
——. The Rights of Man and Natural Law
KELSEN. Society and Nature
```

### 4. Inventory Term "Chattel slavery" — verbete integral + ponte de edição explícita

O verbete é da **Second Edition (1990)** — autoridade lexical, separada do corpus 1952:

```
rawText: "Chattel slavery: see Family 3a; Justice 8c(1); Labor 1f, 5a; Slavery 2b, 4a, 5a; Wealth 7b(1)"
```

Modelagem exigida (a ponte entre edições é DERIVADA, nunca canônica):
- `targetEditionId: syntopicon-1990` · `resolvedTargetTopicId: null` (o alvo 1990 não está incorporado);
- `corresponding1952TopicCode: "8c(1)"` · camada `derived-structure` — exibir como "verbete 1990 → tópico correspondente na edição 1952 incorporada";
- Os demais alvos do verbete (**Family 3a; Labor 1f, 5a; Slavery 2b, 4a, 5a; Wealth 7b(1)**) ficam como **texto bruto** — esses capítulos não estão incorporados e nenhum vínculo é inferido;
- Exibir também o segundo termo verificado do projeto: verbete **"Exploitation / Economic slavery" → Justice 8c(1)** (Inventory 1990, evidência registrada no corpus-ledger do repositório);
- Se o app tiver outros termos sem fonte local verificável: remova, ou marque explicitamente "NÃO VERIFICADO — fonte local pendente".

### 5. Proveniência por registro + estado de resolução

Cada registro canônico carrega: `sourceArtifact: "Justice.pdf"` (lexical: `"#Inventory of Terms - Syntopicon.pdf"`), `page`, `edition`, `layer`. Páginas: outline → 857–858 · referências de 8c(1) → 868 · cross-references → 878 · additional readings → 879 · Introduction → 850–858.

Cada referência declara estado de resolução (nada de parsing implícito):
`{ author: "resolved", work: "resolved", locators: "resolved", passage: "unresolved" }`

---

## CORREÇÕES DE CÓDIGO/UX

### 6. Bug do CompareModal (defeito confirmado na auditoria do código)

`isCompareModalOpen` é atualizado mas **não controla a montagem** do `CompareModal`: com duas referências selecionadas, fechar a comparação não remove o modal. Corrija a ligação estado→render (o estado de abertura deve ser a única fonte de verdade da montagem) e garanta: Escape fecha; foco retorna ao disparador; reabrir funciona.

### 7. Rotas endereçáveis (deep-link) — hoje o app não tem nenhuma

Todo caminho serve a mesma página (navegação só por estado interno). Adicione roteamento por hash real, **com escopo de ideia desde o dia 1** (ver item 11.1 — códigos de tópico se repetem entre capítulos; URLs sem escopo quebram quando a segunda ideia chegar):

- `#/ideia/42` (capítulo), `#/ideia/42/topico/8c-1`, `#/ideia/42/referencia/:id`, `#/ideia/42/termo/:id`
- Autores e obras são entidades GLOBAIS (existem fora das ideias): `#/autor/:id`, `#/obra/:id`

Requisitos: voltar/avançar do navegador funcionam; toda tela principal é compartilhável por URL; a seleção no ego-graph também atualiza o hash. Nenhum link funcional pode apontar para `#` vazio.

### 8. Acessibilidade por teclado (verificar e corrigir)

- Modal/diálogo: foco preso dentro, Escape fecha, foco retorna ao elemento disparador;
- Tabs/modos: setas esquerda/direita, Home/End; indicação `aria-selected`;
- Skip-link "Pular para o conteúdo"; foco visível (`:focus-visible`); alvos de clique ≥ 44px em mobile;
- Golden path inteiro navegável por teclado sem mouse;
- Zero erros de console no percurso completo.

### 9. Dependências e portabilidade

Remova dependências declaradas e não usadas (`express`, `dotenv`, `@google/genai` — confirmado na auditoria: o SDK Gemini não é usado no código). Nenhuma chamada de API externa, nenhuma chave, nada de IA generativa como funcionalidade. O app deve funcionar 100% offline após o build.

### 10. Testes de integridade (hoje não há nenhum)

Crie um teste automatizado mínimo (rodável com `node --test`, sem instalar nada, sobre um export JSON do dataset — ou vitest se já presente) validando:
1. 41 tópicos (11 nível-1 + 28 nível-2 + 2 nível-3), pais resolvem, sem códigos duplicados;
2. 18 referências em 8c(1), na ordem impressa, cabeçalhos = lista do item 1;
3. cada locator segmentado está contido no rawText (nada de locator reescrito);
4. 10 cross-references, todas com `sourceTopicId = null`;
5. 60 additional readings (13 + 47);
6. 0 passages + toda referência com `passage: "unresolved"`;
7. term "Chattel slavery" resolve ponte → 8c(1) com camada derivada;
8. contagens da interface derivadas do dataset (nenhum número hardcoded);
9. nenhum `href="#"` no código;
10. IDs únicos em todas as coleções.

---

## PREPARAÇÃO PARA O ECOSISTEMA FUTURO (fazer agora — barato hoje, caríssimo depois)

O plano do projeto é incorporar progressivamente mais ideias interconectadas. As 10 cross-references já apontam para ~27 outras ideias (Courage, Duty, Law, Liberty, Slavery, Tyranny, Democracy, Labor, Wealth, God…) — o ecossistema já está latente nos dados. As decisões abaixo devem ser tomadas AGORA, enquanto o dataset tem uma única ideia e nenhuma URL foi publicada:

**11.1. URLs com escopo de ideia** — já especificado no item 7. Motivo: códigos de tópico se repetem entre capítulos ("1a" existe em praticamente todas as ideias); autor/obra são globais e agregam citações de todas as ideias. Sem isso, toda URL do app quebra no dia em que a segunda ideia entrar.

**11.2. Dataset externo ao código, um arquivo por ideia + índice de cobertura** — mova os dados para `data/ideas/42-justice.json` (com manifesto: fonte, commit, método) e crie `data/coverage.json` declarando quais das **102 ideias** estão incorporadas e em que nível (`outline-only` | `outline+golden-refs` | `complete`). O app exibe "1 de 102 ideias incorporadas". Ideia ausente = estado explícito "não incorporada" (com link desabilitado honesto ou texto bruto), **nunca silêncio** — ausência no app não significa ausência no Syntopicon. Inclua o registry das 102 ideias (número + nome PT/EN) como dado.

**11.3. IDs: tópicos/referências com namespace da ideia; AUTORES e OBRAS globais** — `topic:justice:8c-1`, `ref:justice:8c1:001`, mas `author:aristotle` e `work:aristotle:politics` SEM namespace de ideia, num registro compartilhado. Identidade = forma impressa do cabeçalho; nunca deduplicar por semelhança; MARX ≠ MARX-ENGELS. ARISTOTLE será citado por dezenas de capítulos — a página de autor deve estar pronta para agregar "citado em: Justiça 8c(1), e nas ideias que vierem".

**11.4. Cross-references como lista de arestas do ecossistema** — estruture a ideia-alvo (em CAIXA ALTA no impresso) como dado: `targetIdea: "LAW"`, `targetTopicRaw: "4e, 7c"`. Enquanto o capítulo-alvo não estiver incorporado, a aresta resolve para "ideia não incorporada" (estado honesto, com o texto bruto preservado). Quando Law entrar, a aresta vira link — sem migração. Nada de link morto, nada de remoção.

**11.5. Camada e edição por registro permanecem obrigatórias** — `layer` (canonical/derived/interpretive), `edition` e `provenance` em cada registro. Quando a 2ª edição (1990) entrar algum dia, os registros coexistem sem se fundir.

**11.6. Componentes e acesso a dados genéricos** — nada de "Justice" hardcoded em nomes de componentes, funções de query ou chaves de dataset (`ChapterView`, `TopicView`, `getChapter(42)`; não `JusticeChapter`, `getJusticeData()`). O app continua exibindo só Justiça, mas como **função dos dados**, não como identidade fixa do código.

**11.7. NÃO fazer agora (anti-overengineering)** — sem backend/banco de dados; sem contas de usuário; sem motor de grafo global; sem ingerir novos capítulos "para testar". Cada capítulo novo exigirá a mesma auditoria RAW FIRST do golden case (dupla extração concordante) — o app só precisa estar pronto para RECEBÊ-LOS. Preparar a forma ≠ antecipar o conteúdo.

---

## VERIFICAÇÃO FINAL (execute antes de entregar; não declare PASS sem executar)

- [ ] Golden path: Home → Justiça → 8 → 8c → 8c(1) → Reference → Work → Author → retorno ao tópico;
- [ ] Ramo lexical: Inventário/Termo → "Chattel slavery" → 8c(1);
- [ ] 18 cabeçalhos na ordem do item 1; contagens derivadas = 17 autores, 20 pares autor/obra;
- [ ] "Passagem não incorporada ao corpus digital." visível em toda referência;
- [ ] Aviso de divergência UNRESOLVED no 8c(1);
- [ ] URLs de deep-link funcionam colando direto no navegador, COM escopo de ideia (#/ideia/42/topico/8c-1);
- [ ] Índice de cobertura exibe honestamente "1 de 102 ideias incorporadas"; cross-references mostram ideias-alvo como "não incorporadas";
- [ ] Modal fecha com Escape e devolve o foco; comparação fecha de fato;
- [ ] Build passa; `npm run build` sem erro; zero warnings novos de console no caminho dourado;
- [ ] Suite de testes do item 10 toda verde.

## FORMATO DA ENTREGA (responda assim)

Para cada item 1–11: estado final **PASS | PARTIAL | FAIL** + o que mudou + evidência (arquivo, diff resumido ou resultado de teste). Ao final, liste: contagens derivadas finais (tópicos, referências, autores, obras, cross-refs, readings, termos, passagens, ideias incorporadas) e quaisquer pendências que você NÃO conseguiu verificar. Não promova inspeção de código a teste executado; se algo não pôde ser validado de verdade, declare `UNVERIFIED_MANUAL_REQUIRED`.

---

*Fonte dos dados deste prompt: capítulo JUSTICE, Syntopicon, GBWW 1ª ed. (1952), Vol. 2, pp. 850–879 — ingestão canônica RAW FIRST auditada do projeto bernardotb/syntopicon (branch arena/01a06414 @ 21d60ce) e extração independente concordante do Codex (branch codex-outputs/justice-codex-app @ 0f6196e). O verbete do Inventory of Terms é da Second Edition (1990), artefato local do Dono (fingerprint pendente no ledger).*
