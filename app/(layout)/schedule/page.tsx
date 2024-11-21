import {SearchParams} from "@/app/page.type";
import ScheduleSection from "@/app/(layout)/schedule/ScheduleSection";
import {prisma} from "@/service/prismaClient";
import {Prisma} from "@prisma/client";


export type ClassRoot = Prisma.ClassGetPayload<{
    include: {
        Subject: true,
        Lecturer: true,
        Semester: true,
        YearStudy: true,
    }
}>
async function Page({
                        searchParams
                    }: { searchParams: SearchParams }) {

    const params = await searchParams;
    const year = params.year as string ?? "";
    const semester = params.semester as string ?? "";
    const major = params.major as string ?? "";

    const classes = await prisma.class.findMany({
        where: {
            yearStudyId: year as string,
            semesterId: semester as string,
        },
        include: {
            Subject: true,
            Lecturer: true,
            YearStudy: true,
            Semester: true,
        }
    });


    return (<div>
        <ScheduleSection classes={classes} year={year} semester={semester} major={major}/>
    </div>);
}

export default Page;
