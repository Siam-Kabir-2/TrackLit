"use server";

import { auth, signIn ,signOut} from "@/auth";
import { AuthError } from "next-auth";
import { getUser } from "./data";

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
  await signOut({redirectTo:'/'})
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