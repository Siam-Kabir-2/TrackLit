import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: "income" | "expense";
}

interface TransactionCardProps {
  transactions: Transaction[];
  startAnimation: boolean;
  onMobile?:boolean;
}

export function TransactionCard({ transactions, startAnimation,onMobile }: TransactionCardProps) {
  return (
    <div className={cn(!onMobile && "space-y-3")}>
      {transactions.map((transaction, index) => (
        <div
          key={transaction.id}
          className={`flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200 ${
            startAnimation ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          } ${!onMobile && 'rounded-xl' }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center space-x-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                transaction.type === "income" 
                  ? "bg-emerald-100 dark:bg-emerald-900/30" 
                  : "bg-red-100 dark:bg-red-900/30"
              }`}
            >
              <span
                className={`text-xl font-bold ${
                  transaction.type === "income"
                    ? "text-emerald-500"
                    : "text-red-500"
                }`}
              >
                {transaction.type === "income" ? <Plus size={20}/> : <Minus size={20}/>}
              </span>
            </div>
            <div>
              <p className="font-medium text-slate-700 dark:text-slate-200">
                {transaction.description}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                {transaction.category} • {transaction.date}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p
              className={`font-bold text-[16px] ml-5 ${
                transaction.type === "income"
                  ? "text-emerald-500"
                  : "text-red-500"
              }`}
            >
              {transaction.type === "income" ? "+" : "-"}$
              {Math.abs(transaction.amount).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}