import { describe, expect, it } from "vitest";
import type { Experience } from "@/types/experience";
import { formatYearMonth, sortByMostRecent } from "./experience";

describe("formatYearMonth", () => {
  it("formata AAAA-MM como mês abreviado e ano", () => {
    expect(formatYearMonth("2024-03")).toBe("mar 2024");
    expect(formatYearMonth("2020-01")).toBe("jan 2020");
    expect(formatYearMonth("2020-12")).toBe("dez 2020");
  });

  it("devolve o valor original quando o mês é inválido", () => {
    expect(formatYearMonth("2024-13")).toBe("2024-13");
  });
});

describe("sortByMostRecent", () => {
  const experience = (company: string, start: Experience["start"]): Experience => ({
    role: "Dev",
    company,
    start,
    end: null,
    description: "",
  });

  it("ordena da mais recente para a mais antiga, sem alterar a original", () => {
    const list = [
      experience("A", "2020-02"),
      experience("B", "2024-03"),
      experience("C", "2021-05"),
    ];

    expect(sortByMostRecent(list).map((e) => e.company)).toEqual(["B", "C", "A"]);
    expect(list.map((e) => e.company)).toEqual(["A", "B", "C"]);
  });
});
