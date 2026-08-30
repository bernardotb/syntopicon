import Link from "next/link";
import { notFound } from "next/navigation";
import { ideas } from "@/data/ideas";
import { sources } from "@/data/source-registry";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { SyntopiconChapterSection } from "@/components/SyntopiconChapterSection";

export const dynamic = "force-static";

export function generateStaticParams() {
  return ideas.map(({ slug }) => ({ slug }));
}

export default async function IdeaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idea = ideas.find((candidate) => candidate.slug === slug);
  if (!idea) notFound();
  const source = sources["syntopicon-canonical-ideas-list"];

  return (
    <article className="page-shell">
      <Link className="back-link" href="/ideas">← Grandes Ideias</Link>
      <p className="eyebrow">Grande Ideia</p>
      <h1>{idea.name}</h1>
      <EvidenceBadge provenance={idea.provenance} />
      <SyntopiconChapterSection title="Proveniência">
        <p>Esta entrada vem de <cite>{source.title}</cite> ({source.status}). O ID canônico é <code>{idea.id}</code>.</p>
      </SyntopiconChapterSection>
      <SyntopiconChapterSection title="Relações estruturadas">
        <p>Nenhum tópico, referência, obra, autor ou referência cruzada é exibido sem registro estruturado comprovado no dataset atual.</p>
      </SyntopiconChapterSection>
    </article>
  );
}
