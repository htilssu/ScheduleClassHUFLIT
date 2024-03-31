import bcrypt, {genSalt, genSaltSync} from "bcrypt";

export default async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, await genSalt(10))
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
}