import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PerformanceBadge } from "./PerformanceBadge";

describe("PerformanceBadge", () => {
  it("mostra a nota e um texto acessível para leitores de tela", () => {
    render(<PerformanceBadge score={96} />);

    expect(screen.getByText("96")).toBeTruthy();
    expect(screen.getByText("Performance no PageSpeed mobile: 96 de 100")).toBeTruthy();
  });

  it.each([
    [96, "text-good"],
    [70, "text-warn"],
    [30, "text-bad"],
  ])("nota %i usa a cor %s", (score, colorClass) => {
    const { container } = render(<PerformanceBadge score={score} />);

    expect(container.firstElementChild?.classList.contains(colorClass)).toBe(true);
  });
});
