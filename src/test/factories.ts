import type { Project } from "@/types/project";

/** Projeto válido com valores padrão; cada teste sobrescreve só o que importa. */
export function makeProject(overrides: Partial<Project> = {}): Project {
  return {
    slug: "projeto",
    title: "Projeto",
    summary: "Resumo.",
    year: 2025,
    type: "Site institucional",
    role: "Desenvolvimento",
    challenge: "Desafio.",
    solution: "Solução.",
    result: "Resultado.",
    pageSpeed: { performance: 95, accessibility: 95, bestPractices: 100, seo: 100 },
    coreWebVitals: { lcp: 1.5, cls: 0.02 },
    category: "institucional",
    technologies: ["WordPress"],
    featured: false,
    order: 1,
    ...overrides,
  };
}
