import type { Metadata } from "next";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import Providers from "@/utils/provider";

import { cn } from "@/lib/utils";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { setColorsByTheme } from "@/script/setColorsByTheme";

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
  keywords: ["마비노기", "경매장", "뿔피리"],
  openGraph: {
    type: "website",
    url: "https://mabiauction.vercel.app/",
    title: "마비옥션",
    description: "마비옥션에서 마비노기 경매장 아이템들과 뿔피리 내역을 검색해보세요.",
    siteName: "마비옥션",
    images: [
      {
        url: "/logo_light.png",
      },
    ],
  },
  metadataBase: new URL("https://mabiauction.vercel.app"),
  creator: "마비옥션",
  icons: {
    icon: "/logo_dark.png",
  },
  verification: {
    google: "ZPrVlMyX2ZF_7nmMXyiH00jA7dezY2IkUz0Zh16CYpw",
  },
  other: {
    "naver-site-verification": "5f465c61be3500bafc308ea344dd6ac69fc942ff",
  },
};

const ScriptTag = () => {
  const stringifyFn = setColorsByTheme;
  const fnToRunOnClient = `(${stringifyFn})()`;
  return <script dangerouslySetInnerHTML={{ __html: fnToRunOnClient }} />;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={cn("bg-background font-sans antialiased", fontSans.variable)}>
        <Providers>
          <ScriptTag />
          <Header />
          <div id="wrap">{children}</div>
          <ReactQueryDevtools initialIsOpen={true} />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
