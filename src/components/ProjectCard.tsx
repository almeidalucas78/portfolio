import Link from "next/link";
import type { Project } from "@/types/project";
import { PerformanceBadge } from "./PerformanceBadge";
import { ProjectScreenshot } from "./ProjectScreenshot";
import { Tag } from "./Tag";

// O card inteiro é clicável sem aninhar links: o <Link> do título estende uma camada
// invisível (after:inset-0) sobre o card, e o link "↗ site" fica acima dela (z-10).
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="relative flex flex-col overflow-hidden rounded-sm border border-border bg-surface shadow-card transition-all duration-250 hover:-translate-y-0.75 hover:shadow-card-hover has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent-2">
      <div className="relative aspect-16/10 border-b border-border">
        <ProjectScreenshot
          project={project}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        <div className="absolute top-3.5 right-3.5">
          <PerformanceBadge score={project.pageSpeed.performance} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5.5">
        <p className="text-3xs tracking-[0.18em] text-accent-2 uppercase text-shadow-glow-cyan">
          ./{project.category} · {project.year}
        </p>
        <h3 className="font-display text-[22px] font-bold tracking-[-0.02em] text-title text-shadow-glow-accent">
          <Link
            href={`/projetos/${project.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>
        <p className="text-[13px] leading-relaxed">{project.summary}</p>
        <ul aria-label="Tecnologias" className="flex flex-wrap gap-1.5">
          {project.technologies.map((technology) => (
            <li key={technology}>
              <Tag>{technology}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex gap-4.5 border-t border-border pt-3.5 text-xs">
          <span aria-hidden="true" className="text-accent text-shadow-glow-accent">
            ver case →
          </span>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 ml-auto text-accent-2 text-shadow-glow-cyan hover:underline"
            >
              ↗ site
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
