"use server";

import { prisma } from "../prisma";

export async function getTimeLine(id: string) {
  return await prisma.timeLine.findFirst({
    where: {
      id: id,
    },
  });
}
