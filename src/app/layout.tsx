import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amadea Cornelia | Parenting Anak",
  description: "Amadea Cornelia | Parenting Anak",
  icons: [
    {
      href: "/image/photo_profile",
      sizes: "32x32",
      type: "image/x-icon",
      url: "/image/photo_profile", // Add the missing 'url' property
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
