# BENCHMARK_ANALYSIS — Mortimer (mortimer.vercel.app / www.mortimer.app)

Sessão de estudo: 2026-09-02 (fetches diretos: `/`, `/topic/1`, `/topic/42`, `/subtopics/1021`, `/subtopics/1056`–`1068`). Auditoria anterior mantida como base.

## Mapa de páginas observadas

| Página | URL | O que mostra |
|---|---|---|
| Home | `/` | Hero editorial, memorial a Adler, 1 CTA ("Start Exploring"), stats (102/3000+/100k+), demo "Your Journey Awaits", Featured Thinkers, Browse by Category, grade All Topics (Cards/Index/Shuffle) |
| Grande Ideia | `/topic/{n}` | Hero (imagem + título + "N subtopics") + lista achatada de grupos de tópicos |
| Grupo de tópicos | `/subtopics/{id}` | Título + descrição + contagem de passagens + autores agrupados com contagens (sem locators, sem texto na página) |
| Passagem individual | não observada publicamente | `/excerpt/[id]` existiu no passado (Wayback) |
| Busca / autores / obras | não observadas | sem rotas públicas equivalentes |

## Conexões observadas

`Home → /topic/{n} → /subtopics/{id} → (passagens)`. Breadcrumb ausente; a profundidade termina nos grupos de tópicos. IDs numéricos opacos (`/subtopics/1067`).

## Descoberta estrutural importante (desta sessão)

A ordem de exibição em `/topic/42` NÃO é a ordem impressa do outline de Adler. Evidência: o grupo exibido em 10º lugar ("Economic Distribution") contém o subtree cujo nó com descrição "Economic exploitation: chattel slavery and wage slavery" (`/subtopics/1067`) é exatamente o Topic impresso **8c(1)** registrado no Justice.pdf na sessão de auditoria. O código impresso do grupo econômico é portanto **8**, e seu subtree impresso é: 8a (propriedade/distribuição), 8b (salários e troca), 8c (organização da produção) → 8c(1) (exploração: escravidão), 8c(2) (lucro/incremento). Os demais grupos nível-1 não têm código impresso confirmado nesta sessão.

## 1. Padrões que devemos ADOTAR

1. Home editorial com 1 CTA e compreensão do produto em < 10s.
2. Progressão geral → específico → fonte em poucos cliques.
3. Hero da Grande Ideia seguido IMEDIATAMENTE do outline navegável.
4. Contagens como orientação ("41 subtopics", "N passages" por tópico).
5. Listas escaneáveis: título forte + descrição de uma linha.
6. Descoberta por autores dentro do tópico (nome + contagem).
7. Contexto do tópico: título + descrição canônica visíveis juntos.
8. Baixa densidade; ornamentação mínima; foco no texto.
9. Progressive disclosure (grupos → detalhes → passagens).

## 2. Padrões que devemos ADAPTAR

1. "N subtopics" → nossa contagem explicada: "41 tópicos em 3 níveis (11 de nível 1)".
2. Lista achatada → árvore hierárquica (accordion), exigência de Adler.
3. IDs opacos (`/subtopics/1067`) → códigos canônicos na URL (`/ideias/42-justice/8c-1`).
4. Autores com contagem → mantido, mas como camada DERIVED com link para página de autor real.
5. Demo da home → sincronizada com dados reais do golden case.
6. CTA rotativo observado (17 → 26 entre sessões) → CTA fixo.
7. Sem breadcrumb → breadcrumb persistente em toda página profunda.

## 3. Padrões que devemos REJEITAR

1. Nomenclatura invertida: 102 ideias chamadas "Topics"; tópicos de Adler chamados "Subtopics".
2. Eras históricas nos autores (Hobbes/Shakespeare como "Medieval" — reobservado em 2026-09-02).
3. "100k+ passages" — claim não verificável publicamente.
4. Demo da home dessincronizada ("Justice — 12 subtopics" vs 41 na página).
5. Achatamento da hierarquia (impossui navegar a estrutura de Adler).
6. Categorias editoriais como navegação primária.
7. Autor/obra tratados como imagens/ícones decorativos; sem página própria observada.
8. Qualidade de dados: typo "Theorietical"; "Bible" modelado como autor; mistura aparente de edições GBWW (autores do séc. XX — Tawney, Orwell, Keynes, Weber — convivem com o corpus de 1952).

## 4. Ontologia Mortimer × Ontologia de Adler

| Mortimer | Adler (nosso canon) |
|---|---|
| Topic (102) | **Great Idea** (102) |
| Subtopic | **Topic** (unidade elementar) |
| passages | **References** (Topic→Author→Work→Locator) que realizam **Passages** |
| — (não observado) | Introduction · Cross-References · Additional Readings · Inventory of Terms |

Nunca adotar a nomenclatura do benchmark. A unidade elementar é o TOPIC; Great Idea não vira "Topic"; Topic não vira "Question"; Topics parecidos não são deduplicados.

## 5. Limitações do que é observável

- Páginas de `/subtopics/{id}` expõem autores+contagens, mas NÃO locators nem texto — as References completas só existirão com Justice.pdf.
- A ordem de exibição não é a ordem impressa (ver seção acima).
- Instabilidade de render entre `www.mortimer.app` e o mirror vercel (SSR/client — hipótese).
