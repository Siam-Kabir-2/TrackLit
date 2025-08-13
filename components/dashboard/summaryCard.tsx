import { StaggeredContainer } from "../animations/AnimatedCard";
import AnimatedCard from "../animations/AnimatedCard";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import { getMonthlyTransactionsSummary } from "@/lib/data";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";


export default async function SummaryCards() {
  const monthlyTnxSummary = await getMonthlyTransactionsSummary();
  const cardsInfo = [
    {
      name: "Total Balance",
      value:
        (monthlyTnxSummary?.monthlyIncome || 0) -
        (monthlyTnxSummary?.monthlyExpense || 0),
      icon: TrendingUp,
      gradient: "from-emerald-500 to-emerald-600",
      textColor: "text-emerald-100",
    },
    {
      name: "Monthly Income",
      value: monthlyTnxSummary?.monthlyIncome || 0,
      icon: TrendingUp,
      gradient: "from-green-500 to-emerald-500",
      textColor: "text-green-100",
    },
    {
      name: "Monthly Expenses",
      value: monthlyTnxSummary?.monthlyExpense || 0,
      icon: TrendingDown,
      gradient: "from-red-500 to-rose-500",
      textColor: "text-red-100",
    },
  ];
  return (
    // trying with map
    <StaggeredContainer
      className={`grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
      }`}
      // startAnimation={sidebarIsLoaded}
      // staggerDelay={0.1}
    >
      {cardsInfo.map((card, index) => {
        return (
          <AnimatedCard
            key={index}
            className={cn(
              `bg-gradient-to-r ${card.gradient} rounded-2xl p-6 ${card.textColor} shadow-xl`
            )}
            // startAnimation={sidebarIsLoaded}
            delay={0.3}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">
                  {card.name}
                </p>
                <p className="text-3xl font-bold">
                  <AnimatedCounter
                    end={card.value}
                    prefix="$"
                    // startAnimation={sidebarIsLoaded}
                    duration={2.5}
                  />
                </p>
              </div>
              <div className="flex items-center mt-2">
                <card.icon className="w-4 h-4 mr-1" />
              </div>
            </div>
          </AnimatedCard>
        );
      })}
    </StaggeredContainer>
  );
}
