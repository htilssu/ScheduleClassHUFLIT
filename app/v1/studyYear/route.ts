import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/services/prismaClient";

export async function GET(req: NextRequest) {
    const year = await prisma.yearStudy.findMany();
    return NextResponse.json(year);
}