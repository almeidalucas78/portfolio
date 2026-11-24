import { describe, expect, it } from "vitest";
import {
  formatVital,
  getAvailableVitals,
  getScoreRating,
  getVitalPosition,
  getVitalRating,
} from "./metrics";

describe("getScoreRating", () => {
  it("classifica 90 ou mais como bom", () => {
    expect(getScoreRating(90)).toBe("good");
    expect(getScoreRating(100)).toBe("good");
  });

  it("classifica de 50 a 89 como precisa melhorar", () => {
    expect(getScoreRating(50)).toBe("warn");
    expect(getScoreRating(89)).toBe("warn");
  });

  it("classifica abaixo de 50 como ruim", () => {
    expect(getScoreRating(49)).toBe("bad");
    expect(getScoreRating(0)).toBe("bad");
  });
});

describe("getVitalRating", () => {
  // Os limites oficiais são inclusivos: exatamente 2,5 s de LCP ainda é bom.
  it.each([
    ["lcp", 2.5, "good"],
    ["lcp", 2.6, "warn"],
    ["lcp", 4, "warn"],
    ["lcp", 4.1, "bad"],
    ["inp", 200, "good"],
    ["inp", 201, "warn"],
    ["inp", 500, "warn"],
    ["inp", 501, "bad"],
    ["cls", 0.1, "good"],
    ["cls", 0.11, "warn"],
    ["cls", 0.25, "warn"],
    ["cls", 0.26, "bad"],
  ] as const)("%s de %s é %s", (key, value, rating) => {
    expect(getVitalRating(key, value)).toBe(rating);
  });
});

describe("getVitalPosition", () => {
  it("coloca o limite de cada faixa na divisa entre os terços", () => {
    expect(getVitalPosition("lcp", 0)).toBe(0);
    expect(getVitalPosition("lcp", 2.5)).toBeCloseTo(1 / 3);
    expect(getVitalPosition("lcp", 4)).toBeCloseTo(2 / 3);
  });

  it("nunca passa do fim da barra, mesmo com valores muito altos", () => {
    expect(getVitalPosition("cls", 5)).toBe(1);
  });
});

describe("formatVital", () => {
  it("usa vírgula decimal e a unidade de cada métrica", () => {
    expect(formatVital("lcp", 1.6)).toBe("1,6 s");
    expect(formatVital("lcp", 2)).toBe("2,0 s");
    expect(formatVital("inp", 110)).toBe("110 ms");
    expect(formatVital("cls", 0.02)).toBe("0,02");
    expect(formatVital("cls", 0)).toBe("0,00");
  });
});

describe("getAvailableVitals", () => {
  it("devolve as três métricas na ordem LCP, INP, CLS", () => {
    expect(getAvailableVitals({ cls: 0.05, lcp: 1.9, inp: 150 }).map((v) => v.key)).toEqual([
      "lcp",
      "inp",
      "cls",
    ]);
  });

  it("omite o INP quando não há dados de campo", () => {
    expect(getAvailableVitals({ lcp: 1.8, cls: 0.03 })).toEqual([
      { key: "lcp", value: 1.8 },
      { key: "cls", value: 0.03 },
    ]);
  });
});
