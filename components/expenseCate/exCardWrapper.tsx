import { getExpenseChartData } from "@/lib/data"
import ExpenseCard from "./exCard";

export default async function ExCardWrapper(){
    const chartData=await getExpenseChartData();
    return(
        <ExpenseCard chartData={chartData}/>
    )
}