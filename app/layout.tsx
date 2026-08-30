import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "A Grande Conversa — Syntopicon",
  description: "Uma navegação rastreável pelas Grandes Ideias do Syntopicon.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="site-header">
          <a className="brand" href="/">A Grande Conversa</a>
          <nav aria-label="Navegação principal"><a href="/ideas">Grandes Ideias</a></nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
