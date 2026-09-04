import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { EmptyState } from "@/components/site/EmptyState";
import { OutlineTree, type OutlineNodeDTO } from "@/components/site/OutlineTree";
import { ideaByCanonicalUrlSlug, ideas } from "@/data/ideas";
import { JUSTICE, JUSTICE_NOT_INGESTED } from "@/data/justice";
import {
  JUSTICE_1952_META,
  justice1952AuthorRefCount,
  justice1952BibleCount,
  justice1952Children,
  justice1952CrossRefs,
  justice1952IntroPtBr,
  justice1952References,
  justice1952RefCountTotal,
  justice1952Roots,
  justice1952Topics,
  justice1952TopicsWithRefsCount,
} from "@/data/justice-1952-full";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  // todas as 102 ideias têm página; só Justice tem profundidade (golden case)
  return ideas.map((idea) => ({ ideia: `${idea.number}-${idea.slugEn}` }));
}

// autores distintos por tópico, derivados das linhas canônicas (authorRaw intacto)
const distinctAuthorsBySlug: Record<string, number> = {};
for (const topic of justice1952Topics) {
  distinctAuthorsBySlug[topic.slug] = new Set(
    justice1952References.filter((r) => r.topicSlug === topic.slug).map((r) => r.authorRaw),
  ).size;
}

function buildOutline(): OutlineNodeDTO[] {
  const toDTO = (node: (typeof justice1952Topics)[number]): OutlineNodeDTO => ({
    slug: node.slug,
    code: node.code,
    provisional: false,
    titlePt: node.titlePt,
    titleEn: node.titleEn,
    level: node.level,
    mirrorPassages: null,
    authorsCount: distinctAuthorsBySlug[node.slug] ?? 0,
    href: `/ideias/${JUSTICE.ideaNumber}-${JUSTICE.ideaSlugEn}/${node.slug}`,
    children: justice1952Children(node.slug).map(toDTO),
  });
  return justice1952Roots().map(toDTO);
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
        <p>
          <span className="edition-chip">Syntopicon 1952 · pp. {JUSTICE_1952_META.pagesPrinted}</span>{" "}
          <span className="edition-chip pending">selo canônico aguarda PDF</span>
        </p>
      </header>

      <section className="canon-strip" aria-label="Estado da ingestão canônica">
        <p>
          Capítulo <strong>42 — Justice</strong> da edição <strong>1952</strong> do Syntopicon,{" "}
          <strong>ingerido</strong> a partir do texto integral colado pelo Dono:{" "}
          <strong>{justice1952Topics.length} tópicos</strong> com código impresso real (11 de nível 1 · 28 de nível 2 · 2
          de nível 3), <strong>{justice1952RefCountTotal} linhas de referência</strong> ({justice1952AuthorRefCount} de
          autores · {justice1952BibleCount} bíblicas) e <strong>{justice1952CrossRefs.length} remissões cruzadas</strong>.
          A edição-alvo principal continua sendo a 1990 (ADR-002); esta edição fica preservada e identificada.
        </p>
      </section>

      <section aria-labelledby="intro-title">
        <h2 id="intro-title">Introdução</h2>
        <p className="section-lede">
          Tradução em português (camada displayPtBr — nunca substitui o original em inglês). Fonte da tradução:{" "}
          <em>justice-pt-chatgpt-translation</em>, auditada 1:1 contra o outline impresso.
        </p>
        <div className="intro-pt">
          {justice1952IntroPtBr.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section aria-labelledby="outline-title">
        <h2 id="outline-title">Outline of Topics</h2>
        <p className="section-lede">
          A hierarquia de Adler na ordem impressa da edição 1952 (pp. 857–858), com os {justice1952Topics.length}{" "}
          códigos canônicos confirmados na fonte — nenhum código provisório. {justice1952TopicsWithRefsCount} tópicos
          têm bloco de referências próprio; os Tópicos 1 e 11 imprimem apenas o título.
        </p>
        <OutlineTree roots={roots} />
      </section>

      <section aria-labelledby="refs-title">
        <h2 id="refs-title">References</h2>
        <p className="section-lede">
          As {justice1952RefCountTotal} linhas de referência do capítulo, na forma impressa (locatorRaw intocado), vivem em
          cada página de tópico — é lá que a fonte é lida. Distribuição:
        </p>
        <ul className="chapter-ref-stats">
          <li>
            <strong>{justice1952RefCountTotal}</strong> linhas no total
          </li>
          <li>
            <strong>{justice1952AuthorRefCount}</strong> entradas de autores
          </li>
          <li>
            <strong>{justice1952BibleCount}</strong> entradas bíblicas (Old/New Testament, Apocrypha)
          </li>
          <li>
            <strong>{justice1952TopicsWithRefsCount}</strong> blocos de tópico (1 e 11 sem bloco próprio na fonte)
          </li>
          <li>maior bloco: 8c(1) · Economia · <strong>18</strong> linhas</li>
        </ul>
        <p className="section-lede">
          Comece pelo subtree canônico:{" "}
          <Link href={`/ideias/${JUSTICE.ideaNumber}-${JUSTICE.ideaSlugEn}/8`}>Tópico 8 — Economic justice</Link> →{" "}
          <Link href={`/ideias/${JUSTICE.ideaNumber}-${JUSTICE.ideaSlugEn}/8c`}>8c</Link> →{" "}
          <Link href={`/ideias/${JUSTICE.ideaNumber}-${JUSTICE.ideaSlugEn}/8c-1`}>8c(1)</Link>.
        </p>
      </section>

      <section aria-labelledby="cross-title">
        <h2 id="cross-title">Cross-References</h2>
        <p className="section-lede">
          As {justice1952CrossRefs.length} remissões impressas no fechamento do capítulo (p. 879), texto integral.
        </p>
        <ol className="crossref-list">
          {justice1952CrossRefs.map((cross) => (
            <li key={cross.n}>
              <span className="crossref-n">{cross.n}.</span>
              {cross.textRaw}
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="readings-title">
        <h2 id="readings-title">Additional Readings</h2>
        <EmptyState title="Ainda não parseadas">{JUSTICE_NOT_INGESTED.additionalReadings}</EmptyState>
      </section>

      <footer className="provenance-note">
        <p>
          Provenance: texto e estrutura da edição <strong>1952</strong> (<em>source:syntopicon-1952</em>, colagem
          integral do Dono, 2026-09-03 — selo canônico aguarda upload do PDF); tradução PT em camada separada (
          <em>source:justice-pt-chatgpt-translation</em>), sem tocar títulos EN nem locators; presença de autores no
          benchmark (2026-09-02) mantida como camada histórica comparativa. O capítulo impresso aguarda confirmação do
          volume (Vol. I vs II). Divergências de edição seguem registradas em{" "}
          <Link href="/sobre">docs/corpus/confronto</Link>.
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
