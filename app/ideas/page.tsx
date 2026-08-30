import Link from "next/link";
import { ideas } from "@/data/ideas";

export const dynamic = "force-static";

export default function IdeasPage() {
  return (
    <article className="page-shell">
      <p className="eyebrow">Índice canônico</p>
      <h1>Grandes Ideias</h1>
      <p className="lede">{ideas.length} entradas derivadas da lista editorial local do Syntopicon.</p>
      <ol className="idea-list">
        {ideas.map((idea) => <li key={idea.id}><Link href={`/ideas/${idea.slug}`}>{idea.name}</Link></li>)}
      </ol>
    </article>
  );
}
