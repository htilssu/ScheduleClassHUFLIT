import {NextResponse} from "next/server";
import {prisma} from "@/services/prismaClient";

export async function GET() {
    const data = await prisma.semester.findMany();

    return NextResponse.json(data);
}