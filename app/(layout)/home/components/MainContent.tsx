import React from "react";
import QuickSchedule from "./QuickSchedule";
import CourseRegistration from "./ScheduleRegistration";
import KeyFeatures from "./KeyFeatures";
import CurrentTime from "@/app/(layout)/home/components/CurrentTime";

const MainContent = () => {
    return (
        <div className="flex flex-col gap-5 w-[70%]">
            <QuickSchedule />
            <CourseRegistration />
            <KeyFeatures />
            <CurrentTime/>
        </div>
    );
};

export default MainContent;