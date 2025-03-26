import {NextRequest, NextResponse} from "next/server";
import {Major, PrismaClient} from "@prisma/client";
import {unstable_cacheLife as cacheLife} from 'next/cache'
import {cacheTag} from "next/dist/server/use-cache/cache-tag";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const data = await getMajor();
    return NextResponse.json(data);
}

/*
export async function POST(req: NextRequest) {
    const major = await req.json() as Major;
    const newMajor = await createMajor(major);
    return NextResponse.json(newMajor);
}
*/

const getMajor = async (): Promise<Major[]> => {
    'use cache';
    cacheLife("minutes")
    cacheTag('major')

    return prisma.major.findMany();
}

/*
async function createMajor(major: Major) {
    return prisma.major.create({
        data: major
    });
}*/
