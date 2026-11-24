import type { Experience, YearMonth } from "@/types/experience";

const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

/** "2024-03" vira "mar 2024". Valores fora do formato voltam como vieram. */
export function formatYearMonth(value: YearMonth): string {
  const [year, month] = value.split("-").map(Number);
  const monthName = MONTHS[month - 1];
  return monthName ? `${monthName} ${year}` : value;
}

/** Mais recentes primeiro. Datas AAAA-MM ordenam corretamente como texto. */
export function sortByMostRecent(experiences: readonly Experience[]): Experience[] {
  return [...experiences].sort((a, b) => b.start.localeCompare(a.start));
}
