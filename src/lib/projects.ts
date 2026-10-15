import type { Project } from "@/types/project";

/** Ordena pelo campo order, sem alterar a lista original. */
export function sortByOrder(projects: readonly Project[]): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

/** Projetos marcados para o hero, na ordem de exibição. */
export function selectFeatured(projects: readonly Project[]): Project[] {
  return sortByOrder(projects.filter((project) => project.featured));
}
