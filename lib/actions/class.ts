'use server'


import {unstable_cacheLife as cacheLife} from "next/cache";
import {prisma} from "@/lib/service/prismaClient";
import {cookies} from "next/headers";
import {ClassConfig} from "@/lib/utils";
import {redirect} from "next/navigation";

export async function getClass() {

    const cookie = await cookies();
    const classConfigCookie = cookie.get("classConfig");

    if (classConfigCookie) {
        const classConfig: ClassConfig = JSON.parse(classConfigCookie.value);
        var {year, semester, major} = classConfig;
        if (year === "" && semester === "" && major === "") {
            redirect("/schedule/setup")
        }
    } else {
        redirect("/schedule/setup")
    }


    return getClassByYearAndSemester(year, semester);
}

export async function getClassByYearAndSemester(year: string, semester: string) {
    'use cache'
    cacheLife('minutes')

    return prisma.class.findMany({
        where: {
            yearStudyId: year,
            semesterId: semester,
        },
        include: {
            Subject: true,
            Lecturer: true,
            YearStudy: true,
            Semester: true,
        }
    })

}