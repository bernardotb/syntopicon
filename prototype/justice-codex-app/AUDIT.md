# Auditoria comparativa e decisão arquitetural

Data: 10/09/2026. Escopo: App A, App B e App C fornecidos no prompt; fontes locais do capítulo 42 e do *Inventory of Terms*. Os candidatos foram tratados como objetos de análise, não como autoridades editoriais.

## Hierarquia de evidência usada

1. Extração local reproduzível do Volume 2, capítulo 42, páginas impressas 850–879 (`work/raw-extraction/042-justice.json`).
2. Volume 2 local, *The Great Ideas I*.
3. Volume 3 local e sua extração textual, incluindo *Inventory of Terms*.
4. Dataset gerado e documentação metodológica do repositório.
5. Apps candidatos.

A página 858 sustenta o outline e identifica `8c(1)` como “Economic exploitation: chattel slavery and wage slavery”. A página 868 sustenta 18 Reference Entries. A página 878 sustenta 10 blocos de Cross-References globais; a página 879 sustenta 60 Additional Readings. As passagens das obras não foram incorporadas. O termo `Chattel slavery` pertence ao Inventory da edição de 1990 e aponta para `Justice 8c(1)`; essa aresta entre edições deve permanecer explicitamente qualificada.

## Inventário dos candidatos

### App A — aplicação autocontida

- Arquitetura: HTML único de apresentação, snapshot JSON explícito, tipos TypeScript de domínio e teste Node de invariantes.
- Tecnologia: HTML/CSS/JavaScript sem framework; TypeScript apenas como contrato documental; zero dependências externas em runtime.
- Tamanho auditado: 6 arquivos, aproximadamente 144 KB.
- Modelo: editions, GreatIdea, Topic, Reference Entry, Work Segment, CrossReference, InventoryTerm e Passage.
- Contagens derivadas: 41 tópicos, 18 referências, 17 autores distintos, 20 pares autor/obra, 1 termo, 10 cross-references, 60 additional readings e 0 passages.
- Testes: `node tests/invariants.mjs` passou e confirmou 41/18/10/60/0.
- Estado: executável sem instalação; renderização visual automatizada indisponível no ambiente.
- Mérito central: melhor fidelidade aos 18 registros da página 868 e melhor contrato Reference ≠ Passage.
- Limite: grande parte da lógica e dos dados também está embutida no HTML; a navegação privilegia um painel convencional e a separação de responsabilidades é parcial.

### App B — React/Vite do AI Studio

- Arquitetura: React componentizado, tipos, utilitários, dados TypeScript e componentes próprios para outline, contexto, grafo, comparação, fontes e tour.
- Tecnologia: React 19, Vite 6, Tailwind 4, Motion e Lucide; declara ainda Express, dotenv e `@google/genai`, embora não haja uso do SDK Gemini no código inspecionado.
- Tamanho auditado: 24 arquivos, aproximadamente 210 KB, sem `node_modules`.
- Contagens derivadas pela importação do módulo de dados: 41 tópicos, 18 referências, 23 autores, 24 obras, 8 termos, 6 cross-references, 28 additional readings, 0 passages e 116 relações.
- Testes: não há suíte automatizada. `lint` é apenas `tsc --noEmit`; build/lint não foram executados porque as dependências não estavam instaladas. A importação isolada do módulo de dados passou usando o transpiler já presente no repositório principal.
- Estado: não executável no diretório fornecido sem instalação.
- Mérito central: melhor decomposição visual e frontend, com maior riqueza de navegação.
- Defeitos concretos: os 18 localizadores divergem materialmente da página 868; há conteúdo editorial ampliado sem sustentação equivalente; `isCompareModalOpen` é atualizado mas não controla a montagem do `CompareModal`, de modo que fechar a comparação não remove o modal enquanto duas referências permanecem selecionadas.

### App C — protótipo HTML anterior

- Arquitetura: HTML/CSS/JavaScript em um único arquivo com dataset embutido e mutações corretivas aplicadas depois da declaração do dataset.
- Tecnologia: zero dependências externas em runtime.
- Tamanho auditado: 1 arquivo, aproximadamente 130 KB.
- Modelo: grafo rico com ideias, tópicos, autores, obras, referências, termos, cross-references, fontes e relações.
- Contagens declaradas em runtime: 41 tópicos, 18 referências; autores e obras são derivados das referências; 0 passages. A sintaxe do script passou em `new Function`.
- Testes: não há suíte automatizada independente.
- Estado: estruturalmente carregável; renderização visual automatizada indisponível no ambiente.
- Mérito central: experiência editorial densa, painel contextual, modos, comparação, cronologia e percurso.
- Defeitos concretos: o arquivo altera o dataset em runtime por meio de `newAuthors`, `newWorks` e `missingReferences`; inclui no golden case referências/localizadores que não correspondem à página 868 (por exemplo Shakespeare, Pascal e Montesquieu) e omite outras. A riqueza visual não compensa a perda de proveniência.

## Júri por perspectiva

