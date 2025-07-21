import { getTransactions } from "@/lib/data";

export default async function testTnx(){
     const transactions = await getTransactions("cmd4nyt4t0000c2pwhre7rrl2");
     return (
        <div>{(transactions[0].description)}</div>
     )
}