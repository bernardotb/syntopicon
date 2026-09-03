import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { EmptyState } from "@/components/site/EmptyState";
import { justiceAuthors, justiceTopicsForAuthor, justiceWorks } from "@/data/justice";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return justiceAuthors.map((author) => ({ slug: author.slug }));
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = justiceAuthors.find((candidate) => candidate.slug === slug);
  if (!author) notFound();

  const works = justiceWorks.filter((work) => work.authorSlug === author.slug);
  const topics = justiceTopicsForAuthor(author.slug);

  return (
    <article className="page-shell author-page">
      <Breadcrumbs items={[{ label: "Autores" }, { label: author.namePt }]} />
      <header className="entity-header">
        <p className="eyebrow">Autor</p>
        <h1>{author.namePt}</h1>
        <p className="idea-subtitle">{author.nameEn}</p>
        {author.note ? <p className="topic-mirror-note">{author.note}</p> : null}
      </header>

      <section aria-labelledby="works-title">
        <h2 id="works-title">Obras no acervo</h2>
        {works.length > 0 ? (
          <ul className="entity-list">
            {works.map((work) => (
              <li key={work.slug}>
                <Link href={`/obras/${work.slug}`}>
                  <strong>{work.titlePt}</strong> <em>{work.titleEn}</em>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="Nenhuma obra incorporada ainda">
            As obras deste autor entrarão com a ingestão das referências canônicas (Justice.pdf).
          </EmptyState>
        )}
      </section>

      <section aria-labelledby="topics-title">
        <h2 id="topics-title">Aparece em</h2>
        {topics.length > 0 ? (
          <>
            <p className="section-lede">
              Navegação inversa derivada da presença autor↔tópico capturada do benchmark — não é uma relação canônica
              completa.
            </p>
            <ul className="entity-list">
              {topics.map((topic) => (
                <li key={topic.slug}>
                  <Link href={`/ideias/42-justice/${topic.slug}`}>
                    <strong>Justiça{topic.code ? ` · ${topic.code}` : ""}</strong> <em>{topic.titlePt ?? topic.titleEn}</em>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <EmptyState title="Nenhum tópico incorporado ainda" />
        )}
      </section>

      <footer className="provenance-note">
        <p>
          Relações desta página são derivadas do benchmark (2026-09-02) e serão substituídas pelas References canônicas
          na ingestão. Sem passagem, não há afirmação sobre o que o autor pensa.
        </p>
      </footer>
    </article>
  );
}
