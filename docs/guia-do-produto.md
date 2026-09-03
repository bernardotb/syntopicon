# A Grande Conversa — Guia do produto em linguagem simples

*Documento para leigos: o que o produto é, quanto conteúdo tem, onde fica guardado e como funciona. Sem jargão técnico. Atualizado em 03/09/2026.*

---

## 1. O que estamos construindo (uma analogia)

Pense no Syntopicon como um **mapa rodoviário gigante** que foi feito, à mão, durante anos, apontando onde cada grande ideia é discutida nos grandes livros. O mapa é excelente — mas o leitor ainda precisava **ir até a estante, achar o volume certo, achar a página certa e achar o trecho certo**.

O nosso produto é esse mesmo mapa, no computador e no celular, onde **clicar no lugar do mapa já te entrega no trecho do livro**.

Três decisões que definem o produto:

1. **O conteúdo é o texto real do Syntopicon** — as mesmas 102 ideias, os mesmos ~3.000 tópicos, as mesmas ~163 mil referências. Traduzimos para o português. Não inventamos nada.
2. **A aparência é 100% nossa** — limpa, calma, editorial, melhor que a do concorrente (Mortimer). Copiamos dele só o que ele faz bem: simplicidade para navegar.
3. **A hierarquia de Adler fica intacta** — Grande Ideia → Tópico → Referência → Texto. O concorrente achata isso; nós não.

---

## 2. Como vai ficar (a experiência, em 8 passos)

1. Você abre o app e vê uma página única e simples: "A Grande Conversa" e um botão: **Explorar as Grandes Ideias**.
2. Vê a lista das **102 ideias** (Anjo, Alma, Justiça…) com número e nome em português.
3. Clica em **42 · Justiça** e entra no "capítulo" da ideia: a Introdução (o ensaio de Adler) e o mapa dos tópicos — a árvore que vai do geral (1. Concepções de justiça) ao específico (8c(1). Exploração econômica: escravidão e escravidão assalariada).
4. Clica no tópico que lhe interessa e vê **a lista de quem já discutiu aquilo**: Aristóteles, Aquino, Rousseau, Adam Smith, Kant, Hegel, Marx, Dostoiévski… cada um apontando a obra e o trecho exato.
5. Clica em **Ler** e chega ao texto — na tela, quando o texto estiver no acervo digital; ou com as **coordenadas decodificadas em linguagem humana** ("página 446, coluna direita, parte de baixo do volume 9") quando não estiver, com link para ler no exemplar digitalizado público.
6. Em qualquer ponto, o **caminho de volta** está visível (breadcrums: Justiça › 8 › 8c › 8c(1)) e há sempre um "continue" para o próximo tópico.
7. Dá para navegar **de lado**: por autor (Hobbes → em quais tópicos ele aparece), por obra (Leviatã → quem o cita e onde) e por termo (digitar "escravidão" e cair no tópico certo) — três portas para a mesma base.
8. **Nada é falso**: onde o conteúdo ainda não foi digitado, o app diz claramente "ainda não disponível" em vez de fingir.

---

## 3. Quanto conteúdo vamos precisar disponibilizar

### Os números do Syntopicon completo

| Camada | Quantidade | Tamanho aproximado (texto) |
|---|---:|---|
| Grandes Ideias (capítulos) | 102 | — (é o índice) |
| Introduções (ensaios de Adler) | 102 ensaios | ~800–1.000 páginas ≈ 3–4 MB |
| Tópicos (enunciados + hierarquia) | ~2.987 | ~1–2 MB |
| Referências (autor + obra + localizador) | ~163.000 | ~20–40 MB estruturado |
| Referências cruzadas + Leituras adicionais | por capítulo | alguns MB |
| Inventário de Termos | milhares de verbetes | alguns MB |
| **Total (sem os livros completos)** | | **menos de 100 MB — cabe em um anexo de e-mail** |

Ponto importante para quem não é técnico: **é pouco dado**. O Syntopicon inteiro em texto estruturado é menor do que uma foto de celular moderna. O que custa é o **trabalho de digitar/OCR e traduzir**, não o armazenamento.

