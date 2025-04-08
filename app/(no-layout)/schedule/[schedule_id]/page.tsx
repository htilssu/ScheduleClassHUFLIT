import { getClass } from "@/lib/actions/class";
import { getTimeLine } from "@/lib/service/timeline";
import { Metadata } from "next";
import ScheduleMain from "../components/ScheduleMain";

export const metadata: Metadata = {
  title: "Xếp lịch Học - HUFLIT",
  description: "Trang hiển thị lịch học của HUFLIT",
};

async function Page({ params }: { params: { schedule_id: string } }) {
  const classes = await getClass();
  const timeLine = await getTimeLine(params.schedule_id);

  return <ScheduleMain classes={classes} timeLine={timeLine} />;
}

export default Page;
