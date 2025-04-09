import { getClass } from "@/lib/actions/class";
import { auth } from "@/lib/auth";
import { getTimeLine } from "@/lib/service/timeline";
import { Metadata } from "next";
import { notFound, unauthorized } from "next/navigation";
import ScheduleMain from "../components/ScheduleMain";

export const metadata: Metadata = {
  title: "Xếp lịch Học - HUFLIT",
  description: "Trang hiển thị lịch học của HUFLIT",
};

async function Page({ params }: { params: Promise<{ schedule_id: string }> }) {
  const classes = await getClass();
  const session = await auth();
  const { schedule_id } = await params;
  try {
    const timeLine = await getTimeLine(schedule_id);

    if (!timeLine) notFound();

    if (timeLine?.userId !== session?.user?.id && !session?.user.isAdmin) {
      unauthorized();
    }
    return <ScheduleMain classes={classes} timeLine={timeLine} />;
  } catch {
    notFound();
  }
}

export default Page;
