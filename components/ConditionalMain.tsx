"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import PageTransition from "./animations/PageTransition";

export default function ConditionalMain({
  user,children
}: Readonly<{
  children: React.ReactNode;
  user?:string;
}>) {
  const pathname = usePathname();

  // Hide sidebar on root page and auth pages
  if (
    pathname === "/" ||
    pathname === "/auth/login" ||
    pathname === "/auth/signup"
  ) {
    return (
      <>
        <main className="w-full">
          <PageTransition>{children}</PageTransition>
        </main>
      </>
    );
  }

  return (
    <>
      <AppSidebar user={user}/>
      <main className="w-full pt-16 md:pt-0">
        <PageTransition>{children}</PageTransition>
      </main>
    </>
  );
}
