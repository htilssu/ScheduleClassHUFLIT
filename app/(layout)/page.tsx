import React from "react";
import LandingPage from "@/app/(layout)/components/LandingPage";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title:
    "Xếp lịch học HUFLIT Online | Tra cứu lịch học HUFLIT chính xác nhất 2025",
  description:
    "Ứng dụng xếp lịch học HUFLIT thông minh, nhanh chóng và chính xác nhất 2025. Giúp sinh viên HUFLIT quản lý thời gian học tập hiệu quả, tránh trùng lịch và tối ưu thời khóa biểu.",
  keywords:
    "xếp lịch học HUFLIT, lịch học HUFLIT 2025, tra cứu lịch học HUFLIT, thời khóa biểu HUFLIT, quản lý lịch học, đại học ngoại ngữ tin học, lập kế hoạch học tập, sắp xếp lịch học",
  authors: [
    { name: "HUFLIT Schedule Team", url: "https://xeplich.htilssu.id.vn/team" },
  ],
  creator: "HUFLIT Schedule Team",
  publisher: "HUFLIT Schedule",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title:
      "Xếp lịch học HUFLIT Online - Tra cứu lịch học HUFLIT chính xác nhất 2025",
    description:
      "Ứng dụng xếp lịch học thông minh dành cho sinh viên HUFLIT. Quản lý lịch học dễ dàng, tránh trùng lịch và tối ưu thời khóa biểu học tập.",
    url: "https://xeplich.htilssu.id.vn",
    siteName: "HUFLIT Schedule",
    images: [
      {
        url: "https://xeplich.htilssu.id.vn/images/LogoT&H1.png",
        width: 1200,
        height: 630,
        alt: "Xếp lịch học HUFLIT Online",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Xếp lịch học HUFLIT Online - Công cụ tra cứu lịch học chính xác nhất",
    description:
      "Ứng dụng xếp lịch học thông minh giúp sinh viên HUFLIT quản lý thời gian học tập hiệu quả",
    images: ["https://xeplich.htilssu.id.vn/images/LogoT&H1.png"],
    creator: "@huflit_schedule",
    site: "@huflit_schedule",
  },
  alternates: {
    canonical: "https://xeplich.htilssu.id.vn",
    languages: {
      "vi-VN": "https://xeplich.htilssu.id.vn/vi",
      "en-US": "https://xeplich.htilssu.id.vn/en",
    },
  },
  metadataBase: new URL("https://xeplich.htilssu.id.vn"),
  verification: {
    google: "verification-code",
    yandex: "verification-code",
  },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: "#f97316", // Orange color
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

function Page() {
  return (
    <div>
      <LandingPage />
    </div>
  );
}

export default Page;
