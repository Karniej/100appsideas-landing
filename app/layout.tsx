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
  title: "100 App Ideas | Validated iOS App Ideas with Zero Competition",
  description:
    "100 validated iOS app ideas backed by 65,000+ keyword analysis. Real App Store data, competitor analysis, pricing strategies, and implementation guides. Skip months of research.",
  keywords: [
    "app ideas",
    "ios app ideas",
    "app store keywords",
    "mobile app ideas",
    "indie developer",
    "app business",
    "aso research",
    "app store optimization",
  ],
  openGraph: {
    title: "100 App Ideas | Validated iOS App Ideas with Zero Competition",
    description:
      "100 validated iOS app ideas backed by 65,000+ keyword analysis. Real App Store data, competitor analysis, and pricing strategies.",
    url: "https://100appsideas.com",
    siteName: "100 App Ideas",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "100 App Ideas | Validated iOS App Ideas with Zero Competition",
    description:
      "100 validated iOS app ideas backed by 65,000+ keyword analysis.",
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
