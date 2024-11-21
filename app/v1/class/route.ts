import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/service/prismaClient";

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const studyYear = searchParams.get("studyYear");
    const semester = searchParams.get("semester");
    const major = searchParams.get("major");

    const data = await prisma.class.findMany({
        where: {
            yearStudyId: studyYear as string,
            semesterId: semester as string,
        },
        include: {
            Subject: true,
            Lecturer: true,
        }
    });

    return NextResponse.json(data);
}