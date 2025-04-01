import { NextRequest, NextResponse } from "next/server";
import { Major, PrismaClient } from "@prisma/client";
import { unstable_cacheLife as cacheLife } from "next/cache";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const data = await getMajor();
  return NextResponse.json(data);
}

const getMajor = async () => {
  "use cache";
  cacheLife("minutes");
  cacheTag("major");

  return prisma.major.findMany();
};
