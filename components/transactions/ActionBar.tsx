"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddTransactionModal from "@/components/transactions/AddTransactionModal";

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
        <AddTransactionModal onClose={() => setShowAddForm(false)} />
      )}
    </>
  );
}