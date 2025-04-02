import { prisma } from "../prisma";

function isEmail(username: string) {
  return username.includes("@");
}

export async function getUserFromDb(username: string) {
  if (isEmail(username)) {
    return prisma.user.findFirst({ where: { email: username } });
  } else {
    return prisma.user.findUnique({ where: { username: username } });
  }
}
