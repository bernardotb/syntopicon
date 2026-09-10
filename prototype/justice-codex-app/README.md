# Syntopicon · Grande Ideia 42 — Justiça

Aplicação estática autocontida para explorar o golden case `Justice 8c(1)` como edição crítica navegável. Não usa API, credencial, framework, CDN nem serviço externo.

## Executar

Requer Node.js 20 ou superior.

```powershell
cd "C:\Users\Usuario\OneDrive\Documentos\syntopicon-codex\prototype\justice-codex-app"
npm start
```

Abra `http://127.0.0.1:4173`. Para outra porta: `$env:PORT=4174; npm start`.

## Validar

```powershell
npm test
npm run check
```

## Arquitetura

- `data/justice.json`: snapshot legível e auditável do capítulo 42, conferido contra a extração local de `Justice.pdf`.
- `src/domain.mjs`: índices, entidades derivadas, busca, contagens e invariantes.
- `src/app.mjs`: roteamento, apresentação e interações.
- `styles.css`: desenho editorial responsivo sem dependências externas.
- `tests/`: integridade de dados e hard gates estáticos.
- `AUDIT.md`: comparação dos candidatos, decisões e limites da evidência.

## Contratos epistemológicos

`Great Idea`, `Topic`, `Reference Entry`, `Work`, `Author` e `Passage` não são sinônimos. Uma Reference Entry informa onde ler. Como os textos dos volumes 4–54 não foram incorporados e verificados neste recorte, toda referência termina no estado literal: **“Passagem não incorporada ao corpus digital.”**

O outline, as 18 referências de `8c(1)`, as 10 Cross-References e as 60 Additional Readings vêm da edição de 1952. O termo `Chattel slavery` vem do *Inventory of Terms* da segunda edição (1990); sua correspondência com `Justice 8c(1)` é exibida com edição e camada explícitas.

## Limites

O app não representa todas as referências dos 41 tópicos. Ele contém o outline completo e estrutura integralmente apenas as 18 Reference Entries do golden case `8c(1)`. Traduções em português são apresentação editorial; o inglês permanece visível.
