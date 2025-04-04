import "@/app/globals.css";
import "@mantine/core/styles.css";
import { Metadata } from "next";
import React from "react";
import { AdminNavbar } from "./admin/components/Navbar";
import { AdminSidebar } from "./admin/components/Sidebar";

export const metadata: Metadata = {
  title: "Admin Dashboard - HUFLIT Schedule",
  description: "Quản lý hệ thống lịch học HUFLIT",
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
