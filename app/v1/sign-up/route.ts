import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/service/prismaClient";
import {hashPassword} from "@/lib/utils/password";

export async function POST(req: NextRequest) {
    const body = await req.json() as { [a: string]: string };
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                {username: body.username},
            ]
        }
    });

    if (user) {
        return NextResponse.json({message: "User already exists"}, {status: 401});
    }

    const hash = await hashPassword(body.password);

    const {email, password, name} = body;
    const createdUser = await prisma.user.create({
        data: {
            name,
            username: email,
            password: hash,
        }
    })
}