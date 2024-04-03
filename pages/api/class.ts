// noinspection TypeScriptValidateJSTypes

import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "@/services/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            const {studyYear, semester, major} = req.query;
            const data = await prisma.class.findMany({
                where: {
                    yearStudyId: studyYear as string,
                    semesterId: semester as string,
                },
                include:{
                    subject: true,
                    lecturer: true,
                }
            });
            res.status(200).json(data);
    }

}