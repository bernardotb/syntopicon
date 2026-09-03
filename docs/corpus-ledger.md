# Ledger do corpus — fingerprints e estado de transporte

*O inventário histórico (Vols. 1–2, perdas de snapshot, chunks) vive em `Volumes/README.md` na branch `arena/01a05420-syntopicon`. Este arquivo é o ledger corrente da branch `corpus`. Regra: **nada é dado antes de estar aqui com fingerprint**, e arquivo ausente do disco/remote aguarda reenvio — nunca é reconstruído de memória.*

---

| Arquivo (nome canônico na `corpus`) | Estado | Tamanho (bytes) | MD5 | Origem declarada | Registrado em |
|---|---|---:|---|---|---|
| `justice-syntopicon-vol2-p850-879.pdf` | ⏳ **AGUARDA UPLOAD** — fingerprint conferida pelo ChatGPT no arquivo local; transporte pendente (bloqueio de escrita GitHub do ChatGPT; Dono fará upload via web) | 1.954.104 | `a443b18f338ca93d05a84fcde8f91515` | Syntopicon, Vol. 2, cap. 42 JUSTICE, pp. impressas 850–879, 30 páginas (fonte primária do golden case) | 03/09/2026, via ChatGPT |
| `gbww-vol-01-the-great-conversation.ocr.txt` | ⚠️ recebido e auditado em 30/08 na sessão anterior; **perdido do snapshot** — aguardando reenvio | 251.156 | `a0992a411718c3d3867b6fc41a5978b4` | OCR do Internet Archive (27ª impr., 1984, ed. 1952) | ledger histórico |
| `gbww-vol-02.part03.*` (chunks + merge parcial) | 🚧 parcial em disco da sessão anterior (292.241 B, md5 `c03bf376b77563f8aa65fc8c8a32b1f5`); parts 01–02 ausentes | 292.241 (parcial) | `c03bf376b77563f8aa65fc8c8a32b1f5` | pastes sequenciais do Dono | ledger histórico |

## Protocolo de conferência (ao receber upload)

1. Baixar o arquivo da `corpus` e conferir **tamanho + md5** contra a tabela. Divergiu → reenvio; bateu → marcar ✅ recebido aqui e no `STATUS.md`.
2. Só então iniciar ingestão (RAW FIRST; provenance `justice-outline-printed`/fonte primária; nada de memória de conversa).
