import SearchBar from "@/components/transactions/SearchBar";
import ActionBar from "@/components/transactions/ActionBar";
import { TransactionsInfo } from "@/components/transactions/transactions";

export default function TnxPage() {
  return (
    <>
      <div className="flex justify-between items-center ">
        <div className="mt-5 px-4 md:px-7 text-[20px] md:text-[26px] font-bold text-black dark:text-white">
          Transactions
        </div>
      </div>
      <div className="z-1 p-4 md:p-6 bg-transparent transition-all duration-700 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <SearchBar />
          <ActionBar />
        </div>
        <div className="w-full">
          <TransactionsInfo pathName="/transactions" />
        </div>
      </div>
    </>
  );
}
