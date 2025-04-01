"use server";

import { cookies } from "next/headers";
import { ScheduleConfig } from "@/lib/utils";
import { redirect } from "next/navigation";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { prisma } from "@/lib/prisma";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

async function classCacheFunction(year: string, semester: string) {
  "use cache";
  cacheLife("minutes");
  cacheTag(`class-${year}-${semester}`);

  return prisma.class.findMany({
    where: {
      yearStudyId: year,
      semesterId: semester,
    },
    include: {
      Subject: true,
      Lecturer: true,
    },
  });
}

export async function getClass() {
  const cookie = await cookies();
  const classConfigCookie = cookie.get("classConfig");

  if (classConfigCookie) {
    const classConfig: ScheduleConfig = JSON.parse(classConfigCookie.value);
    var { year, semester, major } = classConfig;
    if (year === "" && semester === "" && major === "") {
      redirect("/schedule/setup");
    }
  } else {
    redirect("/schedule/setup");
  }

  return classCacheFunction(year, semester);
}
