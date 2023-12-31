import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "./Provider";
import Header from "./Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tune Brush",
  description: "Alternative Album Art",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark text-foreground bg-background">
      <body className={inter.className}>
        <Provider>
          <Header />
          <main className="flex-col items-center justify-between px-6 py-12 scroll-smooth antialiased max-w-screen-2xl m-auto md:py-12 md:px-24">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
