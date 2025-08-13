import Link from "next/link";
import { Frown } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-2">
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <Frown size={64} className=" text-gray-400" />
        <h2 className="text-xl font-semibold">404 Not Found</h2>
        <p>Could not find the requested invoice.</p>
        <Link
          href="/transactions"
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        >
          Go Back
        </Link>
      </div>
    </main>
  );
}
