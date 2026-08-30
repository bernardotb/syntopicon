import { canonicalIdeaId, canonicalizeIdeaSlug, type Idea } from "@/lib/syntopicon";

const canonicalIdeaNames = [
  "Acaso", "Alma", "Amor", "Anjo", "Animal", "Aristocracia", "Arte", "Astronomia", "Beleza", "Bem e Mal",
  "Causa", "Ciência", "Cidadão", "Conhecimento", "Constituição", "Coragem", "Costume e Convenção", "Definição", "Democracia", "Desejo",
  "Destino", "Deus", "Dever", "Dialética", "Educação", "Elemento", "Emoção", "Escravidão", "Espaço", "Estado",
  "Eternidade", "Evolução", "Experiência", "Família", "Felicidade", "Filosofia", "Física", "Forma", "Governo", "Guerra e Paz",
  "Hábito", "Hipótese", "História", "Homem", "Honra", "Ideia", "Imortalidade", "Indução", "Infinito", "Juízo",
  "Justiça", "Lei", "Liberdade", "Linguagem", "Lógica", "Matéria", "Matemática", "Mecânica", "Medicina", "Memória e Imaginação",
  "Mente", "Mesmo e Outro", "Metafísica", "Monarquia", "Mudança", "Mundo", "Natureza", "Necessidade e Contingência", "Oligarquia", "Opinião",
  "Oposição", "Pecado", "Poesia", "Prazer e Dor", "Princípio", "Profecia", "Progresso", "Prudência", "Punição", "Qualidade",
  "Quantidade", "Raciocínio", "Relação", "Religião", "Retórica", "Revolução", "Riqueza", "Sabedoria", "Sentido", "Ser",
  "Signo e Símbolo", "Temperança", "Tempo", "Teologia", "Tirania e Despotismo", "Trabalho", "Um e Muitos", "Universal e Particular", "Verdade", "Vida e Morte",
  "Virtude e Vício", "Vontade",
] as const;

export const ideas: readonly Idea[] = canonicalIdeaNames.map((name) => ({
  id: canonicalIdeaId(name),
  slug: canonicalizeIdeaSlug(name),
  name,
  provenance: {
    sourceId: "source:syntopicon-canonical-ideas-list",
    layer: "derived-structure",
  },
}));
