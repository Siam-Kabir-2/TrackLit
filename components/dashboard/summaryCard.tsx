import { StaggeredContainer } from "../animations/AnimatedCard";
import AnimatedCard from "../animations/AnimatedCard";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
} from "lucide-react";

// Define the component props interface
interface SummaryCardsProps {
  sidebarIsCollapsed: boolean;
  sidebarIsLoaded: boolean;
}


const cardsInfo = [
  {
    name: "Total Balance",
    value: 12450,
    icon: TrendingUp,
    gradient: "from-emerald-500 to-emerald-600",
    textColor: "text-emerald-100",
  },
  {
    name: "Monthly Income",
    value: 6200,
    icon: TrendingUp,
    gradient: "from-green-500 to-emerald-500",
    textColor: "text-green-100",
  },
  {
    name: "Monthly Expenses",
    value: 3200,
    icon: TrendingDown,
    gradient: "from-red-500 to-rose-500",
    textColor: "text-red-100",
  },
];

export default function SummaryCards({
  sidebarIsCollapsed,
  sidebarIsLoaded,
}: SummaryCardsProps) {
  return (
    // <StaggeredContainer
    //   className={`grid gap-4 ${
    //     sidebarIsCollapsed
    //       ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    //       : "grid-cols-1 md:grid-cols-3"
    //   }`}
    //   startAnimation={sidebarIsLoaded}
    //   staggerDelay={0.1}
    // >
    //   {/* Total Balance */}
    //   <AnimatedCard
    //     className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl"
    //     startAnimation={sidebarIsLoaded}
    //     delay={0.3}
    //   >
    //     <div className="flex items-center justify-between">
    //       <div>
    //         <p className="text-emerald-100 text-sm font-medium">
    //           Total Balance
    //         </p>
    //         <p className="text-3xl font-bold">
    //           <AnimatedCounter
    //             end={totalBudget + 7450}
    //             prefix="$"
    //             startAnimation={sidebarIsLoaded}
    //             duration={2.5}
    //           />
    //         </p>
    //         <div className="flex items-center mt-2">
    //           <TrendingUp className="w-4 h-4 mr-1" />
    //           <span className="text-sm">+12.5%</span>
    //         </div>
    //       </div>
    //       <motion.div
    //         animate={{ rotate: 360 }}
    //         transition={{
    //           duration: 20,
    //           repeat: Infinity,
    //           ease: "linear",
    //         }}
    //       >
    //         <DollarSign className="w-12 h-12 text-emerald-200" />
    //       </motion.div>
    //     </div>
    //   </AnimatedCard>

    //   {/* Monthly Income */}
    //   <AnimatedCard
    //     className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-xl"
    //     startAnimation={sidebarIsLoaded}
    //     delay={0.4}
    //   >
    //     <div className="flex items-center justify-between">
    //       <div>
    //         <p className="text-green-100 text-sm font-medium">Monthly Income</p>
    //         <p className="text-3xl font-bold">
    //           <span className="text-green-200">+</span>
    //           <AnimatedCounter
    //             end={6200}
    //             prefix="$"
    //             startAnimation={sidebarIsLoaded}
    //             duration={2}
    //           />
    //         </p>
    //         <div className="flex items-center mt-2">
    //           <TrendingUp className="w-4 h-4 mr-1" />
    //           <span className="text-sm">+8.2%</span>
    //         </div>
    //       </div>
    //       <motion.div
    //         animate={{ y: [-2, 2, -2] }}
    //         transition={{
    //           duration: 2,
    //           repeat: Infinity,
    //           ease: "easeInOut",
    //         }}
    //       >
    //         <TrendingUp className="w-12 h-12 text-green-200" />
    //       </motion.div>
    //     </div>
    //   </AnimatedCard>

    //   {/* Monthly Expenses */}
    //   <AnimatedCard
    //     className="bg-gradient-to-r from-red-500 to-rose-500 rounded-2xl p-6 text-white shadow-xl"
    //     startAnimation={sidebarIsLoaded}
    //     delay={0.5}
    //   >
    //     <div className="flex items-center justify-between">
    //       <div>
    //         <p className="text-red-100 text-sm font-medium">Monthly Expenses</p>
    //         <p className="text-3xl font-bold">
    //           <span className="text-red-200">-</span>
    //           <AnimatedCounter
    //             end={totalExpenses}
    //             prefix="$"
    //             startAnimation={sidebarIsLoaded}
    //             duration={2}
    //           />
    //         </p>
    //         <div className="flex items-center mt-2">
    //           <TrendingDown className="w-4 h-4 mr-1" />
    //           <span className="text-sm">-3.1%</span>
    //         </div>
    //       </div>
    //       <motion.div
    //         animate={{ y: [2, -2, 2] }}
    //         transition={{
    //           duration: 2,
    //           repeat: Infinity,
    //           ease: "easeInOut",
    //         }}
    //       >
    //         <TrendingDown className="w-12 h-12 text-red-200" />
    //       </motion.div>
    //     </div>
    //   </AnimatedCard>

    //   {/* Additional cards when sidebar is collapsed */}
    //   {sidebarIsCollapsed && (
    //     <AnimatedCard
    //       className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl"
    //       startAnimation={sidebarIsLoaded}
    //       delay={0}
    //     >
    //       <div className="flex items-center justify-between">
    //         <div>
    //           <p className="text-blue-100 text-sm font-medium">Investment</p>
    //           <p className="text-3xl font-bold">
    //             <span className="text-blue-200">+</span>
    //             <AnimatedCounter
    //               end={2450}
    //               prefix="$"
    //               startAnimation={sidebarIsLoaded}
    //               duration={2}
    //             />
    //           </p>
    //           <div className="flex items-center mt-2">
    //             <TrendingUp className="w-4 h-4 mr-1" />
    //             <span className="text-sm">+15.3%</span>
    //           </div>
    //         </div>
    //         <motion.div
    //           animate={{ rotate: [0, 10, -10, 0] }}
    //           transition={{
    //             duration: 3,
    //             repeat: Infinity,
    //             ease: "easeInOut",
    //           }}
    //         >
    //           <Activity className="w-12 h-12 text-blue-200" />
    //         </motion.div>
    //       </div>
    //     </AnimatedCard>
    //   )}
    // </StaggeredContainer>

    // trying with map
    <StaggeredContainer
      className={`grid gap-4 ${
        sidebarIsCollapsed
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 "
          : "grid-cols-1 md:grid-cols-3"
      }`}
      startAnimation={sidebarIsLoaded}
      staggerDelay={0.1}
    >
      {cardsInfo.map((card, index) => {
        return (
          <AnimatedCard key={index}
            className={cn(
              `bg-gradient-to-r ${card.gradient} rounded-2xl p-6 ${card.textColor} shadow-xl`
            )}
            startAnimation={sidebarIsLoaded}
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
                    startAnimation={sidebarIsLoaded}
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
