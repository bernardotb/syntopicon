import Link from "next/link";
import { JUSTICE_CANON } from "@/data/justice";

export const dynamic = "force-static";

export const metadata = { title: "Sobre — A Grande Conversa" };

export default function AboutPage() {
  return (
    <article className="page-shell about-page">
      <p className="eyebrow">Sobre</p>
      <h1>O mapa, o território e a viagem</h1>

      <section>
        <h2>O que é</h2>
        <p>
          <strong>A Grande Conversa</strong> é uma reconstrução fiel do <em>Syntopicon</em> de Mortimer Adler e Robert
          Hutchins em português: as 102 Grandes Ideias, cada uma com sua Introduction, seu Outline of Topics, suas
          References, Cross-References e Additional Readings — e o caminho direto até as passagens dos Great Books of
          the Western World.
        </p>
        <p>
          O Syntopicon é o mapa. Os Great Books são o território. A leitura sintópica é a viagem entre os dois. O
          objetivo é diminuir a dificuldade de <strong>encontrar</strong> as passagens relevantes sem eliminar o
          trabalho intelectual de <strong>ler e pensar</strong>.
        </p>
      </section>

      <section>
        <h2>Como ler</h2>
        <ol className="howto">
          <li>
            Comece pelas <Link href="/ideias">Grandes Ideias</Link> — o índice canônico das 102.
          </li>
          <li>
            Em uma ideia, desça pelo <strong>Outline of Topics</strong>: do geral ao específico, sem perder a
            hierarquia.
          </li>
          <li>
            No tópico, veja as <strong>referências</strong>: autor → obra → locator.
          </li>
          <li>
            Leia a <strong>passagem</strong> com o contexto sempre visível — e volte para escolher a próxima.
          </li>
          <li>
            Vire a base do avesso: navegue por <Link href="/autores/hobbes">autores</Link>,{" "}
            <Link href="/obras/leviathan">obras</Link> ou pelo <Link href="/inventario">inventário</Link>.
          </li>
        </ol>
      </section>

      <section>
        <h2>Método</h2>
        <ul className="method-list">
          <li>
            <strong>Adler decide o que existe.</strong> A estrutura segue as fontes primárias do Syntopicon; o
            benchmark (Mortimer) só ensina simplicidade de navegação.
          </li>
          <li>
            <strong>Raw first, parse second.</strong> Todo localizador é preservado no formato original antes de
            qualquer normalização.
          </li>
          <li>
            <strong>Reference ≠ Passage.</strong> Uma referência aponta para o texto; uma passagem é o texto
            efetivamente recuperado. Sem passagem, mostramos a ficha — nunca inventamos conteúdo.
          </li>
          <li>
            <strong>Provenance por registro.</strong> Cada dado declara sua fonte e camada: corpus original,
            estrutura derivada ou conteúdo interpretativo.
          </li>
          <li>
            <strong>Estados honestos.</strong> O que ainda não foi incorporado aparece como pendência — nunca como
            página aparentemente completa.
          </li>
        </ul>
      </section>

      <section>
        <h2>Escopo atual — golden case</h2>
        <p>
          O capítulo <Link href="/ideias/42-justice">Justiça (42)</Link> prova a arquitetura completa antes da escala:
          estrutura canônica de {JUSTICE_CANON.totalNodes} tópicos ({JUSTICE_CANON.level1}+{JUSTICE_CANON.level2}+
          {JUSTICE_CANON.level3}), subtree do Topic 8 navegável com autores reais e passagens de demonstração. As
          outras 101 ideias aparecem no índice com seu estado honesto. Só depois de Justiça estável vem a ingestão das
          demais.
        </p>
      </section>

      <section>
        <h2>Referência de experiência</h2>
        <p>
          O protótipo estuda o Mortimer como benchmark de simplicidade (home editorial, progressão do geral ao
          específico, contagens como orientação). Nomenclatura, hierarquia e ontologia são de Adler — o benchmark
          chama as 102 ideias de “Topics”; nós não.
        </p>
      </section>
    </article>
  );
}
