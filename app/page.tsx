import Link from "next/link";
import { ideas } from "@/data/ideas";
import { JUSTICE, JUSTICE_CANON, justiceTopics } from "@/data/justice";

export const dynamic = "force-static";

export default function HomePage() {
  const justiceIdea = ideas.find((idea) => idea.number === JUSTICE.ideaNumber);
  const goldenHref = justiceIdea ? `/ideias/${justiceIdea.number}-${justiceIdea.slugEn}` : "/ideias";

  return (
    <article className="landing">
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Syntopicon digital</p>
            <h1>O mapa das ideias que atravessam os grandes livros do pensamento ocidental.</h1>
            <p className="lede">
              Uma reconstrução fiel do Syntopicon em português: as 102 Grandes Ideias, os tópicos de Adler e o caminho
              direto até as passagens dos Great Books of the Western World.
            </p>
            <div className="hero-actions">
              <Link className="button primary" href="/ideias">
                Explorar as 102 Grandes Ideias
              </Link>
              <Link className="button ghost" href="/sobre">
                Conhecer o método
              </Link>
            </div>
            <p className="hero-numbers">
              102 Grandes Ideias · Justiça: estrutura canônica de {JUSTICE_CANON.totalNodes} tópicos ({JUSTICE_CANON.level1}+
              {JUSTICE_CANON.level2}+{JUSTICE_CANON.level3}) · {justiceTopics.length} tópicos com dados incorporados
            </p>
          </div>
          <figure className="hero-art" aria-hidden="true">
            <img src="/hero-a-grande-conversa.jpg" alt="" loading="eager" />
            <figcaption>A Grande Conversa · dois séculos em diálogo, sob a mesma balança.</figcaption>
          </figure>
        </div>
      </section>

      <section className="golden-demo" aria-labelledby="golden-demo-title">
        <h2 id="golden-demo-title">Comece por Justiça — o golden case</h2>
        <p className="section-lede">
          O percurso completo do mapa ao texto, com dados reais do capítulo 42:
        </p>
        <ol className="golden-path">
          <li>
            <Link href={goldenHref}>
              <strong>42 · Justiça</strong>
              <span>Grande Ideia</span>
            </Link>
          </li>
          <li>
            <a href={`${goldenHref}/8`}>
              <strong>8</strong>
              <span>Justiça econômica</span>
            </a>
          </li>
          <li>
            <a href={`${goldenHref}/8c`}>
              <strong>8c</strong>
              <span>Organização da produção</span>
            </a>
          </li>
          <li>
            <a href={`${goldenHref}/8c-1`}>
              <strong>8c(1)</strong>
              <span>Exploração econômica: escravidão</span>
            </a>
          </li>
          <li>
            <a href="/obras/politics">
              <strong>Política</strong>
              <span>Aristóteles · obra</span>
            </a>
          </li>
          <li>
            <a href="/passagem/politica-justica-8c1">
              <strong>Passagem</strong>
              <span>o texto, no contexto</span>
            </a>
          </li>
        </ol>
      </section>

      <section className="navigation-modes" aria-labelledby="modes-title">
        <h2 id="modes-title">Três formas de percorrer a mesma base</h2>
        <ul>
          <li>
            <h3>Sintópica</h3>
            <p>Ideia → tópico → referência → passagem.</p>
            <Link href="/ideias/42-justice">Percorrer pelos tópicos</Link>
          </li>
          <li>
            <h3>Bibliográfica</h3>
            <p>Autor → obra → passagem → tópico → ideia.</p>
            <Link href="/autores/hobbes">Começar por Hobbes</Link>
          </li>
          <li>
            <h3>Pelo termo</h3>
            <p>Termo → tópico → referência. Esboço: índice derivado dos dados incorporados.</p>
            <Link href="/inventario">Buscar no inventário</Link>
          </li>
        </ul>
      </section>
    </article>
  );
}
