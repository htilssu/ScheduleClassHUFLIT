import {MongoClient} from "mongodb";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
}
const mongoClient = new MongoClient(connectionString, {
    maxConnecting: 20,
});

mongoClient.connect().then(() => {
    console.log("Connected to MongoDB")
});

async function getSecretById(id: string) {
    return await mongoClient.db("huflit")
        .collection("secret")
        .findOne({
            id: id
        });
}




export {getSecretById};
export default mongoClient;
