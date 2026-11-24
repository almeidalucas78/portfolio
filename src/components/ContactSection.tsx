import type { ContactKind, Profile } from "@/types/profile";
import { SectionHeader } from "./SectionHeader";

// Ícone em texto e rótulo de cada tipo de contato, como no design.
const contactMeta: Record<ContactKind, { icon: string; label: string }> = {
  email: { icon: "@", label: "e-mail" },
  linkedin: { icon: "in", label: "linkedin" },
  github: { icon: "⎇", label: "github" },
  whatsapp: { icon: "wa", label: "whatsapp" },
};

export function ContactSection({ profile }: { profile: Profile }) {
  return (
    <section id="contato" className="relative px-5 pt-15 pb-20 md:px-20 md:py-30">
      <SectionHeader kicker="05 · contato" title="Vamos conversar" />

      <div className="grid items-start gap-8 md:grid-cols-2 md:gap-20">
        <p className="max-w-120 text-sm leading-[1.7] md:text-[17px]">
          {profile.availability.isAvailable && <>{profile.availability.label}. </>}
          <span className="text-title text-shadow-glow-accent">Me chama.</span>
        </p>

        <ul className="flex flex-col gap-3">
          {profile.contacts.map((contact) => {
            const meta = contactMeta[contact.kind];
            // E-mail abre o programa de e-mail; os demais abrem em nova aba.
            const isExternal = contact.kind !== "email";
            return (
              <li key={contact.href}>
                <a
                  href={contact.href}
                  {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
                  className="flex items-center gap-4 rounded-sm border border-border bg-surface px-4.5 py-4 shadow-card transition-all duration-250 hover:-translate-y-0.75 hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-2"
                >
                  <span
                    aria-hidden="true"
                    className="grid size-10.5 flex-none place-items-center rounded-sm border-[1.5px] border-accent text-[15px] font-bold text-accent shadow-icon text-shadow-glow-accent"
                  >
                    {meta.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-3xs tracking-label text-muted uppercase">
                      {meta.label}
                    </span>
                    <span className="mt-0.75 block truncate text-[13px] text-title md:text-[15px]">
                      {contact.label}
                    </span>
                  </span>
                  <span aria-hidden="true" className="ml-auto text-accent-2 text-shadow-glow-cyan">
                    ↗
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
