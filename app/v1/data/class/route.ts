import { NextRequest, NextResponse } from "next/server";
import { DataImporter } from "@/lib/data/DataImporter";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const year = searchParams.get("year");
  const semester = searchParams.get("semester");

  if (!year || !semester) {
    return NextResponse.json(
      { error: "Missing year or semester" },
      { status: 400 }
    );
  }

  const importer = new DataImporter();
  await importer.importClasses(year, semester);
  return NextResponse.json({});
}
