import Image from "next/image";
import type { Profile } from "@/types/profile";
import { SectionHeader } from "./SectionHeader";
import { Tag } from "./Tag";

// Cantoneiras ciano em volta da foto, como no design.
const cornerClass = "absolute size-4.5 border-accent-2 shadow-glow-dot";

export function AboutSection({ profile }: { profile: Profile }) {
  return (
    <section id="sobre" className="relative px-5 py-15 md:px-20 md:py-30">
      <SectionHeader kicker="04 · sobre" title="Sobre" />

      <div className="grid items-start gap-8 md:grid-cols-[280px_1fr] md:gap-16">
        <div className="relative mx-auto size-50 rounded-sm border-[1.5px] border-accent shadow-card md:mx-0 md:size-65">
          {profile.photo ? (
            <Image
              src={profile.photo.src}
              alt={profile.photo.alt}
              fill
              sizes="(min-width: 768px) 260px, 200px"
              className="rounded-sm object-cover"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center p-3 text-center text-2xs tracking-[0.15em] text-muted uppercase bg-stripes">
              foto de perfil
            </div>
          )}
          <span
            aria-hidden="true"
            className={`${cornerClass} -top-2 -left-2 border-t-2 border-l-2`}
          />
          <span
            aria-hidden="true"
            className={`${cornerClass} -top-2 -right-2 border-t-2 border-r-2`}
          />
          <span
            aria-hidden="true"
            className={`${cornerClass} -bottom-2 -left-2 border-b-2 border-l-2`}
          />
          <span
            aria-hidden="true"
            className={`${cornerClass} -right-2 -bottom-2 border-r-2 border-b-2`}
          />
        </div>

        <div>
          <div className="max-w-190 space-y-4 text-sm leading-[1.75] text-pretty md:text-[17px]">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10">
            <h3 className="mb-1.5 text-2xs tracking-[0.18em] text-accent-2 uppercase text-shadow-glow-cyan">
              <span aria-hidden="true">{">"} </span>formação
            </h3>
            <ul>
              {profile.education.map((education) => (
                <li
                  key={education.course}
                  className="flex flex-col items-start gap-2 border-b border-border py-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="font-display text-base font-semibold text-title md:text-lg">
                      {education.course}
                    </p>
                    <p className="mt-1 text-xs text-muted">{education.institution}</p>
                  </div>
                  {education.status && <Tag>{education.status}</Tag>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
