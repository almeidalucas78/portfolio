import type { ProjectCategory } from "@/types/project";

/** Aba selecionada no filtro: uma categoria ou todas. */
export type CategoryFilter = ProjectCategory | "all";

// Record<ProjectCategory, ...> obriga a ter rótulo para cada categoria do tipo.
// A ordem das chaves é a ordem das abas.
export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  institucional: "Institucional",
  ecommerce: "E-commerce",
  conteudo: "Conteúdo",
  headless: "Headless",
};

export const CATEGORY_ORDER = Object.keys(CATEGORY_LABELS) as ProjectCategory[];
