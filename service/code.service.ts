import {prisma} from "@/service/prismaClient";
import {isExpired} from "@/util/time.util";
import {Code} from "@prisma/client";

export namespace CodeService {
    export async function verifyCode(code: string) {
        const matchCode = await prisma.code.findFirst({
            where: {
                code: code
            }
        });

        if (!matchCode) return false;

        const isEx = isExpired(new Date(), matchCode.expiredAt);
        if (isEx) return false;

        return matchCode;
    }

    export async function createCode(code: Code) {
        return await prisma.code.create({
            data: {
                code: code.code,
                expiredAt: new Date(code.expiredAt),
                codeTypeId: code.codeTypeId,
            }
        });
    }
}