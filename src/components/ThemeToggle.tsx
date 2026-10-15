"use client";

import { applyTheme } from "@/lib/theme";

// O botão ativo é marcado só com CSS (variante light: em globals.css), lendo o
// data-theme do <html>. Assim o componente não precisa saber o tema no servidor.
const optionClass =
  "grid size-5.5 cursor-pointer place-items-center rounded-full text-2xs transition-all duration-200";
const activeClass = "bg-accent text-background shadow-[0_0_10px_var(--color-accent)]";
const inactiveClass = "bg-transparent text-muted shadow-none";

export function ThemeToggle() {
  return (
    <div
      role="group"
      aria-label="Tema"
      className="flex items-center gap-1 rounded-full border border-border bg-surface p-0.75"
    >
      <button
        type="button"
        aria-label="Ativar tema escuro"
        onClick={() => applyTheme("dark")}
        className={`${optionClass} ${activeClass} light:bg-transparent light:text-muted light:shadow-none`}
      >
        ☾
      </button>
      <button
        type="button"
        aria-label="Ativar tema claro"
        onClick={() => applyTheme("light")}
        className={`${optionClass} ${inactiveClass} light:bg-accent light:text-background light:shadow-[0_0_10px_var(--color-accent)]`}
      >
        ☀
      </button>
    </div>
  );
}
