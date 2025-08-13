import { TransactionsInfo } from "@/components/transactions/transactions";
import SummaryCards from "@/components/dashboard/summaryCard";
import Analytics from "@/components/dashboard/Analytics";
import ExCardWrapper from "@/components/expenseCate/exCardWrapper";
import { Suspense } from "react";
import { ExpenseCardSkeleton, SummaryCardsSkeleton } from "@/components/skeletons";
import { RecentTransactionsSkeleton } from "@/components/skeletons/RecentTransactionsSkeleton";

export default async function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">

      <div className="flex justify-between items-center ">
        <div className="mt-5 px-4 md:px-7 text-[20px] md:text-[26px] font-bold text-black dark:text-white">
          Dashboard
        </div>
      </div>

      <div className="flex-1 z-1 p-4 md:p-6 grid gap-4 md:gap-6 h-full grid-cols-1 lg:grid-cols-3 items-stretch bg-transparent transition-all duration-700">
        
        {/* Analytics card fills height */}
        <div className="h-full">
          <Analytics />
        </div>

        <div className="space-y-4 md:space-y-6 lg:col-span-2 flex flex-col h-full">
          <Suspense fallback={<SummaryCardsSkeleton/>}><SummaryCards /></Suspense>
          
          <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2 items-stretch flex-1">
            <Suspense fallback={<ExpenseCardSkeleton/>}><ExCardWrapper /></Suspense>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-xl border border-gray-200 dark:border-gray-700 h-full">
              <Suspense fallback={<RecentTransactionsSkeleton/>}><TransactionsInfo pathName="/dashboard" /></Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
