"use client";

import { useState, type ReactNode } from "react";
import { CATEGORY_LABELS, type CategoryFilter } from "@/lib/categories";
import { matchesCategory } from "@/lib/projects";
import type { ProjectCategory } from "@/types/project";

export type FilterItem = {
  key: string;
  category: ProjectCategory;
  /** Card já renderizado no servidor. Este componente só decide se ele aparece. */
  card: ReactNode;
};

type ProjectFilterProps = {
  categories: ProjectCategory[];
  items: FilterItem[];
};

const tabClass =
  "cursor-pointer rounded-full border px-4 py-2 tracking-[0.06em] lowercase transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-2";
const activeTabClass =
  "border-accent bg-accent text-background shadow-[0_0_14px_color-mix(in_srgb,var(--color-accent)_53%,transparent)]";
const inactiveTabClass = "border-border bg-transparent text-body hover:border-accent";

// Os cards nunca saem do DOM: os que não combinam com a aba só ficam com hidden.
// Assim todos os links continuam no HTML entregue pelo servidor.
export function ProjectFilter({ categories, items }: ProjectFilterProps) {
  const [selected, setSelected] = useState<CategoryFilter>("all");
  const visibleCount = items.filter((item) => matchesCategory(item, selected)).length;

  const tabs: { value: CategoryFilter; label: string }[] = [
    { value: "all", label: "Todos" },
    ...categories.map((category) => ({ value: category, label: CATEGORY_LABELS[category] })),
  ];

  return (
    <>
      <div
        role="group"
        aria-label="Filtrar por categoria"
        className="mb-9 flex flex-wrap gap-2 text-xs"
      >
        {tabs.map((tab) => {
          const isActive = tab.value === selected;
          return (
            <button
              key={tab.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => setSelected(tab.value)}
              className={`${tabClass} ${isActive ? activeTabClass : inactiveTabClass}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Anuncia a quantidade para leitores de tela quando a aba muda. */}
      <p aria-live="polite" className="sr-only">
        {visibleCount} {visibleCount === 1 ? "projeto" : "projetos"}
      </p>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.key} className={matchesCategory(item, selected) ? undefined : "hidden"}>
            {item.card}
          </div>
        ))}
      </div>
    </>
  );
}
