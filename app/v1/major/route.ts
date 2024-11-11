import {NextRequest, NextResponse} from "next/server";
import {Major, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const majorId = searchParams.get("majorId");
    const data = await getMajor(majorId);
    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    const major = await req.json() as Major;
    const newMajor = await createMajor(major);
    return NextResponse.json(newMajor);
}

async function getMajor(majorId: string | null) {
    if (!majorId) {
        return prisma.major.findMany();
    } else {
        return prisma.major.findUnique({
            where: {
                id: majorId
            }
        });
    }
}

async function createMajor(major: Major) {
    return prisma.major.create({
        data: major
    });
}