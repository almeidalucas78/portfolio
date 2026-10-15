import type { Profile } from "@/types/profile";

export const profile: Profile = {
  name: "Lucas Almeida",
  title: "Desenvolvedor Web",
  specialty: "WordPress, SEO técnico e performance",
  heroPhrase: "Desenvolvo sites rápidos, bem indexados e fáceis de manter.",
  availability: {
    isAvailable: true,
    label: "Disponível para projetos freelancer e novas oportunidades",
  },
  about: [
    "Há mais de 6 anos desenvolvo sites em WordPress com foco em SEO técnico e performance. Hoje atuo no desenvolvimento e na otimização de sites de grandes marcas, garantindo que sejam rápidos e bem posicionados.",
    "Também trabalho com migrações e publicações de sites, tanto em hospedagem convencional quanto em configurações com proxy reverso.",
  ],
  education: [
    {
      course: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
      institution: "Anhanguera",
      status: "Em andamento",
    },
    {
      course: "Técnico em Desenvolvimento de Sistemas",
      institution: "ETEC",
    },
  ],
  contacts: [
    {
      kind: "email",
      label: "almeidalucas.dev@gmail.com",
      href: "mailto:almeidalucas.dev@gmail.com",
    },
    {
      kind: "linkedin",
      label: "linkedin.com/in/almeidalucasdev",
      href: "https://www.linkedin.com/in/almeidalucasdev",
    },
    {
      kind: "github",
      label: "github.com/almeidalucas78",
      href: "https://github.com/almeidalucas78",
    },
  ],
};
