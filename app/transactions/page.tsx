"use client";
import { TransactionsInfo } from "@/components/transactions/transactions";
import { useEffect, useState } from "react";
import { useSidebar, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import DarkModeToggle from "@/components/animations/DarkModeToggle";
import AnimatedCard from "@/components/animations/AnimatedCard";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TnxPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const { isMobile } = useSidebar();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mt-5 px-7">
        <div className="text-[26px] font-bold text-black dark:text-white">
          Transactions
        </div>
        <DarkModeToggle />
      </div>

      {/* Mobile Sidebar Trigger */}
      <SidebarTrigger className={cn("hidden", isMobile && "block fixed m-1")} />

      {/* Main Content */}
      <div className="z-1 p-4 md:p-6  bg-transparent transition-all duration-700">
        {/* Search and Actions Bar */}
        <AnimatedCard
          className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-xl border border-gray-200 dark:border-gray-700"
          startAnimation={isLoaded}
          hoverScale={1.0}
          hoverY={0}
          delay={0.05}
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-2  w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                <Plus className="h-4 w-4" />
                Add Transaction
              </Button>
            </div>
          </div>
        </AnimatedCard>

        {/* Full width container that respects sidebar states */}
        <div className="w-full">
          <AnimatedCard
            className=" bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
            startAnimation={isLoaded}
            hoverScale={1.0}
            hoverY={0}
            delay={0.1}
          >
            <TransactionsInfo
              startAnimation={isLoaded}
              onMobile={isMobile}
              searchTerm={searchTerm}
            />
          </AnimatedCard>
        </div>

        {/* Add Transaction Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <AnimatedCard
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md"
              startAnimation={showAddForm}
              hoverScale={1.0}
              hoverY={0}
              delay={0.1}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200">
                  Add New Transaction
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Description
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter transaction description"
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Amount
                    </label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Type
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-slate-700 dark:text-slate-200">
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Category
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-slate-700 dark:text-slate-200">
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="shopping">Shopping</option>
                    <option value="bills">Bills</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="income">Income</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Date
                  </label>
                  <Input
                    type="date"
                    className="w-full"
                    defaultValue={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                    onClick={() => {
                      // Handle form submission here
                      setShowAddForm(false);
                    }}
                  >
                    Add Transaction
                  </Button>
                </div>
              </form>
            </AnimatedCard>
          </div>
        )}
      </div>
    </>
  );
}
