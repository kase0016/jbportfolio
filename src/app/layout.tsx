import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

const title =
  "JB Kasenda — Full‑Stack Developer (React/Next.js, Node, TypeScript)";
const description =
  "Full‑stack developer in Ottawa, ON. Building modern web apps with Next.js, Node, Prisma, and PostgreSQL. Bilingual (EN/FR).";

export const metadata: Metadata = {
  title: title,
  description: description,
  alternates: { canonical: "https://jbportfolio.vercel.app" },
  openGraph: {
    type: "profile",
    title,
    description,
    url: "https://jbportfolio.vercel.app",
    siteName: "JB Kasenda",
    images: ["/jb.jpg"],
    locale: "en_CA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
