'use client'
import DarkModeToggle from "@/components/animations/DarkModeToggle";
import Image from "next/image";

export default function authLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
        <main>
          <nav className="flex items-center justify-between w-full p-4 ">
            <div className="flex items-center space-x-2">
              <Image
                src="/tracklit.svg"
                alt="TrackLit Logo"
                width={40}
                height={40}
                className="block"
              />
              <span className="text-[27px] font-bold text-gray-900 dark:text-white">
                TrackLit
              </span>
            </div>
            <DarkModeToggle />
          </nav>
          {children}
        </main>
  );
}
