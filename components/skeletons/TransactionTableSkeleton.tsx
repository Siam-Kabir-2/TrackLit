import { Skeleton } from "@/components/ui/skeleton";
import { TransactionCardSkeleton } from "./TransactionCardSkeleton";

export function TransactionTableSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
      {/* Mobile View Skeleton */}
      <div className="block md:hidden p-4">
        <TransactionCardSkeleton />
      </div>

      {/* Desktop Table View Skeleton */}
      <div className="hidden md:block">
        {/* Table Header */}
        <div className="bg-gray-50 dark:bg-gray-700/30 px-4 py-4 border-b border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-5 gap-4">
            <div className="flex items-center space-x-2">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex items-center justify-end space-x-2">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        </div>

        {/* Table Body Rows */}
        <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="px-4 py-4">
              <div className="grid grid-cols-5 gap-4 items-center">
                {/* Description column */}
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-10 h-10 rounded-xl" />
                  <Skeleton className="h-4 w-32" />
                </div>

                {/* Category column */}
                <Skeleton className="h-6 w-20 rounded-full" />

                {/* Date column */}
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>

                {/* Amount column */}
                <div className="flex flex-col items-end space-y-1">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-3 w-12" />
                </div>

                {/* Actions column */}
                <div className="flex items-center justify-end space-x-2">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="w-8 h-8 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Footer */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-700 px-6 py-3 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Skeleton className="w-3 h-3 rounded-full" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="w-3 h-3 rounded-full" />
                <Skeleton className="h-4 w-14" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
