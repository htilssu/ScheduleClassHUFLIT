import React, { ReactNode } from "react";
import "@/app/globals.css";
import "@mantine/core/styles.css";
import RootWrapper from "@/components/RootWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xếp lịch học",
};

const Layout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang={"en"}>
      <body suppressHydrationWarning>
        <RootWrapper>{children}</RootWrapper>
      </body>
    </html>
  );
};

export default Layout;
