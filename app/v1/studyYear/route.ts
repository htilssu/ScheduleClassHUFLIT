import {NextResponse} from "next/server";
import {prisma} from "@/services/prismaClient";

export async function GET() {
    const year = await prisma.yearStudy.findMany();
    return NextResponse.json(year);
}