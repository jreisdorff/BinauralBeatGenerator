import type { Metadata } from "next";
import { Cinzel, DM_Sans, Noto_Sans_Egyptian_Hieroglyphs } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700"],
  display: "swap",
});

const notoHiero = Noto_Sans_Egyptian_Hieroglyphs({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-noto-hiero",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SoundLab",
  description:
    "Mesopotamian tuning theory, binaural experiments, and room acoustics — interactive tour.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${cinzel.variable} ${notoHiero.variable}`}
    >
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
