import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/service/prismaClient";

export async function GET(request: NextRequest, {params}: { params: Promise<{ class: string }> }) {
    const pr = await params;

    const classSecret = await prisma.classSecret.findFirst({
        where: {
            id: pr.class
        }
    })

    return NextResponse.json({...classSecret});
}