import { Metadata } from "next";

import { TimeLineList } from "./components/TimelineList";

export const metadata: Metadata = {
  title: "Lịch học của tôi - HUFLIT | Quản lý lịch học sinh viên 2025",
  description:
    "Quản lý và tra cứu lịch học cá nhân sinh viên HUFLIT nhanh chóng, chính xác. Công cụ lưu trữ và tìm kiếm thời khóa biểu thông minh cho năm học 2025.",
  keywords:
    "lịch học HUFLIT, quản lý lịch học, thời khóa biểu cá nhân, HUFLIT 2025, tra cứu lịch học sinh viên, lưu trữ lịch học",
  robots: "index, follow",
  openGraph: {
    title: "Lịch học của tôi - HUFLIT | Quản lý lịch học sinh viên 2025",
    description:
      "Quản lý và theo dõi lịch học cá nhân của sinh viên HUFLIT. Công cụ tổ chức thời gian học tập hiệu quả.",
    type: "website",
    images: [
      {
        url: "https://xeplich.htilssu.id.vn/images/schedule-preview.png",
        width: 1200,
        height: 630,
        alt: "Lịch học sinh viên HUFLIT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lịch học của tôi - HUFLIT",
    description: "Quản lý thời khóa biểu cá nhân sinh viên HUFLIT năm 2025",
  },
};

async function SchedulePage() {
  return (
    <div className={"p-1"}>
      <div className={"my-10 mx-10 border-[1px] border-gray-200"}>
        <TimeLineList />
      </div>
    </div>
  );
}

export default SchedulePage;
