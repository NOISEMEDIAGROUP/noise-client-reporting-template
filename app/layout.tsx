import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://noisemediagroup.github.io/noise-client-reporting-template/"),
  title: "Performance, explained. | Noise Client Reporting",
  description:
    "An interactive performance story that brings results to life and turns every learning into accountable action.",
  openGraph: {
    title: "Performance, explained.",
    description:
      "An interactive performance story that turns every learning into accountable action.",
    images: [
      {
        url: "og.png",
        width: 1730,
        height: 909,
        alt: "Performance, explained — Noise × Indian Motorcycle, July 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Performance, explained.",
    description:
      "An interactive performance story that turns every learning into accountable action.",
    images: ["og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${barlowCondensed.variable}`}>
        {children}
      </body>
    </html>
  );
}
