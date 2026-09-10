# Justice Arena App — protótipo isolado do golden case (Great Idea 42)

> O Syntopicon é o mapa. Os Great Books são o território. A leitura sintópica é a viagem entre os dois.

Protótipo **autocontido e sem dependências de runtime** do golden case **Justiça / Justice (Great Idea 42)**,
criado na sessão Arena de análise comparativa (2026-09-09) e isolado em `prototype/justice-arena-app`.
Não toca no corpus canônico, nas rotas principais nem nos candidatos originais.

## O que incorpora

O capítulo **Justice** da edição **1952** do Syntopicon (GBWW Vol. 2, pp. impressas 850–879),
na ingestão canônica RAW FIRST auditada do projeto:

- **Outline of Topics**: 41 tópicos (11 + 28 + 2) na ordem impressa, códigos reais;
- **References**: 826 linhas impressas (795 de autores + 31 bíblicas), `locatorRaw` literal;
- **Cross-References**: 10 remissões globais do capítulo (p. 879);
- **Introduction**: texto EN integral (RAW, 60 parágrafos) + tradução PT de apresentação (55 parágrafos);
- **Additional Readings**: seção bruta (não parseada);
- **Camada de demonstração** (interpretativa, rotulada): 4 referências + 4 passagens de domínio público;
- **Inventory Terms**: 2 termos com evidência, edição e proveniência explícitas.

## Executar

```bash
cd prototype/justice-arena-app

# 1. servir (zero dependências; qualquer servidor estático também serve)
node scripts/serve.mjs          # → http://localhost:8080

# 2. testes (integridade, golden path, teclado, modal, busca, comparação)
npm install                     # instala apenas a devDependency de testes (jsdom)
npm test                        # node --test tests/*.test.mjs

# 3. (opcional) regenerar os datasets a partir da fonte canônica
#    requer um checkout de bernardotb/syntopicon @ 21d60ce (branch arena/01a06414-syntopicon)
cd <checkout-da-fonte>
npx tsx <caminho>/prototype/justice-arena-app/scripts/build-dataset.mjs --source . --out <caminho>/prototype/justice-arena-app/data
```

Sem chaves de API, sem CDN, sem fontes externas, sem rede: funciona offline.

## Arquitetura

```
prototype/justice-arena-app/
├── index.html              # shell (header/nav/main/footer), sem conteúdo dinâmico
├── src/
│   ├── domain.js           # camada de domínio PURA (sem DOM): tipos, derivados, invariantes
│   ├── ui.js               # el() com invariante anti-botão-morto, chips, modal (foco preso), tabs
│   ├── router.js           # roteador por hash (fragmentos reais, nunca placeholders)
│   ├── main.js             # bootstrap: fetch dos datasets, contexto, bandeja de comparação
│   ├── views.js            # tabela de rotas
│   └── views/              # home, idea, topic, reference, bibliographic, inventory,
│                           #   compare, tour, volumes, about, divergence, shared
├── data/                   # datasets JSON versionados com manifesto de proveniência
│   ├── justice-1952.json   #   corpus canônico (gerado; NÃO editar à mão)
│   ├── introduction-en.json#   Introduction EN (RAW extraído)
│   ├── additional-readings.json
│   ├── demo-layer.json     #   demonstrações interpretativas
│   ├── ideas-102.json      #   identidade canônica das 102 ideias
│   ├── sources.json        #   registro de fontes
│   └── terms.json          #   Inventory Terms (registro manual auditar)
├── tests/                  # node:test + jsdom (36 testes)
├── scripts/
│   ├── serve.mjs           # servidor estático sem dependências
│   └── build-dataset.mjs   # geração reprodutível a partir da fonte
├── README.md               # este arquivo
└── AUDIT.md                # auditoria completa: candidatos, júri, decisões, gates
```

**Separação**: domínio (`domain.js`, puro e testável) · dados (`data/*.json`, com manifesto) ·
apresentação (`views/`, `ui.js`, `styles.css`) · testes (`tests/`).

## As três perspectivas (+ o inventário)

A mesma base, quatro vistas — nenhum banco duplicado:

| Perspectiva | Caminho | Entrada |
|---|---|---|
| Sintópica | Ideia → Tópico → Referência → Obra → Autor | `#/ideia/justica` |
| Bibliográfica | Autor → Obra → Referências → Tópicos | `#/autores` |
| Física | Volume GBWW → Obras → Referências | `#/volumes` |
| Lexical | Inventory Term → Tópico | `#/inventario` |

Percurso guiado do golden case: `#/percurso`.

## Contratos epistêmicos (invioláveis)

1. **`locatorRaw` é literal** — nunca normalizado; sobrescritos de Bekker, `esp`, `passim` preservados.
2. **Reference ≠ Passage** — referência indica ONDE ler; passagem ausente é declarada com a frase
   exata “Passagem não incorporada ao corpus digital.” As 4 passagens existentes são demonstrações
   interpretativas, visual e semanticamente distintas.
3. **Edição é identidade** — só a 1952 está incorporada; a divergência 1952×benchmark (provável
   delta de edição para 1990) permanece visível e UNRESOLVED no tópico 8c(1).
4. **Autor/Obra são derivados** — agregam as linhas impressas; a forma impressa (`authorRaw`) é a
   identidade; nada é deduplicado por semelhança; MARX e MARX-ENGELS seguem distintos.
5. **Contagens derivadas** — nenhum número é fixado em código (testado).
6. **Camadas rotuladas** — CANÔNICO / DERIVADO / INTERPRETATIVO têm chips distintos em tela.
7. **Termos só com evidência** — “Chattel slavery” é sustentado pelo título impresso de 8c(1)
   (1952) com o verbete do Inventory declarado PENDENTE; “Exploitation / Economic slavery” é o
   verbete VERIFICADO do Inventory 1990 (via corpus-ledger). A dúvida é preservada.
8. **Zero dependências externas** — sem APIs, sem CDN, sem credenciais, sem rede.

## Fontes

Todos os datasets declaram `manifest` com repositório, branch, commit, arquivo e método
(`data/*.json`). Fonte canônica: `bernardotb/syntopicon@arena/01a06414-syntopicon` (commit
`21d60ce`), arquivos `data/justice-1952-full.ts`, `data/justice.ts`, `data/ideas.ts`,
`data/source-registry.ts` e `docs/corpus/justice-1952-texto-integral-colagem-dono.md`.
O selo definitivo do PDF original (branch `corpus`) permanece pendente — ver `AUDIT.md`.

## Limitações

- Nenhuma passagem canônica incorporada (por desenho; estado explícito em toda referência).
- Somente o capítulo Justiça; as demais 101 ideias seguem sem estrutura.
- Introduction EN é RAW de leitura (artefatos de página removidos; nenhuma sentença alterada).
- Cross-references resolvem no nível de ideia; tópicos de outros capítulos ficam em texto bruto.
- Uma linha de fluxo de digitalização (`jr1952:6e:03`) é exibida como veio impressa, rotulada
  como artefato, sem gerar entidades.
