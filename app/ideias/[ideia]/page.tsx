import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { EmptyState } from "@/components/site/EmptyState";
import { OutlineTree, type OutlineNodeDTO } from "@/components/site/OutlineTree";
import { ideaByCanonicalUrlSlug, ideas } from "@/data/ideas";
import {
  JUSTICE,
  JUSTICE_CANON,
  JUSTICE_NOT_INGESTED,
  justiceChildren,
  justiceRootTopics,
  justiceTopicAuthors,
  justiceTopics,
} from "@/data/justice";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  // todas as 102 ideias têm página; só Justice tem profundidade (golden case)
  return ideas.map((idea) => ({ ideia: `${idea.number}-${idea.slugEn}` }));
}

function buildOutline(): OutlineNodeDTO[] {
  const toDTO = (node: {
    slug: string;
    code: string | null;
    provisional: boolean;
    titlePt: string | null;
    titleEn: string;
    level: number;
    mirrorPassages: number | null;
  }): OutlineNodeDTO => ({
    ...node,
    authorsCount: (justiceTopicAuthors[node.slug] ?? []).length,
    href: `/ideias/${JUSTICE.ideaNumber}-${JUSTICE.ideaSlugEn}/${node.slug}`,
    children: justiceChildren(node.slug).map(toDTO),
  });
  return justiceRootTopics().map(toDTO);
}

function GoldenIdeaPage() {
  const roots = buildOutline();
  return (
    <article className="page-shell idea-page">
      <Breadcrumbs items={[{ label: "Grandes Ideias", href: "/ideias" }, { label: "Justiça" }]} />
      <header className="idea-header">
        <p className="idea-number-large">42</p>
        <h1>Justiça</h1>
        <p className="idea-subtitle">Justice · Great Idea 42 · golden case</p>
      </header>

      <section className="canon-strip" aria-label="Estrutura canônica">
        <p>
          Estrutura canônica do outline: <strong>{JUSTICE_CANON.totalNodes} tópicos em 3 níveis</strong> (
          {JUSTICE_CANON.level1} de nível 1 · {JUSTICE_CANON.level2} de nível 2 · {JUSTICE_CANON.level3} de nível 3).
          Incorporados neste protótipo: <strong>{justiceTopics.length}</strong> nós com títulos e autores — o
          subtree completo do Topic 8 e os grupos de nível 1.
        </p>
      </section>

      <section aria-labelledby="intro-title">
        <h2 id="intro-title">Introduction</h2>
        <EmptyState title="Ensaio ainda não incorporado">{JUSTICE_NOT_INGESTED.introduction}</EmptyState>
      </section>

      <section aria-labelledby="outline-title">
        <h2 id="outline-title">Outline of Topics</h2>
        <p className="section-lede">
          A hierarquia de Adler preservada. Os grupos de nível 1 seguem a ordem do benchmark; onde o código impresso
          ainda não foi confirmado, o tópico é exibido sem número inventado. O subtree do Topic 8 é o caminho canônico
          do golden case.
        </p>
        <OutlineTree roots={roots} />
      </section>

      <section aria-labelledby="refs-title">
        <h2 id="refs-title">References</h2>
        <EmptyState title="Referências do capítulo ainda não ingeridas">{JUSTICE_NOT_INGESTED.references}</EmptyState>
      </section>

      <section aria-labelledby="cross-title">
        <h2 id="cross-title">Cross-References</h2>
        <EmptyState title="Não incorporadas">{JUSTICE_NOT_INGESTED.crossReferences}</EmptyState>
      </section>

      <section aria-labelledby="readings-title">
        <h2 id="readings-title">Additional Readings</h2>
        <EmptyState title="Não incorporadas">{JUSTICE_NOT_INGESTED.additionalReadings}</EmptyState>
      </section>

      <footer className="provenance-note">
        <p>
          Provenance: títulos e presença de autores capturados do benchmark (2026-09-02, <em>unverified</em>); código
          impresso <strong>8c(1)</strong> e estrutura 11+28+2 herdados da consulta direta ao Justice.pdf (sessão
          anterior — reconfirmar na ingestão); traduções de apresentação são derivadas.
        </p>
      </footer>
    </article>
  );
}

function PendingIdeaPage({ number, namePt, nameEn }: { number: number; namePt: string; nameEn: string }) {
  return (
    <article className="page-shell idea-page">
      <Breadcrumbs items={[{ label: "Grandes Ideias", href: "/ideias" }, { label: namePt }]} />
      <header className="idea-header">
        <p className="idea-number-large">{number}</p>
        <h1>{namePt}</h1>
        <p className="idea-subtitle">{nameEn} · Great Idea {number}</p>
      </header>
      <EmptyState title="Estrutura documental ainda não incorporada">
        Esta Grande Ideia existe no índice canônico, mas o capítulo correspondente do Syntopicon (Introduction,
        Outline of Topics, References) ainda não foi ingerido. O golden case —{" "}
        <Link href="/ideias/42-justice">Justiça (42)</Link> — prova a arquitetura completa antes da escala. Nunca
        preenchemos páginas com conteúdo inventado.
      </EmptyState>
      <p>
        <Link className="button ghost" href="/ideias">
          ← Voltar ao índice
        </Link>
      </p>
    </article>
  );
}

export default async function IdeaPage({ params }: { params: Promise<{ ideia: string }> }) {
  const { ideia } = await params;
  const idea = ideaByCanonicalUrlSlug(ideia);
  if (!idea) notFound();

  if (idea.number === JUSTICE.ideaNumber) {
    return <GoldenIdeaPage />;
  }
  return <PendingIdeaPage number={idea.number ?? 0} namePt={idea.name} nameEn={idea.nameEn ?? ""} />;
}
