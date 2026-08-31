# Volumes/ — corpus local (zona raw)

Este diretório contém o corpus de referência do projeto. **Nada aqui entra no
Git** (ver `.gitignore`) — exceto este README, que documenta proveniência e
integridade. Extrações brutas ficam em `Volumes/raw/` (também gitignored);
artefatos canônicos derivados vivem em `data/` com proveniência por registro.

## Convenções

- **Raw vs canonical:** o conteúdo dos volumes é *raw*. Só sobe para `data/`
  após extração + auditoria, citando volume e posição.
- **Regra da numeração canônica:** número de capítulo vem dos cabeçalhos dos
  Volumes 2–3, nunca de artefatos derivados ou posições em array.
- **Volume 1 = camada superior interpretativa** (*The Great Conversation*,
  Hutchins). Não é fonte de estrutura (tópicos, referências, numeração).
- **Anti-alucinação absoluta:** se não está em fonte identificada, não entra;
  memória de modelo nunca é fonte. NUNCA reconstruir trechos perdidos.

## Estado atual do workspace (31/08/2026) — LEIA PRIMEIRO

O snapshot anterior do workspace **não reteve os ficheiros raw** (gitignored).
Arquivos ausentes no disco, com fingerprints registradas para verificação no
reenvio:

| Arquivo | Estado | Fingerprint registrada |
|---|---|---|
| `gbww-vol-01-the-great-conversation.ocr.txt` | ⚠️ ausente — aguardando reenvio | 9.367 linhas · 251.156 B · md5 `a0992a411718c3d3867b6fc41a5978b4` |
| `parts/gbww-vol-02.part02.chunk01…03` | ⚠️ ausentes — aguardando reenvio | 74.517 B no total (chunk01 57.492 · chunk02 3.976 · chunk03 13.049) |
| merge antigo de `gbww-vol-02.part03.txt` | ⚠️ ausente e **superseded** (ver abaixo) | 489.317 B · md5 `24d1f5bbf71f5a64f91d22563484940f` |

Presentes no disco agora: `parts/gbww-vol-02.part03.chunk01…06` e o novo
merge parcial `gbww-vol-02.part03.txt` (detalhes abaixo).

## Inventário do corpus

| Volume | Arquivo | Origem | Integridade | Status |
|---|---|---|---|---|
| 1 — The Great Conversation | `gbww-vol-01-the-great-conversation.ocr.txt` | OCR do Internet Archive (2012), `archive.org/details/greatconversatioOOhutc`; 27ª impressão (1984) da ed. 1952; recebido via texto colado na sessão Arena (30/08/2026) | 9.367 linhas · 251.156 B · md5 `a0992a411718c3d3867b6fc41a5978b4` | ⚠️ recebido e auditado em 30/08, mas **arquivo ausente no disco** — aguardando reenvio (md5 serve de conferência) |
| 2 — The Great Ideas I (Angel–Love) | `parts/gbww-vol-02.part03.chunk01…06` + merge parcial `gbww-vol-02.part03.txt` | texto colado na sessão Arena (30–31/08/2026), em pastes sequenciais | part03 parcial: 4.669 linhas · 292.241 B · md5 `c03bf376b77563f8aa65fc8c8a32b1f5` | 🚧 intake em andamento (ver abaixo) |
| 3 — The Great Ideas II (Man–World) | *(pendente)* | — | — | ⏳ aguardando envio |

## Intake estagiado do Volume 2

O Volume 2 (~4,73M chars anunciados) está chegando em pastes sequenciais.
Cada parte é gravada em `Volumes/parts/` (chunks de ≤ ~100K chars) e depois
fundida com `cat` **na ordem explícita**, nunca lexical. O ficheiro final
`gbww-vol-02-the-great-ideas-i.ocr.txt` só será montado quando todas as
partes estiverem completas — aí se confere o total contra 4.730.000 e os
marcadores esperados (fim do Vol. 2 = *Additional Readings* do capítulo LOVE).

### part01 — ⚠️ ausente

Primeiro envio (meio da intro de ANGEL → meio da intro de BEING) nunca foi
persistido. **Lacuna:** também falta o cabeçalho do volume — confirmar se o
`.txt` de origem realmente começa aí. Aguardando reenvio integral.

### part02 — ⚠️ ausente (tinha sido recebida)

Chunks 01–03 (74.517 B) continham: front matter + PREFACE I–II + Reference
Style I–III + tabela de autores/títulos (vols. 4–10, até Hippocrates). Foram
perdidos do disco junto com o snapshot. **Lacuna adicional conhecida:** o
trecho PREFACE III (assinatura do Adler) → divisória "THE GREAT IDEAS: I
Chapters 1-50: Angel to Love" → ANGEL completo, BEING, CAUSE, CHANCE e
início de CHANGE (até o tópico 12b) foi enviado mas nunca persistido.
Aguardando reenvio integral da parte 2. NUNCA reconstruir de memória.

### part03 — 🚧 **parcial** no disco (re-build da re-transmissão autoritativa)

O usuário retransmitiu a parte 3 em versão mais completa (supersede o build
anterior de 489.317 B, descartado). Persistidos em chunks e fundidos em
`gbww-vol-02.part03.txt` (**4.669 linhas · 292.241 B · md5 `c03bf376…`**):

- `chunk01` (13.557 B): cauda de CHANGE — refs a partir de p. 302b, banner OCR
  "l5hto I5c", CROSS-REFERENCES, ADDITIONAL READINGS (Aquinas *De Principiis
  Naturae* → Riezler, *Physics and Reality*).
