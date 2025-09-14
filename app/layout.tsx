import React, { ReactNode } from "react";
import "@/app/globals.css";
import "@mantine/core/styles.css";
import RootWrapper from "@/components/RootWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xếp lịch học HUFLIT | Công cụ tra cứu lịch học thông minh",
  description:
    "Công cụ xếp lịch học HUFLIT chính xác, nhanh chóng và tiện lợi. Giúp sinh viên HUFLIT quản lý thời gian học tập hiệu quả, tránh trùng lịch và tối ưu thời khóa biểu.",
  keywords:
    "xếp lịch học HUFLIT, lịch học HUFLIT, tra cứu lịch học, thời khóa biểu HUFLIT, quản lý lịch học sinh viên",
  metadataBase: new URL("https://xeplich.htilssu.id.vn"),
  robots: "index, follow",
  applicationName: "Xếp lịch học HUFLIT",
  authors: [
    { name: "HUFLIT Schedule Team", url: "https://xeplich.htilssu.id.vn" },
  ],
  generator: "Next.js",
  creator: "HUFLIT Schedule Team",
  publisher: "HUFLIT",
  formatDetection: {
    email: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://xeplich.htilssu.id.vn",
  },
  openGraph: {
    title: "Xếp lịch học HUFLIT | Công cụ tra cứu lịch học thông minh",
    description:
      "Công cụ xếp lịch học HUFLIT chính xác, nhanh chóng. Quản lý thời gian học tập hiệu quả cho sinh viên HUFLIT.",
    url: "https://xeplich.htilssu.id.vn",
    siteName: "Xếp lịch học HUFLIT",
    images: [
      {
        url: "https://xeplich.htilssu.id.vn/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Xếp lịch học HUFLIT",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xếp lịch học HUFLIT - Công cụ tra cứu lịch học thông minh",
    description: "Quản lý thời gian học tập hiệu quả cho sinh viên HUFLIT.",
    images: ["https://xeplich.htilssu.id.vn/favicon.ico"],
  },
};

const Layout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang={"vi"}>
      <body suppressHydrationWarning>
        <RootWrapper>{children}</RootWrapper>
      </body>
    </html>
  );
};

export default Layout;
