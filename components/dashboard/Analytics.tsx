import Image from "next/image";
import PieChartAnalytics from "./pieChart";
function getTimeBasedGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning! ☀️";
  if (hour < 17) return "Good Afternoon! 🌤️";
  return "Good Evening! 🌙";
}
export default function Analytics() {
  const greeting = getTimeBasedGreeting();

  return (
    <div className="space-y-4 md:space-y-6 lg:col-span-1">
      {/* Welcome Card - Static version without animations */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 md:space-x-4 mb-4">
          <Image
            aria-hidden
            src="/tracklit.svg"
            alt="Website Logo"
            width={58}
            height={0}
            className="block"
          />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-slate-700 dark:text-slate-200">
              {greeting}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm">
              Ready to conquer your financial goals?
            </p>
          </div>
        </div>
      </div>

      <PieChartAnalytics />
    </div>
  );
}
