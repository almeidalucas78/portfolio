// Largura e altura permitem ao next/image reservar o espaço da imagem e evitar CLS.
export type Image = {
  src: string;
  alt: string;
  width: number;
  height: number;
};
