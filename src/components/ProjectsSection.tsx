import type { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";
import { SectionHeader } from "./SectionHeader";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projetos" className="relative px-5 py-15 md:px-20 md:py-30">
      <SectionHeader kicker="01 · projetos" title="Projetos selecionados" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
