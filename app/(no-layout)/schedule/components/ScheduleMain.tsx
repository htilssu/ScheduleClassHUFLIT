"use client";

import ScheduleTimeLine from "@/app/(no-layout)/schedule/components/ScheduleTimeLine";
import SelectSection from "@/app/(no-layout)/schedule/components/SelectSection";
import { DndContext } from "@/lib/hook/use-dnd-context";
import { ClassData } from "@/lib/types";
import FilterBar from "./FilterBar";
import { TimeLine } from "@prisma/client";

interface ScheduleMainProps {
  classes: ClassData[];
  timeLine: TimeLine | null;
}

const ScheduleMain = ({ classes, timeLine }: ScheduleMainProps) => {
  return (
    <div className={"select-none"}>
      <div className={"relative"}>
        <FilterBar />
        <DndContext>
          <div className={"flex p-2 relative z-10"}>
            <div className="w-2/6">
              <SelectSection classes={classes || []} />
            </div>
            <ScheduleTimeLine timeLine={timeLine} />
          </div>
        </DndContext>
      </div>
    </div>
  );
};

export default ScheduleMain;
