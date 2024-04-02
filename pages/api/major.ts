// noinspection TypeScriptValidateJSTypes

import {NextApiRequest, NextApiResponse} from "next";
import {Major, PrismaClient} from "@prisma/client";


const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {id} = req.query;
    try {
        switch (req.method) {
            case "GET":
                const result = await getMajor(id as string);
                res.status(200).json(result);
                break;
            case "POST":
                const newMajor: Major = req.body;
                await createMajor(newMajor);
                res.status(201).json({status: "success"});
                break;

        }
    } catch (e) {
        console.log(e)
        res.status(500).json(null);
    }
}

async function getMajor(majorId: string) {
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