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
  experimental: { enableWebAuthn: true },
});
