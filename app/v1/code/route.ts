import {CodeService} from "@/lib/service/code.service";
import {Code} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
    const code: Code = await request.json();
    const createdCode = await CodeService.createCode(code);
    return NextResponse.json(createdCode);
}