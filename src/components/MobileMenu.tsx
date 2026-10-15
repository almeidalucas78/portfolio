"use client";

import { useState, type MouseEvent, type ReactNode } from "react";

type MobileMenuProps = {
  // Os links chegam já renderizados pelo Header (servidor), então ficam no HTML.
  // Este componente só controla se o painel aparece ou não.
  children: ReactNode;
};

const barClass = "h-[1.5px] bg-accent shadow-glow-line";

export function MobileMenu({ children }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Fecha o painel quando um link é clicado. A navegação continua sendo do <Link>.
  function handlePanelClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target instanceof Element && event.target.closest("a")) {
      setIsOpen(false);
    }
  }

  return (
    <>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        onClick={() => setIsOpen((open) => !open)}
        className="flex cursor-pointer flex-col gap-1 py-3 pl-2 md:hidden"
      >
        <span className={`${barClass} w-5.5`} />
        <span className={`${barClass} ml-auto w-4`} />
        <span className={`${barClass} w-5.5`} />
      </button>

      {/* Sempre no DOM: fechado, o painel só fica com display: none. */}
      <div
        id="mobile-menu"
        onClick={handlePanelClick}
        className={`${isOpen ? "block" : "hidden"} absolute inset-x-0 top-full border-b border-accent/35 bg-nav px-5 py-4 backdrop-blur-[14px] md:hidden`}
      >
        {children}
      </div>
    </>
  );
}
