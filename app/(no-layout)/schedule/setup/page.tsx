import SetupSection from "@/components/SetupSection";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Thiết lập thông tin môn học',
}

export default function Page() {
    return (
        <div className={'h-screen'}>
            <SetupSection/>
        </div>
    );
}
