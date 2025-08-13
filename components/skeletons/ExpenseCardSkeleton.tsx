import { Skeleton } from "@/components/ui/skeleton";

export function ExpenseCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Skeleton className="w-5 h-5" />
            <Skeleton className="h-5 w-36" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Chart Area */}
        <div className="space-y-4">
          {/* Chart Container */}
          <div className="h-64 bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
            {/* Chart skeleton with grid lines */}
            <div className="h-full flex flex-col justify-between">
              {/* Y-axis area */}
              <div className="flex-1 relative">
                {/* Horizontal grid lines */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full border-b border-gray-200 dark:border-gray-600"
                    style={{ top: `${i * 25}%` }}
                  />
                ))}

                {/* Chart lines simulation */}
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-16 bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 dark:from-green-800 dark:via-blue-800 dark:to-purple-800 rounded opacity-30" />
                </div>
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between pt-2 mt-2 border-t border-gray-200 dark:border-gray-600">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-3 w-8" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-3 w-48" />
        </div>
      </div>
    </div>
  );
}
