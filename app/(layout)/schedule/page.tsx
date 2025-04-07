import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TimelineList } from "./components/TimelineList";

export const metadata: Metadata = {
  title: "Lịch học của tôi - HUFLIT",
  description: "Quản lý lịch học cá nhân của bạn tại HUFLIT",
};

async function SchedulePage() {
  const session = await auth();

  // Chuyển hướng nếu chưa đăng nhập
  if (!session?.user) {
    redirect("/auth?redirect=/schedule");
  }

  return <TimelineList userId={session.user.id} />;
}

export default SchedulePage;
