import type { CoreWebVitals } from "@/types/project";

export type Rating = "good" | "warn" | "bad";

export const RATING_LABELS: Record<Rating, string> = {
  good: "Bom",
  warn: "Precisa melhorar",
  bad: "Ruim",
};

/**
 * Classifica uma nota do PageSpeed (0 a 100) com as faixas do próprio Lighthouse:
 * 90 ou mais é bom, de 50 a 89 precisa melhorar e abaixo de 50 é ruim.
 */
export function getScoreRating(score: number): Rating {
  if (score >= 90) return "good";
  if (score >= 50) return "warn";
  return "bad";
}

export type VitalKey = keyof CoreWebVitals;

type VitalInfo = {
  label: string;
  name: string;
  /** Até este valor (inclusive) é bom. */
  good: number;
  /** Até este valor (inclusive) precisa melhorar; acima é ruim. */
  needsImprovement: number;
};

// Limites oficiais do Google para as Core Web Vitals. A ordem das chaves é a de exibição.
export const VITALS: Record<VitalKey, VitalInfo> = {
  lcp: { label: "LCP", name: "Largest Contentful Paint", good: 2.5, needsImprovement: 4 },
  inp: { label: "INP", name: "Interaction to Next Paint", good: 200, needsImprovement: 500 },
  cls: { label: "CLS", name: "Cumulative Layout Shift", good: 0.1, needsImprovement: 0.25 },
};

/** Nas Core Web Vitals, quanto menor melhor. */
export function getVitalRating(key: VitalKey, value: number): Rating {
  const { good, needsImprovement } = VITALS[key];
  if (value <= good) return "good";
  if (value <= needsImprovement) return "warn";
  return "bad";
}

/**
 * Posição do marcador na barra de três faixas (bom, precisa melhorar, ruim), de 0 a 1.
 * Cada faixa ocupa um terço; dentro dela a posição é proporcional ao valor.
 */
export function getVitalPosition(key: VitalKey, value: number): number {
  const { good, needsImprovement } = VITALS[key];
  let position: number;
  if (value <= good) {
    position = value / good / 3;
  } else if (value <= needsImprovement) {
    position = 1 / 3 + (value - good) / (needsImprovement - good) / 3;
  } else {
    position = 2 / 3 + Math.min((value - needsImprovement) / needsImprovement, 1) / 3;
  }
  return Math.min(Math.max(position, 0), 1);
}

const formatters: Record<VitalKey, (value: number) => string> = {
  lcp: (value) =>
    `${value.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} s`,
  inp: (value) => `${Math.round(value)} ms`,
  cls: (value) =>
    value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
};

/** Formata no padrão brasileiro: "1,6 s", "110 ms", "0,02". */
export function formatVital(key: VitalKey, value: number): string {
  return formatters[key](value);
}

/** Métricas com valor, na ordem de exibição. O INP some quando não há dados de campo. */
export function getAvailableVitals(vitals: CoreWebVitals): { key: VitalKey; value: number }[] {
  return (Object.keys(VITALS) as VitalKey[]).flatMap((key) => {
    const value = vitals[key];
    return value === undefined ? [] : [{ key, value }];
  });
}
