import { Skeleton } from "@/components/ui/skeleton";

export function SummaryCardsSkeleton() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {/* Card title skeleton */}
              <Skeleton className="h-4 w-24 mb-3" />
              {/* Amount skeleton */}
              <Skeleton className="h-8 w-20" />
            </div>
            {/* Icon skeleton */}
            <Skeleton className="w-6 h-6 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
