import type { Technology, TechnologyGroup } from "@/types/technology";

export type TechnologyGroupWithItems = {
  group: TechnologyGroup;
  items: string[];
};

// Record obriga a listar todos os grupos do tipo; a ordem das chaves é a de exibição.
const GROUP_ORDER: Record<TechnologyGroup, true> = {
  Desenvolvimento: true,
  Infraestrutura: true,
  "SEO e Performance": true,
  "Conhecimentos adicionais": true,
};

/** Agrupa a lista simples por grupo, na ordem de exibição, omitindo grupos vazios. */
export function groupTechnologies(technologies: readonly Technology[]): TechnologyGroupWithItems[] {
  return (Object.keys(GROUP_ORDER) as TechnologyGroup[])
    .map((group) => ({
      group,
      items: technologies
        .filter((technology) => technology.group === group)
        .map((technology) => technology.name),
    }))
    .filter((entry) => entry.items.length > 0);
}
