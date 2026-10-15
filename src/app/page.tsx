import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { getFeaturedProjects, getProfile, getProjects } from "@/lib/content";

export default async function Home() {
  // Em paralelo: na etapa 2 cada chamada vai à API do WordPress.
  const [profile, featuredProjects, projects] = await Promise.all([
    getProfile(),
    getFeaturedProjects(),
    getProjects(),
  ]);

  return (
    <main>
      <Hero profile={profile} featuredProjects={featuredProjects} />
      <ProjectsSection projects={projects} />
    </main>
  );
}
