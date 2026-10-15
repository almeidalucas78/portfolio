import type { Profile } from "@/types/profile";
import type { Project } from "@/types/project";
import { ButtonLink } from "./ButtonLink";
import { HeroShowcase } from "./HeroShowcase";

type HeroProps = {
  profile: Profile;
  featuredProjects: Project[];
};

export function Hero({ profile, featuredProjects }: HeroProps) {
  const [firstName, ...otherNames] = profile.name.split(" ");
  // Calculado no build, como o ano do rodapé.
  const year = new Date().getFullYear();

  return (
    // Texto e vitrine empilhados até xl; a partir de 1280px, duas colunas como no design.
    <section className="relative px-5 pt-14 pb-28 md:px-20 md:pt-20 xl:grid xl:min-h-179 xl:grid-cols-[minmax(0,1fr)_580px] xl:items-center xl:gap-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-30 -left-45 size-150 rounded-full bg-[radial-gradient(circle,var(--color-orb),transparent_65%)] opacity-40 blur-2xl"
      />

      <div className="relative max-w-205 xl:max-w-165">
        {profile.availability.isAvailable && (
          <p className="mb-6 text-xs tracking-widest text-accent-2 text-shadow-glow-cyan md:text-sm">
            <span
              aria-hidden="true"
              className="mr-2.5 inline-block size-2 rounded-full bg-accent-2 shadow-glow-dot"
            />
            disponível para projetos · {year}
          </p>
        )}

        <h1 className="font-display text-display-hero font-bold text-title text-shadow-glow-title">
          {firstName}
          <br />
          <span className="text-accent text-shadow-glow-name">{otherNames.join(" ")}.</span>
        </h1>

        <p className="mt-7 max-w-150 text-sm leading-relaxed tracking-[0.02em] md:text-lg">
          <span aria-hidden="true" className="text-accent-2">
            {">"}{" "}
          </span>
          {profile.title}{" "}
          <span aria-hidden="true" className="text-accent">
            |
          </span>{" "}
          <span className="text-title text-shadow-glow-accent">{profile.specialty}</span>
        </p>

        <p className="mt-5 mb-11 max-w-140 text-[15px] leading-relaxed md:text-[17px]">
          {profile.heroPhrase}
        </p>

        <div className="flex flex-wrap gap-3.5">
          <ButtonLink href="/#projetos">Ver projetos →</ButtonLink>
          <ButtonLink href="/#contato" variant="secondary">
            Entrar em contato
          </ButtonLink>
        </div>
      </div>

      <HeroShowcase projects={featuredProjects} />

      <div
        aria-hidden="true"
        className="absolute bottom-7.5 left-5 flex items-center gap-2.5 text-2xs tracking-eyebrow text-muted uppercase md:bottom-12.5 md:left-20"
      >
        scroll <span className="h-px w-8 bg-accent shadow-glow-line" /> ↓
      </div>
    </section>
  );
}
