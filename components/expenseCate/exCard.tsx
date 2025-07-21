'use client'
import { BarChart3 } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { TrendingUp } from "lucide-react";
// import '@/app/globals'
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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
export default function ExpenseCard() {
  return (
    <>
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-xl border border-gray-200 dark:border-gray-700"
      >
        <Card className="border-0 shadow-none bg-transparent py-0 space-y-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[18px] font-bold text-slate-700 dark:text-slate-200 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
              Expense Categories
            </h3>
            <p className="text-[12px] text-slate-400">Monthly</p>
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
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
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
      </div>
    </>
  );
}
