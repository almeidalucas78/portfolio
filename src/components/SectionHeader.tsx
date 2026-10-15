type SectionHeaderProps = {
  /** Rótulo acima do título, como "01 · projetos". */
  kicker: string;
  title: string;
};

export function SectionHeader({ kicker, title }: SectionHeaderProps) {
  return (
    <header className="mb-12">
      <p className="mb-3 text-xs tracking-eyebrow text-accent-2 uppercase text-shadow-glow-cyan">
        <span aria-hidden="true" className="opacity-60">
          {"<"}
        </span>{" "}
        {kicker}{" "}
        <span aria-hidden="true" className="opacity-60">
          {"/>"}
        </span>
      </p>
      <h2 className="font-display text-display-section font-bold text-title text-shadow-glow-title">
        {title}
      </h2>
    </header>
  );
}
