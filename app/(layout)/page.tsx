import React from "react";
import LandingPage from "@/app/(layout)/components/LandingPage";
import Feedback from "@/components/Feedback";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xếp lịch học HUFLIT Online - Tra cứu lịch học HUFLIT",
  description:
    "Ứng dụng lập lịch học thông minh dành cho sinh viên HUFLIT. Quản lý lịch học dễ dàng, nhanh chóng và hiệu quả.",
  keywords:
    "HUFLIT, lịch học, xếp lịch, lập lịch, sinh viên, đại học, kế hoạch học tập, quản lý thời gian",
  authors: [{ name: "HUFLIT Schedule Team" }],
  creator: "HUFLIT Schedule Team",
  publisher: "HUFLIT Schedule",
  robots: "index, follow",
  themeColor: "#f97316", // Orange color
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Xếp lịch học HUFLIT Online - Tra cứu lịch học HUFLIT",
    description:
      "Ứng dụng lập lịch học thông minh dành cho sinh viên HUFLIT. Quản lý lịch học dễ dàng, nhanh chóng và hiệu quả.",
    url: "https://huflit-schedule.vercel.app",
    siteName: "HUFLIT Schedule",
    images: [
      {
        url: "https://huflit.edu.vn/images/logo.png",
        width: 800,
        height: 600,
        alt: "HUFLIT Logo",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xếp lịch học HUFLIT Online",
    description: "Ứng dụng lập lịch học thông minh dành cho sinh viên HUFLIT",
    images: ["https://huflit.edu.vn/images/logo.png"],
  },
  alternates: {
    canonical: "https://xeplich.htilssu.id.vn",
  },
  metadataBase: new URL("https://xeplich.htilssu.id.vn"),
};

function Page() {
  return (
    <div>
      <LandingPage />
      <Feedback />
    </div>
  );
}

export default Page;
