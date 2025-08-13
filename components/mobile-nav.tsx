"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  ArrowRightLeft,
  Menu,
  X,
  LogOut
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {  ubuntu } from "@/lib/fonts";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
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
  // {
  //   title: "Reports",
  //   url: "/reports",
  //   icon: ChartColumnIcon,
  // },
  // {
  //   title: "Budgets",
  //   url: "/budgets",
  //   icon: DollarSign,
  // },
  // {
  //   title: "Accounts",
  //   url: "/accounts",
  //   icon: WalletCards,
  // },
];

export function MobileNav({ user }: { user?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* Mobile Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/95 dark:border-gray-800 shadow-sm">
        <div className="flex items-center justify-between p-4">
          {/* Logo */}
          <Link
            href="/dashboard"
            className={`${ubuntu.variable} flex items-center gap-2`}
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
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1.5">
                <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {user?.charAt(0).toUpperCase() || "G"}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 max-w-20 truncate">
                  {user || "Guest"}
                </span>
              </div>
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Open menu"
                >
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                  <div className={`${ubuntu.variable} flex items-center gap-2 p-[5px] pb-2`}>
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {user?.charAt(0).toUpperCase() || "G"}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-success">{user}</p>
                      <p className="text-[8px] font-semibold text-gray-600 dark:text-gray-400 leading-none">
                        Welcome Back!
                      </p>
                    </div>
                  </div>
                <hr />
                {items.map((item) => (
                  <DropdownMenuItem
                    key={item.title}
                    asChild
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3"
                  >
                    <Link
                      href={item.url}
                      className="w-full flex items-center gap-3"
                    >
                      <item.icon size={18} />
                      <span className="text-sm">{item.title}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                  className="flex items-center gap-3 "
                  onClick={(e) => {
                    // Prevent event bubbling and find the toggle button
                    e.preventDefault();
                    const toggleButton = e.currentTarget.querySelector(
                      "[data-dark-mode-toggle]"
                    ) as HTMLButtonElement;
                    if (toggleButton) {
                      toggleButton.click();
                    }
                  }}
                >
                  <DarkModeToggle />
                  <span>Dark Mode</span>
                  {/* </button> */}
                </DropdownMenuItem>
                <hr />
                <DropdownMenuItem className="w-full flex items-center gap-3">
                  <LogOut size={18}/>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
}
