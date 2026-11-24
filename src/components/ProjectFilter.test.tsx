import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectFilter, type FilterItem } from "./ProjectFilter";

const items: FilterItem[] = [
  { key: "a", category: "institucional", card: <p>Card institucional</p> },
  { key: "b", category: "ecommerce", card: <p>Card e-commerce</p> },
];

function renderFilter() {
  render(<ProjectFilter categories={["institucional", "ecommerce"]} items={items} />);
}

// O card fica dentro de um wrapper que recebe "hidden" quando não combina com a aba.
function isHidden(text: string): boolean {
  return screen.getByText(text).parentElement?.classList.contains("hidden") ?? false;
}

function isPressed(name: string): boolean {
  return screen.getByRole("button", { name }).getAttribute("aria-pressed") === "true";
}

describe("ProjectFilter", () => {
  it("começa na aba Todos, com todos os cards visíveis", () => {
    renderFilter();

    expect(isPressed("Todos")).toBe(true);
    expect(isHidden("Card institucional")).toBe(false);
    expect(isHidden("Card e-commerce")).toBe(false);
  });

  it("esconde os cards de outras categorias sem removê-los do DOM", () => {
    renderFilter();

    fireEvent.click(screen.getByRole("button", { name: "E-commerce" }));

    expect(isPressed("E-commerce")).toBe(true);
    expect(isPressed("Todos")).toBe(false);
    expect(isHidden("Card e-commerce")).toBe(false);
    expect(isHidden("Card institucional")).toBe(true);
  });

  it("volta a mostrar tudo ao clicar em Todos", () => {
    renderFilter();

    fireEvent.click(screen.getByRole("button", { name: "Institucional" }));
    fireEvent.click(screen.getByRole("button", { name: "Todos" }));

    expect(isHidden("Card institucional")).toBe(false);
    expect(isHidden("Card e-commerce")).toBe(false);
  });

  it("anuncia a quantidade de projetos visíveis", () => {
    renderFilter();

    expect(screen.getByText("2 projetos")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Institucional" }));
    expect(screen.getByText("1 projeto")).toBeTruthy();
  });
});
