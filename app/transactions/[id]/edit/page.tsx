import { getTransaction } from "@/lib/data";
import UpdateTnxModel from "./EditTransactionForm";
import { notFound } from "next/navigation";

export default async function updateTnx({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tnx = await getTransaction(id);

  if (!tnx) {
    notFound();
  }

  return (
    <>
      <UpdateTnxModel id={id} prevTnx={tnx} />
    </>
  );
}
