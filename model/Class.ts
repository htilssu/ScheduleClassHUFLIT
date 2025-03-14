import {Prisma} from "@prisma/client";

export type ClassRoot = Prisma.ClassGetPayload<{
    include: {
        Subject: true,
        Lecturer: true,
        Semester: true,
        YearStudy: true,
    }
}>