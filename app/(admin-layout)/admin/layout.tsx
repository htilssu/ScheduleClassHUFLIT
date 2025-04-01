import type React from "react";
import type { Metadata } from "next";
import { AdminNavbar } from "./navbar";
import { AdminSidebar } from "./sidebar";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Quản lý hệ thống lịch học HUFLIT",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminNavbar />
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-6 pt-20">{children}</main>
      </div>
    </>
  );
}
