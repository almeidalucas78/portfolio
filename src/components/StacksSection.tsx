import { groupTechnologies } from "@/lib/technologies";
import type { Technology } from "@/types/technology";
import { SectionHeader } from "./SectionHeader";
import { Tag } from "./Tag";

export function StacksSection({ technologies }: { technologies: Technology[] }) {
  const groups = groupTechnologies(technologies);

  return (
    <section id="stacks" className="relative px-5 py-15 md:px-20 md:py-30">
      <SectionHeader kicker="02 · stack" title="Stacks e tecnologias" />
      <div className="grid gap-4.5 md:grid-cols-2">
        {groups.map(({ group, items }, index) => (
          <div
            key={group}
            className="rounded-sm border border-border bg-surface p-5 shadow-card transition-all duration-250 hover:shadow-card-hover md:p-7"
          >
            <div className="mb-5 flex items-baseline gap-3">
              <span
                aria-hidden="true"
                className="text-2xs tracking-label text-accent-2 text-shadow-glow-cyan"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl font-bold tracking-[-0.01em] text-title text-shadow-glow-accent">
                {group}
              </h3>
            </div>
            <ul className="flex flex-wrap gap-2">
              {items.map((item) => (
                <li key={item}>
                  <Tag size="lg">{item}</Tag>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
