import type { CSSProperties } from "react";
import type { EcosystemTie, IdeaEcosystem } from "@/data/justice-ecosystem";
import type { Idea } from "@/lib/syntopicon";

const CLUSTER_COLORS: Readonly<Record<string, string>> = {
  moral: "#8a4f3d",
  direito: "#305d4f",
  politica: "#2f5578",
  virtudes: "#b3831b",
  social: "#6e6a5e",
  transcendente: "#5b3a7e",
};

const ACCENT = "#305d4f";
const OPPOSE = "#a03d2d";
const FALLBACK_COLOR = "#59645c";
const CENTER = 600;
const RING = 400;
const GAP_DEG = 7;

export function clusterColor(clusterId: string): string {
  return CLUSTER_COLORS[clusterId] ?? FALLBACK_COLOR;
}

type Placement = {
  tie: EcosystemTie;
  angleDeg: number;
  color: string;
  name: string;
  slug: string;
};

function splitLabel(name: string): readonly string[] {
  const separator = name.indexOf(" e ");
  if (separator === -1) return [name];
  return [name.slice(0, separator), `e ${name.slice(separator + 3)}`];
}

function tieClass(kind: EcosystemTie["kind"]): string {
  if (kind === "CROSS_REFERENCES") return "tie-cross";
  if (kind === "OPPOSES") return "tie-oppose";
  return "tie-contrib";
}

function placeEcosystem(ecosystem: IdeaEcosystem, byId: ReadonlyMap<string, Idea>) {
  const orderOf = new Map(ecosystem.clusters.map((cluster, index) => [cluster.id, index]));
  const ordered = [...ecosystem.ties].sort(
    (a, b) => (orderOf.get(a.clusterId) ?? 0) - (orderOf.get(b.clusterId) ?? 0),
  );
  const perDegree = (360 - ecosystem.clusters.length * GAP_DEG) / Math.max(ordered.length, 1);
  const placements: Placement[] = [];
  const boundaries: number[] = [-90];
  let cursor = -90;
  let currentCluster = ordered[0]?.clusterId;
  for (const tie of ordered) {
    if (tie.clusterId !== currentCluster) {
      cursor += GAP_DEG;
      boundaries.push(cursor);
      currentCluster = tie.clusterId;
    }
    const idea = byId.get(tie.withIdeaId);
    if (!idea) throw new Error(`Ecosystem tie references unknown idea ${tie.withIdeaId}.`);
    placements.push({
      tie,
      angleDeg: cursor + perDegree / 2,
      color: clusterColor(tie.clusterId),
      name: idea.name,
      slug: idea.slug,
    });
    cursor += perDegree;
  }
  return { placements, boundaries };
}

export function IdeaEcosystemMap({ ecosystem, ideas }: { ecosystem: IdeaEcosystem; ideas: readonly Idea[] }) {
  const byId = new Map(ideas.map((idea) => [idea.id, idea]));
  const { placements, boundaries } = placeEcosystem(ecosystem, byId);
  const centerSlug = ecosystem.centerId.slice("idea:".length);

  return (
    <svg
      className="eco-map"
      viewBox="0 0 1200 1200"
      role="img"
      aria-label={`Mapa do ecossistema de ${ecosystem.centerName}: ${placements.length} laços declarados com ${placements.length} ideias vizinhas, em ${ecosystem.clusters.length} grupos.`}
    >
      <defs>
        <marker id="eco-arrow-contrib-in" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto">
          <path d="M10 0 L0 5 L10 10 Z" fill={ACCENT} opacity="0.8" />
        </marker>
        <marker id="eco-arrow-contrib-out" viewBox="0 0 10 10" refX="3" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill={ACCENT} opacity="0.8" />
        </marker>
        <marker id="eco-arrow-oppose-in" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto">
          <path d="M10 0 L0 5 L10 10 Z" fill={OPPOSE} opacity="0.9" />
        </marker>
        <marker id="eco-arrow-oppose-out" viewBox="0 0 10 10" refX="3" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill={OPPOSE} opacity="0.9" />
        </marker>
      </defs>

      <circle className="orbit" cx={CENTER} cy={CENTER} r={RING} />
      {boundaries.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={`boundary-${deg}`}
            className="boundary-tick"
            x1={CENTER + 386 * Math.cos(rad)}
            y1={CENTER + 386 * Math.sin(rad)}
            x2={CENTER + 414 * Math.cos(rad)}
            y2={CENTER + 414 * Math.sin(rad)}
          />
        );
      })}

      {placements.map(({ tie, angleDeg }) => {
        const rad = (angleDeg * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const marker = tie.kind === "CROSS_REFERENCES"
          ? undefined
          : tie.kind === "OPPOSES" ? "eco-arrow-oppose" : "eco-arrow-contrib";
        const markerId = (direction: "in" | "out") => `url(#${marker}-${direction})`;
        return (
          <line
            key={`tie-${tie.withIdeaId}`}
            className={`tie ${tieClass(tie.kind)}`}
            x1={CENTER + 62 * cos}
            y1={CENTER + 62 * sin}
            x2={CENTER + 384 * cos}
            y2={CENTER + 384 * sin}
            markerStart={tie.centerIs === "target" ? markerId("in") : undefined}
            markerEnd={tie.centerIs === "source" ? markerId("out") : undefined}
          />
        );
      })}

      <g className="eco-center">
        <a href={`/ideas/${centerSlug}`}>
          <title>{`${ecosystem.centerName}: o centro desta parte do ecossistema`}</title>
          <circle className="center-halo" cx={CENTER} cy={CENTER} r={72} />
          <circle className="center-body" cx={CENTER} cy={CENTER} r={54} />
          <text className="center-eyebrow" x={CENTER} y={589} textAnchor="middle">GRANDE IDEIA</text>
          <text className="center-label" x={CENTER} y={622} textAnchor="middle">{ecosystem.centerName}</text>
        </a>
      </g>

      {placements.map(({ tie, angleDeg, color, name, slug }) => {
        const rad = (angleDeg * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const nx = CENTER + RING * cos;
        const ny = CENTER + RING * sin;
        const anchor = cos > 0.35 ? "start" : cos < -0.35 ? "end" : "middle";
        const lines = splitLabel(name);
        let labelX = nx;
        let baseline: number;
        if (anchor === "start" || anchor === "end") {
          labelX = anchor === "start" ? nx + 17 : nx - 17;
          baseline = lines.length === 1 ? ny + 6 : ny - 4;
        } else {
          baseline = sin > 0
            ? (lines.length === 1 ? ny + 32 : ny + 30)
            : (lines.length === 1 ? ny - 24 : ny - 42);
        }
        return (
          <g key={tie.withIdeaId} className="eco-node" style={{ "--c": color } as CSSProperties}>
            <a href={`/ideas/${slug}`}>
              <title>{`${name} — ${tie.gloss}`}</title>
              <circle className="node-body" cx={nx} cy={ny} r={9} stroke={color} />
              <text className="node-label" x={labelX} y={baseline} textAnchor={anchor}>
                {lines.length === 1 ? name : (
                  <>
                    <tspan x={labelX}>{lines[0]}</tspan>
                    <tspan x={labelX} dy="20">{lines[1]}</tspan>
                  </>
                )}
              </text>
            </a>
          </g>
        );
      })}
    </svg>
  );
}
