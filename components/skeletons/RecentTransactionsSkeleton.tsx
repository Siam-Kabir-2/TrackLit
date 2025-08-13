import { Skeleton } from "@/components/ui/skeleton";

export function RecentTransactionsSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl  shadow-xl ">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-10" />
      </div>

      {/* Recent Transaction Cards - Show 4 for dashboard */}
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
          >
            {/* Left side - Icon and transaction details */}
            <div className="flex items-center space-x-4">
              {/* Transaction type icon skeleton */}
              <Skeleton className="w-8 h-8 rounded-full" />

              <div className="space-y-1">
                {/* Description skeleton */}
                <Skeleton className="h-4 w-20" />
                {/* Category and date skeleton */}
                <Skeleton className="h-3 w-18" />
              </div>
            </div>

            {/* Right side - Amount and action buttons */}
            <div className="flex items-center space-x-2">
              {/* Amount skeleton */}
              <Skeleton className="h-4 w-14" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
