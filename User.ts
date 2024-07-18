import mongoClient from "@/services/mongoclient";
import {User} from "@prisma/client";

export type UserDKMH = {
    User: string,
    UserPW: string,
}

async function saveUser(user: UserDKMH) {
    const col = mongoClient.db("huflit").collection("user")
    const checkUser = await getUser(user.User);
    if (checkUser == null) {

        col.insertOne(user).then();
    } else {
        col.replaceOne({
            id: user.User
        }, user).then();
    }
}

async function getUser(userId: string) {
    const col = mongoClient.db("huflit").collection("user");
    const user = await col.findOne({id: userId});
    if (user) return user;

    return null
}

export {saveUser, getUser}
