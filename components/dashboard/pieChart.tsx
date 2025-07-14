import { PieChart } from "lucide-react";
import { AnimatedCircularProgress } from "@/components/animations/AnimatedProgressBar";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import { motion } from "framer-motion";
// // Sample data
//   const totalBudget = 5000;
//   const totalExpenses = 3200;
//   const remaining = totalBudget - totalExpenses;
//   const percentage = (totalExpenses / totalBudget) * 100;

interface PieChartAnalyticsProps {
  totalBudget?: number;
  totalExpenses?: number;
}

export default function PieChartAnalytics({
  totalBudget = 5000,
  totalExpenses = 3200,
}: PieChartAnalyticsProps) {
  const remaining = totalBudget - totalExpenses;
  const percentage = (totalExpenses / totalBudget) * 100;
  return (
    <div className="bg-whiite dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      <motion.div
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 flex items-center">
          <PieChart className="w-5 h-5 mr-2 text-emerald-500" />
          Budget Overview
        </h3>
        <span className="text-xl font-bold text-emerald-500">
          <AnimatedCounter
            end={remaining}
            prefix="$"
            startAnimation={true}
            duration={2}
          />
        </span>
      </motion.div>

      {/* Circular Progress */}
      <div className="flex justify-center mb-6">
        <AnimatedCircularProgress
          percentage={percentage}
          size={192}
          strokeWidth={18}
          color="#10b981"
          backgroundColor="#e2e8f0"
          startAnimation={true}
          duration={2.5}
        />
      </div>

      {/* Budget Breakdown */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="flex justify-between items-center">
          <span className="text-slate-600 dark:text-slate-300">
            Total Budget
          </span>
          <span className="font-bold text-slate-700 dark:text-slate-200">
            <AnimatedCounter
              end={totalBudget}
              prefix="$"
              startAnimation={true}
              duration={2}
            />
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600 dark:text-slate-300">
            Total Expenses
          </span>
          <span className="font-bold text-red-500">
            -
            <AnimatedCounter
              end={totalExpenses}
              prefix="$"
              startAnimation={true}
              duration={2}
            />
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600 dark:text-slate-300">Remaining</span>
          <span className="font-bold text-emerald-500">
            <AnimatedCounter
              end={remaining}
              prefix="$"
              startAnimation={true}
              duration={2}
            />
          </span>
        </div>
      </motion.div>
    </div>
  );
}
