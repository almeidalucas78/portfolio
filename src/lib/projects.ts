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
