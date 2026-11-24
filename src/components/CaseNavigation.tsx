import Link from "next/link";
import type { Project } from "@/types/project";
import { ScoreGauge } from "./ScoreGauge";

type CaseNavigationProps = {
  previous: Project;
  next: Project;
};

export function CaseNavigation({ previous, next }: CaseNavigationProps) {
  const links = [
    { project: previous, label: "← anterior", alignEnd: false },
    { project: next, label: "próximo →", alignEnd: true },
  ];

  return (
    <nav aria-label="Outros projetos" className="mt-12 grid gap-3.5 md:mt-20 md:grid-cols-2">
      {links.map(({ project, label, alignEnd }) => (
        <Link
          key={label}
          href={`/projetos/${project.slug}`}
          className={`flex items-center justify-between gap-4 rounded-sm border border-border bg-surface p-5.5 shadow-card transition-all duration-250 hover:-translate-y-0.75 hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-2 ${alignEnd ? "md:flex-row-reverse md:text-right" : ""}`}
        >
          <span>
            <span className="block text-3xs tracking-label text-accent-2 uppercase">{label}</span>
            <span className="mt-1.5 block font-display text-[22px] font-bold text-title text-shadow-glow-accent">
              {project.title}
            </span>
          </span>
          {/* A nota é decorativa aqui: o nome do link fica só "anterior Projeto X". */}
          <span aria-hidden="true">
            <ScoreGauge score={project.pageSpeed.performance} className="size-11 text-[15px]" />
          </span>
        </Link>
      ))}
    </nav>
  );
}
