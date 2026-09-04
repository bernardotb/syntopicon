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

## Adendo (03/09, 2ª rodada) — evidência do Inventory 1990 no caso 8c(1)

- **Inventory of Terms (Second Edition, 1990), confirmado pelo ChatGPT:** verbete
  "Exploitation / Economic slavery" aponta para **Justice 8c(1)** ⇒ o tópico
  **existe na 1990** — a divergência de References NÃO pode ser "tópico novo da 1990".
- **Nuance registrada:** verbete de ÍNDICE não é título de tópico; o rótulo curto
  "Exploitation / Economic slavery" não contradiz nem substitui o título impresso
  1952 ("Economic exploitation: chattel slavery and wage slavery"). Nada fundir.
- **A divergência de listas (impressa 1952 × benchmark) continua UNRESOLVED** —
  depende do capítulo Justice 1990 com References (id reservado `syntopicon-1990`).
- Chegada da fonte: extração independente (mesmo formato da rodada 1) → confronto
  triplo 1952 × 1990 × benchmark → nenhuma promoção sem revisão.

## Adendo 3 (03/09) — CONFIRMAÇÃO PRIMÁRIA: colagem integral do Dono audita e fecha o lado 1952

**Artefato:** `justice-1952-texto-integral-colagem-dono.md` (texto integral do capítulo, colado pelo
Dono a partir do PDF local; 132 mil caracteres; RAW de conferência — o canal canônico segue o PDF na
`corpus`, aguardando upload para selo de fingerprint).

Auditoria programática executada sobre a colagem (todas as provas rodaram verdes):

1. **Outline: 41/41 nós** (11 L1 + 28 sub-letra + 8c(1)/8c(2)) — idêntico à extração rodada 1.
2. **Títulos EN exatos dos 41 nós: OBTIDOS** (item da fila de conferência RESOLVIDO).
   Confirmação forte: título do 8c(1) = "Economic exploitation: chattel slavery and wage slavery";
   8d = "Justice and the use of money: usury and interest rates".
3. **8c(1): 18/18 referências impressas** — mesmíssima lista da extração rodada 1
   (9 Aristotle · 14 Plutarch · 20 Aquinas · 32 Milton · 36 Swift · 38 Rousseau · 39 Smith ·
   40+41 Gibbon · 42 Kant · 43 Constituição · 43 Mill · 44 Boswell · 46 Hegel · 50 Marx ·
   50 Marx-Engels · 51 Tolstoy · 52 Dostoevsky), agora com locators completos no artefato.
4. **Divergência 1952×benchmark: CONSTATADA NA FONTE** (deixa de ser hipótese de leitura):
   - PRESENTES na 1952 impressa, ausentes no benchmark: Milton, Gibbon ×2, Constituição EUA,
     Marx-Engels, Dostoevsky.
   - AUSENTES na 1952 impressa, presentes no benchmark: Federalist/Madison, Tocqueville,
     Veblen, Tawney, Conrad.
   ⇒ O benchmark NÃO reflete a 1952 impressa neste sub-tópico. **Hipótese prioritária
   (edition-delta): a lista do benchmark espelha a 1990** — confirmável só com o capítulo
   Justice 1990 (id reservado `syntopicon-1990`). Estado permanece **UNRESOLVED até lá**.
5. **p. 858: RESOLVIDA** — o "0."/"1." suspeito era artefato de leitura do scan; na colagem a
   página tem o cabeçalho de coluna "PAGE" e nenhum marcador solto. Fila: item encerrado.
6. **Sobrescritos ᵃ/ᵇ: preservados** no texto (ex.: [1134ᵇ7–17], [1255ᵃ3–20]) — item encerrado.

**Fila de conferência após adendo 3:** restam apenas (a) upload do PDF na `corpus` p/ fingerprint
(selo canônico; NÃO bloqueia mais a ingestão) e (b) extração dupla em pontos críticos — a colagem
do Dono já funciona como segunda leitura independente da rodada 1 do ChatGPT (duas extrações
concordam em 41/41 nós e 18/18 refs do caso 8c(1)).

## Adendo 4 (04/09) — INGESTÃO CANÔNICA EXECUTADA (parser → dataset → páginas)

A ingestão da edição 1952 foi executada a partir da colagem do Dono (fonte primária local), com
parser RAW FIRST e trava de estrutura. Resultados:

- **Outline:** 41/41 nós (11 L1 · 28 L2 · 2 L3), ordem impressa preservada, códigos reais em todos
  ("1"…"11b"); slugs de URL derivados dos códigos ("8c(1)" → `8c-1`). Zero códigos provisórios.
- **References:** 826 linhas (795 de autores + 31 bíblicas), distribuídas em 39 blocos (Tópicos 1 e
  11 imprimem apenas o título — sem bloco próprio, estado vazio honesto nas páginas).
- **Caso-crítico 8c(1):** 18/18 linhas, ordem impressa exata: Aristotle, Plutarch, Aquinas, Milton,
  Swift, Rousseau, Smith, Gibbon ×2, Kant, Constitution of the U.S., Mill, Boswell, Hegel, Marx,
  Marx-Engels, Tolstoy, Dostoevsky. Volumes GBWW capturados linha a linha (9→52).
- **locatorRaw INTOCADO:** sobrescritos Bekker preservados ("1134ᵇ7–17", "1255ᵃ3–20"); "esp" e
  "passim" preservados; " / " como separador de obras; segmentação de obras derivada em CAMADA
  SEPARADA (não toca o bruto).
- **Cross-References:** 10/10 com texto integral (p. 879).
- **Artefatos de digitalização:** 47 linhas segregados em `artifacts` (cabeçalhos de coluna, marcas
  de página), fora do conteúdo; 0 warnings de linha não classificada.
- **Integração:** dataset AUTO-GERADO `data/justice-1952-full.ts` + fonte no `source-registry`
  (`syntopicon-1952`, `justice-pt-chatgpt-translation`); páginas de tópico agora servem os 41
  códigos canônicos com referências reais; busca global indexa os 41; Introdução PT (displayPtBr)
  na página da ideia; 31/31 testes (14 pré-existentes preservados + 17 novos) · typecheck · build
  estático 307 páginas OK.
- **Continuam abertos (por desenho):** (a) Additional Readings NÃO parseadas — estado honesto;
  (b) selo canônico aguarda upload do PDF na `corpus` (fingerprints já no ledger);
  (c) volume impresso do capítulo (Vol. I vs II) a confirmar no OCR público;
  (d) divergência 1952×benchmark do 8c(1) segue UNRESOLVED (edition-delta é a hipótese prioritária;
  o capítulo 1990 decidirá).
