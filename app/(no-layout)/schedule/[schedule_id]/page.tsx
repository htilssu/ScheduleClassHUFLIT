import { getClass } from "@/lib/actions/class";
import { getTimeLine } from "@/lib/service/timeline";
import { Metadata } from "next";
import ScheduleMain from "../components/ScheduleMain";

export const metadata: Metadata = {
  title: "Xếp lịch Học - HUFLIT",
  description: "Trang hiển thị lịch học của HUFLIT",
};

async function Page({ params }: { params: Promise<{ schedule_id: string }> }) {
  const classes = await getClass();
  const { schedule_id } = await params;
  const timeLine = await getTimeLine(schedule_id);

  return <ScheduleMain classes={classes} timeLine={timeLine} />;
}

export default Page;
