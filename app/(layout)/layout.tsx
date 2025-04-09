import React from "react";
import { Metadata } from "next";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Trang chủ tra cứu lịch học",
  description: "Tra cứu lịch học HUFLIT, khiến mọi thứ dễ dàng hơn với bạn",
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <MantineProvider>
      <Navbar />
      <div className="mt-16">{children}</div>
      <Footer />
    </MantineProvider>
  );
}
