import hashPassword, {comparePassword} from "@/lib/utils/password";

test("password test", async () => {
    const myPassword = "123456";
    const hash =await hashPassword(myPassword)
    const compare = await comparePassword(myPassword, hash)
    expect(compare).toEqual(true)
});
