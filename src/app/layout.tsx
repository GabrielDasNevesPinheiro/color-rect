import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider/provider";

const libre = Libre_Franklin({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jogar ColorRect",
  description: "Um jogo para testar seu cérebro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={libre.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
