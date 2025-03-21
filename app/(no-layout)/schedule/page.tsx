import ScheduleMain from "@/app/(no-layout)/schedule/components/ScheduleMain";
import {prisma} from "@/lib/service/prismaClient";
import {cookies} from "next/headers";
import {ClassConfig} from "@/lib/utils/class";
import {redirect} from "next/navigation";
import {Metadata} from "next";
import {unstable_cache} from "next/cache";

export const metadata: Metadata = {
    title: "Xếp lịch học",
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

    const classCacheFunction = unstable_cache(() => {
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
    }, [`${year}-${semester}`], {
        revalidate: 60 * 60,
    });

    const classes = await classCacheFunction();

    return (<div>
        <ScheduleMain classes={classes}/>
    </div>);
}

export default Page;
