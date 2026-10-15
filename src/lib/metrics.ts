export type Rating = "good" | "warn" | "bad";

/**
 * Classifica uma nota do PageSpeed (0 a 100) com as faixas do próprio Lighthouse:
 * 90 ou mais é bom, de 50 a 89 precisa melhorar e abaixo de 50 é ruim.
 */
export function getScoreRating(score: number): Rating {
  if (score >= 90) return "good";
  if (score >= 50) return "warn";
  return "bad";
}
