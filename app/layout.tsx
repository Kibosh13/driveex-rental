import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "СтройТехника — аренда спецтехники в Москве",
  description: "Аренда спецтехники с оператором, топливом и доставкой по Москве и Московской области.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className="antialiased">{children}</body>
    </html>
  );
}
