import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

// Baixadas no build e servidas pelo próprio site. Os nomes das variáveis
// são os que os tokens font-display e font-mono esperam em globals.css.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Lucas Almeida",
  description:
    "Portfólio de Lucas Almeida, desenvolvedor web especializado em WordPress, SEO técnico e performance.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: o script abaixo muda o data-theme do <html> antes do
    // React hidratar. Vale só para este elemento, não esconde erros dos filhos.
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      // Avisa o Next que o scroll suave do CSS é intencional: ele o desliga
      // durante trocas de rota para não animar a ida ao topo da página nova.
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      {/* overflow-x-clip: corta brilhos decorativos que passam da borda sem quebrar o sticky do header. */}
      <body className="flex min-h-dvh flex-col overflow-x-clip bg-background bg-grid font-mono text-body">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
