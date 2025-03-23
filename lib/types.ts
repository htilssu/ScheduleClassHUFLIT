import {Prisma} from "@prisma/client";

export interface WeekResponse {
    Week: number
    DisPlayWeek: number
    WeekOfYear: number
}

export type ClassData = Prisma.ClassGetPayload<{
    include: {
        Subject: true,
        Lecturer: true,
    }
}>