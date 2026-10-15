import { getScoreRating, type Rating } from "@/lib/metrics";
import type { Project } from "@/types/project";

const ratingClass: Record<Rating, string> = {
  good: "text-good",
  warn: "text-warn",
  bad: "text-bad",
};

// Rótulo completo (desktop) e abreviado (telas menores, onde o terminal tem duas colunas).
const rows = [
  { key: "performance", label: "performance", short: "performance" },
  { key: "accessibility", label: "accessibility", short: "a11y" },
  { key: "bestPractices", label: "best-practices", short: "best-pract." },
  { key: "seo", label: "seo", short: "seo" },
] as const;

export function HeroTerminal({ project }: { project: Project }) {
  return (
    <div className="rounded-md border border-accent/53 bg-surface p-4 text-2xs leading-[1.9] shadow-terminal xl:p-5.5 xl:text-xs">
      <div
        aria-hidden="true"
        className="mb-2.5 flex items-center gap-1.5 border-b border-border pb-2 xl:mb-3.5 xl:pb-3"
      >
        <span className="size-2.5 rounded-full bg-accent shadow-glow-line" />
        <span className="size-2.5 rounded-full bg-accent-2 shadow-glow-dot" />
        <span className="size-2.5 rounded-full bg-muted" />
        <span className="ml-auto text-2xs text-muted">~/lucas — zsh</span>
      </div>

      {/* key: ao trocar de projeto o bloco é recriado e a animação de entrada roda de novo. */}
      <div key={project.slug} className="motion-safe:animate-term-flash">
        <div className="truncate text-muted">
          <span className="text-accent-2">$</span> lighthouse{" "}
          <span className="text-title">{project.url ?? project.slug}</span>
        </div>
        <div className="mb-1.5 text-muted">{"  "}--preset=mobile</div>

        <dl className="grid grid-cols-2 gap-x-4 xl:grid-cols-1">
          {rows.map((row) => {
            const score = project.pageSpeed[row.key];
            return (
              <div key={row.key} className="flex gap-2">
                <dt>
                  <span className="xl:hidden">{row.short}</span>
                  <span className="hidden xl:inline">{row.label}</span>
                </dt>
                <span
                  aria-hidden="true"
                  className="flex-1 -translate-y-1.5 border-b border-dotted border-border"
                />
                <dd
                  className={`font-bold text-shadow-[0_0_8px_color-mix(in_srgb,currentColor_53%,transparent)] ${ratingClass[getScoreRating(score)]}`}
                >
                  {score}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>

      <div aria-hidden="true" className="mt-1.5 text-muted">
        <span className="text-accent-2">$</span>{" "}
        <span className="text-accent text-shadow-glow-accent">wp deploy_</span>
        <span className="ml-0.5 inline-block h-3.5 w-2 bg-accent align-middle shadow-[0_0_8px_var(--color-accent)] motion-safe:animate-blink" />
      </div>
    </div>
  );
}
