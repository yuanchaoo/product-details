import type { Metadata } from "next";
import "./globals.css";
import { GlobalBottomSection } from "@/components/GlobalBottomSection";

export const metadata: Metadata = {
  title: "Zelostech Product Detail",
  description: "Product detail page recreated from Figma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <div className="flex-1">{children}</div>
        <GlobalBottomSection />
      </body>
    </html>
  );
}
