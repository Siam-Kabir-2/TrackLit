import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { object, z } from "zod";
import { getUser } from "./lib/data";
import { verify } from "argon2";

const validateParsedCredentials = {
  email: z.email(),
  password: z.string(),
};

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object(validateParsedCredentials)
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await verify(user.password, password);

          if (passwordsMatch) return user;
        }

        console.log("INVALID CREDENTIALS!");
        return null;
      },
    }),
  ],
});
