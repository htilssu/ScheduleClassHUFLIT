"use client";

import ScheduleTimeLine from "@/app/(no-layout)/schedule/components/ScheduleTimeLine";
import SelectSection from "@/app/(no-layout)/schedule/components/SelectSection";
import { DndContext } from "@/lib/hook/use-dnd-context";
import { ClassData } from "@/lib/types";
import FilterBar from "./FilterBar";

const ScheduleMain = ({ classes }: { classes: ClassData[] }) => {
  return (
    <div className={"select-none"}>
      <div className={"relative"}>
        <FilterBar />
        <DndContext>
          <div className={"flex p-2 relative z-10 max-h-screen"}>
            <SelectSection classes={classes || []} />
            <ScheduleTimeLine />
          </div>
        </DndContext>
      </div>
    </div>
  );
};

export default ScheduleMain;
