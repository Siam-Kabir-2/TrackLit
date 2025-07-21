"use client";

import { useState } from "react";
import {
  ChartColumnIcon,
  LayoutDashboard,
  ArrowRightLeft,
  WalletCards,
  DollarSign,
  User2,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { inter } from "@/lib/fonts";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import DarkModeToggle from "@/components/animations/DarkModeToggle";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: ArrowRightLeft,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: ChartColumnIcon,
  },
  {
    title: "Budgets",
    url: "/budgets",
    icon: DollarSign,
  },
  {
    title: "Accounts",
    url: "/accounts",
    icon: WalletCards,
  },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/95 dark:border-gray-800 shadow-sm">
        <div className="flex items-center justify-between p-4">
          {/* Logo */}
          <Link
            href="/dashboard"
            className={`${inter.variable} flex items-center gap-2`}
          >
            <Image
              src="/tracklit.svg"
              alt="TrackLit Logo"
              width={32}
              height={32}
            />
            <div>
              <p className="text-xl font-bold text-success">TrackLit</p>
              <p className="text-[10px] font-semibold text-gray-600 dark:text-gray-400 leading-none">
                Stay On Track
              </p>
            </div>
          </Link>

          {/* Right side - User menu and hamburger */}
          <div className="flex items-center gap-2">
            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <User2 size={18} />
                  <ChevronDown size={14} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="border-t border-gray-200 dark:border-gray-800 bg-white/95 backdrop-blur-md dark:bg-gray-900/95 shadow-lg">
            <div className="p-4 space-y-1">
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <Link
                    key={item.title}
                    href={item.url}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-success/10 text-success font-medium"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    )}
                  >
                    <item.icon size={18} />
                    <span className="text-sm">{item.title}</span>
                  </Link>
                );
              })}

              {/* Dark Mode Toggle - Only in mobile dropdown */}
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Dark Mode
                </span>
                <DarkModeToggle />
              </div><div
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                onClick={() => {
                  const darkModeButton = document.querySelector(
                    "[data-dark-mode-toggle]"
                  ) as HTMLElement;
                  if (darkModeButton) {
                    darkModeButton.click();
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
