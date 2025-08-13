import { Skeleton } from "@/components/ui/skeleton";

export function TransactionCardSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
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
              <Skeleton className="h-4 w-32" />
              {/* Category and date skeleton */}
              <Skeleton className="h-3 w-24" />
            </div>
          </div>

          {/* Right side - Amount and action buttons */}
          <div className="flex items-center space-x-2">
            {/* Amount skeleton */}
            <Skeleton className="h-4 w-16" />
            {/* Edit button skeleton */}
            <Skeleton className="w-8 h-8 rounded-full" />
            {/* Delete button skeleton */}
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
