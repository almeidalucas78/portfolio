export function Footer() {
  // Calculado no build (a página é estática); atualiza a cada deploy.
  const year = new Date().getFullYear();

  return (
    <footer className="mx-5 flex flex-wrap justify-between gap-3 border-t border-border pt-7 pb-10 text-2xs tracking-widest text-muted uppercase md:mx-20">
      <span>© {year} Lucas Almeida</span>
      <span>
        <span aria-hidden="true" className="text-accent-2">
          ●
        </span>{" "}
        WordPress · SEO técnico · performance
      </span>
    </footer>
  );
}
