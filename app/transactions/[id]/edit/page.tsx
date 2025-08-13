import { getTransaction } from "@/lib/data";
import UpdateTnxModel from "./EditTransactionForm";
import { notFound } from "next/navigation";

export default async function updateTnx({
  params,
}: {
  params: { id: string };
}) {
  const tnx = await getTransaction(params.id);

  if (!tnx) {
    notFound();
  }

  return (
    <>
      <UpdateTnxModel id={params.id} prevTnx={tnx} />
    </>
  );
}
