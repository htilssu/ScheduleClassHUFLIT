import { prisma } from "@/lib/prisma";
import { isExpired } from "@/lib/utils/time";

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
        code: code,
      },
    });

    if (!matchCode) return false;

    const isEx = isExpired(new Date(), matchCode.expiredAt);
    if (isEx) return false;

    // Kiểm tra số lượt sử dụng
    if (matchCode.usedCount >= matchCode.maxUses) {
      return false;
    }

    // Tăng số lượt sử dụng
    await prisma.code.update({
      where: { id: matchCode.id },
      data: { usedCount: matchCode.usedCount + 1 },
    });

    return matchCode;
  }
}
