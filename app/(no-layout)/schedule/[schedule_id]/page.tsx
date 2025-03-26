import {Metadata} from "next";
import {getClass} from "@/lib/actions/class";
import ScheduleMain from "../components/ScheduleMain";

export const metadata: Metadata = {
    title: "Xếp lịch Học - HUFLIT",
    description: "Trang hiển thị lịch học của HUFLIT",
};

async function Page() {


    const classes = await getClass();

    return <ScheduleMain classes={classes}/>;
}

export default Page;
