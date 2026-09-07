import type { Relation } from "@/lib/knowledge-graph";
import type { EntityId, Provenance } from "@/lib/syntopicon";
import { canonicalIdeaId } from "@/lib/syntopicon";

export type EcosystemTieKind = "CONTRIBUTES_TO" | "CROSS_REFERENCES" | "OPPOSES";

export type EcosystemCluster = { id: string; name: string; description: string };

export type EcosystemTie = {
  withIdeaId: EntityId;
  clusterId: string;
  kind: EcosystemTieKind;
  centerIs: "source" | "target";
  gloss: string;
};

export type IdeaEcosystem = {
  centerId: EntityId;
  centerName: string;
  title: string;
  clusters: readonly EcosystemCluster[];
  ties: readonly EcosystemTie[];
  provenance: Provenance;
};

export const tieKindLabels: Record<EcosystemTieKind, string> = {
  CONTRIBUTES_TO: "contribui para",
  CROSS_REFERENCES: "cruza-se com",
  OPPOSES: "opõe-se a",
};

export const justiceEcosystem: IdeaEcosystem = {
  centerId: canonicalIdeaId("Justiça"),
  centerName: "Justiça",
  title: "O ecossistema de Justiça",
  provenance: {
    sourceId: "source:justice-ecosystem-reading",
    layer: "interpretive-content",
  },
  clusters: [
    {
      id: "moral",
      name: "Fundamento moral",
      description: "Os conceitos morais dos quais a justiça depende quando pergunta o que se deve a cada um.",
    },
    {
      id: "direito",
      name: "Ordem jurídica",
      description: "Os instrumentos pelos quais a justiça se encarna em normas, julgamentos e penas.",
    },
    {
      id: "politica",
      name: "Comunidade política",
      description: "O palco em que a justiça deixa de ser privada e se torna ordem comum.",
    },
    {
      id: "virtudes",
      name: "Virtudes companheiras",
      description: "As virtudes cardeais que, com a justiça, ordenam a alma e a cidade.",
    },
    {
      id: "social",
      name: "Tensões sociais",
      description: "Os terrenos em que a exigência de justiça é mais disputada.",
    },
    {
      id: "transcendente",
      name: "Horizonte último",
      description: "Quando a justiça humana é medida por um padrão que a excede.",
    },
  ],
  ties: [
    // Fundamento moral
    {
      withIdeaId: canonicalIdeaId("Bem e Mal"),
      clusterId: "moral",
      kind: "CONTRIBUTES_TO",
      centerIs: "source",
      gloss: "Ser justo é parte do capítulo maior do bem viver.",
    },
    {
      withIdeaId: canonicalIdeaId("Dever"),
      clusterId: "moral",
      kind: "CONTRIBUTES_TO",
      centerIs: "target",
      gloss: "Dar a cada um o que lhe é devido é também enunciar um dever.",
    },
    {
      withIdeaId: canonicalIdeaId("Virtude e Vício"),
      clusterId: "moral",
      kind: "CONTRIBUTES_TO",
      centerIs: "target",
      gloss: "A justiça integra o rol das virtudes e define-se contra a injustiça.",
    },
    // Ordem jurídica
    {
      withIdeaId: canonicalIdeaId("Lei"),
      clusterId: "direito",
      kind: "CONTRIBUTES_TO",
      centerIs: "target",
      gloss: "A lei procura traduzir a justiça em norma obrigatória — daí a pergunta sobre a lei injusta.",
    },
    {
      withIdeaId: canonicalIdeaId("Constituição"),
      clusterId: "direito",
      kind: "CONTRIBUTES_TO",
      centerIs: "target",
      gloss: "A ordem constitucional distribui cargos, poderes e direitos segundo uma ideia de justiça política.",
    },
    {
      withIdeaId: canonicalIdeaId("Juízo"),
      clusterId: "direito",
      kind: "CROSS_REFERENCES",
      centerIs: "target",
      gloss: "Julgar é aplicar a justiça ao caso concreto.",
    },
    {
      withIdeaId: canonicalIdeaId("Punição"),
      clusterId: "direito",
      kind: "CROSS_REFERENCES",
      centerIs: "target",
      gloss: "A punição é justa quando corresponde ao que a injustiça merece.",
    },
    {
      withIdeaId: canonicalIdeaId("Costume e Convenção"),
      clusterId: "direito",
      kind: "CROSS_REFERENCES",
      centerIs: "target",
      gloss: "A justiça convencional dos costumes é confrontada pela justiça natural.",
    },
    // Comunidade política
    {
      withIdeaId: canonicalIdeaId("Cidadão"),
      clusterId: "politica",
      kind: "CROSS_REFERENCES",
      centerIs: "target",
      gloss: "A justiça é a virtude cívica que rege as relações entre cidadãos.",
    },
    {
      withIdeaId: canonicalIdeaId("Estado"),
      clusterId: "politica",
      kind: "CONTRIBUTES_TO",
      centerIs: "source",
      gloss: "A justiça é o laço que conserva unida a comunidade política.",
    },
    {
      withIdeaId: canonicalIdeaId("Governo"),
      clusterId: "politica",
      kind: "CROSS_REFERENCES",
      centerIs: "target",
      gloss: "Todo regime reivindica o nome de justo ao justificar seu poder.",
    },
    {
      withIdeaId: canonicalIdeaId("Democracia"),
      clusterId: "politica",
      kind: "CROSS_REFERENCES",
      centerIs: "target",
      gloss: "A igualdade democrática é uma das respostas à pergunta sobre o que é justo.",
    },
    {
      withIdeaId: canonicalIdeaId("Guerra e Paz"),
      clusterId: "politica",
      kind: "CROSS_REFERENCES",
      centerIs: "target",
      gloss: "A guerra justa mede o conflito armado pelo padrão da justiça.",
    },
    // Virtudes companheiras
    {
      withIdeaId: canonicalIdeaId("Prudência"),
      clusterId: "virtudes",
      kind: "CROSS_REFERENCES",
      centerIs: "target",
      gloss: "A prudência discerne o meio justo nas circunstâncias de cada caso.",
    },
    {
      withIdeaId: canonicalIdeaId("Temperança"),
      clusterId: "virtudes",
      kind: "CROSS_REFERENCES",
      centerIs: "target",
      gloss: "Virtude cardeal que, com a justiça, ordena o apetite e a medida.",
    },
    {
      withIdeaId: canonicalIdeaId("Coragem"),
      clusterId: "virtudes",
      kind: "CROSS_REFERENCES",
      centerIs: "target",
      gloss: "Virtude cardeal que mantém firme, com a justiça, a ordem da alma.",
    },
    // Tensões sociais
    {
      withIdeaId: canonicalIdeaId("Riqueza"),
      clusterId: "social",
      kind: "CROSS_REFERENCES",
      centerIs: "target",
      gloss: "A distribuição de bens é o terreno clássico da justiça distributiva.",
    },
    {
      withIdeaId: canonicalIdeaId("Honra"),
      clusterId: "social",
      kind: "CROSS_REFERENCES",
      centerIs: "target",
      gloss: "A honra é o bem que a comunidade distribui em reconhecimento do mérito.",
    },
    {
      withIdeaId: canonicalIdeaId("Liberdade"),
      clusterId: "social",
      kind: "CROSS_REFERENCES",
      centerIs: "target",
      gloss: "Liberdade e justiça limitam-se e sustentam-se mutuamente na ordem civil.",
    },
    {
      withIdeaId: canonicalIdeaId("Escravidão"),
      clusterId: "social",
      kind: "OPPOSES",
      centerIs: "target",
      gloss: "Negar a outrem a condição de pessoa é o limite oposto à vida justa.",
    },
    // Horizonte último
    {
      withIdeaId: canonicalIdeaId("Deus"),
      clusterId: "transcendente",
      kind: "CONTRIBUTES_TO",
      centerIs: "target",
      gloss: "A justiça divina é o padrão último contra o qual a justiça humana é medida.",
    },
  ],
};

export const ecosystemByIdeaSlug: ReadonlyMap<string, IdeaEcosystem> = new Map([
  [justiceEcosystem.centerId.slice("idea:".length), justiceEcosystem],
]);

export function ecosystemTieRelations(ecosystem: IdeaEcosystem): Relation[] {
  return ecosystem.ties.map((tie) => ({
    from: tie.centerIs === "source" ? ecosystem.centerId : tie.withIdeaId,
    to: tie.centerIs === "source" ? tie.withIdeaId : ecosystem.centerId,
    kind: tie.kind,
    sourceId: ecosystem.provenance.sourceId,
  }));
}
