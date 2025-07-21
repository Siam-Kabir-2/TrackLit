import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnTransactions = nextUrl.pathname.startsWith("/transactions");
      const isOnReports = nextUrl.pathname.startsWith("/reports");
      const isOnBudgets = nextUrl.pathname.startsWith("/budgets");
      const isOnAccounts = nextUrl.pathname.startsWith("/accounts");

      const isOnProtectedRoute =
        isOnDashboard ||
        isOnTransactions ||
        isOnReports ||
        isOnBudgets ||
        isOnAccounts;

      if (isOnProtectedRoute) {
        if (isLoggedIn) return true;
        return false;
      } else if (
        isLoggedIn &&
        (nextUrl.pathname === "/auth/login" ||
          nextUrl.pathname === "/auth/signup")
      ) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
