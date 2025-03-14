import {NextRequest, NextResponse} from "next/server";
import {ErrorVm} from "@/lib/model/ErrorVm";
import {CodeService} from "@/lib/service/code.service";


export async function POST(request: NextRequest) {
    const {code} = await request.json();
    const result = await CodeService.verifyCode(code);
    if (result === false) {
        return NextResponse.json(new ErrorVm("WRONG_CODE", "Invalid Code"), {
            status: 400
        });
    }

    return NextResponse.json({...result});
}