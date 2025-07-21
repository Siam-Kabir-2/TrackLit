"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function ActionBar() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <>
      <div className="flex gap-2 flex-wrap">
        <Button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          <Plus className="h-4 w-4" />
          Add Transaction
        </Button>
      </div>
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200">
                Add New Transaction
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </Button>
            </div>
            {/* Add your form here */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {/* ...form fields... */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                  onClick={() => setShowAddForm(false)}
                >
                  Add Transaction
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
