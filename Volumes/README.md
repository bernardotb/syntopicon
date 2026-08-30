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

## Inventário do corpus

| Volume | Arquivo | Origem | Integridade | Status |
|---|---|---|---|---|
| 1 — The Great Conversation | `gbww-vol-01-the-great-conversation.ocr.txt` | OCR do Internet Archive (2012), `archive.org/details/greatconversatioOOhutc`; 27ª impressão (1984) da ed. 1952; recebido via texto colado na sessão Arena (30/08/2026) | 9.367 linhas · 251.156 B · md5 `a0992a411718c3d3867b6fc41a5978b4` | ✅ recebido e auditado (ver abaixo) |
| 2 — The Great Ideas I (Angel–Love) | *(pendente)* | — | — | ⏳ aguardando envio |
| 3 — The Great Ideas II (Man–World) | *(pendente)* | — | — | ⏳ aguardando envio |

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
102 ideias e auditou o resultado (`Volumes/raw/idea-endpapers-extract.txt`):

- **102 nomes únicos** extraídos; **101 confirmados** contra a expectativa
  estrutural; particação Vol 2/3 em LOVE=#50 / MAN=#51 confirmada.
- 3 artefatos de OCR reconciliados manualmente com evidência de linha
  (NECESSITY AND CONTINGENCY, SLAVERY, TYRANNY).
- **Pendente:** `TYRANNY AND DESPOTISM` — o sufixo "AND DESPOTISM" não
  sobreviveu ao OCR das end-papers; confirmação no cabeçalho do capítulo
  do Volume 3.
- **Números canônicos 1–102 provisórios** até a conferência dos cabeçalhos
  de capítulo dos Volumes 2–3.

Reproduzir: `npm run extract:ideas` (requer o corpus presente em `Volumes/`).
