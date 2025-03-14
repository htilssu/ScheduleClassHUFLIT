import {NextResponse} from "next/server";
import {prisma} from "@/lib/service/prismaClient";

export async function GET() {
    const year = await prisma.yearStudy.findMany();
    return NextResponse.json(year);
}