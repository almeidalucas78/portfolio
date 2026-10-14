import type { Image } from "./image";

// Identificadores das categorias do filtro. Os rótulos de exibição ficam junto do filtro.
export type ProjectCategory = "institucional" | "ecommerce" | "conteudo" | "headless";

// Notas do PageSpeed Insights no mobile, de 0 a 100.
export type PageSpeedScores = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

export type CoreWebVitals = {
  /** Largest Contentful Paint, em segundos. */
  lcp: number;
  /** Cumulative Layout Shift, sem unidade. */
  cls: number;
  /**
   * Interaction to Next Paint, em milissegundos. Opcional: só existe nos dados de campo
   * (CrUX), que sites com pouco tráfego não têm. A interface omite a métrica quando ausente.
   */
  inp?: number;
};

export type Project = {
  slug: string;
  title: string;
  /** Resumo de uma linha, usado nos cards. */
  summary: string;
  year: number;
  /** Tipo de projeto, como "Site institucional" ou "Loja virtual". */
  type: string;
  role: string;
  /** Endereço do site no ar. Opcional: alguns clientes podem não permitir a divulgação. */
  url?: string;
  /** Sem screenshot, a interface usa o placeholder listrado do design. */
  screenshot?: Image;
  challenge: string;
  solution: string;
  result: string;
  pageSpeed: PageSpeedScores;
  /** Nota de performance antes da otimização. */
  performanceBefore?: number;
  coreWebVitals: CoreWebVitals;
  category: ProjectCategory;
  technologies: string[];
  /** Aparece no hero da home. */
  featured: boolean;
  /** Ordem de exibição, crescente. */
  order: number;
};
