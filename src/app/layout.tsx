import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./globals.css";

import QueryProviders from "@/utils/provider/QueryProviders";

import { cn } from "@/lib/utils";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/lib/GoogleAnalytics";
import { ThemeProvider } from "@/utils/provider/theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    template: "마비옥션 | %s",
    default: "마비옥션",
  },
  description: "마비옥션에서 마비노기 경매장 아이템들과 뿔피리 내역을 검색해보세요.",
  keywords: ["마비노기", "마비노기 경매장", "마비노기 뿔피리", "마비노기 주머니 색", "마비노기 오픈퀘스트"],
  openGraph: {
    type: "website",
    url: "https://mabiauction.vercel.app/",
    title: "마비옥션",
    description: "마비옥션에서 마비노기 경매장 아이템들과 뿔피리 내역을 검색해보세요.",
    siteName: "마비옥션",
    images: [
      {
        url: "/logo_default.png",
      },
    ],
  },
  metadataBase: new URL("https://mabiauction.vercel.app"),
  creator: "HP마비굿잡",
  icons: {
    icon: "/logo_default.png",
  },
  verification: {
    google: "ZPrVlMyX2ZF_7nmMXyiH00jA7dezY2IkUz0Zh16CYpw",
  },
  other: {
    "naver-site-verification": "5f465c61be3500bafc308ea344dd6ac69fc942ff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
      </head>
      <body className={cn("bg-background font-sans antialiased", fontSans.variable)}>
        <QueryProviders>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Header />
            <div id="wrap">{children}</div>

            <ReactQueryDevtools initialIsOpen={false} />
            <Footer />
          </ThemeProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
