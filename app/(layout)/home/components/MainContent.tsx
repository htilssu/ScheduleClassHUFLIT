import React from "react";
import QuickSchedule from "./QuickSchedule";
import CourseRegistration from "./ScheduleRegistration";
import KeyFeatures from "./KeyFeatures";
import CurrentTime from "@/app/(layout)/home/components/CurrentTime";
import Feedback from "@/components/Feedback";

const MainContent = () => {
    return (
        <div className="flex flex-col gap-5">
      <QuickSchedule />
      <CourseRegistration />
      <KeyFeatures />
      <Feedback />
        </div>
    );
};

export default MainContent;
