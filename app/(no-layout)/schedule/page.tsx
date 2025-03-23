import {Metadata} from "next";
import ScheduleMain from "./components/ScheduleMain";
import { cookies } from "next/headers";
import { ClassConfig } from "@/lib/utils";
import { redirect } from "next/navigation";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { prisma } from "@/lib/service/prismaClient";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Xếp lịch học',
        description: 'Xếp lịch học',
    }
}


async function Page() {

    const cookie = await cookies();
    const classConfigCookie = cookie.get("classConfig");
    let year,
        semester = "",
        major = ""

    if (classConfigCookie) {
        const classConfig: ClassConfig = JSON.parse(classConfigCookie.value);
        year = classConfig.year;
        semester = classConfig.semester;
        major = classConfig.major;
        if (year === "" && semester === "" && major === "") {
            redirect("/schedule/setup")
        }
    } else {
        redirect("/schedule/setup")
    }

    const classCacheFunction = async () => {
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

    const classes = await classCacheFunction();

    return (<div>
        <ScheduleMain classes={classes}/>
    </div>);
}

export default Page;
