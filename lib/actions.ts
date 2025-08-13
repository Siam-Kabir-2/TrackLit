"use server";

import { PrismaClient } from "./generated/prisma";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { getUser } from "./data";
import { z } from "zod";
import { hash } from "argon2";
import { revalidatePath } from "next/cache";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const signUpSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
  username: z.string().min(1),
});

const tnxSchema = z.object({
  description: z.string().min(1),
  amount: z.preprocess((val) => Number(val), z.number().positive()),
  type: z.enum(["EXPENSE", "INCOME"]),
  category: z.enum([
    "FOOD",
    "TRANSPORT",
    "ENTERTAINMENT",
    "BILLS",
    "SHOPPING",
    "HEALTHCARE",
    "EDUCATION",
    "SALARY",
    "OTHER",
  ]),
  date: z.coerce.date(),
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function handleSignOut() {
  await signOut({ redirectTo: "/" });
}

export async function currUser() {
  const session = await auth();
  if (!session?.user?.email) {
    return null;
  }

  // Fetch full user data from database
  const user = await getUser(session.user.email);

  return user;
}
export async function register(
  prevState: string | undefined,
  formData: FormData
) {
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");

  const parsed = signUpSchema.safeParse({ email, password, username });
  if (!parsed.success) {
    return "Invalid input.";
  }

  const existingUser = await getUser(email as string);
  if (existingUser) {
    return "User already exists.";
  }

  const hashedPassword = await hash(password as string);
  try {
    const user = await prisma.user.create({
      data: {
        email: email as string,
        password: hashedPassword,
        username: username as string,
      },
    });
    await signIn("credentials", {
      email: email as string,
      password: password as string,
      redirectTo: "/dashboard",
    });
    return user;
  } catch (error) {
    console.error("Failed to create user:", error);
    throw new Error("Failed to create user.");
  }
}

export async function addTransaction(formData: FormData) {
  const description = formData.get("description");
  const amount = formData.get("amount");
  const type = formData.get("type");
  const category = formData.get("category");
  const date = formData.get("date");

  // Validate with Zod
  const parsed = tnxSchema.safeParse({
    description,
    amount,
    type,
    category,
    date,
  });

  if (!parsed.success) {
    // Handle validation error
    return { error: "Invalid input" };
  }
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { error: "Not authenticated" };
    }
    const user = await getUser(session.user.email);
    if (!user) {
      return { error: "User not found" };
    }
    // Use parsed.data for your DB insert
    await prisma.transaction.create({
      data: {
        userId: user.id,
        amount: parsed.data.amount,
        type: parsed.data.type,
        category: parsed.data.category,
        description: parsed.data.description,
        transactionDate: parsed.data.date, // parsed.data.date is a Date object
      },
    });
  } catch (err) {
    console.log(err);
  }

  // Optionally revalidate or return success
  revalidatePath("/transactions");
}
export async function updateTransaction(id:string,formData: FormData) {
  const description = formData.get("description");
  const amount = formData.get("amount");
  const type = formData.get("type");
  const category = formData.get("category");
  const date = formData.get("date");

  // Validate with Zod
  const parsed = tnxSchema.safeParse({
    description,
    amount,
    type,
    category,
    date,
  });

  if (!parsed.success) {
    // Handle validation error
    return { error: "Invalid input" };
  }
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { error: "Not authenticated" };
    }
    const user = await getUser(session.user.email);
    if (!user) {
      return { error: "User not found" };
    }
    // Use parsed.data for your DB update
    await prisma.transaction.update({
      where: {
        id: id,
      },
      data: {
        amount: parsed.data.amount,
        type: parsed.data.type,
        category: parsed.data.category,
        description: parsed.data.description,
        transactionDate: parsed.data.date, // parsed.data.date is a Date object
      },
    });
  } catch (err) {
    console.log(err);
  }

  // Optionally revalidate or return success
  revalidatePath("/transactions");
}

export async function handleDelete(Id: string) {
  try {
    await prisma.transaction.delete({
      where: {
        id: Id,
      },
    });
    revalidatePath("/transactions");
  } catch (err) {
    console.error(err);
    return { error: "Failed to delete transaction" };
  }
}
