import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const data = await req.json();

  let classSecret = await prisma.classSecret.findFirst({
    where: {
      id: data.id,
    },
  });

  if (!classSecret) {
    classSecret = await prisma.classSecret.create({
      data: {
        id: data.id,
        secret: data.secret,
        children: data.children.map((child: { id: string; secret: string }) => {
          return {
            id: child.id,
            secret: child.secret,
          };
        }),
      },
    });
  } else {
    classSecret = await prisma.classSecret.update({
      where: {
        id: data.id,
      },
      data: {
        secret: data.secret,
      },
    });
  }

  return NextResponse.json({ ...classSecret });
}
