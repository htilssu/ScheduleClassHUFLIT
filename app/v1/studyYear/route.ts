import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

const getYearStudy = unstable_cache(
  async () => {
    return prisma.yearStudy.findMany();
  },
  ["yearStudy"],
  {
    revalidate: 3600 * 24 * 7,
  }
);

export async function GET() {
  const year = await getYearStudy();
  return NextResponse.json(year);
}
