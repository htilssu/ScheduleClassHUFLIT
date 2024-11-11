import {NextRequest, NextResponse} from "next/server";
import {getUser, saveUser} from "@/User";

export async function POST(req: NextRequest) {
    const data = await req.json();
    if (data && data.user && data.userPw) {
        await saveUser(data);
    }
    return NextResponse.json({message: 'Success'});
}

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const userId = searchParams.get("id");
    if (userId) {
        const user = await getUser(userId);
        return NextResponse.json(user);
    }
    return NextResponse.json({message: 'Success'});
}