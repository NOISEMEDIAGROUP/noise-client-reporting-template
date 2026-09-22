import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], weight: ["400", "500", "700"] });
const barlowCondensed = Barlow_Condensed({ variable: "--font-barlow-condensed", subsets: ["latin"], weight: ["600", "700"] });

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" as const };

export const metadata: Metadata = {
  metadataBase: new URL("https://noisemediagroup.github.io/noise-client-reporting-template/"),
  title: "ChatGPT Ads: The Verified Picture | Noise",
  description: "A sourced, interactive briefing on ChatGPT Ads: how the product works, what is verified, what needs correction and how to test it.",
  openGraph: {
    title: "ChatGPT Ads: The Verified Picture",
    description: "A sourced, interactive Noise briefing on the current ChatGPT Ads product and evidence.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ChatGPT Ads: The Verified Picture",
    description: "A sourced, interactive Noise briefing on the current ChatGPT Ads product and evidence.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${dmSans.variable} ${barlowCondensed.variable}`}>{children}</body></html>;
}
