import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, type Crumb } from "@/components/site/Breadcrumbs";
import { DemoBadge } from "@/components/site/ReferenceCard";
import {
  justiceAuthorBySlug,
  justicePassageByReference,
  justiceReferences,
  justiceReferencesForTopic,
  justiceTopicBySlug,
  justiceWorkBySlug,
  JUSTICE,
} from "@/data/justice";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  // ids de passagem = ids de referência (1:1 neste protótipo)
  return ["antigona-justica-8", "leviata-justica-8", "politica-justica-8c1", "riqueza-justica-8c1"].map((id) => ({
    id,
  }));
}

export default async function PassagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const passage = justicePassageByReference(id);
  if (!passage) notFound();

  const ref = justiceReferences.find((candidate) => candidate.id === passage.referenceId);
  if (!ref) notFound();

  const topic = justiceTopicBySlug(ref.topicSlug);
  const work = justiceWorkBySlug(ref.workSlug);
  const author = justiceAuthorBySlug(ref.authorSlug);

  const siblings = justiceReferencesForTopic(ref.topicSlug);
  const index = siblings.findIndex((candidate) => candidate.id === ref.id);
  const prev = index > 0 ? siblings[index - 1] : null;
  const next = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : null;

  const crumbs: Crumb[] = [
    { label: "Grandes Ideias", href: "/ideias" },
    { label: "Justiça", href: `/ideias/${JUSTICE.ideaNumber}-${JUSTICE.ideaSlugEn}` },
    ...(topic
      ? [{ label: topic.code ?? topic.titlePt ?? topic.titleEn, href: `/ideias/${JUSTICE.ideaNumber}-${JUSTICE.ideaSlugEn}/${topic.slug}` }]
      : []),
    { label: "Passagem" },
  ];

  return (
    <article className="page-shell passage-page">
      <Breadcrumbs items={crumbs} />

      <header className="passage-header">
        <p className="eyebrow">Passagem</p>
        <h1>
          {author?.namePt} · <cite>{work?.titlePt}</cite>
        </h1>
        <p className="passage-locator">
          <span className="locator-label">locatorRaw</span> <code>{ref.locatorRaw}</code>
          {ref.gbwwVolume ? ` · GBWW Vol. ${ref.gbwwVolume}` : " · Volume GBWW pendente"}
        </p>
        <p className="passage-demo-note">
          <DemoBadge /> {passage.editionNote} Tradução: {passage.translator}.
        </p>
      </header>

      <div className="passage-text" lang="en">
        {passage.textEn.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <aside className="context-trail" aria-label="Contexto da leitura">
        <h2>Você chegou aqui por</h2>
        <ol>
          <li>
            <Link href={`/ideias/${JUSTICE.ideaNumber}-${JUSTICE.ideaSlugEn}`}>Justiça (42)</Link>
          </li>
          {topic ? (
            <li>
              <Link href={`/ideias/${JUSTICE.ideaNumber}-${JUSTICE.ideaSlugEn}/${topic.slug}`}>
                {topic.code ? `${topic.code} · ` : ""}
                {topic.titlePt ?? topic.titleEn}
              </Link>
            </li>
          ) : null}
          <li>
            <Link href={`/autores/${ref.authorSlug}`}>{author?.namePt}</Link>
          </li>
          <li>
            <Link href={`/obras/${ref.workSlug}`}>{work?.titlePt}</Link>
          </li>
        </ol>
      </aside>

      <nav className="passage-pager" aria-label="Referências vizinhas">
        {prev ? (
          <Link className="pager-link" href={`/passagem/${prev.id}`}>
            ← referência anterior
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link className="pager-link" href={`/passagem/${next.id}`}>
            próxima referência →
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <footer className="provenance-note">
        <p>
          Passagem de demonstração do protótipo: o texto é real e de domínio público, mas o vínculo exato entre esta
          passagem e o tópico é seleção editorial, pendente da passagem canônica do Justice.pdf. O locator do
          Syntopicon (volume/página impressa) permanece não ingerido — RAW FIRST: nada é normalizado sem a fonte.
        </p>
        {topic ? (
          <p>
            <Link className="button ghost" href={`/ideias/${JUSTICE.ideaNumber}-${JUSTICE.ideaSlugEn}/${topic.slug}`}>
              ← Voltar ao tópico {topic.code ?? topic.titlePt}
            </Link>
          </p>
        ) : null}
      </footer>
    </article>
  );
}
