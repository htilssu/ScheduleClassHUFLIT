import {Metadata} from "next";

import {TimeLineList} from "./components/TimelineList";

export const metadata: Metadata = {
    title: "Lịch học của tôi - HUFLIT",
    description: "Quản lý lịch học cá nhân của bạn tại HUFLIT",
};

async function SchedulePage() {
    return(
        <div className={"p-1"}>
            <div className={"my-10 mx-10 border-[1px] border-gray-200"}>
                <TimeLineList/>
            </div>
        </div>
    );
}

export default SchedulePage;
