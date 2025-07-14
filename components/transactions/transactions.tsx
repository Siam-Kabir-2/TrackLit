import { usePathname } from "next/navigation";
import { TransactionCard } from "./tnxCard";
import { TransactionTable } from "./tnxTable";

export interface TxnCardProps {
  startAnimation: boolean;
  onMobile?: boolean;
  searchTerm?: string;
}

const recentTransactions = [
  {
    id: 1,
    description: "Grocery Store",
    amount: -85.5,
    category: "Food",
    date: "Today",
    type: "expense" as const,
  },
  {
    id: 2,
    description: "Salary",
    amount: 3200.0,
    category: "Income",
    date: "2 days ago",
    type: "income" as const,
  },
  {
    id: 3,
    description: "Coffee Shop",
    amount: -4.5,
    category: "Food",
    date: "Yesterday",
    type: "expense" as const,
  },
  {
    id: 4,
    description: "Gas Station",
    amount: -45.0,
    category: "Transport",
    date: "3 days ago",
    type: "expense" as const,
  },
];

export function TransactionsInfo({
  startAnimation,
  onMobile,
  searchTerm = "",
}: TxnCardProps) {
  const pathName = usePathname();
  const isTransactionsPage = pathName === "/transactions";

  // Filter transactions based on search term
  const filteredTransactions = recentTransactions.filter(
    (transaction) =>
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayTransactions = isTransactionsPage
    ? filteredTransactions
    : filteredTransactions.slice(0, 4);

  return (
    <>
      {!isTransactionsPage && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[18px] font-bold text-slate-700 dark:text-slate-100">
            Recent Transactions
          </h3>
          {!isTransactionsPage && (
            <button className="text-blue-500 hover:text-blue-600 font-medium text-[11px] transition-colors">
              View All
            </button>
          )}
        </div>
      )}

      {isTransactionsPage ? (
        <TransactionTable
          transactions={displayTransactions}
          startAnimation={startAnimation}
        />
      ) : (
        <TransactionCard
          transactions={displayTransactions}
          startAnimation={startAnimation}
          onMobile={onMobile}
        />
      )}
    </>
  );
}
