# STATUS — A Grande Conversa

*Painel do projeto. Quem entrega trabalho grande atualiza aqui. Última atualização: 03/09/2026, por Arena Agent.*

---

## Onde está cada coisa

| Item | Estado | Onde |
|---|---|---|
| Fundação (102 ideias, schema, testes) | ✅ estável | `main` |
| Especificação V1 (LOCKED) | ✅ pronta e publicada | GitHub `arena/01a06414` → `docs/…` → `docs/a-grande-conversa-especificacao.md` |
| Protótipo navegável (home, 102 ideias, Justiça 8→8c→8c(1), autores, obras, passagem, inventário, sobre) | ✅ funcionando (14/14 testes, build 287 páginas) e publicada | GitHub `arena/01a06414` |
| Identidade visual (paleta, tipografia, hero) | ✅ v1 aplicada (hero no ar); fontes self-host pendentes | GitHub `arena/01a06414` → `docs/identidade-visual.md` |
| Guia do produto (leigo) | ✅ pronto | GitHub `arena/01a06414` → `docs/guia-do-produto.md` |
| Memorando de convivência | ✅ **v3 VIGENTE** — emendas do ChatGPT incorporadas; ciência do Codex pendente | GitHub `arena/01a06414` → `docs/colaboracao.md` |
| Ledger do corpus (Vols. 1–3) | 🚧 Vol. 1 recebido/perdido do disco (md5 no ledger); Vol. 2 parcial (292 KB) | GitHub, branch `arena/01a05420` → `Volumes/README.md` |
| Branch `corpus` (prateleira de fontes) | ⏳ a criar + primeiro upload (Justice.pdf) | Git |
| Protótipo da sessão ChatGPT (rotas `/prototype`, refs 1a–1c e 18 refs de 8c(1)) | ⚠️ nunca commitado — possivelmente perdido; dados resgatáveis das transcrições do Dono | — |

## Decisões do Dono (03/09/2026)

- **Estratégia de conteúdo:** copiar o conjunto de conteúdo do benchmark (mesma fonte: o Syntopicon) e traduzir para PT; o benchmark é o **checklist de ingestão** (varrer suas 102 páginas + listas de tópicos = lista de trabalho da digitalização).
- **Foco de esforço:** estética/frontend (o grande diferencial criativo). O "backend" do benchmark é inacessível/privado — e desnecessário: nosso modelo de dados já existe; o trabalho dele é ingestão.
- **Escopo:** uso pessoal/estudo; discussão de licenciamento encerrada (revisitar só se um dia for público).

## Próximos passos (ordem)

1. **Dono autoriza push** → workspace Arena sobe tudo para `arena/01a06414` (+ PR para `main` se aprovado).
2. Criar branch `corpus` e subir **Justice.pdf** (Dono/ChatGPT).
3. Ingestão do capítulo Justiça completo (41 tópicos, ~1.500 referências) RAW FIRST.
4. Completar reenvio das partes perdidas dos Vols. 1–2 (md5 de conferência no ledger).

## Discordâncias pendentes (§2.2 do memorando)

*Nenhuma registrada.* Análise crítica do ChatGPT (03/09): 6 CONCEDO, 6 EMENDO — todas as emendas aceitas e incorporadas na v3 (changelog no memorando). Papel do Codex proposto (§9): executor de pacotes, nunca quarto arquiteto; Pacotes 001 (locator-decoder) e 002 (benchmark-sweep) aguardando ratificação do ChatGPT e ciência do Codex.

## Bloqueios

*Workspaces Arena não persistem `node_modules` entre turnos (reinstalar antes de build) — sem impacto no Git.*
