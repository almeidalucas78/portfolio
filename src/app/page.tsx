import { ExperienceSection } from "@/components/ExperienceSection";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { StacksSection } from "@/components/StacksSection";
import {
  getExperiences,
  getFeaturedProjects,
  getProfile,
  getProjects,
  getTechnologies,
} from "@/lib/content";

export default async function Home() {
  // Em paralelo: na etapa 2 cada chamada vai à API do WordPress.
  const [profile, featuredProjects, projects, technologies, experiences] = await Promise.all([
    getProfile(),
    getFeaturedProjects(),
    getProjects(),
    getTechnologies(),
    getExperiences(),
  ]);

  return (
    <main>
      <Hero profile={profile} featuredProjects={featuredProjects} />
      <ProjectsSection projects={projects} />
      <StacksSection technologies={technologies} />
      <ExperienceSection experiences={experiences} />
    </main>
  );
}
