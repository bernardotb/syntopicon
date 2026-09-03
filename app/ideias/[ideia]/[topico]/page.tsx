import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, type Crumb } from "@/components/site/Breadcrumbs";
import { EmptyState } from "@/components/site/EmptyState";
import { DemoBadge, ReferenceCard } from "@/components/site/ReferenceCard";
import {
  JUSTICE,
  JUSTICE_CANON,
  justiceAuthorsForTopic,
  justiceChildren,
  justicePassageByReference,
  justiceReferencesForTopic,
  justiceTopicBySlug,
  justiceTopicAuthors,
  justiceTopicPath,
  justiceTopics,
  justiceWorkBySlug,
  justiceAuthorBySlug,
} from "@/data/justice";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return justiceTopics.map((topic) => ({ ideia: `${JUSTICE.ideaNumber}-${JUSTICE.ideaSlugEn}`, topico: topic.slug }));
}

const LEVEL_LABELS: Record<number, string> = { 1: "Tópico de nível 1", 2: "Tópico de nível 2", 3: "Tópico de nível 3" };

export default async function TopicPage({ params }: { params: Promise<{ ideia: string; topico: string }> }) {
  const { ideia, topico } = await params;
  if (ideia !== `${JUSTICE.ideaNumber}-${JUSTICE.ideaSlugEn}`) notFound();
  const topic = justiceTopicBySlug(topico);
  if (!topic) notFound();

  const path = justiceTopicPath(topic.slug);
  const crumbs: Crumb[] = [
    { label: "Grandes Ideias", href: "/ideias" },
    { label: "Justiça", href: `/ideias/${JUSTICE.ideaNumber}-${JUSTICE.ideaSlugEn}` },
    ...path.slice(0, -1).map((node) => ({
      label: node.code ?? node.titlePt ?? node.titleEn,
      href: `/ideias/${JUSTICE.ideaNumber}-${JUSTICE.ideaSlugEn}/${node.slug}`,
    })),
    { label: topic.code ?? topic.titlePt ?? topic.titleEn },
  ];

  const children = justiceChildren(topic.slug);
  const references = justiceReferencesForTopic(topic.slug);
  const authors = justiceAuthorsForTopic(topic.slug);

  return (
    <article className="page-shell topic-page">
      <Breadcrumbs items={crumbs} />

      <header className="topic-header">
        <p className="topic-code">
          {topic.code ? <strong className="code-badge">{topic.code}</strong> : <span className="code-pending">código impresso pendente</span>}
          <span className="level-tag">{LEVEL_LABELS[topic.level]}</span>
        </p>
        <h1>{topic.titlePt ?? topic.titleEn}</h1>
        {topic.titlePt ? <p className="topic-subtitle">{topic.titleEn}</p> : null}
        {topic.mirrorId ? (
          <p className="topic-mirror-note">
            Fonte de captura: benchmark <code>/subtopics/{topic.mirrorId}</code> (2026-09-02) — não verificada contra o
            Justice.pdf.
          </p>
        ) : null}
      </header>

      {children.length > 0 ? (
        <section aria-labelledby="subtopics-title">
          <h2 id="subtopics-title">Subtópicos</h2>
          <ul className="topic-children">
            {children.map((child) => (
              <li key={child.slug}>
                <Link href={`/ideias/${JUSTICE.ideaNumber}-${JUSTICE.ideaSlugEn}/${child.slug}`}>
                  {child.code ? <span className="outline-code">{child.code}</span> : null}
                  <span>{child.titlePt ?? child.titleEn}</span>
                  <em className="child-meta">
                    {(justiceTopicAuthors[child.slug] ?? []).length > 0
                      ? `${(justiceTopicAuthors[child.slug] ?? []).length} autores`
                      : null}
                  </em>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-labelledby="refs-title">
        <h2 id="refs-title">Referências</h2>
        {references.length > 0 ? (
          <div className="reference-grid">
            {references.map((reference) => {
              const work = justiceWorkBySlug(reference.workSlug);
              const author = justiceAuthorBySlug(reference.authorSlug);
              const passage = justicePassageByReference(reference.id);
              return (
                <div key={reference.id} className="reference-cell">
                  <DemoBadge />
                  <ReferenceCard
                    code={topic.code}
                    topicTitlePt={topic.titlePt}
                    authorNamePt={author?.namePt ?? reference.authorSlug}
                    workTitlePt={work?.titlePt ?? reference.workSlug}
                    workTitleEn={work?.titleEn ?? ""}
                    locatorRaw={reference.locatorRaw}
                    gbwwVolume={reference.gbwwVolume}
                    passageHref={passage ? `/passagem/${passage.id}` : null}
                    href={`/obras/${reference.workSlug}`}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState title="Nenhuma referência recuperada para este tópico ainda">
            As referências completas do capítulo (Justice.pdf, a partir da p. impressa{" "}
            {JUSTICE_CANON.referencesStartPagePrinted}) ainda não foram ingeridas. Os autores abaixo indicam presença
            real no tópico, sem obra nem locator.
          </EmptyState>
        )}
      </section>

      {authors.length > 0 ? (
        <section aria-labelledby="authors-title">
          <h2 id="authors-title">Autores deste tópico</h2>
          <p className="section-lede">
            Presença capturada do benchmark (contagem de passagens por autor) — camada derivada: não indica obra nem
            locator. Na ordem do benchmark, próxima da ordem canônica dos GBWW.
          </p>
          <ul className="author-presence">
            {authors.map(([author, count]) => (
              <li key={author.slug}>
                <Link href={`/autores/${author.slug}`}>{author.namePt}</Link>
                <span className="count">
                  {count} {count === 1 ? "passagem" : "passagens"}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <EmptyState title="Autores ainda não incorporados">
          A presença de autores neste grupo ainda não foi capturada/confirmada.
        </EmptyState>
      )}

      <footer className="provenance-note">
        <p>
          Provenance: referências exibidas são de demonstração (texto real, domínio público; vínculo editorial) —{" "}
          <Link href="/sobre">entenda o método</Link>. A ingestão canônica substituirá todo este conteúdo a partir do
          Justice.pdf.
        </p>
        <p>
          <Link className="button ghost" href={`/ideias/${JUSTICE.ideaNumber}-${JUSTICE.ideaSlugEn}`}>
            ← Voltar a Justiça (42)
          </Link>
        </p>
      </footer>
    </article>
  );
}
