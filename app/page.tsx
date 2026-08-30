import Link from "next/link";
import { ideas } from "@/data/ideas";

export default function HomePage() {
  return (
    <article className="landing">
      <p className="eyebrow">Syntopicon</p>
      <h1>O mapa da Grande Conversa.</h1>
      <p className="lede">Navegue pelas 102 Grandes Ideias do Syntopicon. As conexões aparecem apenas quando o corpus as sustenta.</p>
      <Link className="primary-link" href="/ideas">Explorar as {ideas.length} Grandes Ideias</Link>
    </article>
  );
}
