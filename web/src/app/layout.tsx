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

const siteDescription =
  "Scroll through an interactive SoundWorld tour: hear the Old Babylonian tightening cycle (binaural WAV + MIDI download), explore binaural presets with per-track listener notes and a beat-frequency guide, tweak rectangular room modes and Chladni-style plate previews, and read a short, evidence-minded take on pyramids and sound. Use headphones for binaural tracks.";

export const metadata: Metadata = {
  title: {
    default: "SoundWorld",
    template: "%s · SoundWorld",
  },
  description: siteDescription,
  keywords: [
    "binaural beats",
    "Mesopotamian music",
    "UET VII 74",
    "room acoustics",
    "archaeoacoustics",
    "Chladni",
    "sound and pyramids",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SoundWorld",
    title: "SoundWorld — tablets, listening, and acoustics",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "SoundWorld — tablets, listening, and acoustics",
    description: siteDescription,
  },
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
