import type { Metadata } from "next";
import "./styles.css";

/* Tipografia (decisão em docs/identidade-visual.md):
   display/texto = serifa Fraunces; UI = Inter — via next/font/local
   com arquivos .woff2 na própria repo (self-host, zero dependência de rede).
   O CSS já consome --font-display/--font-ui com fallback digno (Iowan/Palatino). */

export const metadata: Metadata = {
  title: "A Grande Conversa — Syntopicon em português",
  description:
    "Uma reconstrução fiel do Syntopicon em português: 102 Grandes Ideias, os tópicos de Adler e o caminho direto até as passagens dos Great Books.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="site-header">
          <div className="site-header-inner">
            <a className="brand" href="/">
              A Grande Conversa
            </a>
            <nav aria-label="Navegação principal">
              <a href="/ideias">Grandes Ideias</a>
              <a href="/inventario">Inventário</a>
              <a href="/sobre">Sobre</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <p>
            Protótipo de estudo · golden case <a href="/ideias/42-justice">Justiça (42)</a> · dados com provenance por
            registro · especificação em <code>docs/a-grande-conversa-especificacao.md</code>.
          </p>
          <p className="footer-method">Mortimer ensina como navegar. Adler decide o que existe.</p>
        </footer>
      </body>
    </html>
  );
}
