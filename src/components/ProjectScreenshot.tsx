import Image from "next/image";
import type { Project } from "@/types/project";

type ProjectScreenshotProps = {
  project: Project;
  /** Larguras em que a imagem aparece, para o next/image escolher o arquivo certo. */
  sizes: string;
};

// Ocupa o container pai, que precisa ser relative e ter proporção definida.
// Sem screenshot, mostra o placeholder listrado do design.
export function ProjectScreenshot({ project, sizes }: ProjectScreenshotProps) {
  if (project.screenshot) {
    return (
      <Image
        src={project.screenshot.src}
        alt={project.screenshot.alt}
        fill
        sizes={sizes}
        className="object-cover"
      />
    );
  }

  return (
    <div className="absolute inset-0 grid place-items-center p-3 text-center text-2xs tracking-[0.15em] text-muted uppercase bg-stripes">
      screenshot
    </div>
  );
}
