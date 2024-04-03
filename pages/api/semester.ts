
import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "@/services/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            const data = await prisma.semester.findMany();
            res.status(200).json(data);
            break;
        default:
            res.status(405).end();
    }
}