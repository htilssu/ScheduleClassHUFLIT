import React from "react";
import { Metadata } from "next";
import "@/app/globals.css";
import "@mantine/core/styles.css";
import RootWrapper from "@/components/RootWrapper";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Admin Dashboard - HUFLIT Schedule",
  description: "Quản lý hệ thống lịch học HUFLIT",
};

export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body suppressHydrationWarning>
        <RootWrapper>
          <AuthProvider>{children}</AuthProvider>
        </RootWrapper>
      </body>
    </html>
  );
}
 