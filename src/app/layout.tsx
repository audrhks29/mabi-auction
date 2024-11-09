import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import { Separator } from "@/components/ui/separator";
import Providers from "@/utils/provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    template: "Mabi Auction | %s",
    default: "Mabi Auction",
  },
  description: "마비옥션에서 마비노기 경매장 아이템들과 뿔피리 내역을 검색해보세요.",
  icons: {
    icon: "/auction.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <Providers>
          <SidebarProvider>
            <Header />
            <Separator className="fixed top-14" />
            <SidebarTrigger />
            {children}
            <ReactQueryDevtools initialIsOpen={true} />
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