### A camada dos textos completos (passagens)

Os 54 volumes da coleção (443 obras) inteiros seriam alguns **gigabytes** — mas **não precisamos disso na V1**. O plano é: trechos recuperados onde valer a pena + links para os exemplares públicos digitalizados (Internet Archive) para o resto. O mapa conduz; o território pode ficar onde está.

### Plano de ingestão (ordem do trabalho)

| Fase | Conteúdo | Estado |
|---|---|---|
| **Agora (golden case)** | Capítulo Justiça (42): 41 tópicos, ~1.500 referências, introdução, cruzadas, leituras | ~30 páginas impressas (pp. 850–879) |
| Depois | Restante do Volume 2 (ideias 1–50) e Volume 3 (ideias 51–102) | Volume 2 já tem partes em transmissão (ver §5) |
| Por fim | Inventory of Terms + passagens recuperadas | opcional/progressivo |

### O esforço real: a tradução

- **~3.000 enunciados de tópico** (frases curtas, tipo "Economic exploitation: chattel slavery and wage slavery" → "Exploração econômica: escravidão como propriedade e escravidão assalariada") — o grosso do trabalho, e o mais valioso, porque é o que o leitor lê.
- **102 introduções** — textos longos; podem entrar em inglês primeiro com tradução progressiva.
- **Referências**: quase não se traduzem — nomes de autores/obras e números de página ficam como estão (canônicos); só os rótulos da interface são traduzidos.
- **As passagens dos livros**: os originais antigos são domínio público e há traduções clássicas de domínio público (Jebb, Jowett etc.); traduções modernas de editoras têm dono — nesse caso, usamos o original ou link externo.

---

## 4. Onde o conteúdo fica armazenado

Três "gavetas", cada uma com um papel:

```
1. CAIXA-FORTE (arquivos originais)
   Os textos OCR dos volumes do Syntopicon (do Internet Archive / seus PDFs).
   Ficam numa pasta "Volumes/" no projeto — NÃO sobem para o GitHub.
   Guardam a verdade bruta: se um dado ever ficar em dúvida, volta-se aqui.
   Cada arquivo tem uma "impressão digital" (md5) registrada para conferência.

2. FICHÁRIO LIMPO (data/, versionado no Git)
   O conteúdo extraído, conferido e estruturado em arquivos de dados
   (JSON/TypeScript) com origem anotada registro por registro (provenance).
   É o ÚNICO lugar que o aplicativo lê. Todo o histórico de mudanças fica
   salvo no Git — é o backup automático, com data e autor.

3. O APP PRONTO (build estático)
   O site gerado a partir do fichário: milhares de páginas HTML prontas.
   Publicado num serviço de hospedagem gratuito (uso pessoal), tipo Vercel.
```

**Resumo em uma frase:** os originais ficam com você (fora do Git), o dado limpo fica versionado no GitHub, e o site publicado é uma cópia pré-fabricada e gratuita — **não existe banco de dados ligado**, nada para "cair", nada para pagar em escala pessoal.

---

## 5. Como o app opera (por dentro, sem termos técnicos)

**Para quem usa:**
- Clicar é instantâneo, porque cada página já existe pronta (nada é montado na hora).
- A busca acontece **dentro do seu navegador**, em milissegundos, sem servidor.
- Não precisa de conta, não rastreia ninguém, funciona até local/offline no seu computador.

**Para você manter:**
1. Você **alimenta o sistema**: cola/envia o texto dos volumes (como já está sendo feito — o Volume 1 chegou e foi auditado; o Volume 2 está ~292 KB em disco com partes aguardando reenvio, cada uma com md5 de conferência).
2. Os **scripts de ingestão** transformam texto bruto em fichas estruturadas e validadas (com testes automáticos que rejeitam dado inconsistente — por exemplo, um tópico órfão de pai).
3. Um comando **reconstrói o site** inteiro com o conteúdo novo.
4. Publicar = **enviar ao GitHub**; a hospedagem atualiza sozinha em segundos.
- Custo mensal para uso pessoal: **R$ 0** (hospedagem gratuita; GitHub gratuito).

