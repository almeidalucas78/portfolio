import type { Rating } from "./metrics";

// Cor de texto de cada classificação. Os componentes usam currentColor a partir dela
// para bordas, brilhos e SVG, então uma única classe pinta tudo.
export const RATING_TEXT_CLASS: Record<Rating, string> = {
  good: "text-good",
  warn: "text-warn",
  bad: "text-bad",
};
