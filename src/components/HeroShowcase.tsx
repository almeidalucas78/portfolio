"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/types/project";
import { HeroTerminal } from "./HeroTerminal";
import { PerformanceBadge } from "./PerformanceBadge";
import { ProjectScreenshot } from "./ProjectScreenshot";
import { Tag } from "./Tag";

// Posição e inclinação de cada card: agrupados no centro em telas menores e
// espalhados à direita do texto a partir de xl. A ordem de empilhamento é a da lista.
const cardLayout = [
  "z-1 left-[calc(50%-40px)] top-0 rotate-9 xl:left-67.5 xl:top-0 xl:rotate-8",
  "z-2 left-[calc(50%-170px)] top-5 -rotate-8 xl:left-7.5 xl:top-10 xl:-rotate-7",
  "z-3 left-[calc(50%-95px)] top-15 rotate-1 xl:left-75 xl:top-53.75 xl:rotate-3",
];

// Client Component: o terminal mostra as notas do card em foco, e isso é estado.
// No servidor ele já renderiza com o segundo card ativo, então tudo está no HTML.
export function HeroShowcase({ projects }: { projects: Project[] }) {
  const cards = projects.slice(0, cardLayout.length);
  const [activeSlug, setActiveSlug] = useState(cards[1]?.slug ?? cards[0]?.slug);
  const active = cards.find((project) => project.slug === activeSlug);

  if (!active) return null;

  return (
    <div className="relative mt-14 xl:mt-0 xl:h-140">
      <div className="relative h-62.5 xl:static xl:h-auto">
        {cards.map((project, index) => {
          const isActive = project.slug === active.slug;
          return (
            <Link
              key={project.slug}
              href={`/projetos/${project.slug}`}
              onMouseEnter={() => setActiveSlug(project.slug)}
              onFocus={() => setActiveSlug(project.slug)}
              className={`absolute w-50 overflow-hidden rounded-sm border bg-surface transition-[rotate,translate,scale,box-shadow,border-color] duration-350 ease-[cubic-bezier(.2,.8,.2,1)] hover:rotate-0 focus-visible:rotate-0 motion-safe:hover:-translate-y-2.5 motion-safe:hover:scale-104 motion-safe:focus-visible:-translate-y-2.5 motion-safe:focus-visible:scale-104 xl:w-67.5 ${cardLayout[index]} ${isActive ? "z-5! border-accent shadow-card-hover" : "border-border shadow-card"}`}
            >
              <div className="relative aspect-16/10 border-b border-border">
                <ProjectScreenshot project={project} sizes="(min-width: 1280px) 270px, 200px" />
                <div className="absolute top-2 right-2">
                  <PerformanceBadge score={project.pageSpeed.performance} />
                </div>
              </div>
              <div className="px-3 py-2.5 xl:px-4 xl:py-3.5">
                <p className="text-[9px] tracking-label text-accent-2 uppercase">
                  ./{project.category}
                </p>
                <p className="mt-1 font-display text-[15px] font-bold tracking-[-0.01em] text-title text-shadow-glow-accent xl:text-lg">
                  {project.title}
                </p>
                <div className="mt-2.5 hidden flex-wrap gap-1.25 xl:flex">
                  {project.technologies.slice(0, 3).map((technology) => (
                    <Tag key={technology}>{technology}</Tag>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="relative z-6 -mt-8.5 xl:absolute xl:bottom-0 xl:left-0 xl:mt-0 xl:w-87.5">
        <HeroTerminal project={active} />
      </div>

      <p
        aria-hidden="true"
        className="absolute right-2.5 bottom-2 hidden text-3xs tracking-label text-muted uppercase xl:block"
      >
        passe o mouse nos cards ↑
      </p>
    </div>
  );
}
