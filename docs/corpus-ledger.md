# Ledger do corpus — fingerprints e estado de transporte

*O inventário histórico (Vols. 1–2, perdas de snapshot, chunks) vive em `Volumes/README.md` na branch `arena/01a05420-syntopicon`. Este arquivo é o ledger corrente da branch `corpus`. Regra: **nada é dado antes de estar aqui com fingerprint**, e arquivo ausente do disco/remote aguarda reenvio — nunca é reconstruído de memória.*

---

| Arquivo (nome canônico na `corpus`) | Estado | Tamanho (bytes) | MD5 | SHA-256 | Origem declarada | Registrado em |
|---|---|---:|---|---|---|---|
| `justice-syntopicon-vol2-p850-879.pdf` | ⏳ **AGUARDA UPLOAD** — fingerprint conferida pelo ChatGPT no arquivo local; transporte pendente (bloqueio de escrita da integração GitHub do ChatGPT; Dono faz upload web ou reconecta a integração com escrita) | 1.954.104 | `a443b18f338ca93d05a84fcde8f91515` | `9253f5b8b3cd0e19d85d3dfa7454328269a955f818b559966cafca1bc094f377` | Syntopicon, Vol. 2, cap. 42 JUSTICE, pp. impressas 850–879, 30 páginas (fonte primária do golden case) | 03/09/2026, via ChatGPT |
| `gbww-vol-01-the-great-conversation.ocr.txt` | ⚠️ recebido e auditado em 30/08 na sessão anterior; **perdido do snapshot** — aguardando reenvio | 251.156 | `a0992a411718c3d3867b6fc41a5978b4` | *(preencher no reenvio)* | OCR do Internet Archive (27ª impr., 1984, ed. 1952) | ledger histórico |
| `gbww-vol-02.part03.*` (chunks + merge parcial) | 🚧 parcial em disco da sessão anterior; parts 01–02 ausentes | 292.241 (parcial) | `c03bf376b77563f8aa65fc8c8a32b1f5` | *(preencher no reenvio)* | pastes sequenciais do Dono | ledger histórico |

## Protocolo de conferência (ao receber upload)

1. Baixar o arquivo da `corpus` e conferir **tamanho + MD5 + SHA-256** contra a tabela (emenda do ChatGPT, 03/09: MD5 detecta perda/corrupção acidental; SHA-256 robustece a fingerprint sem custo prático). Divergiu → reenvio; bateu → marcar ✅ recebido aqui e no `STATUS.md`.
2. Só então iniciar ingestão (RAW FIRST; provenance de fonte primária; nada de memória de conversa).

## Extração independente dupla (acordada em 03/09)

O ChatGPT tem o Justice.pdf íntegro NA CONVERSA dele e fará **extração independente** das 18 referências de 8c(1) + estrutura do outline, em formato de confronto. O Arena fará a própria ingestão a partir do arquivo na `corpus` (fonte durável com fingerprint). **Regras:** (a) a extração do ChatGPT é FERRAMENTA DE CONFRONTO — nunca entra no dataset como canônica (o canal primário do dataset é o arquivo com fingerprint); (b) divergências entre as duas extrações viram fila de conferência na fonte; (c) concordância dupla aumenta a confiança e acelera a validação.
