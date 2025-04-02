import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDb } from "./actions/user";
import { comparePassword } from "./utils";
import {
  UserNotFoundException,
  WrongPasswordException,
} from "@/lib/exceptions/authentication-exception";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        user = await getUserFromDb(credentials.username as string);

        if (!user) {
          throw new UserNotFoundException();
        }
        const compareResult = await comparePassword(
          credentials.password as string,
          user.password
        );
        if (!compareResult) {
          throw new WrongPasswordException();
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email || "";
        session.user.name = token.name || "";
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  cookies: {
    sessionToken: {
      name: `schedule-session`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  experimental: { enableWebAuthn: true },
});
