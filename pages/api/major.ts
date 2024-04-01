// noinspection TypeScriptValidateJSTypes

import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";


const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {id} = req.query;
    switch (req.method) {
        case "GET":
            const result = await getMajor(id as string);
            res.status(200).json(result);
            break;
        case "POST":
            const {name} = req.body;
            const newMajor = await createMajor(name);
            res.status(201);
            break;

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


async function createMajor(name: string) {

}