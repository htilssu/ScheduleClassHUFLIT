import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/service/prismaClient";

export async function POST(req: NextRequest) {
    const data = await req.json();

    const classSecret = await prisma.classSecret.findFirst({
        where: {
            id: data.id,
        }
    });

    if (!classSecret) {
        await prisma.classSecret.create({
            data: {
                id: data.id,
                secret: data.secret,
                children: data.children.map((child: { id: string, secret: string }) => {
                    return {
                        id: child.id,
                        secret: child.secret,
                    }
                })
            }
        });
    } else {
        await prisma.classSecret.update({
            where: {
                id: data.id,
            },
            data: {
                secret: data.secret,
            }
        })
    }


    return NextResponse.json({message: "Success"});
}
