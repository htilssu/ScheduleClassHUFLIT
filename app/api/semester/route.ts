import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

const getSemester = unstable_cache(
  async () => {
    return prisma.semester.findMany();
  },
  ["semester"],
  {
    revalidate: 3600 * 24 * 30,
  }
);

export async function GET() {
  const data = await getSemester();

  return NextResponse.json(data);
}
