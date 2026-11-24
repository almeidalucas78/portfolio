import type { ReactNode } from "react";

type TagProps = {
  /** md nos cards de projeto; lg na seção de stacks. */
  size?: "md" | "lg";
  children: ReactNode;
};

const sizeClass = {
  md: "px-2.25 py-1 text-3xs",
  lg: "px-3 py-1.75 text-xs",
};

export function Tag({ size = "md", children }: TagProps) {
  return (
    <span
      className={`inline-block rounded-[3px] border border-chip-border bg-chip tracking-[0.06em] whitespace-nowrap text-accent ${sizeClass[size]}`}
    >
      {children}
    </span>
  );
}
