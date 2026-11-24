import { notFound } from "next/navigation";
import { CaseHeader } from "@/components/CaseHeader";
import { CaseNavigation } from "@/components/CaseNavigation";
import { CasePerformance } from "@/components/CasePerformance";
import { CaseStory } from "@/components/CaseStory";
import { getProjects } from "@/lib/content";
import { getAdjacentProjects } from "@/lib/projects";

// Só os slugs de generateStaticParams existem. Qualquer outro recebe a 404 estática,
// com o conteúdo completo no HTML. Com o padrão (true), o Next renderizaria o slug
// desconhecido na hora e entregaria a 404 com o <body> vazio até o JavaScript rodar.
// Rever na etapa 2: projetos novos no WordPress precisarão de um novo build.
export const dynamicParams = false;

// Diz ao Next quais slugs existem: cada um vira uma página estática no build.
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: PageProps<"/projetos/[slug]">) {
  const { slug } = await params;
  const projects = await getProjects();
  const index = projects.findIndex((project) => project.slug === slug);

  // Slug desconhecido: responde 404 de verdade, na própria URL, com o not-found.tsx.
  if (index === -1) notFound();

  const project = projects[index];
  const adjacent = getAdjacentProjects(projects, index);

  return (
    <main className="relative px-5 pt-14 pb-15 md:px-20 md:pb-25">
      <CaseHeader project={project} position={index + 1} total={projects.length} />
      <CaseStory project={project} />
      <CasePerformance project={project} />
      {adjacent && <CaseNavigation previous={adjacent.previous} next={adjacent.next} />}
    </main>
  );
}
