import "@/app/globals.css";
import "@mantine/core/styles.css";
import { Metadata } from "next";
import React from "react";
import { AdminNavbar } from "./admin/components/Navbar";
import { AdminSidebar } from "./admin/components/Sidebar";

export const metadata: Metadata = {
  title: "Quản trị hệ thống - HUFLIT Schedule | Trang quản lý dành cho admin",
  description:
    "Hệ thống quản trị xếp lịch học HUFLIT. Phân quyền, quản lý người dùng và điều chỉnh thông tin lịch học cho sinh viên HUFLIT.",
  keywords:
    "quản trị HUFLIT, admin dashboard, quản lý lịch học, hệ thống quản lý, HUFLIT admin",
  robots: "noindex, nofollow",
  authors: [
    { name: "HUFLIT Schedule Team", url: "https://xeplich.htilssu.id.vn" },
  ],
  openGraph: {
    title: "Quản trị hệ thống - HUFLIT Schedule",
    description: "Hệ thống quản trị xếp lịch học HUFLIT dành cho admin",
    type: "website",
    images: [
      {
        url: "https://xeplich.htilssu.id.vn/images/admin-dashboard.png",
        width: 1200,
        height: 630,
        alt: "HUFLIT Admin Dashboard",
      },
    ],
  },
};

export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />
      <div className="flex flex-1 pt-16">
        <div className="w-64 shrink-0">
          <AdminSidebar />
        </div>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
