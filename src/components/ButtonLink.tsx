import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  variant?: "primary" | "secondary";
  children: ReactNode;
};

const baseClass =
  "inline-flex items-center rounded-sm border-[1.5px] border-accent px-6.5 py-3.5 text-[13px] font-semibold tracking-[0.08em] uppercase transition-all duration-200 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-2 motion-safe:hover:animate-pulse-neon";

const variantClass = {
  primary: "bg-accent text-background",
  secondary: "bg-transparent text-accent",
};

// Link com aparência de botão (NeonBtn do design). Navegação é sempre <Link>, nunca onClick.
export function ButtonLink({ href, variant = "primary", children }: ButtonLinkProps) {
  return (
    <Link href={href} className={`${baseClass} ${variantClass[variant]}`}>
      {children}
    </Link>
  );
}