---

## 6. Uma nota honesta sobre o texto copiado

Você tem razão no essencial: **a estrutura é fato** — existe uma única numeração canônica (42 = Justiça), uma única hierarquia de tópicos; ninguém pode "inventar outra", e qualquer produto desse gênero terá a mesma espinha. A obra de indexação em si, porém, é protegida por direitos autorais (Encyclopædia Britannica), e "só existir uma versão" é justamente o que a protege, não o que a libera. Na prática:

- **Uso pessoal e de estudo (o escopo atual do projeto):** tranquilo — é o equivalente a ter o livro na estante e fichas de leitura.
- **Um dia publicar aberto na internet:** aí convém avaliar (contato com a Britannica, limitar ensaios/ textos ao essencial, ou manter privado). Os textos originais dos Great Books antigos e as traduções clássicas de domínio público não têm esse problema.

O projeto já está desenhado para isso: **cada registro declara sua fonte**, então separar o que é estrutura (fato), o que é texto de Adler e o que é nosso é automático.

---

## 7. Estado real reunido (o que existe hoje, em qual lugar)

| Onde | O que existe | Situação |
|---|---|---|
| **GitHub — branch `main`** | Fundação: 102 ideias + schema + testes | ✅ estável |
| **GitHub — branch `arena/01a05420`** (sessão anterior) | Ledger do corpus (`Volumes/README.md`): Vol. 1 recebido e auditado **mas perdido do disco** (md5 registrada p/ reenvio); Vol. 2 parcial em disco (292 KB) com lacunas declaradas; contexto de sessão | 🚧 transmissão em andamento |
| **GitHub — branch `arena/01a05420`** | O protótipo do ChatGPT (rotas `/prototype`, 49 referências reais de 1a–1c, 18 referências de 8c(1)) **NÃO foi commitado** — não está no GitHub | ❌ só existiu no ambiente daquela sessão (em risco de perda) |
| **Esta sessão — branch `arena/01a06414`** | Especificação V1 travada (`docs/a-grande-conversa-especificacao.md`) + protótipo navegável completo (home, 102 ideias, Justiça, tópico 8c(1), autores, obras, passagem, inventário, sobre) com estética própria — ainda não commitado | ✅ funcionando neste ambiente (preview ativo) |
| **Material colado do ChatGPT** | Design Conceitual V1 completo (wireframes, decisões, as 18 referências reais do 8c(1) transcritas, análise do benchmark) | 📄 conteúdo valioso — deve ser incorporado |

### O que fazer com isso (ordem recomendada)

1. **Preservar o patrimônio**: commitar o protótipo desta sessão e incorporar ao dataset as 18 referências reais do 8c(1) e os dados de 1a–1c que só existem em textos de sessões (com origem anotada).
2. **Reenviar as partes perdidas dos volumes** — o ledger já diz exatamente quais e como conferir (md5).
3. **Completar o capítulo Justiça** com o Justice.pdf: 41 tópicos + ~1.500 referências + introdução → o produto fica "real" de ponta a ponta.
4. Só depois: escala para as outras 101 ideias.

---

## 8. Resumo em cinco linhas

1. O app vai parecer **um mapa bonito e calmo dos livros**: ideia → tópico → quem falou → o texto.
2. O conteúdo é **o Syntopicon real, traduzido**: 102 ideias, ~3.000 tópicos, ~163 mil referências — menos de 100 MB de texto; o esforço é digitá-lo e traduzi-lo, não guardá-lo.
3. Os originais ficam **com você**; o dado limpo fica **no GitHub** com backup automático; o site é uma cópia estática **gratuita**.
4. Ele funciona **sem servidor e sem banco ligado**: página pronta, clique instantâneo, busca no navegador, atualização = nova ingestão + 1 comando.
5. O caminho agora: **salvar o que já existe → reenviar os volumes perdidos → completar Justiça**. Justiça provando o mapa; depois, a escala.
