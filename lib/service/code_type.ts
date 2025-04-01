import { prisma } from "@/lib/prisma";

export namespace CodeTypeService {
  export async function createCodeType(codeType: {
    name: string;
    delay: number;
  }) {
    /*return await prisma.codeType.create({
            data: {
                name: codeType.name,
                delay: codeType.delay,
            }
        });*/
  }
}
