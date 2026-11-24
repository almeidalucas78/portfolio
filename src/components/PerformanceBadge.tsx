import { getScoreRating } from "@/lib/metrics";
import { RATING_TEXT_CLASS } from "@/lib/ratingClasses";
import { ScoreGauge } from "./ScoreGauge";

type BadgeSize = "sm" | "md" | "lg";

type PerformanceBadgeProps = {
  /** Nota de performance do PageSpeed mobile, de 0 a 100. */
  score: number;
  size?: BadgeSize;
};

const gaugeClass: Record<BadgeSize, string> = {
  sm: "size-7.5 text-2xs",
  md: "size-9 text-[13px]",
  lg: "size-10 text-sm",
};

// A cor da classificação vira currentColor: a borda e o brilho herdam dela.
export function PerformanceBadge({ score, size = "md" }: PerformanceBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-full border border-current/40 bg-background/88 py-1.25 pr-3.5 pl-1.25 shadow-[0_0_18px_-2px_color-mix(in_srgb,currentColor_33%,transparent)] backdrop-blur-sm ${RATING_TEXT_CLASS[getScoreRating(score)]}`}
    >
      <span className="sr-only">Performance no PageSpeed mobile: {score} de 100</span>

      <div aria-hidden="true">
        <ScoreGauge score={score} className={gaugeClass[size]} />
      </div>

      <div aria-hidden="true" className="leading-[1.3]">
        <div className="text-3xs tracking-[0.08em] text-title">PageSpeed</div>
        <div className="text-[9px] tracking-label text-muted uppercase">mobile</div>
      </div>
    </div>
  );
}
