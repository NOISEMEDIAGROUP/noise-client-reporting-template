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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://noisemediagroup.github.io/noise-client-reporting-template/"),
  title: "This month in 3 points. | Noise Client Reporting",
  description:
    "A Noise client performance report: title, executive summary, overall results, channel stories, campaign, creative, then what happens next.",
  openGraph: {
    title: "This month in 3 points.",
    description:
      "Title, three-point summary, overall results, Meta and Google stories, creative, what happens next.",
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
    title: "This month in 3 points.",
    description:
      "Title, three-point summary, overall results, Meta and Google stories, creative, what happens next.",
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
