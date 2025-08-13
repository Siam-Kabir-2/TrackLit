import { PrismaClient } from "./generated/prisma";
import { auth } from "@/auth";
import { unstable_noStore as noStore } from "next/cache";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const ITEMS_PER_PAGE = 10;


export async function getUser(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function getTransaction(tnxId:string) {
  const session = await auth();
  if (!session?.user?.email) {
    return null;
  }

  try {
    const transactions = await prisma.transaction.findUnique({
      where: {
        id: tnxId,
      }
    });
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Failed to fetch transactions");
  }
}

export async function getTotalTransactionsSummary() {
  const session = await auth();
  if (!session?.user?.email) {
    return null;
  }

  const user = await getUser(session.user.email);
  if (!user) return null;

  // Fetch summary: total income, total expense, and count
  try {
    const [income, expense] = await Promise.all([
      prisma.transaction.aggregate({
        where: { userId: user.id, type: "INCOME" },
        _sum: { amount: true },
      }),
      prisma.transaction.aggregate({
        where: { userId: user.id, type: "EXPENSE" },
        _sum: { amount: true },
      }),
    ]);

    return {
      totalIncome: income._sum.amount || 0,
      totalExpense: expense._sum.amount || 0,
    };
  } catch (error) {
    console.error("Error fetching total transactions summary:", error);
    throw new Error("Failed to fetch total transactions summary");
  }
}
export async function getMonthlyTransactionsSummary() {
  const session = await auth();
  if (!session?.user?.email) {
    return null;
  }

  const user = await getUser(session.user.email);
  if (!user) return null;

  // Fetch summary: total income, total expense, and count
  try {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    const [income, expense] = await Promise.all([
      prisma.transaction.aggregate({
        where: {
          userId: user.id,
          type: "INCOME",
          createdAt: {
            gte: firstDay,
            lte: lastDay,
          },
        },
        _sum: { amount: true },
      }),
      prisma.transaction.aggregate({
        where: {
          userId: user.id,
          type: "EXPENSE",
          createdAt: {
            gte: firstDay,
            lte: lastDay,
          },
        },
        _sum: { amount: true },
      }),
    ]);

    return {
      monthlyIncome: income._sum.amount || 0,
      monthlyExpense: expense._sum.amount || 0,
    };
  } catch (error) {
    console.error("Error fetching total transactions summary:", error);
    throw new Error("Failed to fetch total transactions summary");
  }
}

export async function getExpenseChartData() {
  const session = await auth();
  if (!session?.user?.email) {
    return [];
  }

  const user = await getUser(session.user.email);
  if (!user) return [];

  // Get last 6 months
  const now = new Date();
  const startMonth = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  // Fetch transactions for last 6 months
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: user.id,
      type: "EXPENSE",
      createdAt: {
        gte: startMonth,
        lte: now,
      },
    },
    select: {
      createdAt: true,
      category: true,
      amount: true,
    },
  });

  // Aggregate by month and category
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const result: { [key: string]: any } = {};
  for (let i = 0; i < 6; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    const key = months[date.getMonth()];
    result[key] = {
      month: key,
      FOOD: 0,
      TRANSPORT: 0,
      ENTERTAINMENT: 0,
      BILLS: 0,
    };
  }

  transactions.forEach((tx) => {
    const monthKey = months[new Date(tx.createdAt).getMonth()];
    if (result[monthKey] && tx.category) {
      if (result[monthKey][tx.category] !== undefined) {
        result[monthKey][tx.category] += tx.amount;
      }
    }
  });

  return Object.values(result);
}

export async function getFilteredTransactions(
  query: string = "",
  currentPage: number = 1
) {
  const session = await auth();
  if (!session?.user?.email) {
    return [];
  }

  const user = await getUser(session.user.email);
  if (!user) return [];

  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
        OR: [{ description: { contains: query, mode: "insensitive" } }],
      },
      orderBy: {
        createdAt: "desc",
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });
    return transactions;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch transactions.");
  }
}
export async function getTransactionsPages(query: string) {
  noStore();
  const session = await auth();
  if (!session?.user?.email) {
    return 1;
  }

  const user = await getUser(session.user.email);
  if (!user) return 1;

  try {
    const count = await prisma.transaction.count({
      where: {
        userId: user.id,
        OR: [
          { description: { contains: query, mode: "insensitive" } }
        ],
      },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of transactions.");
  }
}
