import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ubuntu } from "@/lib/fonts";
import ConditionalMain from "@/components/ConditionalMain";
import { currUser } from "@/lib/actions";
import { LoadingIndicator } from "@/components/ui/loading-indicator";

export const metadata: Metadata = {
  title: "Personal Finance Tracker",
  description: "Track your income and expenses to manage your finances better",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user=await currUser();
  
  return (
    <html lang="en" className={`${ubuntu.variable}`}>
      <body
        className={`font-[ubuntu] antialiased overflow-x-hidden `}
      >
        <LoadingIndicator />
        <SidebarProvider defaultOpen={true}>
          <ConditionalMain user={user?.username || "Guest"}>{children}
          </ConditionalMain >
        </SidebarProvider>
      </body>
    </html>
  );
}
