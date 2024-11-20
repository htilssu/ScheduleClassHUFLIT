import { CodeType } from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";
import {CodeTypeService} from "@/service/codetype.service";

export async function POST(request: NextRequest) {
    const codeType: CodeType = await request.json();
    const createdCodeType = await CodeTypeService.createCodeType(codeType);

    return NextResponse.json(createdCodeType);
}