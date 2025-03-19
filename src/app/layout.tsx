import type { Metadata } from "next";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Providers from "@/utils/provider";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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

const themeScript = `
  (function() {
    function getTheme() {
      const localTheme = localStorage.getItem("mabiAuction-theme");

      if (localTheme) return localTheme;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    const theme = getTheme();
    localStorage.setItem("mabiAuction-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={cn("bg-background font-sans antialiased", fontSans.variable)}>
        <Providers>
          <Header />
          <div id="wrap">{children}</div>
          <ReactQueryDevtools initialIsOpen={false} />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
