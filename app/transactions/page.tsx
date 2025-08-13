
import { TransactionsInfo } from "@/components/transactions/transactions";
import Search from "@/components/transactions/search";
import {  getTransactionsPages } from "@/lib/data";
import Pagination from "@/components/transactions/Pagination";
import AddTnxModalHelp from "@/components/transactions/addtnxmodalhelper";
import { TransactionTableSkeleton } from "@/components/skeletons";
import { Suspense } from "react";

export default async function TnxPage({ searchParams }: { searchParams: any }) {
  const params = await searchParams;
  const search = params?.query || "";
  const page = Number(params?.page) || 1;
  const totalPages = await getTransactionsPages(search);
  return (
    <>
      <div className="flex justify-between items-center ">
        <div className="mt-5 px-4 md:px-7 text-[20px] md:text-[26px] font-bold text-black dark:text-white">
          Transactions
        </div>
      </div>
      <div className="z-1 p-4 md:p-6 bg-transparent transition-all duration-700 space-y-4">
        <div className="flex  flex-row gap-4 items-center justify-between">
          <Search placeholder={"search"} />
          <AddTnxModalHelp />
        </div>
        <div className="w-full">
          <Suspense fallback={<TransactionTableSkeleton/>}><TransactionsInfo pathName="/transactions" searchTerm={search} page={page}/></Suspense>
        </div>
        <Pagination currentPage={page} totalPages={totalPages} query={search} />
      </div>
    </>
  );
}
