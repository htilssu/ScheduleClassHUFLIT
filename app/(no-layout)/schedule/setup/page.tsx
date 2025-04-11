import SetupSection from "@/app/(no-layout)/schedule/setup/components/SetupSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thiết lập xếp lịch học HUFLIT | Tùy chỉnh thời khóa biểu 2025",
  description:
    "Trang thiết lập và tùy chỉnh xếp lịch học HUFLIT mới nhất. Tạo lịch học phù hợp với lịch trình cá nhân, lựa chọn môn học và tránh trùng lịch hiệu quả.",
  keywords:
    "thiết lập lịch học, tùy chỉnh thời khóa biểu, cài đặt lịch học HUFLIT, xếp lịch tùy chọn, tránh trùng lịch, môn học HUFLIT",
  robots: "index, follow",
  openGraph: {
    title: "Thiết lập xếp lịch học HUFLIT | Tùy chỉnh thời khóa biểu",
    description:
      "Tùy chỉnh và thiết lập lịch học HUFLIT theo sở thích cá nhân. Tránh trùng lịch và tối ưu thời gian học tập.",
    images: [
      {
        url: "https://xeplich.htilssu.id.vn/images/setup-schedule.png",
        width: 1200,
        height: 630,
        alt: "Thiết lập lịch học HUFLIT",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thiết lập xếp lịch học HUFLIT",
    description: "Tùy chỉnh lịch học theo nhu cầu của bạn",
  },
};

export default function Page() {
  return (
    <div className={"h-screen"}>
      <SetupSection />
    </div>
  );
}
