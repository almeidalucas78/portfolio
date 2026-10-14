/** Mês no formato AAAA-MM, como "2024-03". Ordena corretamente como texto. */
export type YearMonth = `${number}-${number}`;

export type Experience = {
  role: string;
  company: string;
  start: YearMonth;
  /** null significa o emprego atual. */
  end: YearMonth | null;
  description: string;
};
