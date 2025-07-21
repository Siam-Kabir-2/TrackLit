"use client";
import {
  LayoutDashboard,
  ArrowRightLeft,
  WalletCards,
  DollarSign,
  User2,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import { inter } from "@/lib/fonts";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import DarkModeToggle from "./animations/DarkModeToggle";
import { handleSignOut } from "@/lib/actions";

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

export function AppSidebar({ user }: { user?: string }) {
  const { state, isMobile } = useSidebar();

  if (isMobile) {
    return <MobileNav />;
  } else
    return (
      <Sidebar collapsible="icon" variant="sidebar" className="">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem
              className={`${inter.variable} flex justify-between items-start mt-4`}
            >
              <div className={cn("flex flex-col")}>
                <div className="relative">
                  <Image
                    aria-hidden
                    src="/tracklit.svg"
                    alt="Website Logo"
                    width={58}
                    height={0}
                    className="block"
                  />
                  {/* Invisible SidebarTrigger overlay */}
                  <SidebarTrigger
                    className={cn(
                      "absolute left-0.5 top-0.5 inset-0 opacity-0 cursor-pointer w-full h-full",
                      state === "expanded" && "hidden h-0 w-0"
                    )}
                  />
                </div>
                {/* Hide text when sidebar is collapsed */}
                <div
                  className={`ml-2 tracking-tight transition-all duration-300 ease-in-out ${
                    state === "collapsed"
                      ? "opacity-0 max-w-0 overflow-hidden ml-0"
                      : "opacity-100 max-w-xs"
                  }`}
                >
                  <p className="text-3xl text-success font-bold whitespace-nowrap">
                    TrackLit
                  </p>
                  <p className="text-[12px] font-semibold text-slate-600 dark:text-slate-200 whitespace-nowrap">
                    Stay On Track
                  </p>
                </div>
              </div>
              <SidebarTrigger
                className={cn(state === "collapsed" && "hidden h-0 w-0")}
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2">
                <DarkModeToggle />
                <span className={state === "collapsed" ? "sr-only" : ""}>
                  Dark Mode
                </span>
              </div>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> {user}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className={` [--radix-popper-anchor-width] w-full`}
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <form action={handleSignOut} className="w-full">
                      <button
                        type="submit"
                        className="flex w-full items-center  text-sm hover:bg-destructive/10 hover:text-destructive rounded-sm"
                      >
                        <span>Sign out</span>
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    );
}
