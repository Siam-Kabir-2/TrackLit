import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateTransaction } from "@/lib/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function UpdateTnxModel({
  id,
  prevTnx,
}: {
  id: string;
  prevTnx?: {
    description: string;
    amount: number;
    type: "INCOME" | "EXPENSE";
    category: string;
    transactionDate: Date;
  };
}) {
  const today = new Date().toISOString().split("T")[0];

  // Server action for handling form submission
  async function handleUpdate(formData: FormData) {
    "use server";
    await updateTransaction(id, formData);
    redirect("/transactions");
  }
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200">
            Edit Transaction
          </h3>
        </div>
        <form className="space-y-4" action={handleUpdate}>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Description
            </label>
            <Input
              type="text"
              name="description"
              placeholder="Enter transaction description"
              className="w-full"
              defaultValue={prevTnx?.description || ""}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Amount
              </label>
              <Input
                type="number"
                name="amount"
                placeholder="0.00"
                className="w-full"
                defaultValue={prevTnx?.amount || ""}
                min="0.01"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Type
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-slate-700 dark:text-slate-200"
                name="type"
                defaultValue={prevTnx?.type || "EXPENSE"}
                required
              >
                <option value="EXPENSE">Expense</option>
                <option value="INCOME">Income</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Category
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-slate-700 dark:text-slate-200"
              name="category"
              defaultValue={prevTnx?.category || "FOOD"}
              required
            >
              <option value="FOOD">Food</option>
              <option value="TRANSPORT">Transport</option>
              <option value="ENTERTAINMENT">Entertainment</option>
              <option value="BILLS">Bills</option>
              <option value="SHOPPING">Shopping</option>
              <option value="HEALTHCARE">Healthcare</option>
              <option value="EDUCATION">Education</option>
              <option value="SALARY">Salary</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Date
            </label>
            <Input
              type="date"
              name="date"
              className="w-full"
              defaultValue={
                prevTnx?.transactionDate.toISOString().split("T")[0] || today
              }
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Link href="/transactions">
              <Button type="submit" variant="outline" className="flex-1">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Update Transaction
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
