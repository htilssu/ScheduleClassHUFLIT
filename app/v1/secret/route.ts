import {NextRequest, NextResponse} from "next/server";
import mongoClient, {getSecretById} from "@/services/mongoclient";

export async function POST(req: NextRequest) {
    const client = mongoClient.db("huflit").collection("secret");
    const data = await req.json();
    const svData = await getSecretById(data.id);

    if (svData == null) {
        await client.insertOne(data);
    } else {
        await client.replaceOne({ id: data.id }, data);
    }
    return NextResponse.json({ message: "Success" });
}

export async function GET(req: NextRequest) {
    const client = mongoClient.db("huflit").collection("secret");
    const {searchParams} = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
        const secret = await getSecretById(id);
        return NextResponse.json(secret);
    }

    const data = await client.find({}).toArray();
    return NextResponse.json(data);
}