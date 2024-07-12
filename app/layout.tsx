import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ConvexClerkProvider from "@/providers/ConvexClerkProvider";
import { AudioProvider } from "@/providers/AudioProvider";
import { SynthProvider } from "@/providers/SynthProvider";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Violinova",
  description: "Violin learning website",
  icons: { icon: "/icons/logo.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en">
        <SynthProvider>
          <body className={manrope.className}>{children}</body>
        </SynthProvider>
      </html>
    </ConvexClerkProvider>
  );
}
