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
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />
      <div className="flex flex-1 pt-16">
        <div className="w-64 flex-shrink-0">
          <AdminSidebar />
        </div>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
