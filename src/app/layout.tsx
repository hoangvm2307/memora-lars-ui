import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Memora Lars UI",
  description: "UI for interacting with the QA system",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">QA System UI</h1>
          {children}
        </div>
      </body>
    </html>
  );
}
