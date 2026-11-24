import { getAvailableVitals } from "@/lib/metrics";
import type { Project } from "@/types/project";
import { ScoreGauge } from "./ScoreGauge";
import { VitalCard } from "./VitalCard";

export function CasePerformance({ project }: { project: Project }) {
  const { performance, accessibility, bestPractices, seo } = project.pageSpeed;
  const scores = [
    { label: "Performance", value: performance },
    { label: "Acessibilidade", value: accessibility },
    { label: "Boas Práticas", value: bestPractices },
    { label: "SEO", value: seo },
  ];
  // Sem INP (site sem dados de campo), a métrica some e a grade se ajusta.
  const vitals = getAvailableVitals(project.coreWebVitals);

  return (
    <section className="mt-12 rounded-sm border border-accent/40 bg-surface p-5 shadow-card md:mt-20 md:p-10">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4 md:mb-10">
        <div>
          <p className="text-2xs tracking-[0.18em] text-accent-2 uppercase text-shadow-glow-cyan">
            <span aria-hidden="true">{">"} </span>pagespeed insights
          </p>
          <h2 className="mt-2 font-display text-[28px] font-bold tracking-[-0.02em] text-title text-shadow-glow-title md:text-4xl">
            Performance
          </h2>
        </div>
        <span className="text-2xs tracking-[0.12em] text-muted uppercase">medição · mobile</span>
      </div>

      <ul className="grid grid-cols-2 gap-7 md:grid-cols-4 md:gap-6">
        {scores.map((score) => (
          <li key={score.label} className="flex flex-col items-center gap-3.5">
            <ScoreGauge
              score={score.value}
              stroke={5.5}
              className="size-22 text-[26px] md:size-28 md:text-[32px]"
            />
            <span className="text-center text-xs">{score.label}</span>
          </li>
        ))}
      </ul>

      <div aria-hidden="true" className="mt-8 mb-6 h-px bg-border md:mt-11 md:mb-7" />

      <p className="mb-4 text-3xs tracking-label text-accent-2 uppercase">core web vitals</p>
      <div className={`grid gap-3.5 ${vitals.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        {vitals.map(({ key, value }) => (
          <VitalCard key={key} vital={key} value={value} />
        ))}
      </div>
    </section>
  );
}
