import type { Metadata } from "next";
// import { Toaster } from "react-hot-toast";
import { Toaster } from "sonner";

import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./ThemeProvider";
import { CheckAuthProvider } from "./CheckAuth";
const outfit = Outfit({
  weight: ["400", "700"], // Specify font weights you want to use
  subsets: ["latin"], // Specify the character subsets to use (optional)
});

export const metadata: Metadata = {
  title: "Presenix",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  keywords: ["presenix"],
  authors: [
    {
      name: "Jason Dboss",
    },
  ],
  description: "Smart Presence, Smarter Learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${outfit.className} overflow-x-hidden`}>
        <Toaster />

        <CheckAuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </CheckAuthProvider>
      </body>
    </html>
  );
}
