import type { Metadata } from "next";
import "./globals.css";

const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";
const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "DriveEX — аренда спецтехники в Москве",
  description: "Аренда спецтехники с оператором, топливом и доставкой по Москве и Московской области.",
  icons: {
    icon: `${publicBasePath}/favicon.svg`,
    shortcut: `${publicBasePath}/favicon.svg`,
  },
  robots: isGitHubPagesBuild
    ? {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false, noimageindex: true },
      }
    : undefined,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className="antialiased">{children}</body>
    </html>
  );
}
