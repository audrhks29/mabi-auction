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
  icons: {
    icon: "/auction.png",
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
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <Providers>
          <Header />
          <ScriptTag />

          {children}
          <ReactQueryDevtools initialIsOpen={true} />

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
