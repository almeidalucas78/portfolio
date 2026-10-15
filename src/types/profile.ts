import type { Image } from "./image";

export type Availability = {
  isAvailable: boolean;
  /** Texto exibido, como "Disponível para projetos freelancer". */
  label: string;
};

export type Education = {
  course: string;
  institution: string;
  /** Situação, como "Em andamento". Ausente quando concluído. */
  status?: string;
};

export type ContactKind = "email" | "linkedin" | "github" | "whatsapp";

export type ContactLink = {
  kind: ContactKind;
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  /** Cargo exibido no hero, como "Desenvolvedor Web". */
  title: string;
  /** Especialidade exibida ao lado do título, como "WordPress, SEO técnico e performance". */
  specialty: string;
  /** Frase curta abaixo do título no hero. */
  heroPhrase: string;
  availability: Availability;
  /** Texto da seção "Sobre", um item por parágrafo. */
  about: string[];
  photo?: Image;
  education: Education[];
  contacts: ContactLink[];
};
