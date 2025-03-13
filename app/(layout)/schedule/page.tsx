import {SearchParams} from "@/app/page.type";
import ScheduleMain from "@/app/(layout)/schedule/ScheduleMain";
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
                    }: Readonly<{ searchParams: SearchParams }>) {

    const params = await searchParams;
    const year = params.year as string ?? "";
    const semester = params.semester as string ?? "";
    const major = params.major as string ?? "";

    const classes = await prisma.class.findMany({
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
    });


    return (<div>
        <ScheduleMain classes={classes} year={year} semester={semester} major={major}/>
    </div>);
}

export default Page;
