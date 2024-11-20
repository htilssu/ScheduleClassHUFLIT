import bcrypt, {genSalt} from "bcrypt";

export default async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, await genSalt(10))
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
}