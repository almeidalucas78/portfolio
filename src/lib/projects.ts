import type { Project, ProjectCategory } from "@/types/project";
import { CATEGORY_ORDER, type CategoryFilter } from "./categories";

/** Ordena pelo campo order, sem alterar a lista original. */
export function sortByOrder(projects: readonly Project[]): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

/** Projetos marcados para o hero, na ordem de exibição. */
export function selectFeatured(projects: readonly Project[]): Project[] {
  return sortByOrder(projects.filter((project) => project.featured));
}

/** Se o projeto aparece com a aba selecionada no filtro. */
export function matchesCategory(
  project: Pick<Project, "category">,
  selected: CategoryFilter,
): boolean {
  return selected === "all" || project.category === selected;
}

/** Categorias que têm ao menos um projeto, na ordem das abas. Evita aba vazia. */
export function getAvailableCategories(
  projects: readonly Pick<Project, "category">[],
): ProjectCategory[] {
  return CATEGORY_ORDER.filter((category) =>
    projects.some((project) => project.category === category),
  );
}

/**
 * Projetos vizinhos para a navegação do case, dando a volta na lista:
 * o anterior do primeiro é o último, e o próximo do último é o primeiro.
 * Sem vizinhos (menos de dois projetos ou índice inválido), devolve undefined.
 */
export function getAdjacentProjects(
  projects: readonly Project[],
  index: number,
): { previous: Project; next: Project } | undefined {
  const total = projects.length;
  if (total < 2 || index < 0 || index >= total) return undefined;
  return {
    previous: projects[(index - 1 + total) % total],
    next: projects[(index + 1) % total],
  };
}
