import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { geistMono, geistSans } from "@/lib/fonts";
import ConditionalMain from "@/components/ConditionalMain";
import { currUser } from "@/lib/actions";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden `}
      >
        <SidebarProvider defaultOpen={true}>
          <ConditionalMain user={user?.username || "Guest"}>{children}
          </ConditionalMain >
        </SidebarProvider>
      </body>
    </html>
  );
}
