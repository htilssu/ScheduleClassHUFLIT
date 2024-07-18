import mongoClient from "@/services/mongoclient";

export type UserDKMH = {
    user: string,
    userPw: string,
}

async function saveUser(user: UserDKMH) {
    const col = mongoClient.db("huflit").collection("user")
    const checkUser = await getUser(user.user);
    if (checkUser == null) {
        col.insertOne(user).then();
    } else {
        col.replaceOne({
            id: user.user
        }, user).then();
    }
}

async function getUser(userId: string) {
    const col = mongoClient.db("huflit").collection("user");
    const user = await col.findOne({user: userId});
    if (user) return user;

    return null
}

export {saveUser, getUser}
