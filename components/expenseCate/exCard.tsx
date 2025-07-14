import { BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import AnimatedProgressBar from "@/components/animations/AnimatedProgressBar";
import { motion } from "framer-motion";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
import { TrendingUp } from "lucide-react";
// import '@/app/globals'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const expenseCategories = [
  {
    name: "Food",
    amount: 1200,
    color: "bg-red-500",
    percentage: 37.5,
    isOverBudget: true,
  },
  {
    name: "Transport",
    amount: 800,
    color: "bg-blue-500",
    percentage: 25,
    isOverBudget: false,
  },
  {
    name: "Entertainment",
    amount: 600,
    color: "bg-amber-500",
    percentage: 18.75,
    isOverBudget: false,
  },
  {
    name: "Bills",
    amount: 600,
    color: "bg-emerald-500",
    percentage: 18.75,
    isOverBudget: false,
  },
];

// Chart data for expense trends
const chartData = [
  { month: "Jan", food: 2000, transport: 1500, entertainment: 800, bills: 900 },
  { month: "Feb", food: 1100, transport: 750, entertainment: 450, bills: 550 },
  { month: "Mar", food: 1450, transport: 800, entertainment: 100, bills: 880 },
  { month: "Apr", food: 1200, transport: 420, entertainment: 550, bills: 600 },
  { month: "May", food: 1250, transport: 780, entertainment: 280, bills: 590 },
  { month: "Jun", food: 1700, transport: 500, entertainment: 700, bills: 300 },
];

const chartConfig = {
  food: {
    label: "Food",
    color: "hsl(var(--chart-1))",
  },
  transport: {
    label: "Transport",
    color: "hsl(var(--chart-2))",
  },
  entertainment: {
    label: "Entertainment",
    color: "hsl(var(--chart-3))",
  },
  bills: {
    label: "Bills",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;
export default function ExpenseCard({ startAnimation = false }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (startAnimation) {
      // Start card animations after page animation completes
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 300); // Delay to let page animation finish first

      return () => clearTimeout(timer);
    }
  }, [startAnimation]);
  return (
    <>
      <Card className="border-0 shadow-none bg-transparent py-0 space-y-8">
        {/* <CardHeader className="pb-4 ">
          <CardTitle className="text-[18px] font-bold text-slate-700 dark:text-slate-200 flex items-center justify-start">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
            Expense Categories
          </CardTitle>
          <CardDescription className="text-[12px] text-slate-400">
            Monthly expense trends by category
          </CardDescription>
        </CardHeader> */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[18px] font-bold text-slate-700 dark:text-slate-200 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
            Expense Categories
          </h3>
          <p className="text-[12px] text-slate-400">
            Monthly
          </p>
        </div>
        <CardContent className="px-0">
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 12 }}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="food"
                type="monotone"
                stroke="green"
                strokeWidth={2}
                dot={{ fill: "green", strokeWidth: 0, r: 3 }}
              />
              <Line
                dataKey="transport"
                type="monotone"
                stroke="blue"
                strokeWidth={2}
                dot={{ fill: "blue", strokeWidth: 0, r: 3 }}
              />
              <Line
                dataKey="entertainment"
                type="monotone"
                stroke="purple"
                strokeWidth={2}
                dot={{
                  fill: "purple",
                  strokeWidth: 0,
                  r: 3,
                }}
              />
              <Line
                dataKey="bills"
                type="monotone"
                stroke="red"
                strokeWidth={2}
                dot={{ fill: "red", strokeWidth: 0, r: 3 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>

        <CardFooter className="flex-col items-start gap-2 text-sm px-0">
          <div className="flex items-center gap-2 font-medium leading-none text-slate-700 dark:text-slate-200">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            Food expenses increased by 20% this month
          </div>
          <div className="leading-none text-slate-500 dark:text-slate-400 text-xs">
            Showing expense trends for the last 6 months
          </div>
        </CardFooter>
      </Card>

      {/* Commented out original expense categories list */}
      {/* <div className="flex items-center justify-between mb-6">
        <h3 className="text-[18px] font-bold text-slate-700 dark:text-slate-200 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
          Expense Categories
        </h3>
        <span className="text-[10px] text-slate-400">This Month</span>
      </div> */}

      {/* <div className="space-y-4">
        {expenseCategories.map((category, index) => (
          <div
            key={category.name}
            className={`group hover:bg-slate-50 dark:hover:bg-slate-950 p-3 rounded-lg transition-all duration-200 ${
              category.isOverBudget
                ? "bg-red-50 dark:bg-orange-200 border border-red-200"
                : "dark:bg-slate-900"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-4 h-4 rounded-full ${category.color} relative`}
                >
                  {category.isOverBudget && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </div>
                <span
                  className={`font-medium ${
                    category.isOverBudget
                      ? "text-red-600"
                      : "text-slate-700 dark:text-slate-200"
                  }`}
                >
                  {category.name}
                  {category.isOverBudget && (
                    <span className="ml-2 text-[10px] bg-red-50 text-red-600 px-1  rounded-full">
                      Over Budget
                    </span>
                  )}
                </span>
              </div>
              <span
                className={`font-bold ${
                  category.isOverBudget
                    ? "text-red-600"
                    : "text-slate-700 dark:text-slate-200"
                }`}
              >
                -${category.amount.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <AnimatedProgressBar
                percentage={category.percentage}
                color={category.color}
                backgroundColor="bg-gray-200 dark:bg-white"
                height="h-2"
                startAnimation={isLoaded}
                duration={1.5}
              />
            </div>
          </div>
        ))}
      </div> */}
    </>
  );
}
