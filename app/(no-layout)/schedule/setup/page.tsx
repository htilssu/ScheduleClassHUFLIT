import SetupSection from "@/components/SetupSection";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Chọn thông tin',
}

export default function Page() {
    return (
        <div className={'h-screen'}>
            <SetupSection/>
        </div>
    );
}
