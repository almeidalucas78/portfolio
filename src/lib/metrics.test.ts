import { describe, expect, it } from "vitest";
import { getScoreRating } from "./metrics";

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
