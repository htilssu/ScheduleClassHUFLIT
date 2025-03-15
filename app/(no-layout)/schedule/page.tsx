import ScheduleMain from "@/app/(no-layout)/schedule/ScheduleMain";
import {prisma} from "@/lib/service/prismaClient";
import {cookies} from "next/headers";
import {ClassConfig} from "@/lib/utils/class.util";
import {redirect} from "next/navigation";


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
        <ScheduleMain classes={classes}/>
    </div>);
}

export default Page;
