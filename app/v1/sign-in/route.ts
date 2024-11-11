import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/services/prismaClient";
import {comparePassword} from "@/utils/password";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { username: body.username },
                { email: body.username }
            ]
        }
    });

    if (!user) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const isPasswordValid = await comparePassword(body.password, user.password);
    if (!isPasswordValid) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const tokenPayload = { id: user.id, username: user.username, email: user.email };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, { algorithm: "HS256", expiresIn: body.remember ? "7d" : "3h" });

    return NextResponse.json({ token }, {
        headers: {
            "Set-Cookie": `Token=${token}; Path=/; SameSite=Strict; Secure`
        }
    });
}