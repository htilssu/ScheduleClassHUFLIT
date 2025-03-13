import {prisma} from "@/service/prismaClient";
import {isExpired} from "@/util/time.util";
import {Code} from "@prisma/client";

/**
 * CodeService verifies and creates codes for various purposes.
 */
export namespace CodeService {
    /**
     * Verifies the provided code.
     * @param code The code to verify.
     */
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

    /**
     * Creates a new code.
     * @param code The code object to create.
     */
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