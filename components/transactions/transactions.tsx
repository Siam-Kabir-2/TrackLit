
import { TransactionCard } from "./tnxCard";
import { TransactionTable } from "./tnxTable";
// import { getTransactions } from "@/lib/data";
import { getFilteredTransactions } from "@/lib/data";
export interface TxnCardProps {
  searchTerm?: string;
  page?: number;
  pathName?: string; // Add this prop to receive real data
}

export async function TransactionsInfo({
  searchTerm = "",
  pathName,
  page,
}: TxnCardProps) {
  const tnx = await getFilteredTransactions(searchTerm, page);
  // const transactions = await getTransactions();
  const isTransactionsPage = pathName === "/transactions";
  // Filter transactions based on search term
  // const filteredTransactions = transactions?.filter(
  //   (transaction) =>
  //     transaction.description
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase()) ||
  //     transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const displayTransactions = isTransactionsPage
    ? tnx ?? []
    : (tnx ?? []).slice(0, 4);

  return (
    <>
      {!isTransactionsPage && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[18px] font-bold text-slate-700 dark:text-slate-100">
            Recent Transactions
          </h3>
          {!isTransactionsPage && (
            <a
              href="/transactions"
              className="text-blue-500 hover:text-blue-600 font-medium text-[11px] transition-colors"
            >
              View All
            </a>
          )}
        </div>
      )}

      {isTransactionsPage ? (
        <TransactionTable transactions={displayTransactions} />
      ) : (
        <TransactionCard transactions={displayTransactions} pathname="/transactions"/>
      )}
    </>
  );
}
