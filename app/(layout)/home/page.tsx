import React from "react";
import { Metadata } from "next";
import HomePage from "./client";

export const metadata: Metadata = {
  title: "Trang chủ - Xếp lịch học",
  description: "Trang chủ của ứng dụng",
};

export default function Page() {
  return <HomePage />;
}
