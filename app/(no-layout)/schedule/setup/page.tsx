'use client'
import SetupSection from "@/components/SetupSection";
import ClientPage from "@/components/ClientPage";

export default function Page() {

    return (
        <ClientPage title={"Lịch học - Thiết lập"}>
            <div className={'h-screen'}>
                <SetupSection/>
            </div>
        </ClientPage>
    );
}
