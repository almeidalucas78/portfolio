import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lucas Almeida",
  description:
    "Portfólio de Lucas Almeida, desenvolvedor web especializado em WordPress, SEO técnico e performance.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body className="bg-background font-mono text-body">{children}</body>
    </html>
  );
}
