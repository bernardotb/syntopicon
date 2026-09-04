import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, type Crumb } from "@/components/site/Breadcrumbs";
import { EmptyState } from "@/components/site/EmptyState";
import { JUSTICE, justiceAuthorBySlug, justiceTopicAuthors } from "@/data/justice";
import {
  type Justice1952Ref,
  justice1952Children,
  justice1952ReferencesForTopic,
  justice1952TopicBySlug,
  justice1952TopicPath,
  justice1952Topics,
} from "@/data/justice-1952-full";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  // 41 páginas de tópico canônicas (edição 1952), slugs derivados dos códigos impressos
  return justice1952Topics.map((topic) => ({
    ideia: `${JUSTICE.ideaNumber}-${JUSTICE.ideaSlugEn}`,
    topico: topic.slug,
  }));
}

const LEVEL_LABELS: Record<number, string> = { 1: "Tópico de nível 1", 2: "Tópico de nível 2", 3: "Tópico de nível 3" };

function RefRow({ row }: { row: Justice1952Ref }) {
  const works = row.workSegments.filter((s) => s.workTitle);
  return (
    <li className="refline">
      <span className="refline-author">
        {row.authorRaw}
        {row.entryKind === "bible" ? <span className="bible-tag">OBRA BÍBLICA</span> : null}
      </span>
      <p className="refline-loc">
        <code>{row.locatorRaw}</code>
        {row.volume ? <span className="refline-vol">GBWW v. {row.volume}</span> : null}
      </p>
      {works.length > 0 ? (
        <p className="refline-works">
          obras (segmentação interpretativa): {works.map((s) => s.workTitle).join(" · ")}
        </p>
      ) : null}
    </li>
  );
}

export default async function TopicPage({ params }: { params: Promise<{ ideia: string; topico: string }> }) {
  const { ideia, topico } = await params;
  if (ideia !== `${JUSTICE.ideaNumber}-${JUSTICE.ideaSlugEn}`) notFound();
  const topic = justice1952TopicBySlug(topico);
  if (!topic) notFound();

  const path = justice1952TopicPath(topic.slug);
  const crumbs: Crumb[] = [
    { label: "Grandes Ideias", href: "/ideias" },
    { label: "Justiça", href: `/ideias/${JUSTICE.ideaNumber}-${JUSTICE.ideaSlugEn}` },
    ...path.slice(0, -1).map((node) => ({
      label: node.code,
      href: `/ideias/${JUSTICE.ideaNumber}-${JUSTICE.ideaSlugEn}/${node.slug}`,
    })),
    { label: topic.code },
  ];

  const children = justice1952Children(topic.slug);
  const references = justice1952ReferencesForTopic(topic.slug);
  const benchmarkAuthors = justiceTopicAuthors[topic.slug] ?? [];
  const topicBase = `/ideias/${JUSTICE.ideaNumber}-${JUSTICE.ideaSlugEn}`;

  return (
    <article className="page-shell topic-page">
      <Breadcrumbs items={crumbs} />

      <header className="topic-header">
        <p className="topic-code">
          <strong className="code-badge">{topic.code}</strong>
          <span className="level-tag">{LEVEL_LABELS[topic.level]}</span>
        </p>
        <h1>{topic.titlePt}</h1>
        <p className="topic-subtitle">{topic.titleEn}</p>
        {topic.titlePtNote ? <p className="section-lede">Nota da tradução: {topic.titlePtNote}</p> : null}
        {topic.printedPageAnchor ? (
          <p className="section-lede">
            <span className="edition-chip">edição 1952 · p. impressa {topic.printedPageAnchor}</span>
          </p>
        ) : null}
      </header>

      {children.length > 0 ? (
        <section aria-labelledby="subtopics-title">
          <h2 id="subtopics-title">Subtópicos</h2>
          <ul className="topic-children">
            {children.map((child) => (
              <li key={child.slug}>
                <Link href={`${topicBase}/${child.slug}`}>
                  <span className="outline-code">{child.code}</span>
                  <span>{child.titlePt}</span>
                  <em className="child-meta">{child.titleEn}</em>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-labelledby="refs-title">
        <h2 id="refs-title">Referências</h2>
        {references.length > 0 ? (
          <>
            <p className="section-lede">
              {references.length} {references.length === 1 ? "linha impressa" : "linhas impressas"} na forma da fonte
              (locatorRaw intocado; sobrescritos, abreviações e “esp”/“passim” preservados). Autores em inglês, como no
              original.
            </p>
            <ul className="refline-list">
              {references.map((row) => (
                <RefRow key={row.id} row={row} />
              ))}
            </ul>
          </>
        ) : (
          <EmptyState title="Este tópico não tem bloco de referências na fonte">
            Na edição 1952, o Tópico {topic.code} imprime apenas o título e a descrição — as referências do grupo estão
            distribuídas em seus subtópicos.
          </EmptyState>
        )}
      </section>

      {benchmarkAuthors.length > 0 ? (
        <section aria-labelledby="benchmark-title">
          <h2 id="benchmark-title">Presença no benchmark (camada comparativa)</h2>
          <p className="section-lede">
            Presença autor↔tópico capturada do benchmark (2026-09-02, <em>unverified</em>) — mantida como camada
            histórica de comparação com a fonte; não substitui as referências canônicas acima.
          </p>
          <ul className="author-presence">
            {benchmarkAuthors.map(([authorSlug]) => {
              const author = justiceAuthorBySlug(authorSlug);
              return (
                <li key={authorSlug}>
                  <Link href={`/autores/${authorSlug}`}>{author?.namePt ?? authorSlug}</Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <footer className="provenance-note">
        <p>
          Provenance: outline e referências da edição <strong>1952</strong> (<em>source:syntopicon-1952</em>, colagem
          integral do Dono); títulos e introdução em PT são camada displayPtBr (
          <em>source:justice-pt-chatgpt-translation</em>), sem tocar o original. Passagens completas e links de
          autor/obra entram quando a passagem canônica for ingerida. <Link href="/sobre">Entenda o método</Link>.
        </p>
        <p>
          <Link className="button ghost" href={topicBase}>
            ← Voltar a Justiça (42)
          </Link>
        </p>
      </footer>
    </article>
  );
}
