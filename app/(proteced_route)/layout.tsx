import React from "react";
import "@mantine/core/styles.css";
import "@/app/globals.css";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth");
  }

  return <>{children}</>;
}
