# Identidade Visual — A Grande Conversa

*Direção de arte e sistema visual do produto. Complementa `docs/guia-do-produto.md`. Datas de referência: 02–03/09/2026.*

---

## 1. Conceito único

> **"Biblioteca intelectual contemporânea brasileira."**
> A calma de uma biblioteca, a clareza de um editorial moderno, a cor de um modernismo brasileiro.

O leitor deve sentir que está com **um livro aberto numa mesa clara** — não num dashboard, não num aplicativo de "conteúdo", não numa página de faculdade.

## 2. As três direções avaliadas (amostras em `assets/concept/`)

| Opção | Arquivo | O que é | Veredito |
|---|---|---|---|
| **A — Gravura** | `opcao-a-gravura.jpg` | Balança sobre livros, tinta verde única sobre marfim, traço de gravura séc. XVIII | **Coadjuvante** — ótima para capítulos/ornamento eventual; sozinha, pende ao "clássico" que o benchmark já ocupa |
| **B — Modernista** | `opcao-b-modernista.jpg` | Dois perfis abstratos (verde e vinho) em diálogo, com balança geométrica entre eles; riso de papel | **RECOMENDADA** — é literalmente "a grande conversa" (diálogo + justiça), identidade própria, brasileira, inconfundível com o benchmark |
| **C — Pintura clássica** | `opcao-c-pintura-classica.jpg` | Biblioteca ao entardecer com busto de Sócrates | **REJEITADA** — linda, mas é exatamente o gesto do Mortimer (pintura clássica no hero). Copiar seria nos parecer com ele na primeira dobra |

**Decisão:** B como linha de marca (hero + ilustrações editoriais), A como linguagem secundária para ornamento discreto (frisos, capitulares eventuais). C descartada.

## 3. Paleta (travada)

| Papel | Cor | Hex | Onde aparece |
|---|---|---|---|
| Papel (fundo) | Marfim quente | `#FAF6EE` | fundo geral |
| Papel elevado | Marfim claro | `#FFFDF7` | cards, listas |
| Tinta (texto) | Grafite quase preto | `#24211B` | texto, títulos |
| Tinta suave | Grafite quente | `#4D4739` | texto secundário |
| Institucional | **Verde profundo** | `#1E4D38` (escuro `#14352A`) | marca, links, botões, números canônicos |
| Acento alternativo | **Vinho escuro (oxblood)** | `#5E2233` | reserva: marcação `esp.`, estados especiais — nunca junto do verde na mesma ação |
| Linhas | Cinza quente claro | `#E6DDCB` / `#D5C9B0` | bordas, separadores |
| Demonstração | Areia/âmbar | `#F5EED9` + tinta `#6D5A1E` | badge "Demonstração" |

Regras: máximo **1 cor de ação por tela**; verde = navegação/acento; arte pode usar verde + vinho juntos (são a "dupla do diálogo"); nada de gradientes chamativos, nada de cores saturadas fora da paleta.

## 4. Tipografia

- **Fraunces** (serifa variável, óptica de livro com contemporaneidade) — títulos, textos canônicos, leitura de passagens.
- **Inter** (grotesca discreta) — interface: menus, metadados, breadcrumbs, botões, eyebrows.
- Fallback digno já ativo: Iowan/Palatino (serifa) e system sans.
- **Implantação: self-host** (`next/font/local`, arquivos `.woff2` na repo — `public/fonts/`). Motivo: o Google Fonts ficou **inalcançável no sandbox** (build falhou e foi revertido em 03/09); self-host remove a dependência de rede para sempre e respeita privacidade (nenhum pedido externo).
- Escala: leitura ~18–19px / 1.65; passagem em leitura ~21px / 1.85, coluna ~58–68ch; H1 clamp(2rem→3.2rem).

## 5. Arte gerada por IA — política

Sim, usamos arte gerada por IA — **como camada editorial decorativa, jamais como dado**. Regras:

1. **Arte nunca carrega informação.** Nenhum fato, número, data ou relação pode estar numa imagem. A imagem é emocional/identitária; a informação é sempre texto do dataset.
2. **Um estilo, travado.** Todas as peças nascem do MESMO template de prompt (estilo B: formas planas modernistas, riso de papel, paleta `#FAF6EE/#1E4D38/#5E2233/#24211B`), mudando só o motivo de cada Grande Ideia. É assim que 102 peças ficam coesas como uma coleção de capas de livro — e não 102 sorteios.
3. **Onde entra:** (a) hero da home (feito); (b) **vinheta por Grande Ideia** (102 peças, V1.1 — canto da capa da ideia, sempre pequena, opcional para carregar); (c) textura de papel sutil no fundo (opcional). **Onde NÃO entra:** listas, índices, tópicos, referências, resultados de busca — superfícies de dados são puramente tipográficas (a lista de 102 "respira" como biblioteca, não vira galeria).
4. **Higiene:** sempre `alt`/`aria-hidden` adequados, carregamento `lazy` exceto hero, imagens otimizadas (WebP, ~100–200 KB), versionadas em `public/`.
5. **Comparação honesta com o benchmark:** o Mortimer também usa imagens geradas/estocadas por ideia — mas genéricas, sem paleta travada (uma mesma imagem serve de "capa" para o tópico e todos os seus subtópicos). Nosso diferencial é **consistência de sistema** (uma coleção, uma mão) e **modéstia de uso** (a arte não compete com o texto).

## 6. Composição e ritmo

- Muito espaço negativo; densidade baixa; **número canônico como assinatura visual** (42, 8c(1) em tabular — é a nossa "marca", não decoração).
- Hairlines (1px) em vez de sombras; sombra suave só no hero art.
- Sem: dark academia, texturas pesadas de couro, pergaminho, dashboard, cards coloridos, avatares, ícones decorativos, carrosséis, gradientes.
- Mobile: hero empilha (texto primeiro, arte abaixo em largura reduzida), contexto em breadcrumbs compactos, ação de leitura sempre dominante.

## 7. Estado atual (03/09/2026)

- ✅ Paleta e tipografia base aplicadas no CSS do protótipo (fundo marfim, verde institucional, serifa/sans com fallback).
- ✅ Hero da home com a arte da Opção B aplicado e no ar no preview (`public/hero-a-grande-conversa.png`).
- ✅ Amostras das 3 direções preservadas em `assets/concept/`.
- ⏳ Pendente: baixar `.woff2` de Fraunces/Inter para `public/fonts/` + `next/font/local` (self-host); template de prompt das 102 vinhetas (V1.1); textura de papel opcional.
- Observação: o build do Google Fonts falhou no sandbox (rede); por isso self-host é também a escolha técnica, não só estética.
