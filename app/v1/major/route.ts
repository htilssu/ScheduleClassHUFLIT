import {NextRequest, NextResponse} from "next/server";
import {Major, PrismaClient} from "@prisma/client";
import {unstable_cache} from "next/cache";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const data = await getMajor();
    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    const major = await req.json() as Major;
    const newMajor = await createMajor(major);
    return NextResponse.json(newMajor);
}

const getMajor = unstable_cache(async () => {
    return prisma.major.findMany();
}, ['major'], {
    revalidate: 3600 * 24 * 7,
})

async function createMajor(major: Major) {
    return prisma.major.create({
        data: major
    });
}