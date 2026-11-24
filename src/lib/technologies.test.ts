import { describe, expect, it } from "vitest";
import { groupTechnologies } from "./technologies";

describe("groupTechnologies", () => {
  it("agrupa na ordem de exibição dos grupos, mantendo a ordem dos itens", () => {
    const groups = groupTechnologies([
      { name: "Docker", group: "Infraestrutura" },
      { name: "WordPress", group: "Desenvolvimento" },
      { name: "PHP", group: "Desenvolvimento" },
    ]);

    expect(groups).toEqual([
      { group: "Desenvolvimento", items: ["WordPress", "PHP"] },
      { group: "Infraestrutura", items: ["Docker"] },
    ]);
  });

  it("omite grupos sem tecnologias", () => {
    const groups = groupTechnologies([{ name: "React", group: "Conhecimentos adicionais" }]);

    expect(groups.map((entry) => entry.group)).toEqual(["Conhecimentos adicionais"]);
  });
});
