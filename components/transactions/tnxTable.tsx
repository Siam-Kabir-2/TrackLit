// 'use client'
// import { useSidebar } from "../ui/sidebar";
import { Plus, Minus, FileText, Tag, Calendar, DollarSign } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TransactionCard } from "./tnxCard";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  transactionDate: Date;
  type: "INCOME" | "EXPENSE";
}

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({
  transactions
}: TransactionTableProps) {
  // const onMobile=true;
  const startAnimation=true;
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
      {/* Mobile View - Use existing TnxCard component */}
      <div className="block md:hidden">
        <TransactionCard
          transactions={transactions}
        />
      </div>

      {/* Desktop View - Table */}
      <div className="hidden md:block">
        <Table className="">
          <TableHeader className="px-4">
            <TableRow className="bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300 py-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Description</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300 py-4">
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4" />
                  <span>Category</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300 py-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Date</span>
                </div>
              </TableHead>
              <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-300 py-4">
                <div className="flex items-center justify-end space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>Amount</span>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tnx, index) => (
              <TableRow
                key={tnx.id}
                className={`group hover:bg-gradient-to-r hover:from-slate-50 hover:to-transparent dark:hover:from-gray-700/30 dark:hover:to-transparent transition-all duration-200 border-b border-gray-100 dark:border-gray-700/50 ${
                  startAnimation
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <TableCell className="py-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm border-2 transition-all duration-200 ${
                        tnx.type === "INCOME"
                          ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
                          : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                      }`}
                    >
                      <span
                        className={`${
                          tnx.type === "INCOME"
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {tnx.type === "INCOME" ? (
                          <Plus size={16} />
                        ) : (
                          <Minus size={16} />
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="text-[16px] font-semibold text-slate-800 dark:text-slate-200 transition-colors">
                        {tnx.description}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm border transition-all duration-200 ${
                      tnx.type === "INCOME"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800"
                        : "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                    }`}
                  >
                    {tnx.category}
                  </span>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex flex-col">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {tnx.transactionDate.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right py-4">
                  <div className="flex flex-col items-end">
                    <span
                      className={`font-bold text-lg transition-all duration-200 ${
                        tnx.type === "INCOME"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {tnx.type === "INCOME" ? "+" : "-"}$
                      {Math.abs(tnx.amount).toFixed(2)}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {tnx.type === "INCOME" ? "Credit" : "Debit"}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Empty State */}
      {transactions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <FileText className="w-8 h-8 text-slate-400 dark:text-slate-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
            No transactions found
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            Start by adding your first transaction
          </p>
        </div>
      )}

      {/* Table Footer - Hidden on mobile since TnxCard doesn't need it */}
      <div className="hidden md:block bg-gradient-to-r from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-700 px-6 py-3 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
          <span>Showing {transactions.length} transactions</span>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
              Income
            </span>
            <span className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              Expense
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
