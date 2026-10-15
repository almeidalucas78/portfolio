import { getScoreRating, type Rating } from "@/lib/metrics";

type BadgeSize = "sm" | "md" | "lg";

type PerformanceBadgeProps = {
  /** Nota de performance do PageSpeed mobile, de 0 a 100. */
  score: number;
  size?: BadgeSize;
};

const ratingClass: Record<Rating, string> = {
  good: "text-good",
  warn: "text-warn",
  bad: "text-bad",
};

// px alimenta a geometria do SVG; box e text são as classes equivalentes.
const gaugeSize: Record<BadgeSize, { px: number; box: string; text: string }> = {
  sm: { px: 30, box: "size-7.5", text: "text-2xs" },
  md: { px: 36, box: "size-9", text: "text-[13px]" },
  lg: { px: 40, box: "size-10", text: "text-sm" },
};

const STROKE = 3;

// A cor da classificação vira currentColor: o SVG, a borda e o brilho herdam dela.
export function PerformanceBadge({ score, size = "md" }: PerformanceBadgeProps) {
  const { px, box, text } = gaugeSize[size];
  const radius = (px - STROKE) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-full border border-current/40 bg-background/88 py-1.25 pr-3.5 pl-1.25 shadow-[0_0_18px_-2px_color-mix(in_srgb,currentColor_33%,transparent)] backdrop-blur-sm ${ratingClass[getScoreRating(score)]}`}
    >
      <span className="sr-only">Performance no PageSpeed mobile: {score} de 100</span>

      <div aria-hidden="true" className={`relative flex-none ${box}`}>
        <svg width={px} height={px} className="block -rotate-90">
          <circle
            cx={px / 2}
            cy={px / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.16}
            strokeWidth={STROKE}
          />
          <circle
            cx={px / 2}
            cy={px / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - score / 100)}
            className="drop-shadow-[0_0_4px_currentColor]"
          />
        </svg>
        <span
          className={`absolute inset-0 grid place-items-center font-display font-bold text-shadow-[0_0_10px_color-mix(in_srgb,currentColor_53%,transparent)] ${text}`}
        >
          {score}
        </span>
      </div>

      <div aria-hidden="true" className="leading-[1.3]">
        <div className="text-3xs tracking-[0.08em] text-title">PageSpeed</div>
        <div className="text-[9px] tracking-label text-muted uppercase">mobile</div>
      </div>
    </div>
  );
}
