import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Сюрпризик",
  description:
    "Открой, вдруг там что то важное?!",
  themeColor: '#000000',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#000000',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark" style={{ colorScheme: 'dark' }}>
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
