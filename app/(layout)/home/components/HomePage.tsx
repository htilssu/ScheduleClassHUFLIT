import React from 'react';
import MainContent from "@/app/(layout)/home/components/mainContent/MainContent";
import Notify from "@/app/(layout)/home/components/notify/Notify";

const HomePage = () => {
    return (
        <div className={"mb-20"}>
            <div className="flex justify-center items-start max-w-7xl mx-auto mt-5 gap-5">
                <MainContent/>
                <Notify/>
            </div>
        </div>
    );
};

export default HomePage;