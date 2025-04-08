import { Metadata } from "next";

import { TimelineList } from "./components/TimelineList";

export const metadata: Metadata = {
  title: "Lịch học của tôi - HUFLIT",
  description: "Quản lý lịch học cá nhân của bạn tại HUFLIT",
};

async function SchedulePage() {
  return <TimelineList />;
}

export default SchedulePage;
