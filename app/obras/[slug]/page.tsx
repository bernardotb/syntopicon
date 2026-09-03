import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { EmptyState } from "@/components/site/EmptyState";
import { DemoBadge } from "@/components/site/ReferenceCard";
import {
  justiceAuthorBySlug,
  justicePassageByReference,
  justiceReferences,
  justiceTopicBySlug,
  justiceWorkBySlug,
  justiceWorks,
} from "@/data/justice";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return justiceWorks.map((work) => ({ slug: work.slug }));
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = justiceWorkBySlug(slug);
  if (!work) notFound();

  const author = justiceAuthorBySlug(work.authorSlug);
  const references = justiceReferences.filter((reference) => reference.workSlug === work.slug);

  return (
    <article className="page-shell work-page">
      <Breadcrumbs items={[{ label: "Obras" }, { label: work.titlePt }]} />
      <header className="entity-header">
        <p className="eyebrow">Obra</p>
        <h1>{work.titlePt}</h1>
        <p className="idea-subtitle">
          {work.titleEn} · <Link href={`/autores/${work.authorSlug}`}>{author?.namePt ?? work.authorSlug}</Link>
        </p>
        <p className="work-volume">
          {work.gbwwVolume ? (
            <>
              Great Books of the Western World · Vol. {work.gbwwVolume}
              <span className="pending-note"> (confirmar edição na ingestão)</span>
            </>
          ) : (
            <>Edição/volume GBWW: pendente de confirmação</>
          )}
        </p>
      </header>

      <section aria-labelledby="passages-title">
        <h2 id="passages-title">Passagens no Syntopicon</h2>
        {references.length > 0 ? (
          <ul className="entity-list">
            {references.map((reference) => {
              const topic = justiceTopicBySlug(reference.topicSlug);
              const passage = justicePassageByReference(reference.id);
              return (
                <li key={reference.id}>
                  {topic ? (
                    <Link href={`/ideias/42-justice/${topic.slug}`}>
                      <strong>Justiça{topic.code ? ` · ${topic.code}` : ""}</strong>{" "}
                      <em>{topic.titlePt ?? topic.titleEn}</em>
                    </Link>
                  ) : null}
                  {passage ? (
                    <p className="entity-sub">
                      <DemoBadge /> <Link href={`/passagem/${passage.id}`}>Ler passagem</Link> ·{" "}
                      <code>{reference.locatorRaw}</code>
                    </p>
                  ) : (
                    <p className="entity-sub">
                      Passagem ainda não disponível no acervo digital · <code>{reference.locatorRaw}</code>
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <EmptyState title="Nenhuma referência incorporada ainda" />
        )}
      </section>

      <footer className="provenance-note">
        <p>
          Esta é a navegação bibliográfica: obra → tópicos → ideia. As relações derivam das referências incorporadas
          neste protótipo e serão substituídas pela extração canônica do Justice.pdf.
        </p>
      </footer>
    </article>
  );
}
