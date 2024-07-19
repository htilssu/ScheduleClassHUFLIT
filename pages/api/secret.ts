import {NextApiRequest, NextApiResponse} from "next";
import mongoClient, {getSecretById} from "@/services/mongoclient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = mongoClient.db("huflit").collection("secret");
    if (req.method === "POST") {
        const data = req.body;
        const svData = await getSecretById(data.id);

        if (svData == null) {
            await client.insertOne(data);
        } else {
            client.replaceOne({
                id: data.id,
            }, data).then()
        }
        res.status(200).end();
    } else if (req.method === "GET") {
        if (req.query.id && req.query.id !== ""){
            const secret = await getSecretById(req.query.id as string);
            if( secret == null ) {
                return res.status(200).json(null);
            }
            return res.status(200).json(secret)
        }

        const data = await client.find({}).toArray();
        res.status(200).json(data);
    }
}
