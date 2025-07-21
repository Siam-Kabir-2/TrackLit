// 'use client'
import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";
// import { useSidebar } from "../ui/sidebar";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  transactionDate: Date;
  type: "INCOME" | "EXPENSE";
}

interface TransactionCardProps {
  transactions: Transaction[];
}

export function TransactionCard({
  transactions
}: TransactionCardProps) {
  // const onMobile=true;
  const startAnimation=true;
  return (
    <div className={cn( "space-y-3")}>
      {transactions.map((transaction, index) => (
        <div
          key={transaction.id}
          className={`flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200 ${
            startAnimation
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-4"
          } ${ "rounded-xl"}`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center space-x-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                transaction.type === "INCOME"
                  ? "bg-emerald-100 dark:bg-emerald-900/30"
                  : "bg-red-100 dark:bg-red-900/30"
              }`}
            >
              <span
                className={`text-xl font-bold ${
                  transaction.type === "INCOME"
                    ? "text-emerald-500"
                    : "text-red-500"
                }`}
              >
                {transaction.type === "INCOME" ? (
                  <Plus size={20} />
                ) : (
                  <Minus size={20} />
                )}
              </span>
            </div>
            <div>
              <p className="font-medium text-sm text-slate-700 dark:text-slate-200">
                {transaction.description}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                {transaction.category} • {transaction.transactionDate.toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p
              className={`font-bold text-[14px] ml-5 ${
                transaction.type === "INCOME"
                  ? "text-emerald-500"
                  : "text-red-500"
              }`}
            >
              {transaction.type === "INCOME" ? "+" : "-"}$
              {Math.abs(transaction.amount).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
