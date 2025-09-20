import React from "react";
import { Paper } from "@mantine/core";
import { TimeLineList } from "@/app/(proteced_route)/(main_layout)/schedule/components/TimelineList";

const SavedSchedulePage = () => {
  return (
    <Paper shadow="sm" p="md" radius="md" withBorder>
      <TimeLineList />
    </Paper>
  );
};

export default SavedSchedulePage;
