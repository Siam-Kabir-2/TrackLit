"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  query?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  query = "",
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  // Show up to 5 page numbers, with ellipsis if needed
  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, currentPage + 1);
    if (currentPage <= 3) {
      end = Math.min(3, totalPages);
    }
    if (currentPage >= totalPages - 1) {
      start = Math.max(1, totalPages - 2);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex justify-center mt-4 text-black">
      <ul className="inline-flex items-center space-x-1">
        <li>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 rounded disabled:opacity-50 hover:bg-green-500 transition-all duration-200 group"
          >
            <ChevronLeft className="dark:text-white group-hover:scale-110 transition-transform duration-200" />
          </button>
        </li>
        {pageNumbers[0] > 1 && (
          <li>
            <button
              onClick={() => goToPage(1)}
              className="px-3 py-1 rounded bg-gray-200 hover:scale-105 hover:bg-green-500"
            >
              1
            </button>
            {pageNumbers[0] > 2 && <span className="px-1 text-black dark:text-white">...</span>}
          </li>
        )}
        {pageNumbers.map((page) => (
          <li key={page}>
            <button
              onClick={() => goToPage(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-slate-700 hover:scale-105 hover:bg-green-500"
              }`}
              disabled={currentPage === page}
            >
              {page}
            </button>
          </li>
        ))}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <li>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className="px-1 text-black dark:text-white">...</span>
            )}
            <button
              onClick={() => goToPage(totalPages)}
              className="px-3 py-1 rounded bg-gray-200 text-slate-700 hover:scale-105 hover:bg-green-500"
            >
              {totalPages}
            </button>
          </li>
        )}
        <li>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 rounded disabled:opacity-50 transition-all duration-200 group hover:bg-green-500"
          >
            <ChevronRight className="dark:text-white group-hover:scale-110 transition-transform duration-200" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
