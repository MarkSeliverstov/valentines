import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Валентинка: Романтическая игра с сюрпризом-предложением",
  description:
    "Сыграй в уникальную игру ко Дню Святого Валентина. Собери все пары, чтобы увидеть романтическое предложение!",
  keywords: [
    "игра на День Святого Валентина",
    "романтическое предложение",
    "карточная игра с фотографиями",
    "сюрприз на День Святого Валентина",
    "игра для пары",
    "валентинка",
    "игра с предложением",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
