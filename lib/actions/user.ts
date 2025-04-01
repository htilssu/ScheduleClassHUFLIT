import { prisma } from "../prisma";
import { store } from "@/lib/state";
import {
  userSlice,
  setUserLoading,
  setUserSuccess,
  setUserError,
} from "@/lib/state/user";

function isEmail(username: string) {
  return username.includes("@");
}

export async function getUserFromDb(username: string) {
  if (isEmail(username)) {
    return prisma.user.findUnique({ where: { email: username } });
  } else {
    return prisma.user.findUnique({ where: { username: username } });
  }
}
