import {NextResponse} from "next/server";
import {DataImporter} from "@/lib/data/DataImporter";

export async function GET() {
    const importer = new DataImporter();
    await importer.importData();
    return NextResponse.json({});
}