import SetupSection from "@/app/(no-layout)/schedule/setup/components/SetupSection";
import {Metadata} from "next";


export const metadata: Metadata = {
    title: "Xếp lịch học - HUFLIT",
    description: "Trang thiết lập xếp lịch học của HUFLIT",
}

export default function Page() {
    return (
        <div className={'h-screen'}>
            <SetupSection/>
        </div>
    );
}
