import {SearchParams} from "@/app/page.type";
import ScheduleSection from "@/app/(layout)/schedule/ScheduleSection";
import {prisma} from "@/service/prismaClient";


export type ClassRoot = {
    id: string
    weekDay: string
    time: string
    type: string
    room: string
    lecturerId: string
    subjectId: string
    yearStudyId: string
    semesterId: string
    subject: {
        id: string
        name: string
        majorId: string
        classId: Array<any>
        yearStudyId: string
        semesterId: string
    }
    lecturer: {
        id: string
        name: string
    }
}

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
            subject: true,
            lecturer: true,
        }
    });


    return (<div>
        <ScheduleSection classes={classes} year={year} semester={semester} major={major}/>
    </div>);
}

export default Page;
