import { ButtonLink } from "@/components/ButtonLink";

export default function NotFound() {
  return (
    <main className="relative px-5 py-20 md:px-20 md:py-30">
      <p className="mb-3 text-xs tracking-eyebrow text-accent-2 uppercase text-shadow-glow-cyan">
        erro 404
      </p>
      <h1 className="font-display text-display-section font-bold text-title text-shadow-glow-title">
        Página não encontrada
      </h1>
      <p className="mt-5 mb-10 max-w-140 text-sm leading-relaxed md:text-base">
        O endereço pode ter mudado ou o projeto não existe mais.
      </p>
      <ButtonLink href="/">Voltar ao início</ButtonLink>
    </main>
  );
}
