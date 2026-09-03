# `corpus` — prateleira de fontes (branch órfã, NUNCA mergeada)

Aqui entram os arquivos RAW do projeto: **Justice.pdf**, os OCRs dos **Vols. 1–3**,
o **Inventory of Terms** e afins. Nada desta branch vai para `main` ou `data/` sem
extração + auditoria (ciclo do memorando v3, Frente B).

## Como subir um arquivo

1. No GitHub: troque a branch para `corpus` → *Add file* → *Upload files*.
   (Ou via API/ChatGPT, que tem o Drive do Dono como origem.)
2. Nome do arquivo: `kebab-case` descritivo — ex.: `justice-syntopicon-vol2-p850-879.pdf`,
   `gbww-vol-02-the-great-ideas-i.ocr.txt`.
3. **Fingerprint obrigatória** na mensagem do commit (ou no `Volumes/README.md` da
   branch de origem): tamanho em bytes + md5 — é a conferência contra perda de snapshot
   (já aconteceu duas vezes neste projeto; a regra não é burocracia).
4. Upload parcial (texto colado em partes): seguir o padrão do ledger —
   `parts/<nome>.chunkNN` em ordem explícita, merge só com total conferido.

## Regras invioláveis

- **NUNCA reconstruir trecho perdido de memória** — aguardar reenvio (anti-alucinação absoluta).
- Raw nunca mergeia em `main`; nunca é editado para "caber no parser" (RAW FIRST).
- Fonte primária (PDF/OCR do Syntopicon) vence benchmark e vence memória de modelo.
- Após a ingestão confirmada em `data/` (com provenance), o arquivo raw continua aqui —
  esta branch é o arquivo permanente das fontes.