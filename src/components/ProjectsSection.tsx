import { getAvailableCategories } from "@/lib/projects";
import type { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";
import { ProjectFilter } from "./ProjectFilter";
import { SectionHeader } from "./SectionHeader";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  // Os cards são renderizados aqui, no servidor, e entregues prontos ao filtro (cliente).
  const items = projects.map((project) => ({
    key: project.slug,
    category: project.category,
    card: <ProjectCard project={project} />,
  }));

  return (
    <section id="projetos" className="relative px-5 py-15 md:px-20 md:py-30">
      <SectionHeader kicker="01 · projetos" title="Projetos selecionados" />
      <ProjectFilter categories={getAvailableCategories(projects)} items={items} />
    </section>
  );
}
