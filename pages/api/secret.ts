import {NextApiRequest, NextApiResponse} from "next";
import mongoClient from "@/services/mongoclient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = mongoClient.db("huflit").collection("secret");
    if (req.method === "POST") {
        const data = req.body;
        await client.insertOne(data);
        res.status(200).end();
    } else if (req.method === "GET") {
        const data = await client.find({}).toArray();
        res.status(200).json(data);
    }
}
