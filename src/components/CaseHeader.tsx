import Link from "next/link";
import type { Project } from "@/types/project";
import { ButtonLink } from "./ButtonLink";
import { ProjectScreenshot } from "./ProjectScreenshot";
import { Tag } from "./Tag";

type CaseHeaderProps = {
  project: Project;
  /** Posição do projeto na lista, começando em 1. */
  position: number;
  total: number;
};

const pad = (value: number) => String(value).padStart(2, "0");

export function CaseHeader({ project, position, total }: CaseHeaderProps) {
  const details = [
    { label: "tipo", value: project.type },
    { label: "ano", value: String(project.year) },
    { label: "papel", value: project.role },
  ];

  return (
    <header>
      <Link
        href="/#projetos"
        className="mb-7 inline-block text-xs tracking-widest text-accent-2 text-shadow-glow-cyan hover:underline md:mb-10"
      >
        ← todos os projetos
      </Link>

      <div className="grid items-end gap-7 md:grid-cols-[1fr_auto]">
        <div>
          <p className="mb-3 text-xs tracking-eyebrow text-accent-2 uppercase text-shadow-glow-cyan">
            <span aria-hidden="true" className="opacity-60">
              {"<"}
            </span>{" "}
            case · {pad(position)}/{pad(total)}{" "}
            <span aria-hidden="true" className="opacity-60">
              {"/>"}
            </span>
          </p>
          <h1 className="font-display text-display-case font-bold text-title text-shadow-glow-title">
            {project.title}
          </h1>
        </div>

        {project.url && (
          <div className="flex flex-col items-start gap-2.5 md:items-end">
            <ButtonLink href={project.url} external>
              Ver site no ar ↗
            </ButtonLink>
            <span className="text-xs text-muted">{new URL(project.url).hostname}</span>
          </div>
        )}
      </div>

      <dl className="mt-8 grid md:mt-12 md:grid-cols-3 md:gap-6">
        {details.map((detail) => (
          <div
            key={detail.label}
            className="flex justify-between gap-3 border-t border-accent/33 py-3.5 md:block"
          >
            <dt className="text-3xs tracking-label text-muted uppercase">{detail.label}</dt>
            <dd className="text-right text-sm text-title md:mt-2 md:text-left">{detail.value}</dd>
          </div>
        ))}
      </dl>

      <ul aria-label="Tecnologias" className="mt-5 flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <li key={technology}>
            <Tag size="lg">{technology}</Tag>
          </li>
        ))}
      </ul>

      <div className="relative mt-8 h-55 overflow-hidden rounded-sm border border-accent/40 bg-surface shadow-card md:mt-12 md:h-135">
        <ProjectScreenshot
          project={project}
          sizes="(min-width: 768px) calc(100vw - 160px), 100vw"
        />
      </div>
    </header>
  );
}
