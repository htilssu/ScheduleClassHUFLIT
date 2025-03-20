import {Prisma} from "@prisma/client";

export interface WeekResponse {
    Week: number
    DisPlayWeek: number
    WeekOfYear: number
}

export type ClassRoot = Prisma.ClassGetPayload<{
    include: {
        Subject: true,
        Lecturer: true,
        Semester: true,
        YearStudy: true,
    }
}>