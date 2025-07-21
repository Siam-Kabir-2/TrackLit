import { TransactionsInfo } from "@/components/transactions/transactions";
import ExpenseCard from "@/components/expenseCate/exCard";
import SummaryCards from "@/components/dashboard/summaryCard";
import Analytics from "@/components/dashboard/Analytics";

export default function DashboardPage() {
  return (
    <>
      <div className="flex justify-between items-center ">
        <div className="mt-5 px-4 md:px-7 text-[20px] md:text-[26px] font-bold text-black dark:text-white">
          Dashboard
        </div>
      </div>
      <div className="z-1 p-4 md:p-6 grid gap-4 md:gap-6 h-full grid-cols-1 lg:grid-cols-3 bg-transparent transition-all duration-700">
        <Analytics />
        <div className="space-y-4 md:space-y-6 lg:col-span-2">
          <SummaryCards sidebarIsCollapsed={false} sidebarIsLoaded={true} />
          <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
            <ExpenseCard />
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <TransactionsInfo
                pathName="/dashboard"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
