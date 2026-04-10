import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geist = localFont({
  src: "../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  variable: "--font-geist",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "40 Validated App Ideas | Astro-Verified iOS App Ideas with Real Data",
  description:
    "40 validated iOS app ideas with real Astro MCP keyword data. Every pop/diff score verified, competitors checked, dead ideas removed. 5 already shipped.",
  keywords: [
    "app ideas",
    "ios app ideas",
    "app store keywords",
    "mobile app ideas",
    "indie developer",
    "app business",
    "aso research",
    "app store optimization",
    "astro aso",
    "validated app ideas",
  ],
  openGraph: {
    title: "40 Validated App Ideas | Astro-Verified iOS App Ideas with Real Data",
    description:
      "40 validated iOS app ideas with real Astro MCP keyword data. Every pop/diff score verified, 26 dead ideas removed, 5 already shipped.",
    url: "https://100appsideas.com",
    siteName: "40 Validated App Ideas",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "40 Validated App Ideas | Astro-Verified iOS App Ideas with Real Data",
    description:
      "40 validated iOS app ideas with real Astro MCP keyword data. 5 already shipped.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geist.variable} ${outfit.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
