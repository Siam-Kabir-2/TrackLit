import type { Metadata } from "next";
import "./globals.css";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { geistMono, geistSans } from "@/lib/fonts";
import PageTransition from "@/components/animations/PageTransition";


export const metadata: Metadata = {
  title: "Personal Finance Tracker",
  description: "Track your income and expenses to manage your finances better",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden `}
      >
        <SidebarProvider defaultOpen={true}>
          <AppSidebar />
          {/* <SidebarInset> */}
          <main className="w-full">
            <PageTransition>{children}</PageTransition>
          </main>
          {/* </SidebarInset> */}
        </SidebarProvider>
      </body>
    </html>
  );
}
