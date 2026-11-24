import type { Project } from "@/types/project";

export function CaseStory({ project }: { project: Project }) {
  const parts = [
    { title: "Desafio", text: project.challenge },
    { title: "Solução", text: project.solution },
    { title: "Resultado", text: project.result },
  ];

  return (
    <div className="mt-12 grid gap-7 md:mt-20 md:grid-cols-3 md:gap-10">
      {parts.map((part, index) => (
        <section key={part.title}>
          <p
            aria-hidden="true"
            className="text-2xs tracking-label text-accent-2 text-shadow-glow-cyan"
          >
            {String(index + 1).padStart(2, "0")}
          </p>
          <h2 className="mt-2 mb-2.5 font-display text-[22px] font-bold tracking-[-0.01em] text-title text-shadow-glow-accent md:text-[26px]">
            {part.title}
          </h2>
          <p className="text-sm leading-[1.7] text-pretty">{part.text}</p>
        </section>
      ))}
    </div>
  );
}
