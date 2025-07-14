"use client";
import "@/app/globals.css";
import { useState, useEffect } from "react";

import { useSidebar, SidebarTrigger } from "@/components/ui/sidebar";
import { TransactionsInfo } from "@/components/transactions/transactions";
import ExpenseCard from "@/components/expenseCate/exCard";
import PieChartAnalytics from "@/components/dashboard/pieChart";
import AnimatedCard, {
  StaggeredContainer,
} from "@/components/animations/AnimatedCard";
import { cn } from "@/lib/utils";
import DarkModeToggle from "@/components/animations/DarkModeToggle";
import Image from "next/image";
import SummaryCards from "@/components/dashboard/summaryCard";

export default function DashboardPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { state, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed";

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mt-5 px-4 md:px-7">
        <div className="text-[20px] md:text-[26px] font-bold text-black dark:text-white">
          Dashboard
        </div>
        <DarkModeToggle />
      </div>

      {/* Mobile Sidebar Trigger */}
      <SidebarTrigger className={cn("hidden", isMobile && "block fixed m-1")} />

      {/* Main Container */}
      <div className="z-1 p-4 md:p-6 min-h-screen bg-transparent transition-all duration-700">
        {/* Main Grid Layout - Responsive to sidebar state */}
        <div
          className={`grid gap-4 md:gap-6 h-full transition-all duration-300 ${
            isCollapsed
              ? "grid-cols-1 xl:grid-cols-5"
              : "grid-cols-1 lg:grid-cols-3"
          }`}
        >
          {/* Left Section - Analytics */}
          <div
            className={`space-y-4 md:space-y-6 transition-all duration-300 ${
              isCollapsed ? "xl:col-span-2" : "lg:col-span-1"
            }`}
          >
            {/* Welcome Card */}
            <AnimatedCard
              className={`bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-xl border border-gray-200 dark:border-gray-700 ${
                isCollapsed ? "lg:p-4" : ""
              }`}
              startAnimation={isLoaded}
              delay={0.1}
            >
              <div className="flex items-center space-x-3 md:space-x-4 mb-4">
                <Image
                  aria-hidden
                  src="/tracklit.svg"
                  alt="Website Logo"
                  width={isMobile ? 40 : 58}
                  height={0}
                  className="block"
                />
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-700 dark:text-slate-200">
                    {/* Dynamic greeting based on time */}
                    {(() => {
                      const hour = new Date().getHours();
                      if (hour < 12) return "Good Morning! ☀️";
                      if (hour < 17) return "Good Afternoon! 🌤️";
                      return "Good Evening! 🌙";
                    })()}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm">
                    {isCollapsed
                      ? "Your financial command center awaits"
                      : "Ready to conquer your financial goals?"}
                  </p>
                </div>
              </div>
            </AnimatedCard>

            {/* Pie Chart Analytics */}
            <AnimatedCard startAnimation={isLoaded} delay={0.2}>
              <PieChartAnalytics />
            </AnimatedCard>
          </div>

          {/* Right Section - Summary Cards & Content */}
          <div
            className={`space-y-4 md:space-y-6 transition-all duration-300 ${
              isCollapsed ? "xl:col-span-3" : "lg:col-span-2"
            }`}
          >
            {/* Summary Cards - Responsive grid */}
            <SummaryCards
              sidebarIsCollapsed={isCollapsed}
              sidebarIsLoaded={isLoaded}
            />

            {/* Content Grid - Expense Categories & Transactions */}
            <StaggeredContainer
              className={`grid gap-4 md:gap-6 transition-all duration-300 ${
                // Mobile: Always single column
                // Tablet: 2 columns when sidebar collapsed, 1 column when expanded
                // Desktop: 2 columns when sidebar collapsed, 2 columns when expanded
                isMobile
                  ? "grid-cols-1"
                  : isCollapsed
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 lg:grid-cols-2"
              }`}
              startAnimation={isLoaded}
              staggerDelay={0.15}
            >
              {/* Expense Categories Chart */}
              <AnimatedCard
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-xl border border-gray-200 dark:border-gray-700"
                startAnimation={isLoaded}
                delay={0.7}
              >
                <ExpenseCard startAnimation={isLoaded} />
              </AnimatedCard>

              {/* Recent Transactions Report */}
              <AnimatedCard
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-xl border border-gray-200 dark:border-gray-700"
                startAnimation={isLoaded}
                delay={0.8}
              >
                <TransactionsInfo startAnimation={isLoaded} />
              </AnimatedCard>
            </StaggeredContainer>
          </div>
        </div>
      </div>
    </>
  );
}
