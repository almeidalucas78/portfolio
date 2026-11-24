import { formatYearMonth } from "@/lib/experience";
import type { Experience } from "@/types/experience";
import { SectionHeader } from "./SectionHeader";

export function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experiencia" className="relative px-5 py-15 md:px-20 md:py-30">
      <SectionHeader kicker="03 · histórico" title="Experiência profissional" />

      <div className="relative pl-7 md:pl-10">
        {/* Linha vertical da linha do tempo. */}
        <div
          aria-hidden="true"
          className="absolute top-1.5 bottom-1.5 left-1.5 w-px bg-accent shadow-timeline md:left-2.5"
        />

        <ol className="space-y-11">
          {experiences.map((experience) => (
            <li key={`${experience.company}-${experience.start}`} className="relative">
              <span
                aria-hidden="true"
                className="absolute top-1 -left-7 size-3.5 rounded-full border-2 border-accent bg-background shadow-timeline-dot md:-left-9"
              >
                <span className="absolute inset-0.5 rounded-full bg-accent shadow-glow-line" />
              </span>

              {/* <time> marca as datas de forma legível para máquinas (buscadores). */}
              <p className="text-xs tracking-[0.12em] text-accent-2 uppercase text-shadow-glow-cyan">
                <time dateTime={experience.start}>{formatYearMonth(experience.start)}</time>
                {" — "}
                {experience.end ? (
                  <time dateTime={experience.end}>{formatYearMonth(experience.end)}</time>
                ) : (
                  "atual"
                )}
              </p>
              <h3 className="mt-2 mb-1.5 font-display text-xl font-bold tracking-[-0.01em] text-title text-shadow-glow-accent md:text-[26px]">
                {experience.role}{" "}
                <span className="font-normal text-muted text-shadow-none">
                  @ {experience.company}
                </span>
              </h3>
              <p className="max-w-180 text-[13px] leading-[1.65] md:text-sm">
                {experience.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
