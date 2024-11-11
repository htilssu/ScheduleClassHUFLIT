import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/services/prismaClient";

export async function GET(request: NextRequest) {
    const data = await prisma.semester.findMany();

    return NextResponse.json(data);
}