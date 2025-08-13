import { Skeleton } from "@/components/ui/skeleton";

export function PieChartSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="h-5 w-32" />
        </div>
        <Skeleton className="h-6 w-20" />
      </div>

      {/* Circular Progress Chart */}
      <div className="flex justify-center mb-6">
        <Skeleton className="w-48 h-48 rounded-full" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
          <Skeleton className="h-4 w-16 mx-auto mb-2" />
          <Skeleton className="h-6 w-20 mx-auto" />
        </div>
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
          <Skeleton className="h-4 w-20 mx-auto mb-2" />
          <Skeleton className="h-6 w-16 mx-auto" />
        </div>
      </div>

      {/* Legend/Details */}
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Skeleton className="w-3 h-3 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
      </div>
    </div>
  );
}
