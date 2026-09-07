import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ideas } from "@/data/ideas";
import { sources } from "@/data/source-registry";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { SyntopiconChapterSection } from "@/components/SyntopiconChapterSection";
import { clusterColor, IdeaEcosystemMap } from "@/components/IdeaEcosystemMap";
import { ecosystemByIdeaSlug, tieKindLabels } from "@/data/justice-ecosystem";
import type { Idea } from "@/lib/syntopicon";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [...ecosystemByIdeaSlug.keys()].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ecosystem = ecosystemByIdeaSlug.get(slug);
  return {
    title: ecosystem
      ? `Ecossistema de ${ecosystem.centerName} — A Grande Conversa`
      : "Ecossistema — A Grande Conversa",
  };
}

export default async function EcosystemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ecosystem = ecosystemByIdeaSlug.get(slug);
  if (!ecosystem) notFound();

  const byId = new Map<string, Idea>(ideas.map((idea) => [idea.id, idea]));
  const source = sources["justice-ecosystem-reading"];
  const centerHref = `/ideas/${slug}`;
  const neighborCount = new Set(ecosystem.ties.map((tie) => tie.withIdeaId)).size;

  return (
    <article className="page-shell">
      <Link className="back-link" href={centerHref}>← {ecosystem.centerName}</Link>
      <p className="eyebrow">Grande Ideia · Ecossistema</p>
      <h1>{ecosystem.title}</h1>
      <EvidenceBadge provenance={ecosystem.provenance} />
      <p className="lede">
        Uma parte do tecido de ideias canônicas que cercam {ecosystem.centerName}: {ecosystem.ties.length} laços
        declarados com {neighborCount} ideias vizinhas, reunidos em {ecosystem.clusters.length} grupos. Nada é
        inferido em tela — cada laço existe porque está registrado no dataset.
      </p>

      <SyntopiconChapterSection title="A vizinhança">
        <div className="eco-figure">
          <IdeaEcosystemMap ecosystem={ecosystem} ideas={ideas} />
          <ul className="eco-kind-legend">
            <li>
              <svg width="44" height="10" viewBox="0 0 44 10" aria-hidden="true">
                <line className="tie-contrib" x1="1" y1="5" x2="34" y2="5" />
                <path d="M34 1 L42 5 L34 9 Z" fill="#305d4f" opacity="0.8" />
              </svg>
              contribui para
            </li>
            <li>
              <svg width="44" height="10" viewBox="0 0 44 10" aria-hidden="true">
                <line className="tie-cross" x1="1" y1="5" x2="42" y2="5" />
              </svg>
              cruza-se com
            </li>
            <li>
              <svg width="44" height="10" viewBox="0 0 44 10" aria-hidden="true">
                <line className="tie-oppose" x1="1" y1="5" x2="34" y2="5" />
                <path d="M34 1 L42 5 L34 9 Z" fill="#a03d2d" opacity="0.9" />
              </svg>
              opõe-se a
            </li>
          </ul>
          <ul className="eco-cluster-legend">
            {ecosystem.clusters.map((cluster) => (
              <li key={cluster.id} style={{ "--c": clusterColor(cluster.id) } as CSSProperties}>
                <h3><span className="eco-chip" aria-hidden="true" />{cluster.name}</h3>
                <p>{cluster.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </SyntopiconChapterSection>

      <SyntopiconChapterSection title="Como cada laço foi lido">
        <div className="eco-index">
          {ecosystem.clusters.map((cluster) => (
            <section
              key={cluster.id}
              className="eco-cluster"
              style={{ "--c": clusterColor(cluster.id) } as CSSProperties}
              aria-labelledby={`eco-cluster-${cluster.id}`}
            >
              <h3 id={`eco-cluster-${cluster.id}`}>{cluster.name}</h3>
              <p className="eco-cluster-desc">{cluster.description}</p>
              <ul>
                {ecosystem.ties
                  .filter((tie) => tie.clusterId === cluster.id)
                  .map((tie) => {
                    const idea = byId.get(tie.withIdeaId);
                    if (!idea) return null;
                    const neighborLink = <Link href={`/ideas/${idea.slug}`}>{idea.name}</Link>;
                    const centerLink = <Link href={centerHref}>{ecosystem.centerName}</Link>;
                    const subject = tie.centerIs === "source" ? centerLink : neighborLink;
                    const object = tie.centerIs === "source" ? neighborLink : centerLink;
                    return (
                      <li key={tie.withIdeaId}>
                        <span className="eco-kind" data-kind={tie.kind}>{tieKindLabels[tie.kind]}</span>
                        {subject} <span aria-hidden="true">→</span> {object}
                        <span className="eco-gloss">{tie.gloss}</span>
                      </li>
                    );
                  })}
              </ul>
            </section>
          ))}
        </div>
      </SyntopiconChapterSection>

      <SyntopiconChapterSection title="Proveniência e limites">
        <p>
          Os laços vêm de <cite>{source.title}</cite> (status: <code>{source.status}</code>) na camada{" "}
          <code>{ecosystem.provenance.layer}</code>. São leitura curada entre ideias já canônicas — não referências
          extraídas do capítulo de {ecosystem.centerName} do Syntopicon. Quando essa extração existir, cada laço deve
          ser revalidado ou substituído.
        </p>
        <p>
          O recorte é deliberado: esta página apresenta <strong>uma parte</strong> do ecossistema — a vizinhança de{" "}
          {ecosystem.centerName} — e não o grafo completo das 102 ideias.
        </p>
      </SyntopiconChapterSection>
    </article>
  );
}
