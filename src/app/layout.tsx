import type { Metadata } from "next";
import { DM_Sans, Roboto } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const title =
  "JB Kasenda — Full-Stack Developer (React/Next.js, Node, TypeScript)";
const description =
  "Full-stack developer in Ottawa, ON. Building modern web apps with Next.js, Node, Prisma, and PostgreSQL. Bilingual (EN/FR).";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title,
  description,
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
    <html lang="en" className={`${dmSans.variable} ${roboto.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
