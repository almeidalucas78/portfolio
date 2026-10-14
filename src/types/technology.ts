export type TechnologyGroup =
  "Desenvolvimento" | "Infraestrutura" | "SEO e Performance" | "Conhecimentos adicionais";

// Lista simples; o agrupamento por seção é feito por uma função, como virá do WordPress.
export type Technology = {
  name: string;
  group: TechnologyGroup;
};
