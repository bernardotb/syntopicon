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

## 2. ACHADO PRINCIPAL — o benchmark diverge da fonte em 8c(1)

Autores das 18 referências impressas: Aristotle, Plutarch, Aquinas, **Milton**, Swift, Rousseau, Smith, **Gibbon ×2**, Kant, **Constitution of the U.S.**, Mill, Boswell, Hegel, Marx, **Marx-Engels**, Tolstoy, **Dostoevsky**.

Benchmark `/subtopics/1067` (17 autores): Aristotle, Plutarch, Aquinas, Swift, Rousseau, Smith, Kant, **Madison**, Mill, Boswell, Hegel, **Tocqueville**, Marx, Tolstoy, **Veblen**, **Tawney**, **Conrad**.

- **Na impressa e AUSENTES no benchmark:** Milton, Gibbon, Constituição dos EUA, Marx-Engels, Dostoevsky.
- **No benchmark e AUSENTES na impressa:** Madison, Tocqueville, Veblen, Tawney, Conrad.

Conclusão: o benchmark **alterou/substituiu conteúdo** da fonte em pelo menos este tópico (hipóteses: recorte editorial próprio, outra edição, ou erro de pipeline — inútil especular além do registro). **Decisão que se aplica sem nova discussão (canon vence):** a ingestão segue o PDF; o benchmark permanece checklist de cobertura, nunca autoridade de conteúdo. Registro também aciona o alerta de qualidade já levantado na auditoria (autores do séc. XX misturados a edições).

**Corolário de método:** a transcrição de 8c(1) que constava no "Design Conceitual" (sessão ChatGPT anterior) coincide com esta extração — forte indício de que veio do PDF real; de qualquer forma, a regra se mantém: a cópia canônica sairá do arquivo com fingerprint.

## 3. Fila de conferência na fonte (quando o arquivo chegar à `corpus`)

1. **[SCAN?] p. 858** — verificar numeração impressa de "10. Justice and law" e "11. Divine justice" (extrator viu "0." e "1."; filhos 10a–10d/11a–11b normais). Não promover esses códigos antes.
2. **Números de volume GBWW impressos nas linhas** (9, 14, 20, 32, 36, 38, 39, 40, 41, 42, 43, 44, 46, 50, 51, 52) — confirmar e usar como âncora de `gbwwVolume` por obra.
3. **8d** — capturar título impresso exato (extrator só listou o código).
4. Títulos de 1a–1f, 6a–6e, 9a–9g, 10a–10d, 11a–11b — capturar todos (skeleton completo → 41 nós no dataset).
5. Conferir sobrescritos aristotélicos (ᵃ/ᵇ) na transcrição dos locators.

## 4. Estado e próximos passos

- Dataset canônico: **intocado** (regra — promoção só com o arquivo na `corpus` + ingestão do Arena).
- Protótipo: segue como demonstração; atualizações estruturais (8d, ordem impressa, 18 refs reais) entram na ingestão.
- Pendências ativas: (a) upload do Justice.pdf pelo Dono (md5+sha256 no ledger); (b) Pacote 001 no Codex (independente, pronto).
