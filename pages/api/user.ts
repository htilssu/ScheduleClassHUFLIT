import type {NextApiRequest, NextApiResponse} from 'next'
import {getUser, saveUser, UserDKMH} from "@/User";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "POST":
            const data = req.body;
            if (data && data.user && data.userPw) {
                saveUser(data).then();
            }
            break;


        case "GET":
            const userId = req.query.id;
            if (userId) {
                const user = await getUser(userId as string);
                res.status(200).json(user);
                break;
            }
    }

    res.status(200).json({message: 'Success'})
}
