import { Hero } from "@/components/Hero";
import { getFeaturedProjects, getProfile } from "@/lib/content";

export default async function Home() {
  // Em paralelo: na etapa 2 cada chamada vai à API do WordPress.
  const [profile, featuredProjects] = await Promise.all([getProfile(), getFeaturedProjects()]);

  return (
    <main>
      <Hero profile={profile} featuredProjects={featuredProjects} />
    </main>
  );
}
