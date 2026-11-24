import {
  RATING_LABELS,
  VITALS,
  formatVital,
  getVitalPosition,
  getVitalRating,
  type VitalKey,
} from "@/lib/metrics";
import { RATING_TEXT_CLASS } from "@/lib/ratingClasses";

type VitalCardProps = {
  vital: VitalKey;
  value: number;
};

export function VitalCard({ vital, value }: VitalCardProps) {
  const info = VITALS[vital];
  const rating = getVitalRating(vital, value);
  const colorClass = RATING_TEXT_CLASS[rating];
  const position = getVitalPosition(vital, value) * 100;

  return (
    <div className="rounded-sm border border-border bg-background p-5">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-display text-lg font-bold text-title">{info.label}</h3>
        <span className="text-right text-3xs text-muted">{info.name}</span>
      </div>

      <p
        className={`mt-3.5 mb-3 font-display text-4xl font-bold tracking-[-0.02em] text-shadow-[0_0_14px_color-mix(in_srgb,currentColor_40%,transparent)] ${colorClass}`}
      >
        {formatVital(vital, value)}
      </p>

      {/* Barra de três faixas com o marcador na posição do valor. A classificação
          aparece em texto logo abaixo, então a barra é só visual. */}
      <div aria-hidden="true" className="relative grid h-1 grid-cols-3 gap-0.75">
        <span className="rounded-xs bg-good/33" />
        <span className="rounded-xs bg-warn/33" />
        <span className="rounded-xs bg-bad/33" />
        <span
          className={`absolute -top-1 h-3 w-0.75 rounded-xs bg-current shadow-[0_0_8px_currentColor] ${colorClass}`}
          style={{ left: `calc(${position.toFixed(1)}% - 1px)` }}
        />
      </div>

      <div className="mt-3.5 flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border border-current/40 bg-current/8 px-2.5 py-1 text-2xs ${colorClass}`}
        >
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-current shadow-[0_0_6px_currentColor]"
          />
          {RATING_LABELS[rating]}
        </span>
        <span className="text-3xs text-muted">bom ≤ {formatVital(vital, info.good)}</span>
      </div>
    </div>
  );
}
