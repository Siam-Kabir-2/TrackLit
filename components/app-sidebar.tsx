"use client";
import {
  ChartColumnIcon,
  LayoutDashboard,
  ArrowRightLeft,
  WalletCards,
  DollarSign,
  Settings,
  User2,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import { inter } from "@/lib/fonts";
import DarkModeToggle from "@/components/animations/DarkModeToggle";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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

export function AppSidebar() {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="">
      {/* Background Image */}
      {/* <div className="absolute inset-0 z-0 ">
        <Image
          src="/sidebar-bg.svg"
          alt="Sidebar Background"
          fill
          className="object-cover opacity-40"
          priority
        />
      </div> */}

      {/* Overlay for better readability */}
      {/* <div className="absolute inset-0 bg-black/20 z-10"></div> */}
      {/* Content with higher z-index */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem
            className={`${inter.variable} flex justify-between items-start mt-4`}
          >
            <div
              className={cn(
                "flex flex-col"
              )}
            >
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
            <div className="flex items-center justify-between w-full p-2">
              {/* <DarkModeToggle /> */}
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className={` [--radix-popper-anchor-width]`}
              >
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
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
