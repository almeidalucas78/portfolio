import { describe, expect, it } from "vitest";
import { makeProject } from "@/test/factories";
import { getAvailableCategories, matchesCategory, selectFeatured, sortByOrder } from "./projects";

describe("sortByOrder", () => {
  it("ordena pelo campo order sem alterar a lista original", () => {
    const projects = [makeProject({ slug: "b", order: 2 }), makeProject({ slug: "a", order: 1 })];

    expect(sortByOrder(projects).map((p) => p.slug)).toEqual(["a", "b"]);
    expect(projects.map((p) => p.slug)).toEqual(["b", "a"]);
  });
});

describe("selectFeatured", () => {
  it("devolve só os destaques, na ordem de exibição", () => {
    const projects = [
      makeProject({ slug: "c", order: 3, featured: true }),
      makeProject({ slug: "b", order: 2, featured: false }),
      makeProject({ slug: "a", order: 1, featured: true }),
    ];

    expect(selectFeatured(projects).map((p) => p.slug)).toEqual(["a", "c"]);
  });
});

describe("matchesCategory", () => {
  const project = makeProject({ category: "ecommerce" });

  it("mostra qualquer projeto na aba Todos", () => {
    expect(matchesCategory(project, "all")).toBe(true);
  });

  it("mostra o projeto só na aba da própria categoria", () => {
    expect(matchesCategory(project, "ecommerce")).toBe(true);
    expect(matchesCategory(project, "institucional")).toBe(false);
  });
});

describe("getAvailableCategories", () => {
  it("lista só categorias com projetos, na ordem das abas e sem repetir", () => {
    const projects = [
      makeProject({ category: "headless" }),
      makeProject({ category: "institucional" }),
      makeProject({ category: "institucional" }),
    ];

    expect(getAvailableCategories(projects)).toEqual(["institucional", "headless"]);
  });

  it("devolve lista vazia quando não há projetos", () => {
    expect(getAvailableCategories([])).toEqual([]);
  });
});
