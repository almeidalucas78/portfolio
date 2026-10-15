import type { Technology, TechnologyGroup } from "@/types/technology";

// Monta a lista simples a partir dos grupos, só para o arquivo ficar fácil de editar.
function inGroup(group: TechnologyGroup, names: string[]): Technology[] {
  return names.map((name) => ({ name, group }));
}

export const technologies: Technology[] = [
  ...inGroup("Desenvolvimento", [
    "WordPress",
    "WooCommerce",
    "WP REST API",
    "PHP",
    "JavaScript",
    "Node.js",
    "Bootstrap",
    "Tailwind CSS",
    "MySQL",
    "ACF",
    "Elementor",
    "Postman",
    "Insomnia",
    "Figma",
  ]),
  ...inGroup("Infraestrutura", ["Cloudways", "Cloudflare", "Docker", "SSH", "Git", "GitHub"]),
  ...inGroup("SEO e Performance", [
    "Core Web Vitals",
    "Rank Math",
    "WP Rocket",
    "PageSpeed Insights",
    "Screaming Frog",
  ]),
  ...inGroup("Conhecimentos adicionais", ["TypeScript", "React", "Testes automatizados", "CI/CD"]),
];