### 1. Rigor epistemológico e proveniência — App A

O App A preserva melhor os registros da fonte, mantém 1990 separado de 1952 e usa `passages: []`. O App B confere status resolvido a entidades ampliadas e oferece citações introdutórias sem o mesmo rigor do snapshot. O App C mistura correções e dados divergentes no carregamento. Preservar: snapshot auditável, rawText, edição e página. Rejeitar: referência inventada, locator reescrito e relação cross-edition silenciosamente canônica.

### 2. Arquitetura da informação — App A

O App A mantém a sequência Grande Ideia → Topic → Reference → Work/Author → Passage ausente e expõe o outline completo. O App B oferece mais vistas, mas o excesso de grafo/contexto dilui a tarefa principal. O App C é navegável, porém a mutação do modelo torna a arquitetura difícil de auditar. Preservar: progressão e modos; rejeitar: grafo como porta de entrada e mistura de entidade com visualização.

### 3. UX e acessibilidade — App A, com ressalvas

O App A usa HTML nativo, foco visível, `<dialog>`, busca e layout responsivo simples. O App B possui controles ricos, mas modais customizados não demonstram focus trap/retorno de foco e há o defeito de fechamento da comparação. O App C tem boa densidade e foco visível, mas um único arquivo e painéis simultâneos aumentam carga cognitiva. A renderização efetiva não pôde ser automatizada; portanto o veredito visual/interativo permanece limitado à inspeção de código.

### 4. Design visual e editorial — App C

O App C é o candidato com maior ambição de obra de referência: paleta de papel, hierarquia serifada, aparato lateral e densidade editorial. O App A é limpo, porém ainda se aproxima de um painel. O App B é competente, mas recorre a padrões genéricos de dashboard. Preservar do C: sensação de edição crítica e aparato próximo ao texto; rejeitar: saturação de painéis e qualquer conteúdo não sustentado.

### 5. Arquitetura frontend e qualidade de código — App B, com ressalva material

O App B vence pela componentização e tipos. Perde pontos por dependências sem uso demonstrado, ausência de testes e bug de estado do CompareModal. O App A é mais previsível, porém duplica responsabilidades no HTML. O App C é o menos manutenível pela mutação pós-dataset e arquivo monolítico.

### 6. Testabilidade, robustez e manutenção — App A

É o único candidato com invariantes executáveis e passou sem instalação. B não tem testes e não estava instalável tal como entregue. C só teve a sintaxe validada. Preservar: Node puro e dados explícitos; rejeitar: teste dependente de UI e bundles opacos como única evidência.

## Síntese e vencedor geral

Vencedor geral: **App A**. Sua vantagem não é estética, mas probatória: o golden case só é útil se os endereços editoriais forem confiáveis. O acabamento visual de B ou C não pode vencer uma divergência contra a fonte primária.

Abordagem escolhida: **HYBRID / reconstrução controlada**. O novo app conserva o snapshot auditado do A, adota a separação de domínio do B e transforma a densidade editorial do C em uma edição crítica mais calma. Não copia o HTML de nenhum candidato.

## Decisões de projeto

1. Runtime estático sem framework, API, CDN ou credencial.
2. Snapshot JSON legível, com SHA-256 idêntico ao dataset A verificado contra as páginas 858, 868, 878 e 879.
3. Domínio, apresentação, estilos, servidor e testes em arquivos separados.
4. Hash routes para Topic, Reference, Work e Author sem backend.
5. Contagens, autores e obras sempre derivados do snapshot.
6. Inglês da fonte visível em toda entidade bilíngue e alternável globalmente.
7. `Reference Entry` e `Passage` separados; ausência literal e recorrente.
8. Inventory 1990 apresentado como ponte de edição, não como cânone de 1952.
9. Cross-references globais mantêm `sourceTopicId = null`.
10. Estética de edição crítica: papel, fólio, aparato marginal e tipografia editorial, sem dashboard SaaS.

## Soluções rejeitadas

1. React/Vite: custo de dependências sem benefício necessário para este recorte.
2. Gemini/OpenAI: não há função que justifique chave ou serviço externo.
3. Um único HTML: prejudica auditabilidade e manutenção.
4. Grafo como navegação principal: aumenta carga cognitiva e encobre o percurso editorial.
5. Passagens geradas ou resumidas: violam o limite do corpus.
6. Localizadores do B/C: divergem da página 868.
7. Cross-reference ligada ao tópico atual: a fonte a liga à Grande Ideia.
8. Relação interpretativa sem rótulo: confunde curadoria com fonte.
9. Contagens promocionais fixas: podem divergir dos dados.
10. Fontes web em runtime: reduzem portabilidade e previsibilidade.

## Limite de validação

O navegador integrado não anexou a página localhost em duas tentativas. Por isso desktop 1440×900, tablet 1024×768, mobile 390×844, zoom 200%, navegação exclusivamente por teclado, Escape/retorno de foco e ausência de erros no console exigem verificação manual fresca. Inspeção de código ou CSS não foi promovida a PASS visual.
