import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-[3px] border border-chip-border bg-chip px-2.25 py-1 text-3xs tracking-[0.06em] whitespace-nowrap text-accent">
      {children}
    </span>
  );
}
