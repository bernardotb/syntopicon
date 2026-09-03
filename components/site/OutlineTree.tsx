export type OutlineNodeDTO = {
  slug: string;
  code: string | null;
  provisional: boolean;
  titlePt: string | null;
  titleEn: string;
  level: number;
  mirrorPassages: number | null;
  authorsCount: number;
  href: string;
  children: OutlineNodeDTO[];
};

/**
 * Árvore do Outline de Topics — progressive disclosure com <details>/<summary>
 * (acessível por teclado, sem JavaScript). Os ancestrais do golden chain (8 → 8c
 * → 8c(1)) vêm abertos por padrão.
 */
function OutlineBranch({ node, golden }: { node: OutlineNodeDTO; golden: boolean }) {
  const hasChildren = node.children.length > 0;
  const label = node.titlePt ?? node.titleEn;
  const meta: string[] = [];
  if (node.code) meta.push(`código ${node.code}`);
  if (node.provisional) meta.push("código impresso pendente");
  if (node.mirrorPassages !== null) meta.push(`${node.mirrorPassages} passagens no benchmark`);
  if (node.authorsCount > 0) meta.push(`${node.authorsCount} autores incorporados`);

  return (
    <details
      className={`outline-branch level-${node.level}`}
      open={golden && (node.code === "8" || node.code === "8c")}
    >
      <summary>
        <span className="outline-label">
          {node.code ? <span className="outline-code">{node.code}</span> : null}
          <a href={node.href}>{label}</a>
        </span>
        <span className="outline-meta">{meta.join(" · ")}</span>
      </summary>
      {hasChildren ? (
        <ul className="outline-children">
          {node.children.map((child) => (
            <li key={child.slug}>
              <OutlineBranch node={child} golden={golden} />
            </li>
          ))}
        </ul>
      ) : null}
    </details>
  );
}

export function OutlineTree({
  roots,
  goldenCodes = ["8", "8a", "8b", "8c", "8c-1", "8c-2"],
}: {
  roots: readonly OutlineNodeDTO[];
  goldenCodes?: readonly string[];
}) {
  return (
    <div className="outline-tree">
      {roots.map((node) => (
        <OutlineBranch key={node.slug} node={node} golden={goldenCodes.includes(node.slug)} />
      ))}
    </div>
  );
}
