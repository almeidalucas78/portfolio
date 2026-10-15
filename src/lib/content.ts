import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import type { Profile } from "@/types/profile";
import type { Project } from "@/types/project";
import { selectFeatured, sortByOrder } from "./projects";

// Ponto único de acesso ao conteúdo. Na etapa 1 lê os mocks de src/data; na etapa 2
// só o miolo destas funções muda para chamar o WordPress, e as páginas continuam iguais.
// Já são async por isso: as páginas usam await desde agora.

export async function getProfile(): Promise<Profile> {
  return profile;
}

export async function getProjects(): Promise<Project[]> {
  return sortByOrder(projects);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return selectFeatured(projects);
}