- `chunk02` (CITIZEN, íntegro): cabeçalho OCR-wart ".Cbap fern: CITIZEN"
  preservado; intro (tripartição citizen/subject/slave, 3 atributos jurídicos
  de Kant, cidade de Deus), OUTLINE tópicos 1–9 (com 2a/2b/2c), REFERENCES,
  CROSS-REFERENCES, ADDITIONAL READINGS (Cicero *De Officiis* → Ewing,
  *The Individual, the State and World Government*).
- `chunk03` (CONSTITUTION, íntegro): header "Chapter ix:"; OUTLINE 1–10;
  ADDITIONAL READINGS fecha com Borgese et al., *World Constitution*.
- `chunk04` (COURAGE, íntegro): header "Chapter 13: COURAGE"; OUTLINE 1–6;
  ADDITIONAL READINGS fecha com Sartre. **Anomalia:** a linha `COURAGE`
  aparece onde se esperaria o cabeçalho `REFERENCES` (por isso REFERENCES ×3
  e não ×4) — preservada warts-and-all; conferir contra o paste original.
- `chunk05–06` (CUSTOM AND CONVENTION, íntegro): header "Chapter 14:";
  OUTLINE 1–5 (com 2a/2b, 3a/3b, 4a/4b, 5a/5b); ADDITIONAL READINGS fecha com
  Waddington, *Science and Ethics*.

**Cobertura:** 4 capítulos íntegros (CITIZEN, CONSTITUTION, COURAGE, CUSTOM
AND CONVENTION) + cauda de CHANGE. **Falta da parte 3:** DEFINITION,
DEMOCRACY, DESIRE, DIALECTIC, DUTY, EDUCATION e fragmento da intro de
ELEMENT (corte "…he man soul o") — a re-transmissão continha esse trecho,
mas ele **não foi persistido** (condensação de contexto antes da escrita).
Aguardando reenvio.

**Ressalva de proveniência (honestidade):** chunks 01–02 foram gravados de
turnos anteriores com o paste visível; chunks 03–06 foram montados em turno
de continuação com contexto condensado. Para garantia de verbatim absoluto,
o usuário pode reenviar o trecho CONSTITUTION→CUSTOM — os md5 por chunk
servirão de conferência. Estruturais do merge atual: INTRODUCTION ×4,
OUTLINE OF TOPICS ×4, REFERENCES ×3 (ver anomalia), CROSS-REFERENCES ×6,
ADDITIONAL READINGS ×5.

**Emendas mecânicas documentadas (não são corpus):** emendas de costura
chunk02→03 e chunk03→04 receberam `\n` inserida (ficheiros sem newline
final: "GovernmentChapter ix:" e "ConstitutionChapter 13:"); removida linha
de controle "END OF VOLUME II, PART 3" (marcador prematuro inserido no
staging — a parte 3 não termina em CUSTOM).

### part04 — ⏳ aguardando envio

Deve continuar ELEMENT a partir do corte ("…he man soul o") e percorrer
ELEMENT → FAMILY → FATE → FORM → GOD → GOOD AND EVIL → GOVERNMENT até o
início da intro de HABIT ("Christian theology. Habits are there distin-").

### part05 — ⚠️ recebida, **não persistida** — aguardando reenvio

Paste recebido na sessão (início mid-intro de HABIT, p. 672; HABIT, HISTORY,
HONOR, HYPOTHESIS, IDEA, IMMORTALITY, INDUCTION, INFINITY, JUDGMENT, JUSTICE
íntegros; corta mid-intro de KNOWLEDGE em "and whe"). Nada foi gravado em
disco antes da condensação. Reenviar integralmente.

## Notas de integridade do Volume 1

- Chegou **via paste no chat**, não como arquivo `.txt` original — a formatação
  pode ter sido normalizada pelo transporte. O md5 acima referencia o conteúdo
  tal como recebido.
- OCR contém ruído típico: linhas de `^`, `£`, `§`; colunas intercaladas nas
  end-papers; erratas de reconhecimento (`GREA T`, `De Kevolutionibus`,
  page refs como `1143-1x17`). Toda extração deve ser tolerante a ruído e
  qualquer número deve ser conferido no contexto raw.
- Macroestrutura confirmada pelo próprio texto: Syntopicon = Volumes 2–3
  (partição *Angel–Love* / *Man–World*); **2.987 tópicos** sob as 102 ideias;
  *Inventory of Terms* no Vol. 3, pp. 1303–1345; história do Syntopicon no
  Vol. 3, pp. 1119–1199.

## Reconhecimento já realizado (30/08/2026)

`scripts/extract-idea-endpapers.ts` extraiu das end-papers a lista das
102 ideias e auditou o resultado (`Volumes/raw/idea-endpapers-extract.txt` —
também ausente do disco; regenerável quando o Vol. 1 for reenviado):

- **102 nomes únicos** extraídos; **101 confirmados** contra a expectativa
  estrutural; partição Vol 2/3 em LOVE=#50 / MAN=#51 confirmada.
- 3 artefatos de OCR reconciliados manualmente com evidência de linha
  (NECESSITY AND CONTINGENCY, SLAVERY, TYRANNY).
- **Pendente:** `TYRANNY AND DESPOTISM` — o sufixo "AND DESPOTISM" não
  sobreviveu ao OCR das end-papers; confirmação no cabeçalho do capítulo
  do Volume 3.
- **Números canônicos 1–102 provisórios** até a conferência dos cabeçalhos
  de capítulo dos Volumes 2–3.

Reproduzir: `npm run extract:ideas` (requer o corpus presente em `Volumes/`).
