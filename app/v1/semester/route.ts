import {NextResponse} from "next/server";
import {prisma} from "@/service/prismaClient";

export async function GET() {
    const data = await prisma.semester.findMany();

    return NextResponse.json(data);
}