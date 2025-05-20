import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Outfit } from "next/font/google";
import "./globals.css";
const outfit = Outfit({
  weight: ["400", "700"], // Specify font weights you want to use
  subsets: ["latin"], // Specify the character subsets to use (optional)
});

export const metadata: Metadata = {
  title: "Presenza",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  keywords: ["presenza"],
  authors: [
    {
      name: "Jason Dboss",
    },
  ],
  description: "Smart attendance system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${outfit.className} flex justify-center`}>
        <Toaster />

        <div>{children}</div>
      </body>
    </html>
  );
}
