import Link from "next/link";
import { ideas, ideaUrl } from "@/data/ideas";
import { JUSTICE } from "@/data/justice";
import { IdeasIndexClient } from "./IdeasIndexClient";

export const dynamic = "force-static";

export const metadata = { title: "Grandes Ideias — A Grande Conversa" };

export default function IdeasPage() {
  const entries = ideas.map((idea) => ({
    number: idea.number ?? 0,
    namePt: idea.name,
    nameEn: idea.nameEn ?? "",
    href: ideaUrl(idea),
    hasData: idea.number === JUSTICE.ideaNumber,
  }));

  return (
    <article className="page-shell">
      <p className="eyebrow">Índice canônico</p>
      <h1>Grandes Ideias</h1>
      <p className="lede">
        As 102 ideias do Syntopicon, na ordem canônica (alfabética pelo título original em inglês). Nesta versão,
        apenas <Link href="/ideias/42-justice">Justiça (42)</Link> tem profundidade documental incorporada — o golden
        case. As demais mostram seu estado honesto.
      </p>
      <IdeasIndexClient entries={entries} />
    </article>
  );
}
