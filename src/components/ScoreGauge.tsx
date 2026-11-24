import { getScoreRating } from "@/lib/metrics";
import { RATING_TEXT_CLASS } from "@/lib/ratingClasses";

type ScoreGaugeProps = {
  /** Nota de 0 a 100. */
  score: number;
  /** Tamanho e fonte do número, como "size-9 text-[13px]". Pode ser responsivo. */
  className: string;
  /** Espessura do arco em unidades do viewBox (o círculo tem 100 de largura). */
  stroke?: number;
};

// O viewBox fixo de 100x100 faz o SVG escalar com o tamanho vindo do CSS,
// então o mesmo componente serve do badge pequeno ao painel grande.
export function ScoreGauge({ score, className, stroke = 8 }: ScoreGaugeProps) {
  const radius = (100 - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className={`relative flex-none ${RATING_TEXT_CLASS[getScoreRating(score)]} ${className}`}>
      <svg viewBox="0 0 100 100" aria-hidden="true" className="block size-full -rotate-90">
        <circle
          cx={50}
          cy={50}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.16}
          strokeWidth={stroke}
        />
        <circle
          cx={50}
          cy={50}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - score / 100)}
          className="drop-shadow-[0_0_4px_currentColor]"
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center font-display font-bold text-shadow-[0_0_10px_color-mix(in_srgb,currentColor_53%,transparent)]">
        {score}
      </span>
    </div>
  );
}
