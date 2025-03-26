'use server'

import {prisma} from "./prismaClient"

export async function getTimeLine(id: string) {
    return await prisma.timeLine.findFirst({
        where: {
            id: id
        }
    })
}