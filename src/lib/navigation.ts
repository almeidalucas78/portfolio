export type NavItem = {
  href: string;
  label: string;
};

// O "/" antes do "#" faz o link funcionar também a partir das páginas de case.
export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/#projetos", label: "Projetos" },
  { href: "/#experiencia", label: "Experiência" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#contato", label: "Contato" },
];
